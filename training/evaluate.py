"""
KheetSathi Offline ML Model Evaluation Script
Computes Real Top-1/Top-5 Accuracy, Macro F1, Precision, Recall, Confusion Matrix & OOD Response
"""

import os
import sys
import json
import argparse
from pathlib import Path

# Add project root to sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from config import TrainingConfig, CLASS_NAMES

def main():
    parser = argparse.ArgumentParser(description="Evaluate KheetSathi Plant Disease Model")
    parser.add_argument("--data-dir", type=str, default="data/plantvillage", help="Path to evaluation dataset")
    parser.add_argument("--checkpoint", type=str, default="training/checkpoints/best_model.pth", help="PyTorch checkpoint")
    parser.add_argument("--onnx-model", type=str, default="model/model.onnx", help="Path to ONNX model")
    parser.add_argument("--output-report", type=str, default="training/evaluation_report.json", help="Path to output report")
    args = parser.parse_args()

    config = TrainingConfig(data_dir=args.data_dir)

    # 1. Dataset Availability Gate
    if not os.path.exists(config.data_dir):
        print("\n" + "=" * 80)
        print("TRAINING DATASET NOT AVAILABLE — TRAINING CANNOT BE PERFORMED YET.")
        print(f"Searched evaluation dataset location: '{os.path.abspath(config.data_dir)}'")
        print("A legitimate evaluation dataset (such as the PlantVillage test split or PlantDoc) is required")
        print("to compute real macro F1, per-class recall, and the full 38x38 confusion matrix.")
        print("=" * 80 + "\n")
        sys.exit(1)

    try:
        import torch
        from torchvision import models
        from sklearn.metrics import classification_report, confusion_matrix, precision_recall_fscore_support
        import numpy as np
    except ImportError as e:
        print(f"[Error] Missing dependency: {e}")
        print("Please install requirements: pip install -r training/requirements.txt")
        sys.exit(1)

    from dataset import build_dataloaders

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    # Load dataloaders
    try:
        _, _, test_loader, idx_to_class = build_dataloaders(config)
    except FileNotFoundError as e:
        print(f"\n{e}")
        sys.exit(1)

    # Load Model
    if not os.path.exists(args.checkpoint):
        print(f"[Error] Checkpoint not found at: '{args.checkpoint}'. Run training/train.py first.")
        sys.exit(1)

    print(f"[Evaluation] Loading model checkpoint from: {args.checkpoint}")
    checkpoint = torch.load(args.checkpoint, map_location=device)
    
    model = models.mobilenet_v2()
    in_features = model.classifier[1].in_features
    model.classifier = torch.nn.Sequential(
        torch.nn.Dropout(p=config.dropout_rate),
        torch.nn.Linear(in_features, config.num_classes)
    )
    model.load_state_dict(checkpoint['model_state_dict'])
    model = model.to(device)
    model.eval()

    all_preds = []
    all_targets = []
    top5_correct = 0
    total_samples = 0

    print("[Evaluation] Evaluating test split...")
    with torch.no_grad():
        for images, targets in test_loader:
            images = images.to(device)
            outputs = model(images)
            probs = torch.softmax(outputs, dim=1)

            # Top 1
            _, preds = torch.max(probs, 1)
            all_preds.extend(preds.cpu().numpy())
            all_targets.extend(targets.numpy())

            # Top 5
            _, top5 = torch.topk(probs, 5, dim=1)
            targets_gpu = targets.to(device).unsqueeze(1)
            top5_correct += (top5 == targets_gpu).any(dim=1).sum().item()
            total_samples += targets.size(0)

    all_preds = np.array(all_preds)
    all_targets = np.array(all_targets)

    top1_acc = (all_preds == all_targets).mean()
    top5_acc = top5_correct / total_samples

    precision, recall, f1, _ = precision_recall_fscore_support(all_targets, all_preds, average='macro', zero_division=0)
    cm = confusion_matrix(all_targets, all_preds).tolist()
    report = classification_report(all_targets, all_preds, target_names=CLASS_NAMES, zero_division=0, output_dict=True)

    print("\n" + "=" * 60)
    print("KHEETSATHI MODEL EVALUATION REPORT")
    print("=" * 60)
    print(f"Total Evaluated Test Samples: {total_samples}")
    print(f"Top-1 Accuracy: {top1_acc * 100:.2f}%")
    print(f"Top-5 Accuracy: {top5_acc * 100:.2f}%")
    print(f"Macro Precision: {precision * 100:.2f}%")
    print(f"Macro Recall: {recall * 100:.2f}%")
    print(f"Macro F1 Score: {f1 * 100:.2f}%")
    print("=" * 60 + "\n")

    summary_data = {
        "num_test_samples": total_samples,
        "top1_accuracy": float(top1_acc),
        "top5_accuracy": float(top5_acc),
        "macro_precision": float(precision),
        "macro_recall": float(recall),
        "macro_f1": float(f1),
        "per_class_report": report,
        "confusion_matrix": cm
    }

    os.makedirs(os.path.dirname(os.path.abspath(args.output_report)), exist_ok=True)
    with open(args.output_report, 'w', encoding='utf-8') as f:
        json.dump(summary_data, f, indent=2)
    print(f"Saved complete evaluation report and confusion matrix to: {args.output_report}")

if __name__ == "__main__":
    main()
