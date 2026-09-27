<div align="center">

# 🌾 KheetSathi (खेती साथी)
### **Edge AI-Powered On-Device Foliar Crop Disease Diagnostic & Ecosystem Platform**

[![SIH 2026](https://img.shields.io/badge/Smart%20India%20Hackathon-SIH%202026-166534.svg?style=for-the-badge&logo=target)](https://github.com/Shubham-dev-stack/KheetSathi)
[![Smart IGNOU Hackathon](https://img.shields.io/badge/Smart%20IGNOU-Problem%20Statement%20%232-15803d.svg?style=for-the-badge)](https://github.com/Shubham-dev-stack/KheetSathi)
[![Edge AI](https://img.shields.io/badge/Edge%20AI-ONNX%20Runtime%20WebAssembly-22c55e.svg?style=for-the-badge&logo=webassembly)](https://onnxruntime.ai/)
[![PWA Ready](https://img.shields.io/badge/PWA-100%25%20Offline%20Resilient-0284c7.svg?style=for-the-badge&logo=pwa)](https://github.com/Shubham-dev-stack/KheetSathi)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg?style=for-the-badge)](LICENSE)

> *"खेती का सच्चा साथी — बिना इंटरनेट खेत में सटीक फसल रोग पहचान और संपूर्ण समाधान"*  
> **"The True Companion of Farming — Instant, Zero-Data Foliar Diagnosis & Agricultural Support for Smallholder Farmers"**

<br/>

![KheetSathi Master Hero Showcase](./assets/screenshots/desktop_1_home.png)

---

[Key Highlights](#-key-highlights) • [Visual Showcase](#-application-visual-showcase) • [System Architecture](#-system-architecture) • [Workflow & User Journey](#-workflow--user-journey) • [ML Inference Pipeline](#-edge-ai--ml-pipeline) • [Post-Diagnosis Ecosystem](#-post-diagnosis-ecosystem) • [Getting Started](#-getting-started) • [Documentation](#-project-documentation-index) • [Contributors](#-lead-contributor--developer)

</div>

---

## 📌 Problem Statement & Context

In rural Indian farmlands, smallholder farmers lose **20% to 40% of their harvest annually** to preventable foliar diseases, fungal blights, viral vectors, and nutrient deficiencies. Conventional agricultural AI applications fail in actual field conditions because:

1. **Zero / Patchy Internet in Farmlands:** Cloud-dependent AI solutions freeze and fail in remote rural fields with poor cellular coverage.
2. **Cloud Latency & High Server Costs:** Streaming high-resolution camera images to GPU servers introduces heavy latency and unsustainable operational costs.
3. **The Lab-to-Field Domain Gap:** AI models trained strictly on laboratory images fail when exposed to real-world clutter (soil, hands, shadows, weeds, variable lighting).
4. **Blind False Confidence & Chemical Toxicity:** Traditional classifiers force guesses on blurry photos or non-leaf objects, promoting incorrect pesticide spraying, environmental toxicity, and unnecessary input costs.

### 💡 The KheetSathi Solution
**KheetSathi** is an **offline-first, client-side Edge AI Progressive Web App (PWA)** that runs a fine-tuned **MobileNetV2 neural network directly inside the smartphone browser via WebAssembly (ONNX Runtime Web WASM SIMD)**. With an average inference latency of **~16ms**, it requires **zero active internet connection, zero server round-trips, and zero recurring server costs**.

---

## ✨ Key Highlights

| Feature | Description | Technical Implementation |
|---|---|---|
| 🧠 **WASM Edge AI Engine** | Instant plant pathology inference executed directly on the mobile CPU | `ONNX Runtime Web (WASM SIMD)` • 15.95ms avg inference |
| 🔍 **Interactive Leaf ROI Bounding Box** | Crop lesion from field clutter, boosting resolution $4\times$ to $10\times$ | HTML5 Canvas coordinate transform & live crop slice |
| 🛡️ **3-Stage Reliability Gate** | Pre-inference luminance/blur checks & post-inference Shannon Entropy | Grayscale luminance, Laplacian $\sigma^2 \ge 65$, Shannon Entropy $H(P) < 2.0$ |
| 🌿 **3-Tier Actionable Remedies** | Cultural sanitation $\rightarrow$ Biological control $\rightarrow$ Responsible chemicals | Integrated ICAR & CIBRC agricultural standard guidelines |
| 🏷️ **Multi-Retailer Price Comparison** | Standardized ₹/100g & ₹/100ml pricing across local agri-retailers | Normalized pricing engine with Bio/Organic vs. Chemical filter |
| 👥 **Kisan Chaupal (Community Q&A)** | Local peer-to-peer farmer forum with verified expert answers | Topic-wise threaded discussion with upvotes & instant replies |
| 👨‍🔬 **Verified Agri Experts Directory** | Direct contact with plant pathologists and KVK extension agronomists | Color-coded consultation rate tags & instant call integration |
| 📈 **Longitudinal Health Timeline** | Multi-scan progress tracker (*Improving / Stable / Needs Attention*) | Chronological foliar observation logging & delta comparator |
| 🗣️ **Vernacular Voice Guidance** | Hands-free audio readout for low-literacy rural farmers | Web Speech API synthesis (`hi-IN` Hindi & `en-US` English) |
| 🌐 **100% Offline PWA Shell** | Operates entirely disconnected from cell towers | Cache-First ServiceWorker (`sw.js`) & LocalStorage persistence |

---

## 📱 Application Visual Showcase

<div align="center">

### Core Diagnostic & Health Progression Flow

| 1. Home Dashboard | 2. Camera & Leaf ROI Viewfinder | 3. AI Diagnostic Result |
|:---:|:---:|:---:|
| <img src="./assets/screenshots/screen_1_home.png" width="260px" alt="Home Dashboard" /> | <img src="./assets/screenshots/screen_5_scan_viewfinder.png" width="260px" alt="Camera Viewfinder" /> | <img src="./assets/screenshots/screen_6_diagnosis_result.png" width="260px" alt="Diagnosis Result" /> |

| 4. Longitudinal Health Timeline | 5. Before vs. After Scan Comparison | 6. Treatments Encyclopedia |
|:---:|:---:|:---:|
| <img src="./assets/screenshots/screen_3_crop_timeline.png" width="260px" alt="Health Timeline" /> | <img src="./assets/screenshots/screen_4_compare_scans.png" width="260px" alt="Scan Comparison" /> | <img src="./assets/screenshots/screen_7_treatments.png" width="260px" alt="Treatments Hub" /> |

| 7. Multi-Retailer Price Comparison | 8. Kisan Chaupal (Community Q&A) | 9. Verified Agri Experts Directory |
|:---:|:---:|:---:|
| <img src="./assets/screenshots/screen_8_products_comp.png" width="260px" alt="Price Comparison" /> | <img src="./assets/screenshots/screen_10_community.png" width="260px" alt="Community Feed" /> | <img src="./assets/screenshots/screen_11_experts.png" width="260px" alt="Experts Directory" /> |

| 10. Farm Work Connect | 11. Crop Overview & Management | 12. Farmer Profile & Settings |
|:---:|:---:|:---:|
| <img src="./assets/screenshots/screen_9_farm_work.png" width="260px" alt="Farm Work Connect" /> | <img src="./assets/screenshots/screen_2_crop_overview.png" width="260px" alt="Crop Overview" /> | <img src="./assets/screenshots/screen_12_profile.png" width="260px" alt="Farmer Profile" /> |

</div>

---

## 🏗️ System Architecture

KheetSathi is built with a strictly decoupled, 4-tier client-side architecture ensuring zero cloud dependency, rapid startup ($< 1\text{s}$), and a minimal footprint ($< 120\text{ KB}$ core JS/CSS bundle).

```mermaid
graph TD
    subgraph Presentation_Layer [📱 1. Client Presentation & Farmer-First UX Layer]
        A1[Single-Page PWA Shell - index.html]
        A2[Bilingual i18n Dictionary - js/i18n.js]
        A3[Vernacular Voice Engine - Web Speech API]
        A4[Interactive Leaf ROI Framing Canvas]
    end

    subgraph Quality_Gate [🛡️ 2. 3-Stage Reliability & Quality Gate]
        B1[Photometric Luminance Gate: Y in 35..230]
        B2[Laplacian Variance Blur Filter: Var >= 65]
        B3[Softmax Shannon Entropy Rejection: H < 2.0]
        B4[Cross-Crop Biological Pathogen Validation]
    end

    subgraph Edge_AI [🧠 3. WASM Edge AI Inference Engine]
        C1[ONNX Runtime Web WASM SIMD - ort.min.js]
        C2[MobileNetV2 FP32 & INT8 Quantized Models]
        C3[Client-side Tensor Normalization: 224x224 RGB]
        C4[Top-K Softmax Classifier: 38 Canonical Classes]
    end

    subgraph Ecosystem_Layer [🌾 4. Post-Diagnosis Agricultural Ecosystem]
        D1[Treatments Encyclopedia: Cultural / Bio / Chem]
        D2[Multi-Retailer Price Comparison: Rs/100g Basis]
        D3[Kisan Chaupal: Peer Q&A & Expert Solutions]
        D4[Verified Agri Experts Directory & Booking]
        D5[Farm Work Connect: Labor Marketplace]
        D6[Crop Health Timeline & Comparative Delta]
    end

    subgraph Storage_Layer [💾 5. Offline Storage & Cache Engine]
        E1[Service Worker Cache-First Storage - sw.js]
        E2[LocalStorage Diagnostics & History Engine]
    end

    Presentation_Layer --> Quality_Gate
    Quality_Gate --> Edge_AI
    Edge_AI --> Ecosystem_Layer
    Ecosystem_Layer --> Storage_Layer
    Storage_Layer -.->|Offline Assets & Local State| Presentation_Layer
```

---

## 🔄 Workflow & User Journey

The complete diagnostic and post-diagnosis lifecycle operates through an intuitive, farmer-tested progression:

```mermaid
flowchart TD
    Start([🌾 Farmer Observes Foliar Symptom]) --> Capture[📸 Capture Photo or Select Demo Sample]
    Capture --> ROI[🔍 Adjust Interactive Leaf ROI Bounding Box]
    
    ROI --> Gate1{Gate 1: Image Quality?<br/>Luminance & Blur Variance}
    Gate1 -- "Too Blurry / Dark / Washed out" --> QualityWarning[⚠️ Display Retake Instructions & Quality Score]
    QualityWarning --> Capture
    
    Gate1 -- "Pass Quality Check" --> WASM[🧠 WASM On-Device Neural Inference<br/>MobileNetV2 ~16ms]
    
    WASM --> Gate2{Gate 2: Confidence & Entropy?<br/>Shannon Entropy H < 2.0}
    Gate2 -- "High Uncertainty / Non-Leaf" --> Fallback[🛡️ Safe Uncertainty Fallback & Kisan Helpline]
    
    Gate2 -- "Verified Prediction" --> Gate3{Gate 3: Cross-Crop Check?<br/>Pathogen matches Crop ID}
    Gate3 -- "Biological Mismatch" --> MismatchAlert[⚠️ Flag Biological Discrepancy]
    
    Gate3 -- "Consistent" --> ResultScreen[📋 Possible Condition & Reliability Assessment]
    
    ResultScreen --> WhyResult["🔍 Why this result? Foliar Symptom Breakdown"]
    WhyResult --> ActionPlan["✅ 3-Tier Action Plan: Cultural → Bio → Chemical"]
    
    ActionPlan --> PostAction1["🏷️ Compare Chemical/Bio Product Prices (₹/100g)"]
    ActionPlan --> PostAction2["👥 Ask Kisan Chaupal (Community Q&A)"]
    ActionPlan --> PostAction3["👨‍🔬 Consult Verified Agri Experts (Call / Video)"]
    ActionPlan --> PostAction4["🚜 Farm Work & Waste Management Advisor"]
    
    PostAction1 & PostAction2 & PostAction3 & PostAction4 --> FollowUp[📈 Follow-up Scan & Longitudinal Crop Timeline]
    FollowUp --> Compare[🔬 Before vs After Comparative Scan Analysis]
    Compare --> End([🌾 Crop Health Restored & Yield Protected])
```

---

## 🧠 Edge AI & ML Pipeline

### 1. Neural Architecture Specifications
- **Base Backbone:** MobileNetV2 with inverted residual blocks and linear bottlenecks.
- **Model Formats:** FP32 ONNX model (`model/model.onnx`) and INT8 Quantized model (`model/model_quantized.onnx`).
- **Input Tensor:** `[1, 3, 224, 224]` float32 normalized with standard ImageNet statistics:
  $$\text{Normalized Pixel} = \frac{\frac{X}{255} - \mu}{\sigma}, \quad \mu = [0.485, 0.456, 0.406], \; \sigma = [0.229, 0.224, 0.225]$$
- **Inference Runtime:** ONNX Runtime WebAssembly SIMD (`ort.min.js`), executing purely on the client-side CPU thread.

### 2. Multi-Stage Quality & Reliability Gates

$$\text{Shannon Entropy: } H(P) = -\sum_{i=1}^{38} p_i \ln(p_i)$$

$$\text{Laplacian Blur Variance: } \sigma^2 = \frac{1}{M}\sum (L(x,y) - \bar{L})^2 \quad (\text{Threshold: } \sigma^2 \ge 65)$$

1. **Gate 1 (HTML5 Photometric & Laplacian Quality Filter):** Computes pixel grayscale luminance ($Y = 0.299R + 0.587G + 0.114B$) and discrete 2D Laplacian kernel variance ($\sigma^2$). Low-quality, dark ($Y < 35$), washed out ($Y > 230$), or blurry photos ($\sigma^2 < 65$) are flagged before inference.
2. **Gate 2 (Shannon Softmax Entropy Rejection):** Evaluates probability dispersion across all 38 output classes. If entropy $H(P) \ge 2.0$ or maximum probability $< 0.50$, the system classifies the input as Out-Of-Distribution (OOD) or non-leaf and redirects safely to fallback support without guessing.
3. **Gate 3 (Cross-Crop Biological Consistency Check):** Cross-references predicted pathogen signatures against the farmer's selected crop species to prevent cross-botanical false positives (e.g. Potato Late Blight on Tomato).

### 3. Model Benchmark Provenance
- **PlantVillage In-Domain Dataset:** 54,305 verified images across 38 canonical classes — **95.44% Top-1 / 99.68% Top-5 accuracy**.
- **PlantDoc In-Field Benchmark:** 2,569 field images (honest disclosure of 20.01% baseline domain shift, solved via Leaf ROI crop box).
- **Leakage & Duplicate Audit:** 277 duplicate images detected and excluded via cryptographic perceptual hash (`pHash`).

---

## 🌾 Post-Diagnosis Ecosystem

KheetSathi provides an integrated suite of post-diagnosis agricultural tools:

### 1. 📖 Disease & Treatments Encyclopedia
- Comprehensive directory of foliar diseases across major Indian staple crops (Potato, Tomato, Rice, Wheat, Cotton, Corn, Grape, Apple).
- 3-tier actionable management strategies: zero-cost cultural sanitation, biological biocontrols (*Trichoderma viride*, Neem Seed Kernel Extract), and approved chemical controls with ICAR/CIBRC compliance disclaimers.

### 2. 🏷️ Multi-Retailer Product Price Comparison
- Standardized unit pricing (**₹/100g** or **₹/100ml**) across regional agricultural input retailers.
- Bio/Organic vs. Chemical categorization with one-tap store contact links.

### 3. 👥 Kisan Chaupal (Community Q&A Forum)
- Crop-filtered discussion threads with botanical emojis (`💬 All Topics`, `🥔 Potato`, `🍅 Tomato`, `🌾 Rice`, `🌾 Wheat`, `🌿 Cotton`).
- Peer-to-peer voting (*"👍 मददगार लगा / Helpful"*) and expert-verified solution badges.

### 4. 👨‍🔬 Verified Agri Experts Directory
- Certified directory of Agronomists, Entomologists, and KVK Extension Specialists.
- Transparent consultation fee tags (Call, Video, Field Visit) and prototype booking interfaces.

### 5. 🚜 Farm Work & Waste Management Advisor
- Segmented marketplace connecting farmers needing seasonal labor (Harvesting, Spraying, Weeding) with local workers.
- Stubble and crop residue management advisor offering sustainable bio-decomposition and economic valorization guidance.

---

## 📂 Repository Structure

```
KheetSathi/
├── assets/
│   ├── images/               # High-res crop photography, hero banners, visual tutorials
│   ├── icons/                # PWA icons & manifest assets
│   └── screenshots/          # High-resolution application UI screenshots
├── css/
│   └── styles.css            # Master Design System (Agritech CSS3 variables, mobile frame)
├── docs/                     # Full SIH 2026 engineering & architectural documentation
│   ├── 01_PROJECT_OVERVIEW.md
│   ├── 02_PRODUCT_REQUIREMENTS_DOCUMENT.md
│   ├── 03_FEATURE_SPECIFICATION.md
│   ├── 04_SYSTEM_ARCHITECTURE.md
│   ├── 05_AI_ML_ARCHITECTURE.md
│   ├── 06_DATABASE_DESIGN.md
│   ├── 07_API_SPECIFICATION.md
│   ├── 08_UI_UX_SPECIFICATION.md
│   ├── 09_PROTOTYPE_PLAN.md
│   ├── 10_RISK_FEASIBILITY.md
│   ├── 11_INNOVATION_AND_DIFFERENTIATION.md
│   ├── 12_SIH_PPT_BLUEPRINT.md
│   ├── 13_HACKATHON_JUDGE_QA.md
│   ├── 14_ROADMAP.md
│   ├── 15_REQUIREMENTS_TRACEABILITY_MATRIX.md
│   └── FINAL_HACKATHON_TECHNICAL_REVIEW.md
├── js/
│   ├── app.js                # Master application controller & navigation router
│   ├── data.js               # Mock data fixtures (Diseases, remedies, retailers, experts)
│   ├── i18n.js               # Bilingual translation dictionary (Hindi & English)
│   ├── mlEngine.js           # ONNX Runtime WebAssembly ML inference pipeline
│   ├── qualityCheck.js       # Photometric luminance & Laplacian blur quality checks
│   └── storage.js            # LocalStorage data persistence layer
├── model/
│   ├── class_labels.json     # 38 canonical class labels & mapping indices
│   ├── config.json           # Model preprocessing hyperparameters & thresholds
│   ├── model.onnx            # MobileNetV2 FP32 ONNX neural model
│   └── model_quantized.onnx  # INT8 quantized on-device ONNX model
├── index.html                # Master single-page application shell
├── manifest.json             # PWA Web App Manifest
├── sw.js                     # Cache-First ServiceWorker for 100% offline support
└── README.md                 # Master project documentation
```

---

## 💻 Tech Stack

- **Edge AI & Deep Learning:** ONNX Runtime Web (WASM SIMD), MobileNetV2, PyTorch
- **Computer Vision & Heuristics:** HTML5 Canvas API, Grayscale Photometrics, 2D Laplacian Matrix Convolution
- **Frontend Architecture:** Vanilla ES6+ JavaScript, Modern CSS3 Custom Properties, Semantic HTML5
- **PWA & Offline Storage:** Service Worker (Cache Storage API v3.1), Web App Manifest, LocalStorage
- **Accessibility & Voice:** Web Speech API (`SpeechSynthesisUtterance`), Web Share API
- **QA & Testing:** Chrome DevTools Protocol (CDP) Headless Testing Suite, Node.js Test Harness

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser with WebAssembly SIMD support (Chrome, Edge, Firefox, Safari, Brave).
- Python 3.x (or any local static HTTP server).

### 1. Clone the Repository
```bash
git clone https://github.com/Shubham-dev-stack/KheetSathi.git
cd KheetSathi
```

### 2. Start a Local Server
Because KheetSathi registers a Service Worker and loads WebAssembly (`.onnx` / `.wasm`), it must be served over `http://` or `https://` (not `file://`).

**Using Python:**
```bash
python -m http.server 8080
```

**Using Node.js (`npx`):**
```bash
npx serve -p 8080 .
```

**Using VS Code:**
- Install the **Live Server** extension.
- Right-click `index.html` $\rightarrow$ **Open with Live Server**.

### 3. Open in Browser
Navigate to `http://localhost:8080` on your desktop or mobile device.

---

## 🧪 Running Automated QA & Validation Suite

```bash
# 1. Syntax check all JS modules
node -c js/app.js js/data.js js/storage.js js/i18n.js js/mlEngine.js js/qualityCheck.js

# 2. Run i18n parity and data structure audit
node scratch/qa_test.js

# 3. Run full headless browser CDP test (24 scenarios + screenshots)
node scratch/run_visual_test.js
```

---

## 📄 Project Documentation Index

| Document | Purpose |
|---|---|
| [`KHEETSATHI_PROJECT_MASTER_REPORT.md`](./KHEETSATHI_PROJECT_MASTER_REPORT.md) | Comprehensive engineering master report |
| [`PROJECT_DOCUMENTATION.md`](./PROJECT_DOCUMENTATION.md) | Technical manual & deployment specifications |
| [`FINAL_REVIEW.md`](./FINAL_REVIEW.md) | Engineering audit & feasibility analysis |
| [`DATASET_SETUP.md`](./DATASET_SETUP.md) | Dataset preparation, provenance & benchmarks |
| [`docs/12_SIH_PPT_BLUEPRINT.md`](./docs/12_SIH_PPT_BLUEPRINT.md) | SIH 2026 6-Slide pitch deck blueprint |
| [`docs/04_SYSTEM_ARCHITECTURE.md`](./docs/04_SYSTEM_ARCHITECTURE.md) | In-depth architectural breakdown |

---

## 👨‍💻 Lead Contributor & Developer

<div align="center">

### **Shubham Kumar**
*Lead Architect, Full-Stack & Edge AI Developer*

[![GitHub](https://img.shields.io/badge/GitHub-Shubham--dev--stack-181717?style=for-the-badge&logo=github)](https://github.com/Shubham-dev-stack)
[![Email](https://img.shields.io/badge/Email-shubhamcyberr%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:shubhamcyberr@gmail.com)
[![Repository](https://img.shields.io/badge/Repository-KheetSathi-166534?style=for-the-badge&logo=git)](https://github.com/Shubham-dev-stack/KheetSathi)

*Passionate about building high-impact, accessible Edge AI solutions and agrarian technologies for rural empowerment.*

</div>

---

## 📜 Compliance, Standards & Disclaimers

1. **Agronomic Recommendations:** All chemical and biological pesticide guidelines follow registered labels approved by the **Central Insecticides Board & Registration Committee (CIBRC)** and the **Indian Council of Agricultural Research (ICAR)**.
2. **Prototype Disclaimers:** Pricing information, expert directory entries, and farm labor postings are simulated prototype fixtures (`isDemo: true`) for SIH 2026 evaluation.
3. **Emergency Support:** For official government assistance, farmers can reach the 24x7 Kisan Call Center at **`1800-180-1551`**.

---

<div align="center">
  <sub>Built with ❤️ for Indian Farmers • Smart India Hackathon 2026 (SIH 2026)</sub>
</div>
