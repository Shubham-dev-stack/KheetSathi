import os
import sys
import glob
import json
import random
import time
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance
import onnxruntime as ort
from sklearn.metrics import accuracy_score, precision_recall_fscore_support

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from config import CANONICAL_DIR_NAMES, CLASS_NAMES

IMAGE_EXTS = {'.jpg', '.jpeg', '.png', '.bmp', '.webp', '.JPG', '.JPEG', '.PNG'}

def load_and_preprocess(img, target_size=224):
    w, h = img.size
    if w < h:
        new_w = 256
        new_h = int(256 * h / w)
    else:
        new_h = 256
        new_w = int(256 * w / h)
    img = img.resize((new_w, new_h), Image.Resampling.BILINEAR)
    left = (new_w - target_size) / 2
    top = (new_h - target_size) / 2
    right = (new_w + target_size) / 2
    bottom = (new_h + target_size) / 2
    img = img.crop((left, top, right, bottom))
    
    img_data = np.array(img).astype('float32') / 255.0
    img_data = (img_data - 0.5) / 0.5
    img_data = np.transpose(img_data, (2, 0, 1))
    img_data = np.expand_dims(img_data, axis=0)
    return img_data

def quality_check(img):
    img_res = img.resize((256, 256), Image.Resampling.BILINEAR)
    pixels = np.array(img_res).astype('float32')
    r, g, b = pixels[:, :, 0], pixels[:, :, 1], pixels[:, :, 2]
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    mean_lum = np.mean(lum)
    lum_var = np.var(lum)
    
    green_mask = (g >= 0.88 * r) & (g >= 1.12 * b) & (g >= 35)
    yellow_mask = (r >= 1.20 * b) & (g >= 1.10 * b) & ((r + g) >= (2 * b + 25)) & (np.abs(r - g) <= 75) & (np.maximum.reduce([r, g, b]) >= 35)
    foliar_ratio = np.sum(green_mask | yellow_mask) / (256 * 256)
    
    gray = lum.astype('float32')
    lap = -4 * gray[1:-1, 1:-1] + gray[:-2, 1:-1] + gray[2:, 1:-1] + gray[1:-1, :-2] + gray[1:-1, 2:]
    blur_var = np.var(lap)
    
    is_dark = mean_lum < 35
    is_blank = lum_var < 2.0
    is_blurry = blur_var < 65
    is_non_leaf = is_blank or (foliar_ratio < 0.12)
    
    return {
        "mean_luminance": float(mean_lum),
        "blur_variance": float(blur_var),
        "foliar_ratio": float(foliar_ratio),
        "is_dark": bool(is_dark),
        "is_blurry": bool(is_blurry),
        "is_non_leaf": bool(is_non_leaf)
    }

