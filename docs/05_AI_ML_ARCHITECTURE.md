# Document 05: AI & Machine Learning Architecture

**Project Name:** KheetSathi (खेती साथी)  
**Document Code:** AIML-2026-V1.1  
**Problem Formulation:** Supervised Multi-Class Visual Classification with Confidence Thresholding  
**Status:** Approved AI/ML Architecture Specification (Post Technical Consistency Review)  

---

## 1. Machine Learning Problem Formulation

The agricultural leaf disease identification task is formulated as a **supervised visual classification problem** over a closed set of crop-pathogen classes, coupled with an **out-of-distribution (OOD) and low-confidence rejection mechanism**:

$$\hat{y} = \arg\max_{c \in \mathcal{C}} P(y = c \mid \mathbf{x}), \quad \text{subject to } \max_{c} P(y = c \mid \mathbf{x}) \ge \tau_{\text{confidence}}$$

Where:
* $\mathbf{x} \in \mathbb{R}^{H \times W \times 3}$: Preprocessed RGB crop leaf image.
* $\mathcal{C}$: Set of $K$ supported crop disease classes + healthy controls across key Indian crops.
* $\tau_{\text{confidence}} = 0.65$: Confidence score threshold below which predictions are flagged as *Ambiguous / Uncertain* rather than returning a deceptive diagnosis.

> [!NOTE]
> **Prototype vs. Production AI Scope:**
> - **In the Prototype / Demonstration Phase:** Diagnostic outputs and confidence scores are **simulated prototype behaviors** powered by structured fixtures to validate the end-to-end user experience and error handling without making unsubstantiated accuracy claims.
> - **In the Future Production Phase (Phases 3-4):** The system will execute fine-tuned MobileNetV3 CNN weights with post-training temperature calibration and on-device TFLite INT8 quantization.

---

## 2. Model Family Evaluation & Architecture Selection

```
+----------------------------------------------------------------------------------------------------+
|                             CANDIDATE MODEL BENCHMARK EVALUATION                                   |
+------------------------------------+----------------+--------------+---------------+---------------+
| Model Family                       | Parameters (M) | Top-1 Target | Mobile        | Edge Latency  |
|                                    |                | Accuracy     | Suitability   | (TFLite CPU)* |
+------------------------------------+----------------+--------------+---------------+---------------+
| ResNet-50                          | ~25.6 M        | High (88-92%)| Poor (Heavy)  | ~350-500 ms   |
| Vision Transformer (ViT-Base)      | ~86.0 M        | Very High    | Unsuitable    | >1200 ms      |
| EfficientNet-B0                    | ~5.3 M         | High (85-89%)| Good          | ~110-160 ms   |
| **MobileNetV3-Small / Large**      | **~2.5 - 5.4M**| **High (84-88%)**| **Exceptional**| **~40-80 ms** |
| ShuffleNetV2                       | ~2.3 M         | Moderate     | High          | ~50-90 ms     |
+------------------------------------+----------------+--------------+---------------+---------------+
```
*\*Latency numbers represent proposed engineering targets on standard ARM Cortex-A53 mobile processors.*

### 2.1 Model Selection Rationale
**Primary Recommendation:** **MobileNetV3 (Small/Large with Transfer Learning from ImageNet / Agricultural weights)**.

* **Why MobileNetV3?**
  1. **Hardware-Aware Neural Architecture Search (NAS):** Optimized specifically for mobile CPU/DSP hardware using depthwise separable convolutions and Squeeze-and-Excitation (SE) attention blocks.
  2. **Minimal Memory Footprint:** Parameter count of $\sim 3.2\text{M}$ allows a quantized TFLite INT8 model size of under **$4.5\text{ MB}$**, making on-device deployment realistic for low-cost Indian smartphones.
  3. **High Inference Speed:** Sub-$80\text{ms}$ execution on mid-tier mobile chipsets without GPU acceleration.
  4. **Transfer Learning Compatibility:** Easily pre-trained on ImageNet and fine-tuned on botanical datasets with progressive unfreezing.

---

## 3. Dataset Strategy & Data Engineering

