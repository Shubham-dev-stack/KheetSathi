import os
import sys
import glob
import json
import random
import numpy as np
from PIL import Image
import onnxruntime as ort
from sklearn.metrics import classification_report, accuracy_score, confusion_matrix

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from config import CLASS_NAMES

def load_and_preprocess(img_path):
    try:
        img = Image.open(img_path).convert('RGB')
        # Resize shortest edge to 256
        w, h = img.size
        if w < h:
            new_w = 256
            new_h = int(256 * h / w)
        else:
            new_h = 256
            new_w = int(256 * w / h)
        img = img.resize((new_w, new_h), Image.Resampling.BILINEAR)
        # Center crop 224
        left = (new_w - 224) / 2
        top = (new_h - 224) / 2
        right = (new_w + 224) / 2
        bottom = (new_h + 224) / 2
        img = img.crop((left, top, right, bottom))
        
        # To numpy and normalize (mean=0.5, std=0.5)
        img_data = np.array(img).astype('float32') / 255.0
        img_data = (img_data - 0.5) / 0.5
        # HWC to CHW
        img_data = np.transpose(img_data, (2, 0, 1))
        # Add batch dim
        img_data = np.expand_dims(img_data, axis=0)
        return img_data
    except Exception as e:
        return None

def main():
    onnx_path = "model/model.onnx"
    if not os.path.exists(onnx_path):
        print(f"Model not found: {onnx_path}")
        return
        
    print("Loading ONNX Model...")
    session = ort.InferenceSession(onnx_path)
    input_name = session.get_inputs()[0].name
    
    # Evaluate a 5% sample of PlantVillage
    print("Sampling 5% of PlantVillage...")
    pv_paths = []
    pv_labels = []
    for i, cls in enumerate(CLASS_NAMES):
        cls_dir = os.path.join("data/plantvillage_raw", cls)
        if os.path.exists(cls_dir):
            imgs = glob.glob(os.path.join(cls_dir, "*.*"))
            sample_size = max(1, int(len(imgs) * 0.05))
            sampled = random.sample(imgs, sample_size)
            pv_paths.extend(sampled)
            pv_labels.extend([i] * len(sampled))
            
    # Run PV Evaluation
    print(f"Running Inference on {len(pv_paths)} PlantVillage Images...")
    pv_preds = []
    valid_labels = []
    for i, p in enumerate(pv_paths):
        img_data = load_and_preprocess(p)
        if img_data is not None:
            out = session.run(None, {input_name: img_data})[0]
            pred = np.argmax(out[0])
            pv_preds.append(pred)
            valid_labels.append(pv_labels[i])
            
    print("\n=== PLANTVILLAGE BASELINE EVALUATION (5% SAMPLE) ===")
    print(f"Accuracy: {accuracy_score(valid_labels, pv_preds) * 100:.2f}%")
    
    # Evaluate PlantDoc (EXACT only)
    print("\nEvaluating PlantDoc (Field Domain)...")
    pd_preds = []
    pd_labels = []
    for i, cls in enumerate(CLASS_NAMES):
        cls_dir = os.path.join("data/plantdoc_raw", cls)
        if os.path.exists(cls_dir):
            imgs = glob.glob(os.path.join(cls_dir, "*.*"))
            for p in imgs:
                img_data = load_and_preprocess(p)
                if img_data is not None:
                    out = session.run(None, {input_name: img_data})[0]
                    pred = np.argmax(out[0])
                    pd_preds.append(pred)
                    pd_labels.append(i)
                    
    if pd_labels:
        print(f"=== PLANTDOC EXTERNAL EVALUATION ({len(pd_labels)} IMAGES) ===")
        print(f"Accuracy: {accuracy_score(pd_labels, pd_preds) * 100:.2f}%")
        
    # Evaluate Rice OOD (Entropy checking)
    print("\nEvaluating Rice OOD Dataset (Rejection Check)...")
    ood_paths = glob.glob("data/ood_raw/*/*.*")
    ood_entropy = []
    for p in ood_paths:
        img_data = load_and_preprocess(p)
        if img_data is not None:
            out = session.run(None, {input_name: img_data})[0]
            # Softmax
            exp_out = np.exp(out[0] - np.max(out[0]))
            probs = exp_out / np.sum(exp_out)
            # Entropy
            entropy = -np.sum(probs * np.log(probs + 1e-9))
            ood_entropy.append(entropy)
            
    if ood_entropy:
        avg_entropy = np.mean(ood_entropy)
        max_entropy = np.log(38) # ~3.63
        print(f"=== RICE OOD EVALUATION ({len(ood_entropy)} IMAGES) ===")
        print(f"Average Entropy: {avg_entropy:.4f} / {max_entropy:.4f} (Max)")
        print(f"OOD Rejection Confidence Score: {(avg_entropy/max_entropy)*100:.2f}%")

if __name__ == '__main__':
    main()
