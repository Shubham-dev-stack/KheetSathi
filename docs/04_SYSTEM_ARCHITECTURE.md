# Document 04: System Architecture Specification

**Project Name:** KheetSathi (खेती साथी)  
**Document Code:** ARCH-2026-V1.1  
**Architecture Paradigm:** Mobile-First Modular PWA / Cloud-Inference Ready / Edge-Transitional  
**Status:** Approved Technical Architecture (Post Technical Consistency Review)  

---

## 1. High-Level Logical Architecture

The KheetSathi platform is organized into clean, decoupled tiers ensuring resilience across intermittent network connectivity and clear separation of concerns between presentation, local validation, inference, and persistence.

```mermaid
graph TD
    subgraph ClientTier ["Client Tier (Mobile PWA / Responsive Web)"]
        UI["UI Layer (Farmer-First Vernacular Views)"]
        IQG["Client Image Quality Gate (Blur & Luminance Heuristic)"]
        Store["Local State & Offline Cache (LocalStorage / IndexedDB)"]
    end

    subgraph APITier ["Backend & API Gateway (FastAPI Python)"]
        Gateway["REST API Router & Sanitizer"]
        ScanService["Scan Orchestration Service"]
        AdvisoryService["Agronomic Knowledge Service"]
    end

    subgraph AIServiceTier ["AI & Diagnostic Inference Tier"]
        Preproc["Image Preprocessing & Normalization"]
        ModelWorker["Vision AI Model (MobileNetV3 Backbone)"]
        FallbackEngine["Low-Confidence & Fallback Filter"]
        ConfidenceScorer["Model Confidence Scorer"]
    end

    subgraph DataStorageTier ["Data & Storage Layer"]
        RDBMS[("Relational DB (PostgreSQL / SQLite)")]
        AgronomicDB[("Agronomic Knowledge Base (JSON / Relational)")]
    end

    UI --> IQG
    IQG --> UI
    UI <--> Store
    Store <==>|"HTTPS / JSON + Multipart"| Gateway

    Gateway --> ScanService
    ScanService --> Preproc
    Preproc --> ModelWorker
    ModelWorker --> FallbackEngine
    FallbackEngine --> ConfidenceScorer
    ConfidenceScorer --> ScanService
    ScanService --> AdvisoryService
    AdvisoryService --> AgronomicDB

    ScanService --> RDBMS
```

---

## 2. Component Architecture Breakdown

```
+---------------------------------------------------------------------------------------+
|                                  COMPONENT TOPOLOGY                                   |
+---------------------------------------------------------------------------------------+
| 1. CLIENT APPLICATION (Mobile-First Web App / PWA)                                   |
|    - App Shell & Navigation Router                                                    |
|    - Localization Engine (i18n Hindi / English)                                       |
|    - Camera & File Ingestion Controller                                               |
|    - HTML5 Canvas Quality Assessment Engine (Laplacian Blur & Pixel Luminance Check)  |
|    - Diagnostic Visualization & Model Confidence Gauge                                |
|    - Local Scan History & Cache Store (LocalStorage / IndexedDB)                      |
+---------------------------------------------------------------------------------------+
| 2. BACKEND API GATEWAY (FastAPI Python - Planned Post-MVP)                            |
|    - Endpoint Routing (/api/v1/scan, /api/v1/crops, /api/v1/diseases)                 |
|    - Multipart Image Parser & Magic-Byte File Type Validator                          |
|    - Request Sanitization & Rate Limiting                                             |
|    - Scan History Persistence                                                         |
+---------------------------------------------------------------------------------------+
| 3. AI / COMPUTER VISION SERVICE (PyTorch / ONNX / TFLite Roadmap)                     |
|    - Tensor Input Formatter (Resizing to 224x224, Normalization)                      |
|    - MobileNetV3 Convolutional Backbone                                              |
|    - Low-Confidence Filter (<65% thresholding & non-leaf rejection)                  |
|    - Post-Processing: Simulated qualitative severity mapping                          |
+---------------------------------------------------------------------------------------+
| 4. AGRONOMIC KNOWLEDGE & ADVISORY REPOSITORY                                          |
|    - Structured Disease Catalog (Pathogen info, regional names, symptoms)            |
|    - 3-Tier Treatment Matrix (Cultural, Bio, Safe General Chemical)                   |
|    - Extension Helpline Registry (Kisan Call Center: 1800-180-1551, to be verified)   |
+---------------------------------------------------------------------------------------+
```

---

## 3. End-to-End Data & Request Flow