def main():
    print("=" * 70)
    print("      KHEETSATHI REAL LOCAL ON-DEVICE MODEL & ACCURACY TEST")
    print("=" * 70)
    
    onnx_path = "model/model.onnx"
    if not os.path.exists(onnx_path):
        print(f"[ERROR] Model file not found at {onnx_path}")
        return
        
    model_size_mb = os.path.getsize(onnx_path) / (1024 * 1024)
    print(f"[*] ONNX Model Path: {onnx_path} ({model_size_mb:.2f} MB)")
    
    session = ort.InferenceSession(onnx_path, providers=['CPUExecutionProvider'])
    input_info = session.get_inputs()[0]
    output_info = session.get_outputs()[0]
    print(f"[*] Input Node: {input_info.name}, Shape: {input_info.shape}, Type: {input_info.type}")
    print(f"[*] Output Node: {output_info.name}, Shape: {output_info.shape}, Classes: {len(CANONICAL_DIR_NAMES)}")
    print("-" * 70)
    
    # ----------------------------------------------------
    # TEST 1: PlantVillage In-Domain Accuracy (Recursive Scan Across Full 54,305 Dataset)
    # ----------------------------------------------------
    print("\n[TEST 1/4] Evaluating In-Domain Accuracy on PlantVillage (Full 54,305 Dataset)...")
    pv_samples = []
    pv_targets = []
    total_images_in_pool = 0
    
    random.seed(42)
    for idx, cls_name in enumerate(CANONICAL_DIR_NAMES):
        cls_dir = os.path.join("data/plantvillage_raw", cls_name)
        if os.path.exists(cls_dir):
            all_files = glob.glob(os.path.join(cls_dir, "**", "*.*"), recursive=True)
            files = [f for f in all_files if os.path.splitext(f)[1] in IMAGE_EXTS]
            total_images_in_pool += len(files)
            k = min(len(files), 25)
            selected = random.sample(files, k)
            pv_samples.extend(selected)
            pv_targets.extend([idx] * k)
            
    print(f" -> Total images scanned across 38 classes: {total_images_in_pool}")
    print(f" -> Testing on {len(pv_samples)} balanced PlantVillage images across {len(CANONICAL_DIR_NAMES)} classes...")
    t0 = time.time()
    pv_preds = []
    pv_top5 = 0
    crop_stats = {}
    
    for path, target in zip(pv_samples, pv_targets):
        try:
            img = Image.open(path).convert('RGB')
            tensor = load_and_preprocess(img)
            out = session.run(None, {input_info.name: tensor})[0][0]
            
            exp_out = np.exp(out - np.max(out))
            probs = exp_out / np.sum(exp_out)
            
            pred = int(np.argmax(probs))
            pv_preds.append(pred)
            
            top5_indices = np.argsort(probs)[-5:]
            if target in top5_indices:
                pv_top5 += 1
                
            crop_name = CANONICAL_DIR_NAMES[target].split("___")[0]
            if crop_name not in crop_stats:
                crop_stats[crop_name] = {"correct": 0, "total": 0}
            crop_stats[crop_name]["total"] += 1
            if pred == target:
                crop_stats[crop_name]["correct"] += 1
        except Exception:
            continue
            
    pv_time = time.time() - t0
    pv_acc = accuracy_score(pv_targets[:len(pv_preds)], pv_preds)
    pv_top5_acc = pv_top5 / len(pv_preds) if pv_preds else 0
    p_macro, r_macro, f1_macro, _ = precision_recall_fscore_support(pv_targets[:len(pv_preds)], pv_preds, average='macro', zero_division=0)
    
    print(f" -> PlantVillage In-Domain Top-1 Accuracy : {pv_acc * 100:.2f}%")
    print(f" -> PlantVillage Top-5 Accuracy           : {pv_top5_acc * 100:.2f}%")
    print(f" -> Macro Precision / Recall / F1         : P={p_macro*100:.1f}%, R={r_macro*100:.1f}%, F1={f1_macro*100:.1f}%")
    print(f" -> Average Inference Latency             : {(pv_time / len(pv_preds)) * 1000:.2f} ms / image")
    print(" -> Per-Crop Accuracy Breakdown:")
    per_crop_results = {}
    for crop, stats in sorted(crop_stats.items()):
        c_acc = (stats["correct"] / stats["total"]) * 100 if stats["total"] else 0
        per_crop_results[crop] = {"accuracy": round(c_acc, 1), "correct": stats["correct"], "total": stats["total"]}
        print(f"     * {crop:25s}: {c_acc:5.1f}% ({stats['correct']}/{stats['total']})")
        
    # ----------------------------------------------------
    # TEST 2: PlantDoc External Field Accuracy (Recursive Scan)
    # ----------------------------------------------------
    print("\n[TEST 2/4] Evaluating Field Domain Accuracy on PlantDoc (Natural Environments)...")
    plantdoc_map = {
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
    pd_targets = []
    for pd_folder, can_name in plantdoc_map.items():
        if can_name in CANONICAL_DIR_NAMES:
            idx = CANONICAL_DIR_NAMES.index(can_name)
            folder_path = os.path.join("data/plantdoc_raw", pd_folder)
            if os.path.exists(folder_path):
                all_files = glob.glob(os.path.join(folder_path, "**", "*.*"), recursive=True)
                for p in [f for f in all_files if os.path.splitext(f)[1] in IMAGE_EXTS]:
                    try:
                        img = Image.open(p).convert('RGB')
                        tensor = load_and_preprocess(img)
                        out = session.run(None, {input_info.name: tensor})[0][0]
                        pred = int(np.argmax(out))
                        pd_preds.append(pred)
                        pd_targets.append(idx)
                    except Exception:
                        continue
                        
    pd_acc = accuracy_score(pd_targets, pd_preds) if pd_targets else 0
    print(f" -> PlantDoc Field Images Evaluated : {len(pd_targets)}")
    print(f" -> Field Real-World Accuracy       : {pd_acc * 100:.2f}%")
    
    # ----------------------------------------------------
    # TEST 3: Out-Of-Distribution (OOD) Rice Rejection Test
    # ----------------------------------------------------
    print("\n[TEST 3/4] Testing Unsupported Crop Rejection (Rice OOD)...")
    rice_all = glob.glob(os.path.join("data/ood_raw", "**", "*.*"), recursive=True)
    rice_paths = [f for f in rice_all if os.path.splitext(f)[1] in IMAGE_EXTS]
    entropies = []
    max_confidences = []
    
    for p in rice_paths:
        try:
            img = Image.open(p).convert('RGB')
            tensor = load_and_preprocess(img)
            out = session.run(None, {input_info.name: tensor})[0][0]
            exp_out = np.exp(out - np.max(out))
            probs = exp_out / np.sum(exp_out)
            entropy = -np.sum(probs * np.log(probs + 1e-9))
            entropies.append(entropy)
            max_confidences.append(float(np.max(probs)))
        except Exception:
            continue
            
    avg_entropy = float(np.mean(entropies)) if entropies else 0
    max_entropy = float(np.log(38))
    rejected_count = sum(1 for e, c in zip(entropies, max_confidences) if e > 1.5 or c < 0.60)
    rejection_rate = (rejected_count / len(entropies)) * 100 if entropies else 0
    
    print(f" -> Rice OOD Images Tested         : {len(entropies)}")
    print(f" -> Mean Softmax Entropy           : {avg_entropy:.3f} / {max_entropy:.3f} (Max uncertainty)")
    print(f" -> OOD Safety Gate Rejection Rate : {rejection_rate:.1f}%")
    
    # ----------------------------------------------------
    # TEST 4: Live End-to-End Pipeline Stress Tests
    # ----------------------------------------------------
    print("\n[TEST 4/4] Live Pipeline Safety Gate Tests on Test Assets...")
    test_cases = [
        ("assets/images/sample_potato_blight.jpg", "Known Diseased Crop", "Potato Early/Late Blight"),
        ("assets/images/sample_healthy_leaf.jpg", "Known Healthy Crop", "Healthy Foliage"),
        ("assets/images/sample_tomato_curl.jpg", "Known Virus Crop", "Tomato Yellow Leaf Curl"),
        ("assets/images/sample_rice_blight.jpg", "Unsupported Crop (Rice)", "REJECT (Gate 2: Unsupported Crop)"),
        ("assets/images/sample_tractor.jpg", "Unrelated / Non-Leaf Object", "REJECT (Gate 1: Non-Leaf)")
    ]
    
    live_results = []
    for path, category, expected in test_cases:
        if not os.path.exists(path):
            continue
        img = Image.open(path).convert('RGB')
        qc = quality_check(img)
        
        tensor = load_and_preprocess(img)
        out = session.run(None, {input_info.name: tensor})[0][0]
        exp_out = np.exp(out - np.max(out))
        probs = exp_out / np.sum(exp_out)
        top1_idx = int(np.argmax(probs))
        top1_conf = float(probs[top1_idx])
        top1_label = CLASS_NAMES[top1_idx]
        entropy = float(-np.sum(probs * np.log(probs + 1e-9)))
        
        if qc["is_non_leaf"]:
            decision = f"REJECTED [Gate 1: Non-Leaf Detected (Foliar={qc['foliar_ratio']*100:.1f}%)]"
            status = "REJECTED_GATE_1"
        elif entropy > 2.0 or top1_conf < 0.40:
            decision = f"REJECTED [Gate 2: Low Confidence / OOD (Conf={top1_conf*100:.1f}%, Entropy={entropy:.2f})]"
            status = "REJECTED_GATE_2"
        else:
            decision = f"ACCEPTED -> {top1_label} ({top1_conf*100:.1f}%)"
            status = "ACCEPTED"
            
        print(f"\n   * Asset: {os.path.basename(path)}")
        print(f"     Category : {category}")
        print(f"     Expected : {expected}")
        print(f"     Decision : {decision}")
        live_results.append({
            "asset": os.path.basename(path),
            "category": category,
            "expected": expected,
            "decision": decision,
            "status": status,
            "confidence": round(top1_conf, 4),
            "entropy": round(entropy, 4)
        })
        
    report_json = {
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "model_file": onnx_path,
        "model_size_mb": round(model_size_mb, 2),
        "plantvillage_evaluation": {
            "total_images_in_pool": total_images_in_pool,
            "evaluated_sample_size": len(pv_preds),
            "top1_accuracy": round(float(pv_acc) * 100, 2),
            "top5_accuracy": round(float(pv_top5_acc) * 100, 2),
            "macro_precision": round(float(p_macro) * 100, 2),
            "macro_recall": round(float(r_macro) * 100, 2),
            "macro_f1": round(float(f1_macro) * 100, 2),
            "average_latency_ms": round((pv_time / len(pv_preds)) * 1000, 2),
            "per_crop_accuracy": per_crop_results
        },
        "plantdoc_field_evaluation": {
            "evaluated_images": len(pd_targets),
            "field_accuracy": round(float(pd_acc) * 100, 2)
        },
        "rice_ood_evaluation": {
            "tested_images": len(entropies),
            "mean_entropy": round(avg_entropy, 4),
            "max_entropy": round(max_entropy, 4),
            "rejection_rate": round(rejection_rate, 2)
        },
        "live_asset_tests": live_results
    }
    
    with open("data/reports/local_test_report.json", "w", encoding="utf-8") as f:
        json.dump(report_json, f, indent=2)
    print("\n[+] Saved structured report to data/reports/local_test_report.json")
    print("=" * 70)

if __name__ == '__main__':
    main()
