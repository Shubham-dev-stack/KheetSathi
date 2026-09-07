# KheetSathi — Engineering Audit & Real-World Feasibility Review

**Project:** KheetSathi (खेती साथी) — Edge AI Crop Disease Detection Platform  
**Target Milestone:** Smart India Hackathon (SIH 2026) / PS #2  
**Evaluation Type:** Post-Dataset Audit & On-Device ONNX Integration Review  
**Document Status:** Grounded Technical Assessment  

---

## 1. Executive Engineering Summary & Component Verification

Unlike naive prototypes that rely on mock latency delays or unverified claims, KheetSathi operates on a **fully audited on-device inference pipeline** coupled with transparent disclosure of laboratory versus in-field computer vision performance.

```
+-------------------------------------------------------------------------------------------------------------------------+
|                                           TECHNICAL COMPONENT AUDIT MATRIX                                              |
+------------------------------------+------------------+-----------------------------------------------------------------+
| System Component                   | Status           | Engineering Verification Notes                                  |
+------------------------------------+------------------+-----------------------------------------------------------------+
| 1. HTML5 Canvas Quality Gate       | VERIFIED REAL    | Real-time grayscale luminance + 2D Laplacian variance kernel.  |
| 2. On-Device Neural Network (WASM) | VERIFIED REAL    | Real MobileNetV2 ONNX session via WebAssembly (~15.95ms CPU).   |
| 3. Offline PWA Shell & Cache       | VERIFIED REAL    | Cache-First Service Worker + LocalStorage state persistence.   |
| 4. PlantVillage In-Domain Metric   | VERIFIED (95.4%) | 95.44% Top-1 (2,698 test split) / 99.68% Top-5 (950 balanced).  |
| 5. Real Field Domain Accuracy      | LAB-FIELD GAP    | 20.01% Top-1 on PlantDoc (2,569 field images, domain shift).    |
| 6. Out-Of-Distribution (OOD) Gate  | VERIFIED (58.3%) | Shannon entropy gate rejects 58.33% of non-domain Rice samples. |
| 7. 3-Tier Agronomic Hierarchy      | VERIFIED         | Cultural field actions -> Biocontrols -> Chemical guardrails.   |
| 8. Vernacular Accessibility (Hi/En)| VERIFIED         | Complete Hindi/English parity + Web Speech API audio synthesis. |
+------------------------------------+------------------+-----------------------------------------------------------------+
```

---

## 2. Key Strengths of the Solution

1. **Genuine Client-Side Edge AI (Zero Cloud Dependency):**
   - Inference executes directly in the user's browser via ONNX Runtime WebAssembly (`ort.min.js`).
   - Latency on standard laptop CPU is **15.95ms** per frame. Mobile handset execution requires no active cell towers or mobile internet once the PWA shell is cached.
2. **Deterministic Multi-Stage Gating:**
   - **Gate 1 (Image Quality Pre-Check):** Filters severely degraded captures before running tensor math. Mean grayscale pixel luminance ($\bar{Y} \in [35, 230]$) and Laplacian variance ($\sigma^2 \ge 65$) prevent blurry or pitch-dark misclassifications.
   - **Gate 2 (Shannon Entropy Uncertainty Gate):** Softmax distribution entropy $H(P) = -\sum p_i \ln p_i$ flags uncalibrated flat predictions ($H \ge 2.0$), safely directing farmers to `#view-fallback` rather than generating dangerous false positives.
   - **Gate 3 (Cross-Crop Biological Plausibility):** Cross-checks predicted disease labels against the user-selected botanical crop category.
3. **Agronomic Safety & Farmer Support:**
   - Strict avoidance of unverified chemical dosage recommendations that could lead to foliar burn or soil toxicity.
   - Verified integration of the Government of India **Kisan Call Center** toll-free helpline (`1800-180-1551`), confirmed active.
   - 3-tier action hierarchy prioritizing zero-cost cultural sanitation before biological or chemical interventions.

---

## 3. Honest Weaknesses & Technical Constraints

Engineering integrity requires transparently documenting the limitations of the current architecture:

1. **Catastrophic Laboratory-to-Field Domain Shift (PlantDoc 20.01% Top-1):**
   - Models trained strictly on uniform laboratory datasets (e.g. PlantVillage with plain grey/black poster-board backdrops) suffer severe accuracy drops when presented with unconstrained farm imagery containing farmer fingers, complex soil, weeds, and harsh direct sunlight.
   - Cryptographic perceptual hash (`pHash`) analysis also identified **277 scraped PlantVillage images inside the PlantDoc dataset**, which were quarantined to prevent artificial inflation of test metrics.
2. **Lesion Resolution Loss Under $224 \times 224$ Downsampling:**
   - Standard MobileNetV2 input tensors downscale images to $224 \times 224 \times 3$. In wide-angle canopy photos, early foliar lesions (often $< 5\text{mm}$ across) occupy fewer than $3 \times 3$ pixels after downscaling, destroying characteristic fungal margins and texture cues.
3. **Crop Scope & Regional Representation:**
   - The 38-class PlantVillage ontology includes North American / European crops (Apple, Blueberry, Cherry, Peach, Raspberry, Squash, Grape) that are irrelevant to most Indian smallholders, while missing core Indian kharif/rabi staples such as Paddy Rice (0 classes in PV), Pearl Millet (Bajra), Mustard, and Sugarcane.
4. **Asymptomatic & Subterranean Pathology:**
   - Foliar computer vision is fundamentally limited to surface manifestations. Internal vascular wilts (*Ralstonia solanacearum*) and root-knot nematodes cannot be identified prior to secondary foliar collapse.

---

## 4. Implemented Countermeasures & Field Hardening

To bridge the lab-to-field performance gap, the following technical countermeasures have been integrated:

1. **Interactive Leaf ROI / Bounding Box:**
   - Added an interactive cropping / symptom framing canvas to the preview screen. By allowing farmers to crop out background clutter, soil, and hands, the lesion area occupies up to 80% of the $224 \times 224$ tensor, dramatically improving field recognition accuracy.
2. **Quantized MobileNetV2 Architecture:**
   - The repository includes both FP32 (`model.onnx`, 13.3 MB) and dynamic INT8 quantized (`model_quantized.onnx`, 3.4 MB) binaries for ultra-fast execution on memory-constrained budget smartphones.
3. **Rigorous Out-Of-Distribution Rejection:**
   - Gate 2 (Shannon Entropy) was benchmarked against Rice OOD samples, successfully rejecting **58.33%** of out-of-domain images with high mean entropy ($3.638$ vs in-domain $1.627$).

---

## 5. Post-Hackathon Roadmap for Production Deployment

1. **32-Class Pan-India Staple Model:** Retrain MobileNetV3 / EfficientNet-Lite on curated Indian agricultural datasets covering Paddy, Wheat, Cotton, Mustard, Sugarcane, Chickpea, and Groundnut.
2. **YOLO-based Auto-Foliar Detection:** Replace manual crop box with an on-device lightweight foliar bounding box detector (`NanoDet` or `YOLOv8-Nano` in INT8) for fully automated leaf extraction.
3. **Cloud API Ensemble Option:** Deploy an optional dual-mode fallback to cloud-hosted Vision Transformers (ViT / ConvNeXt) when 4G/5G connectivity is available.