```
+-------------------------------------------------------------------------------+
|                            DATASET STRATEGY LAYERS                            |
|                                                                               |
|  [ PROTOTYPE PHASE (CURRENT) ]                                                |
|  - Curated mock & visual demonstration fixtures                               |
|  - Benchmark leaf imagery representing standard healthy vs diseased symptoms  |
|  - Explicitly tagged as "Simulated AI Fixture" in documentation & UI          |
|                                                                               |
|  [ PILOT TRAINING BENCHMARK (ROADMAP) ]                                       |
|  - PlantVillage public dataset (~54,000 lab images) for feature pre-training  |
|  - CropPest / PlantDoc dataset (~2,500 real-world in-field images) for domain |
|    adaptation under varied backgrounds, lighting, and occlusions              |
|                                                                               |
|  [ FIELD PRODUCTION EXPANSION (FUTURE) ]                                      |
|  - Active learning pipeline sourcing verified field images via KVK extension  |
|  - Expert-annotated bounding boxes and severity tags                          |
+-------------------------------------------------------------------------------+
```

### 3.1 Targeted Crop & Disease Taxonomy (MVP Scope)

```
Crop Categories (5 Major Indian Staples):
├── 1. Potato (आलू)
│   ├── Potato Early Blight (Alternaria solani)
│   ├── Potato Late Blight (Phytophthora infestans)
│   └── Potato Healthy
├── 2. Tomato (टमाटर)
│   ├── Tomato Early Blight
│   ├── Tomato Late Blight
│   ├── Tomato Leaf Curl Virus
│   └── Tomato Healthy
├── 3. Rice / Paddy (धान)
│   ├── Rice Bacterial Leaf Blight (Xanthomonas oryzae)
│   ├── Rice Brown Spot (Bipolaris oryzae)
│   └── Rice Healthy
├── 4. Wheat (गेहूं)
│   ├── Wheat Yellow Rust (Puccinia striiformis)
│   ├── Wheat Leaf Blight
│   └── Wheat Healthy
└── 5. Cotton (कपास)
    ├── Cotton Bacterial Blight
    └── Cotton Healthy
```

---

## 4. End-to-End Image Processing & Inference Pipeline

```
+----------------------------------------------------------------------------------------+
|                                    INFERENCE PIPELINE                                  |
+----------------------------------------------------------------------------------------+
| 1. INGESTION & QUALITY GATE (Client / Edge)                                            |
|    - Aspect-ratio preserving downscale to max 1024x1024 px                             |
|    - HTML5 Canvas Laplacian variance and mean grayscale pixel luminance ($Y \in [35,230]$)|
|    - Rejection of severely degraded frames before server transmission                  |
+----------------------------------------------------------------------------------------+
| 2. TENSOR PREPARATION (Planned ML Service)                                             |
|    - Center-crop and bilinear resize to 224x224x3                                      |
|    - Normalization: $x_{\text{norm}} = \frac{x / 255.0 - \mu}{\sigma}$                 |
+----------------------------------------------------------------------------------------+
| 3. FORWARD PASS & CONFIDENCE SCORING                                                   |
|    - Forward pass through MobileNetV3 backbone producing raw logits $\mathbf{z}$      |
|    - Softmax transformation generating class candidate scores                          |
+----------------------------------------------------------------------------------------+
| 4. CONFIDENCE & FALLBACK FILTER                                                        |
|    - If Top-1 Score $< 0.65$: Flag as "Uncertain / Ambiguous Result"                   |
|    - If Top-1 Class == "Background / Non-Leaf": Return "No Plant Detected"            |
|    - (Future ML Scope: Statistical temperature scaling & entropy-based OOD gating)    |
+----------------------------------------------------------------------------------------+
| 5. DIAGNOSTIC & SEVERITY DISPATCH                                                      |
|    - Join top predicted class with localized Agronomic Remedy Catalog                  |
|    - Map qualitative severity tier (Mild / Moderate / Severe)                          |
|    - (Future ML Scope: Quantitative lesion area segmentation via UNet/DeepLab)         |
+----------------------------------------------------------------------------------------+
```

---

## 5. Model Evaluation Metrics & Validation Strategy (Proposed Targets)

*All metrics below represent proposed targets for the Phase 3 training milestone:*

| Metric | Proposed Target | Purpose & Agronomic Significance |
| :--- | :--- | :--- |
| **Top-1 Accuracy** | $\ge 85.0\%$ on field test splits | Measures primary pathogen identification on realistic field images. |
| **Top-3 Accuracy** | $\ge 95.0\%$ | Ensures true condition is within candidate differential list. |
| **Macro-Averaged F1** | $\ge 0.82$ | Guarantees balanced performance across rare and common diseases. |
| **Expected Calibration Error (ECE)** | $\le 0.08$ *(Future ML Target)* | Ensures output confidence scores align with empirical validation accuracy. |
| **False Healthy Rate (FHR)** | $\le 2.0\%$ (Strict Minimization) | Minimizes dangerous failure mode where a diseased leaf is misclassified as healthy. |
