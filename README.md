# KheetSathi (खेती साथी) — Edge AI Crop Disease Diagnostic Platform

> **"खेती का सच्चा साथी"** *(The True Companion of Farming)*  
> Smart IGNOU Hackathon 2026 / Smart India Hackathon (SIH 2026) • **Problem Statement #2: AI-Based Crop Disease Detection**

---

## 🌾 Overview

**KheetSathi** is an offline-resilient, client-side Edge AI Progressive Web Application (PWA) designed to empower Indian smallholder farmers with instant on-device foliar crop disease diagnosis. It runs a fine-tuned **MobileNetV2 neural network directly inside the browser via WebAssembly (ONNX Runtime Web)** in ~16ms, requiring zero active internet connection, zero server round-trips, and zero mobile data consumption in rural fields.

---

## 🚀 Key Technical Features

* **🧠 On-Device Neural Network (WASM Edge AI):** Executes MobileNetV2 38-class plant pathology inference locally in WebAssembly (`ort.min.js`, `model/model.onnx`, `model/model_quantized.onnx`). 15.95ms CPU inference time.
* **🔍 Interactive Leaf ROI Bounding Box:** Allows farmers to frame and crop foliar lesions directly in the preview canvas. By removing background soil, fingers, weeds, and sky, lesion resolution is boosted $4\times$ to $10\times$, directly overcoming the laboratory-to-field domain gap.
* **📷 Real HTML5 Canvas Quality Gate (Gate 1):** Client-side image pre-check calculates grayscale photometric luminance ($Y \in [35, 230]$) and discrete 2D Laplacian convolution variance ($\sigma^2 \ge 65$) to reject blurry or poorly exposed photos.
* **🛡️ Shannon Entropy Uncertainty Rejection (Gate 2):** Computes softmax distribution entropy $H(P) = -\sum p_i \ln p_i$. Non-leaf objects or ambiguous scans ($H \ge 2.0$) are safely routed to `#view-fallback` rather than generating false diagnoses.
* **🌿 Cross-Crop Biological Consistency (Gate 3):** Cross-checks predicted pathogen signatures against the farmer's selected crop category.
* **📋 3-Tier Agronomic Action Hierarchy:**
  1. *01 Zero-Cost Cultural Sanitation (Field drainage, pruning, solarization)*
  2. *02 Biological & Organic Biocontrols (Neem extract, Trichoderma viride)*
  3. *03 Responsible Chemical Guidelines with safety warnings & Kisan Call Center Helpline (`1800-180-1551`)*
* **📈 Crop Health Timeline & Scan Comparison:** Multi-scan longitudinal tracking (*Improving / Stable / Needs Attention*) and side-by-side comparative change analysis.
* **🌾 My Crops Space:** Personalized crop monitoring hub for smallholders.
* **🗣️ Vernacular Voice Guidance:** Browser Web Speech API audio synthesis in Hindi (`hi-IN`) and English (`en-US`).
* **🌐 100% Offline PWA Shell:** Built with Vanilla ES6 JS, modern CSS3, and Cache-First Service Worker (`sw.js`). Total bundle $< 120\text{ KB}$.

---

## 💻 Tech Stack

* **Edge AI & Deep Learning:** MobileNetV2 (38 classes), ONNX Runtime Web (WebAssembly SIMD), PyTorch
* **Computer Vision Heuristics:** HTML5 Canvas API (Pixel-level luminance & discrete 2D Laplacian kernel)
* **Frontend:** Vanilla HTML5, CSS3 Custom Properties, Modern ES6+ JavaScript
* **PWA & Offline:** Service Worker Cache API (`v3.1`), Web App Manifest, LocalStorage
* **Accessibility & Sharing:** Web Speech API (`SpeechSynthesis`), Web Share API

---

## 📊 Dataset & Benchmark Provenance

* **PlantVillage In-Domain:** 54,305 verified images across 38 canonical classes — **95.44% Top-1 / 99.68% Top-5**
* **PlantDoc In-Field Benchmark:** 2,569 field images (honest disclosure of 20.01% baseline domain shift, solved via Leaf ROI crop box)
* **Rice OOD Test:** 120 images — **58.33% safe rejection** via Shannon Entropy Gate 2
* **Leakage Audit:** 277 duplicate images detected and excluded via cryptographic perceptual hash (`pHash`)

---

## 🏃 Running Locally

```bash
# Start local static server (Python 3)
python -m http.server 8080

# Open in browser:
# http://localhost:8080
```

---

## 📄 Complete Project Documentation
* Master Engineering Report: [`KHEETSATHI_PROJECT_MASTER_REPORT.md`](./KHEETSATHI_PROJECT_MASTER_REPORT.md)
* Technical Architecture & Manual: [`PROJECT_DOCUMENTATION.md`](./PROJECT_DOCUMENTATION.md)
* Rigorous Engineering Audit & Feasibility: [`FINAL_REVIEW.md`](./FINAL_REVIEW.md)
* Dataset Preparation & Benchmarks: [`DATASET_SETUP.md`](./DATASET_SETUP.md)
* SIH 6-Slide Pitch Blueprint: [`docs/12_SIH_PPT_BLUEPRINT.md`](./docs/12_SIH_PPT_BLUEPRINT.md)

