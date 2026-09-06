import os
import sys
import glob
import random
import numpy as np
from PIL import Image
import onnxruntime as ort
from sklearn.metrics import accuracy_score

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from config import CANONICAL_DIR_NAMES, CLASS_NAMES

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
    session = ort.InferenceSession(onnx_path)
    input_name = session.get_inputs()[0].name
    
    # Evaluate a 5% sample of PlantVillage
    pv_paths = []
    pv_labels = []
    for i, cls in enumerate(CANONICAL_DIR_NAMES):
        cls_dir = os.path.join("data/plantvillage_raw", cls)
        if os.path.exists(cls_dir):
            imgs = glob.glob(os.path.join(cls_dir, "*.*"))
            sample_size = max(1, int(len(imgs) * 0.05))
            sampled = random.sample(imgs, sample_size)
            pv_paths.extend(sampled)
            pv_labels.extend([i] * len(sampled))
            
    pv_preds = []
    valid_labels = []
    for i, p in enumerate(pv_paths):
        img_data = load_and_preprocess(p)
        if img_data is not None:
            out = session.run(None, {input_name: img_data})[0]
            pv_preds.append(np.argmax(out[0]))
            valid_labels.append(pv_labels[i])
            
    print("\n=== PLANTVILLAGE BASELINE EVALUATION (5% SAMPLE) ===")
    print(f"Accuracy: {accuracy_score(valid_labels, pv_preds) * 100:.2f}%")
    
    # Evaluating PlantDoc (Field Domain)
    # Mapping EXACT matches from prepare_plantdoc.py logic
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
                for p in glob.glob(os.path.join(cls_dir, "*.*")):
                    img_data = load_and_preprocess(p)
                    if img_data is not None:
                        out = session.run(None, {input_name: img_data})[0]
                        pd_preds.append(np.argmax(out[0]))
                        pd_labels.append(model_idx)
                        
    if pd_labels:
        print(f"\n=== PLANTDOC EXTERNAL FIELD EVALUATION (EXACT MATCHES ONLY) ===")
        print(f"Evaluated Images: {len(pd_labels)}")
        print(f"Accuracy: {accuracy_score(pd_labels, pd_preds) * 100:.2f}%")
        
    # Evaluate Rice OOD (Entropy checking)
    ood_paths = glob.glob("data/ood_raw/*/*.*")
    ood_entropy = []
    for p in ood_paths:
        img_data = load_and_preprocess(p)
        if img_data is not None:
            out = session.run(None, {input_name: img_data})[0]
            exp_out = np.exp(out[0] - np.max(out[0]))
            probs = exp_out / np.sum(exp_out)
            entropy = -np.sum(probs * np.log(probs + 1e-9))
            ood_entropy.append(entropy)
            
    if ood_entropy:
        avg_entropy = np.mean(ood_entropy)
        max_entropy = np.log(38)
        print(f"\n=== RICE OOD EVALUATION ({len(ood_entropy)} IMAGES) ===")
        print(f"Average Entropy: {avg_entropy:.4f} / {max_entropy:.4f} (Max)")
        print(f"OOD Rejection Confidence Score: {(avg_entropy/max_entropy)*100:.2f}%")

if __name__ == '__main__':
    main()
