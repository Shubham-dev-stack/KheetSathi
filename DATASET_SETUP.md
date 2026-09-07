# KheetSathi — PlantVillage Dataset Setup & Preparation Guide

This guide describes how to acquire, place, verify, and prepare the **PlantVillage 38-class dataset** for fine-tuning the KheetSathi on-device crop disease model.

> [!NOTE]
> **DATASET STATUS: AUDITED, PLACED & BENCHMARKED**
>
> The local repository contains the fully unified **PlantVillage dataset (54,305 valid images across 38 canonical classes)**, **PlantDoc field dataset (2,569 images)**, and **Rice OOD test set (120 images)**. The trained MobileNetV2 ONNX model (`model/model.onnx`, INT8 `model/model_quantized.onnx`) is fully integrated for on-device inference.

---

## 1. Where the Dataset Is Located

By default, local training and verification scripts inspect:
```
data/plantvillage_raw/     # 54,305 verified PlantVillage images (38 classes)
data/plantdoc_raw/         # 2,569 PlantDoc field benchmark images
data/ood_raw/              # 120 Rice Out-Of-Distribution test images
data/reports/              # Cryptographic pHash leakage audit and manifests
```

*(You can also pass `--data-dir <path>` to any script to evaluate on custom subsets).*

---

## 2. Expected Directory Structure

The dataset directory must contain **exactly 38 class subdirectories** formatted according to the standard PlantVillage naming convention (`<Crop>___<Disease>`):

```
data/plantvillage/
├── Apple___Apple_scab/
│   ├── image (1).JPG
│   └── ...
├── Apple___Black_rot/
├── Apple___Cedar_apple_rust/
├── Apple___healthy/
├── Blueberry___healthy/
├── Cherry_(including_sour)___Powdery_mildew/
├── Cherry_(including_sour)___healthy/
├── Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot/
├── Corn_(maize)___Common_rust_/
├── Corn_(maize)___Northern_Leaf_Blight/
├── Corn_(maize)___healthy/
├── Grape___Black_rot/
├── Grape___Esca_(Black_Measles)/
├── Grape___Leaf_blight_(Isariopsis_Leaf_Spot)/
├── Grape___healthy/
├── Orange___Haunglongbing_(Citrus_greening)/
├── Peach___Bacterial_spot/
├── Peach___healthy/
├── Pepper,_bell___Bacterial_spot/
├── Pepper,_bell___healthy/
├── Potato___Early_blight/
├── Potato___Late_blight/
├── Potato___healthy/
├── Raspberry___healthy/
├── Soybean___healthy/
├── Squash___Powdery_mildew/
├── Strawberry___Leaf_scorch/
├── Strawberry___healthy/
├── Tomato___Bacterial_spot/
├── Tomato___Early_blight/
├── Tomato___Late_blight/
├── Tomato___Leaf_Mold/
├── Tomato___Septoria_leaf_spot/
├── Tomato___Spider_mites Two-spotted_spider_mite/
├── Tomato___Target_Spot/
├── Tomato___Tomato_Yellow_Leaf_Curl_Virus/
├── Tomato___Tomato_mosaic_virus/
└── Tomato___healthy/
```

---

## 3. Required Classes & Canonical Index Mapping

When subdirectories are sorted alphabetically by standard PyTorch `ImageFolder`, their order must match the **38 model output indices** ($0$ to $37$):

| Index | Canonical Directory Name | KheetSathi Disease Label |
| :---: | :--- | :--- |
| **00** | `Apple___Apple_scab` | Apple Scab |
| **01** | `Apple___Black_rot` | Apple with Black Rot |
| **02** | `Apple___Cedar_apple_rust` | Cedar Apple Rust |
| **03** | `Apple___healthy` | Healthy Apple |
| **04** | `Blueberry___healthy` | Healthy Blueberry Plant |
| **05** | `Cherry_(including_sour)___Powdery_mildew` | Cherry with Powdery Mildew |
| **06** | `Cherry_(including_sour)___healthy` | Healthy Cherry Plant |
| **07** | `Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot` | Corn (Maize) Cercospora / Gray Leaf Spot |
| **08** | `Corn_(maize)___Common_rust_` | Corn (Maize) Common Rust |
| **09** | `Corn_(maize)___Northern_Leaf_Blight` | Corn (Maize) Northern Leaf Blight |
| **10** | `Corn_(maize)___healthy` | Healthy Corn (Maize) Plant |
| **11** | `Grape___Black_rot` | Grape with Black Rot |
| **12** | `Grape___Esca_(Black_Measles)` | Grape with Esca (Black Measles) |
| **13** | `Grape___Leaf_blight_(Isariopsis_Leaf_Spot)` | Grape with Isariopsis Leaf Spot |
| **14** | `Grape___healthy` | Healthy Grape Plant |
| **15** | `Orange___Haunglongbing_(Citrus_greening)` | Orange with Citrus Greening |
| **16** | `Peach___Bacterial_spot` | Peach with Bacterial Spot |
| **17** | `Peach___healthy` | Healthy Peach Plant |
| **18** | `Pepper,_bell___Bacterial_spot` | Bell Pepper with Bacterial Spot |
| **19** | `Pepper,_bell___healthy` | Healthy Bell Pepper Plant |
| **20** | `Potato___Early_blight` | Potato with Early Blight |
| **21** | `Potato___Late_blight` | Potato with Late Blight |
| **22** | `Potato___healthy` | Healthy Potato Plant |
| **23** | `Raspberry___healthy` | Healthy Raspberry Plant |
| **24** | `Soybean___healthy` | Healthy Soybean Plant |
| **25** | `Squash___Powdery_mildew` | Squash with Powdery Mildew |
| **26** | `Strawberry___Leaf_scorch` | Strawberry with Leaf Scorch |
| **27** | `Strawberry___healthy` | Healthy Strawberry Plant |
| **28** | `Tomato___Bacterial_spot` | Tomato with Bacterial Spot |
| **29** | `Tomato___Early_blight` | Tomato with Early Blight |
| **30** | `Tomato___Late_blight` | Tomato with Late Blight |
| **31** | `Tomato___Leaf_Mold` | Tomato with Leaf Mold |
| **32** | `Tomato___Septoria_leaf_spot` | Tomato with Septoria Leaf Spot |
| **33** | `Tomato___Spider_mites Two-spotted_spider_mite` | Tomato with Spider Mites / Two-spotted |
| **34** | `Tomato___Target_Spot` | Tomato with Target Spot |
| **35** | `Tomato___Tomato_Yellow_Leaf_Curl_Virus` | Tomato Yellow Leaf Curl Virus |
| **36** | `Tomato___Tomato_mosaic_virus` | Tomato Mosaic Virus |
| **37** | `Tomato___healthy` | Healthy Tomato Plant |

