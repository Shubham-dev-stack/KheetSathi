"""
KheetSathi MobileNetV2 Fine-Tuning Script
"""

import os
import sys
import argparse
from pathlib import Path

# Add project root to sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from config import TrainingConfig, CLASS_NAMES

def main():
    parser = argparse.ArgumentParser(description="Fine-tune MobileNetV2 for KheetSathi Plant Disease Diagnosis")
    parser.add_argument("--data-dir", type=str, default="data/plantvillage", help="Path to PlantVillage dataset folder")
    parser.add_argument("--epochs", type=int, default=30, help="Number of training epochs")
    parser.add_argument("--batch-size", type=int, default=32, help="Batch size")
    parser.add_argument("--lr", type=float, default=1e-4, help="Learning rate")
    parser.add_argument("--output-dir", type=str, default="training/checkpoints", help="Output directory for checkpoints")
    args = parser.parse_args()

    config = TrainingConfig(
        data_dir=args.data_dir,
        num_epochs=args.epochs,
        batch_size=args.batch_size,
        learning_rate=args.lr,
        output_dir=args.output_dir
    )

    # 1. Dataset Availability Gate
    if not os.path.exists(config.data_dir):
        print("\n" + "=" * 80)
        print("TRAINING DATASET NOT AVAILABLE — TRAINING CANNOT BE PERFORMED YET.")
        print(f"Searched location: '{os.path.abspath(config.data_dir)}'")
        print("To begin real fine-tuning:")
        print("1. Download the 38-class PlantVillage dataset (e.g. from Kaggle or Zenodo).")
        print(f"2. Place the uncompressed class folders in: {os.path.abspath(config.data_dir)}")
        print("3. Run: python training/train.py --data-dir <path-to-dataset>")
        print("=" * 80 + "\n")
        sys.exit(1)

    try:
        import torch
        import torch.nn as nn
        from torch.optim import AdamW
        from torch.optim.lr_scheduler import CosineAnnealingLR
        from torchvision import models
        from sklearn.metrics import f1_score
    except ImportError as e:
        print(f"\n[Error] Missing dependency: {e}")
        print("Please install requirements: pip install -r training/requirements.txt")
        sys.exit(1)

    from dataset import build_dataloaders

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"\n[Training] Using compute device: {device}")

    # Build Dataloaders
    try:
        train_loader, val_loader, test_loader, idx_to_class = build_dataloaders(config)
    except FileNotFoundError as e:
        print(f"\n{e}")
        sys.exit(1)

    # Build Model
    print(f"[Model] Initializing {config.model_name} (pre-trained backbone)...")
    model = models.mobilenet_v2(weights=models.MobileNet_V2_Weights.DEFAULT)
    
    # Replace final classification head with 38 classes
    in_features = model.classifier[1].in_features
    model.classifier = nn.Sequential(
        nn.Dropout(p=config.dropout_rate),
        nn.Linear(in_features, config.num_classes)
    )
    model = model.to(device)

    criterion = nn.CrossEntropyLoss(label_smoothing=config.label_smoothing)
    optimizer = AdamW(model.parameters(), lr=config.learning_rate, weight_decay=config.weight_decay)
    scheduler = CosineAnnealingLR(optimizer, T_max=config.num_epochs, eta_min=config.min_lr)

    os.makedirs(config.output_dir, exist_ok=True)
    best_val_f1 = 0.0
    patience_counter = 0

    print(f"[Training] Beginning training for {config.num_epochs} epochs...")
    for epoch in range(1, config.num_epochs + 1):
        # --- TRAIN LOOP ---
        model.train()
        train_loss = 0.0
        correct = 0
        total = 0

        for images, labels in train_loader:
            images, labels = images.to(device), labels.to(device)
            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
            optimizer.step()

            train_loss += loss.item() * images.size(0)
            _, preds = torch.max(outputs, 1)
            correct += (preds == labels).sum().item()
            total += labels.size(0)

        scheduler.step()
        epoch_train_loss = train_loss / total
        epoch_train_acc = correct / total

        # --- VALIDATION LOOP ---
        model.eval()
        val_loss = 0.0
        val_correct = 0
        val_total = 0
        all_preds = []
        all_labels = []

        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.to(device), labels.to(device)
                outputs = model(images)
                loss = criterion(outputs, labels)

                val_loss += loss.item() * images.size(0)
                _, preds = torch.max(outputs, 1)
                val_correct += (preds == labels).sum().item()
                val_total += labels.size(0)

                all_preds.extend(preds.cpu().numpy())
                all_labels.extend(labels.cpu().numpy())

        epoch_val_loss = val_loss / val_total
        epoch_val_acc = val_correct / val_total
        epoch_val_f1 = f1_score(all_labels, all_preds, average='macro')

        print(f"Epoch [{epoch:02d}/{config.num_epochs:02d}] "
              f"Train Loss: {epoch_train_loss:.4f} | Train Acc: {epoch_train_acc*100:.2f}% | "
              f"Val Loss: {epoch_val_loss:.4f} | Val Acc: {epoch_val_acc*100:.2f}% | Val Macro F1: {epoch_val_f1*100:.2f}%")

        # Save Best Checkpoint
        if epoch_val_f1 > best_val_f1:
            best_val_f1 = epoch_val_f1
            patience_counter = 0
            best_path = os.path.join(config.output_dir, "best_model.pth")
            torch.save({
                'epoch': epoch,
                'model_state_dict': model.state_dict(),
                'optimizer_state_dict': optimizer.state_dict(),
                'val_f1': epoch_val_f1,
                'val_acc': epoch_val_acc,
                'class_names': CLASS_NAMES
            }, best_path)
            print(f"  -> Best model checkpoint saved to: {best_path}")
        else:
            patience_counter += 1
            if patience_counter >= config.early_stopping_patience:
                print(f"[Training] Early stopping triggered after {patience_counter} stagnant epochs.")
                break

    print(f"\n[Training Complete] Best Validation Macro F1: {best_val_f1*100:.2f}%")
    print(f"Run 'python training/evaluate.py' to produce test set metrics and confusion matrix.")
    print(f"Run 'python training/export_onnx.py' to convert the best model to ONNX for KheetSathi Web.")

if __name__ == "__main__":
    main()
