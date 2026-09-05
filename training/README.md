# KheetSathi ML Training & Evaluation Pipeline

This directory contains the production-grade PyTorch fine-tuning, evaluation, and ONNX export pipeline for **KheetSathi's On-Device Crop Disease Classifier**.

---

## 1. Pipeline Architecture

- **Backbone Architecture:** MobileNetV2 (`MobileNetV2ForImageClassification`)
- **Number of Classes:** 38 crop disease classes (14 crop families)
- **Input Specification:**
  - Input Tensor: `[batch_size, 3, 224, 224]`, Float32, RGB
  - Preprocessing: Aspect-preserving shortest edge resize to 256px -> Center Crop 224x224px
  - Normalization: `mean=[0.5, 0.5, 0.5]`, `std=[0.5, 0.5, 0.5]` (maps pixel range $[0, 255]$ to $[-1.0, 1.0]$)
- **Target Deployment:** 100% Client-Side WebAssembly (`ort.wasm`) via ONNX Runtime Web.

---

## 2. Dataset Availability Notice

> [!IMPORTANT]
> **TRAINING DATASET NOT AVAILABLE — TRAINING CANNOT BE PERFORMED YET.**
>
> The local git repository contains only client-side web application assets and sample images (`assets/images/`, $N=11$). The 54,000+ image PlantVillage dataset is **not** bundled in the repository to maintain lightweight web deployment.
>
> In accordance with strict evaluation protocols:
> - No fake training results or simulated logs are generated.
> - The current model remains the benchmark `MobileNetV2` model (`model/model.onnx`).
> - Once the dataset is supplied, the automated scripts below execute genuine training.

---

## 3. Setup & Execution Instructions

### A. Environment Setup
Recommended: Python 3.10 – 3.12 (with PyTorch and CUDA support if available).

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r training/requirements.txt
```

### B. Place the Training Dataset
Download the PlantVillage dataset (e.g. from Kaggle or Zenodo) and place the 38 class directories into:
```
data/plantvillage/
  ├── Apple___Apple_scab/
  ├── Apple___Black_rot/
  ├── Potato___Early_blight/
  ├── Tomato___Late_blight/
  └── ... (38 classes total)
```

### C. Run Fine-Tuning
```bash
python training/train.py --data-dir data/plantvillage --epochs 30 --batch-size 32 --lr 1e-4
```
- Performs a 70% / 15% / 15% stratified split by class (zero data leakage).
- Applies realistic field augmentations: random rotations $\pm 30^\circ$, random scaling $[0.8, 1.0]$, color jitter for variable daylight/shadows, horizontal/vertical flips.
- Saves the best checkpoint based on validation Macro F1 score to `training/checkpoints/best_model.pth`.

### D. Run Full Evaluation
```bash
python training/evaluate.py --data-dir data/plantvillage --checkpoint training/checkpoints/best_model.pth
```
- Computes Top-1 Accuracy, Top-5 Accuracy, Macro Precision, Macro Recall, and Macro F1 score.
- Generates a full $38 \times 38$ Confusion Matrix and per-class classification report saved to `training/evaluation_report.json`.

### E. Export & Verify ONNX Model for KheetSathi Web
```bash
python training/export_onnx.py --checkpoint training/checkpoints/best_model.pth --output-onnx model/model.onnx
```
- Exports graph with input name `pixel_values` and output name `logits`.
- Automatically executes numerical parity tests between PyTorch and ONNX Runtime WASM (tolerates max deviation $< 10^{-4}$).

---

## 4. Multi-Stage Defense Architecture in KheetSathi

KheetSathi protects against the "closed-world softmax trap" (where random or unrelated images are forced to predict a disease) via a 5-stage defense system:

1. **Gate 0 (Input Validation):** Rejects corrupt/blank/sub-64px images.
2. **Gate 1 (Botanical Foliar Gate):** Rejects non-leaf objects (vehicles, food plates, faces, gadgets) using Botanical Foliar Coverage ($BFC < 12\%$) and Neutral Background Ratio ($NBR > 75\%$).
3. **Gate 2 (Crop Boundary Gate):** Rejects crops outside the supported 14-crop family taxonomy.
4. **Gate 3 (Image Quality Gate):** Rejects severely blurred (discrete Laplacian variance $< 65$) or under/over-exposed images ($< 35$ or $> 230$ mean luminance).
5. **Gate 4 (Crop Probability Mass):** Rejects crop mismatches if the cumulative probability mass of the user-selected crop across the 38 classes is $< 25\%$.
6. **Gate 5 (Conditional Confidence & OOD Guard):** Rejects low-confidence predictions (raw prob $< 30\%$ or conditional conf $< 50\%$) and high-entropy OOD distributions (entropy $> 4.25$ bits with margin $< 5\%$).