---

## 4. How Train, Validation & Test Splits Are Created

The pipeline in `training/dataset.py` uses a **two-stage stratified shuffle split** (`sklearn.model_selection.StratifiedShuffleSplit`) with a fixed seed (`seed = 42`):

1. **Split 1 (Train vs Val+Test):** Partitions total images into 70% Train and 30% held-out.
2. **Split 2 (Val vs Test):** Partitions the 30% held-out into equal 15% Validation and 15% Test subsets.
3. **Stratification Guarantee:** Each class is split independently according to its exact class frequency. A class with 1,000 images will have 700 in train, 150 in val, and 150 in test; a class with 200 images will have 140 in train, 30 in val, and 30 in test.
4. **Zero Data Leakage:** Subsets are formed from mutually disjoint index lists:
   $$\text{Train} \cap \text{Val} = \emptyset, \quad \text{Train} \cap \text{Test} = \emptyset, \quad \text{Val} \cap \text{Test} = \emptyset$$

---

## 5. How Class Imbalance Is Handled

PlantVillage exhibits significant natural class imbalance (some classes contain ~5,000 images, while others contain ~275 images). The pipeline handles this through four safeguards:

1. **Stratified Partitioning:** Guarantees minority classes are not under-represented or lost in validation or test splits.
2. **Label Smoothing Cross-Entropy Loss (`label_smoothing = 0.1`):** Prevents the model from becoming overconfident on majority classes.
3. **Stochastic Data Augmentations:** Random crops ($[0.8, 1.0]$), rotations ($\pm 30^\circ$), color jitter, and horizontal/vertical flips dynamically synthesize diverse training representations for minority classes on every epoch.
4. **Macro-Averaged Evaluation Metrics:** Model selection and early stopping are governed by **Macro F1 Score** (the unweighted mean of F1 scores across all 38 individual classes), rather than micro-accuracy. A model cannot achieve a high score by simply memorizing majority classes.

---

## 6. How to Verify Zero Data Leakage

To verify that there is no data leakage across training and evaluation:

1. **Deterministic Pipeline:** Run `python training/check_dataset.py` to ensure duplicate images (identical MD5 bitstreams) across folders are identified and removed before training.
2. **Index Disjointness:** In `training/dataset.py`, `Subset` instances are created with verified non-overlapping index slices.
3. **Augmentation Isolation:** Augmentations are applied exclusively to `train_dataset`. The validation and test sets strictly use deterministic center cropping (`transforms.Resize(256) -> transforms.CenterCrop(224)`) with no random transformations.

---

## 7. Step-by-Step Operator Instructions

### Step 1: Verify Dataset Integrity & Manifests
```bash
python training/check_dataset.py --data-dir data/plantvillage_raw --verbose
```
The script audits all 38 classes, scans every image for corruption, computes class distribution statistics, and saves `data/reports/plantvillage_manifest.json` (54,305 valid images).

### Step 2: Run Local Benchmark & Multi-Crop Accuracy
```bash
python training/test_local_accuracy.py --onnx-path model/model.onnx --data-dir data/plantvillage_raw --sample-size 950
```
Measures Top-1 and Top-5 accuracy, inference latency, entropy distribution, and confusion statistics across all crops.

### Step 3: Run In-Field & Out-Of-Distribution Robustness Test
```bash
python training/evaluate_onnx_baseline.py
```
Evaluates cross-domain generalization against PlantDoc (`data/plantdoc_raw`) and OOD rejection against Rice (`data/ood_raw`).

### Step 4: Export & Quantize ONNX
```bash
python training/export_onnx.py --checkpoint training/checkpoints/best_model.pth --output-onnx model/model.onnx
```
Exports model to ONNX format and generates INT8 quantized binary (`model/model_quantized.onnx`) for optimized edge performance.