```mermaid
sequenceDiagram
    autonumber
    actor Farmer as Farmer / User
    participant App as KheetSathi Client (PWA)
    participant IQG as Client Quality Gate
    participant API as API Gateway (FastAPI)
    participant AI as AI Vision Engine
    participant DB as Database / Knowledge Base

    Farmer->>App: 1. Selects Crop (e.g. Potato) & Snaps Leaf Photo
    App->>IQG: 2. Passes Image Buffer for Pre-check
    alt Image is Blurry or Under-exposed
        IQG-->>App: Quality Alert (Blur > Threshold or Mean Luminance < 35)
        App-->>Farmer: Shows Warning & "Retake Guidance" Prompt
    else Image Quality Acceptable
        IQG-->>App: Quality Pass (Score: 88/100)
        App->>Farmer: Displays Preview & "Analyzing..." Animation
        App->>API: 3. POST /api/v1/scan (Image + CropContext)
        API->>AI: 4. Invoke Model Inference (MobileNetV3)
        AI->>AI: 5. Compute Softmax Distribution
        alt High Model Confidence (>= 65%)
            AI-->>API: Result: {disease: "Potato Late Blight", conf: 0.89, severity: "Moderate"}
            API->>DB: 6. Fetch 3-Tier Advisory & Persist Scan Record
            DB-->>API: Returns Treatment Protocol & Extension Contacts
            API-->>App: 7. HTTP 200 {Diagnosis + Remedies + ScanId}
            App->>App: 8. Cache Scan to LocalStorage
            App-->>Farmer: 9. Renders Vernacular Result & Action Plan
        else Low Confidence / Unsupported Input (< 65%)
            AI-->>API: Result: {disease: "Uncertain", conf: 0.42, isUncertain: true}
            API-->>App: HTTP 200 {Status: "Uncertain", Guidance: "Retake photo or consult KVK"}
            App-->>Farmer: Renders Fallback & Expert Escalation Option
        end
    end
```

---

## 4. AI Inference Pipeline & Uncertainty Handling

```mermaid
flowchart TD
    RawImg["Raw Smartphone Image (JPG/PNG)"] --> PreCheck{"Client Image Quality Gate"}
    
    PreCheck -- "Fails Blur / Exposure Check" --> RetakeUI["Display Retake Guide<br/>(Hold steady, increase light)"]
    PreCheck -- "Passes" --> Resize["Client Downscale<br/>(Max 1024x1024 px)"]
    
    Resize --> APIIn["API Ingestion & Normalization<br/>(Rescale to 224x224, ImageNet mean/std)"]
    
    APIIn --> CNN["Vision Backbone<br/>(MobileNetV3-Small / EfficientNet-Lite)"]
    CNN --> Logits["Class Logits Output Vector"]
    Logits --> Softmax["Softmax Output Distribution"]
    
    Softmax --> TopK["Top-1 & Top-3 Candidates"]
    TopK --> UncertaintyCheck{"Model Confidence >= 0.65?"}
    
    UncertaintyCheck -- "Yes (Confident)" --> SeverityEstimator["Qualitative Severity Tier Mapping<br/>(Simulated in Prototype; Future: Segmentation)"]
    SeverityEstimator --> AdvisoryJoin["Join Agronomic Knowledge Base<br/>(Cultural, Bio, Safe Chemical Guidance)"]
    AdvisoryJoin --> FinalPayload["Deliver Validated Diagnosis Card"]
    
    UncertaintyCheck -- "No (Uncertain / Ambiguous)" --> FallbackLogic["Trigger Uncertainty Fallback<br/>(No false disease claim)"]
    FallbackLogic --> ExpertOption["Offer Retake or 1-Tap KVK Call"]
```

---

## 5. Deployment Architecture Tradeoffs & Recommendation

| Dimension | Option A: Pure Cloud Inference | Option B: Pure On-Device Edge | Option C: Hybrid Edge-Cloud (Recommended) |
| :--- | :--- | :--- | :--- |
| **Description** | All images transmitted to cloud server running PyTorch/FastAPI. | Complete model packaged into mobile client via TFLite / ONNX. | Client handles quality gate & offline caching; Cloud runs model with pathway to download local model. |
| **Inference Latency** | $\approx 1.2\text{ s} - 2.5\text{ s}$ (dependent on cellular network). | $\approx 80\text{ ms} - 200\text{ ms}$ (zero network roundtrip). | Fast local validation ($\approx 50\text{ ms}$); Cloud diagnosis with offline fallback. |
| **Network Requirement** | Continuous internet connection required. | Zero internet required for diagnostic scan. | Works offline for cached history; syncs scans when connected. |
| **Hardware Requirement** | Minimal client processing power required. | Requires mid-tier smartphone CPU/NPU. | Accommodates entry-level Android smartphones. |
| **Hackathon Feasibility** | **High** (rapid deployment on modern web stacks). | Moderate (requires mobile binary compilation). | **Ideal Strategy** (Fast web prototype now $\rightarrow$ TFLite model packaging in roadmap). |
