import os
import sys
import glob
import random
import numpy as np
from PIL import Image
import onnxruntime as ort
from sklearn.metrics import accuracy_score, precision_recall_fscore_support

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from config import CANONICAL_DIR_NAMES, CLASS_NAMES

IMAGE_EXTS = {'.jpg', '.jpeg', '.png', '.bmp', '.webp', '.JPG', '.JPEG', '.PNG'}

def load_and_preprocess(img_path):
    try:
        img = Image.open(img_path).convert('RGB')
        w, h = img.size
        if w < h:
            new_w = 256
            new_h = int(256 * h / w)
        else:
            new_h = 256
            new_w = int(256 * w / h)
        img = img.resize((new_w, new_h), Image.Resampling.BILINEAR)
        left = (new_w - 224) / 2
        top = (new_h - 224) / 2
        right = (new_w + 224) / 2
        bottom = (new_h + 224) / 2
        img = img.crop((left, top, right, bottom))
        
        img_data = np.array(img).astype('float32') / 255.0
        img_data = (img_data - 0.5) / 0.5
        img_data = np.transpose(img_data, (2, 0, 1))
        img_data = np.expand_dims(img_data, axis=0)
        return img_data
    except Exception as e:
        return None

def main():
    onnx_path = "model/model.onnx"
    print("Loading ONNX Model...")
    session = ort.InferenceSession(onnx_path, providers=['CPUExecutionProvider'])
    input_name = session.get_inputs()[0].name
    
    # 1. Evaluate a 5% sample across the full 54,305 PlantVillage dataset
    pv_paths = []
    pv_labels = []
    total_pv_pool = 0
    random.seed(42)
    
    for i, cls in enumerate(CANONICAL_DIR_NAMES):
        cls_dir = os.path.join("data/plantvillage_raw", cls)
        if os.path.exists(cls_dir):
            all_files = glob.glob(os.path.join(cls_dir, "**", "*.*"), recursive=True)
            imgs = [f for f in all_files if os.path.splitext(f)[1] in IMAGE_EXTS]
            total_pv_pool += len(imgs)
            sample_size = max(1, int(len(imgs) * 0.05))
            sampled = random.sample(imgs, sample_size)
            pv_paths.extend(sampled)
            pv_labels.extend([i] * len(sampled))
            
    print(f"Total PlantVillage Pool Scanned: {total_pv_pool} images across {len(CANONICAL_DIR_NAMES)} classes")
    print(f"Evaluating 5% Stratified Sample: {len(pv_paths)} images...")
    
    pv_preds = []
    valid_labels = []
    for i, p in enumerate(pv_paths):
        img_data = load_and_preprocess(p)
        if img_data is not None:
            out = session.run(None, {input_name: img_data})[0]
            pv_preds.append(np.argmax(out[0]))
            valid_labels.append(pv_labels[i])
            
    pv_acc = accuracy_score(valid_labels, pv_preds)
    p_macro, r_macro, f1_macro, _ = precision_recall_fscore_support(valid_labels, pv_preds, average='macro', zero_division=0)
    
    print("\n=== PLANTVILLAGE BASELINE EVALUATION (5% STRATIFIED SAMPLE) ===")
    print(f"Total Evaluated: {len(valid_labels)} / {total_pv_pool}")
    print(f"Top-1 Accuracy: {pv_acc * 100:.2f}%")
    print(f"Macro F1 Score: {f1_macro * 100:.2f}%")
    
    # 2. Evaluating PlantDoc (Field Domain - Exact Matches Only)
    plantdoc_exact_map = {
        'Apple Scab Leaf': 'Apple___Apple_scab',
        'Apple leaf': 'Apple___healthy',
        'Apple rust leaf': 'Apple___Cedar_apple_rust',
        'Bell_pepper leaf spot': 'Pepper,_bell___Bacterial_spot',
        'Cherry leaf': 'Cherry_(including_sour)___healthy',
        'Corn leaf blight': 'Corn_(maize)___Northern_Leaf_Blight',
        'Corn rust leaf': 'Corn_(maize)___Common_rust_',
        'Peach leaf': 'Peach___healthy',
        'Potato leaf early blight': 'Potato___Early_blight',
        'Potato leaf late blight': 'Potato___Late_blight',
        'Tomato Early blight leaf': 'Tomato___Early_blight',
        'Tomato Septoria leaf spot': 'Tomato___Septoria_leaf_spot',
        'Tomato leaf mosaic virus': 'Tomato___Tomato_mosaic_virus',
        'Tomato leaf yellow virus': 'Tomato___Tomato_Yellow_Leaf_Curl_Virus'
    }
    
    pd_preds = []
    pd_labels = []
    for pd_cls, can_cls in plantdoc_exact_map.items():
        if can_cls in CANONICAL_DIR_NAMES:
            model_idx = CANONICAL_DIR_NAMES.index(can_cls)
            cls_dir = os.path.join("data/plantdoc_raw", pd_cls)
            if os.path.exists(cls_dir):
                all_files = glob.glob(os.path.join(cls_dir, "**", "*.*"), recursive=True)
                for p in [f for f in all_files if os.path.splitext(f)[1] in IMAGE_EXTS]:
                    img_data = load_and_preprocess(p)
                    if img_data is not None:
                        out = session.run(None, {input_name: img_data})[0]
                        pd_preds.append(np.argmax(out[0]))
                        pd_labels.append(model_idx)
                        
    pd_acc = accuracy_score(pd_labels, pd_preds) if pd_labels else 0
    print(f"\n=== PLANTDOC EXTERNAL FIELD EVALUATION (EXACT MATCHES ONLY) ===")
    print(f"Evaluated Images: {len(pd_labels)}")
    print(f"Field Accuracy: {pd_acc * 100:.2f}%")
        
    # 3. Evaluate Rice OOD (Entropy checking)
    ood_all = glob.glob(os.path.join("data/ood_raw", "**", "*.*"), recursive=True)
    ood_paths = [f for f in ood_all if os.path.splitext(f)[1] in IMAGE_EXTS]
    ood_entropy = []
    max_confs = []
    
    for p in ood_paths:
        img_data = load_and_preprocess(p)
        if img_data is not None:
            out = session.run(None, {input_name: img_data})[0]
            exp_out = np.exp(out[0] - np.max(out[0]))
            probs = exp_out / np.sum(exp_out)
            entropy = -np.sum(probs * np.log(probs + 1e-9))
            ood_entropy.append(entropy)
            max_confs.append(float(np.max(probs)))
            
    avg_entropy = np.mean(ood_entropy) if ood_entropy else 0
    max_entropy = np.log(38)
    rejection_rate = (sum(1 for e, c in zip(ood_entropy, max_confs) if e > 1.5 or c < 0.60) / len(ood_entropy)) * 100 if ood_entropy else 0
    
    print(f"\n=== RICE OOD EVALUATION ({len(ood_entropy)} IMAGES) ===")
    print(f"Average Entropy: {avg_entropy:.4f} / {max_entropy:.4f} (Max)")
    print(f"OOD Safety Rejection Rate: {rejection_rate:.2f}%")
    
    # Save standard UTF-8 report
    report_text = f"""Loading ONNX Model...
Total PlantVillage Pool Scanned: {total_pv_pool} images across 38 classes

=== PLANTVILLAGE BASELINE EVALUATION (5% STRATIFIED SAMPLE) ===
Total Evaluated: {len(valid_labels)} / {total_pv_pool}
Top-1 Accuracy: {pv_acc * 100:.2f}%
Macro F1 Score: {f1_macro * 100:.2f}%

=== PLANTDOC EXTERNAL FIELD EVALUATION (EXACT MATCHES ONLY) ===
Evaluated Images: {len(pd_labels)}
Accuracy: {pd_acc * 100:.2f}%

=== RICE OOD EVALUATION ({len(ood_entropy)} IMAGES) ===
Average Entropy: {avg_entropy:.4f} / {max_entropy:.4f} (Max)
OOD Rejection Confidence Score: {(avg_entropy/max_entropy)*100:.2f}%
OOD Safety Rejection Rate: {rejection_rate:.2f}%
"""
    with open("data/reports/baseline_evaluation.txt", "w", encoding="utf-8") as f:
        f.write(report_text)
    print("\n[+] Updated data/reports/baseline_evaluation.txt (UTF-8)")

if __name__ == '__main__':
    main()
