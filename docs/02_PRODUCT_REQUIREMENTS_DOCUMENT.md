# Document 02: Product Requirements Document (PRD)

**Project Name:** KheetSathi (खेती साथी)  
**Document Code:** PRD-2026-V1.1  
**Target Release:** Smart IGNOU Hackathon 2026 / SIH 2026 MVP  
**Status:** Approved for Prototype Implementation (Post Technical Consistency Review)  

---

## 1. Product Scope & Functional Classification

The KheetSathi platform addresses crop leaf disease detection, symptom interpretation, and advisory delivery through four distinct capability tiers:

```
+---------------------------------------------------------------------------------------+
|                                CAPABILITY CLASSIFICATION                              |
+------------------------------------+--------------------------------------------------+
| Capability Tier                    | Scope Items Included                             |
+------------------------------------+--------------------------------------------------+
| **1. LIVE PROTOTYPE FEATURE**      | - Guided camera & gallery upload interface       |
|                                    | - Client-side Image Quality Gate (Blur/Luminance)|
|                                    | - Multi-crop selector (Potato, Tomato, Rice, etc)|
|                                    | - Low-confidence / Non-leaf fallback UI          |
|                                    | - Offline-first local scan history persistence   |
|                                    | - Instant Hindi & English language switcher      |
+------------------------------------+--------------------------------------------------+
| **2. SIMULATED PROTOTYPE BEHAVIOR**| - AI disease identification diagnostic output    |
|                                    | - Heuristic model confidence score display       |
|                                    | - Qualitative simulated severity tier (Mild/Mod) |
|                                    | - Curated mock 3-tier agronomic remedy cards     |
+------------------------------------+--------------------------------------------------+
| **3. PLANNED POST-MVP**            | - Real FastAPI cloud backend integration         |
|                                    | - MobileNetV3 model trained on hybrid datasets   |
|                                    | - Direct 1-tap KVK expert escalation ticketing   |
|                                    | - Vernacular Text-to-Speech (TTS) voice narration|
+------------------------------------+--------------------------------------------------+
| **4. FUTURE PRODUCTION CAPABILITY**| - On-device quantized TFLite edge inference      |
|                                    | - Quantitative lesion area semantic segmentation |
|                                    | - Regional disease outbreak heatmap dashboard    |
+------------------------------------+--------------------------------------------------+
```

### 1.1 Detailed Functional Requirements Matrix

| Req ID | Module | Feature Description | Priority | Prototype Implementation Status |
| :--- | :--- | :--- | :--- | :--- |
| **FR-01** | Onboarding | Language selection modal (Hindi / English default). | P0 (Must) | **Live Prototype Feature** |
| **FR-02** | Home Dashboard | Quick-action "New Scan" button, recent scan summaries, seasonal tip card. | P0 (Must) | **Live Prototype Feature** |
| **FR-03** | Crop Selection | Farmer specifies crop context (Potato, Tomato, Rice, Wheat, Cotton). | P0 (Must) | **Live Prototype Feature** |
| **FR-04** | Image Ingestion | Camera capture trigger or gallery upload with file format validation (.jpg, .png, .webp). | P0 (Must) | **Live Prototype Feature** |
| **FR-05** | Image Quality Check | Pre-inference validation for motion blur and low mean pixel luminance (<35 on 0-255 scale). | P0 (Must) | **Live Prototype Feature** (Canvas Heuristic) |
| **FR-06** | Diagnostic Result | Displays detected condition name, scientific name, and model confidence score. | P0 (Must) | **Simulated Prototype Behavior** |
| **FR-07** | Severity Metric | Qualitative simulated rating of disease spread (Mild / Moderate / Severe). *(True lesion area segmentation is Future ML Scope)*. | P1 (Should) | **Simulated Prototype Behavior** |
| **FR-08** | Agronomic Advisory | Structured 3-tier guidance: Cultural, Bio/Organic, General safe chemical practices + Safety warning. | P0 (Must) | **Simulated Prototype Behavior** (Curated Fixture) |
| **FR-09** | Uncertainty Handler | Fallback UI triggered when confidence <65% or unsupported/non-leaf image detected. | P0 (Must) | **Live Prototype Feature** (Fallback View) |
| **FR-10** | Scan History | Persists scan date, crop, thumbnail, and diagnosis in browser LocalStorage. | P0 (Must) | **Live Prototype Feature** (Offline Storage) |
| **FR-11** | Farmer Safety Notice | Prominent regulatory disclaimer preventing misuse of high-toxicity chemical inputs. | P0 (Must) | **Live Prototype Feature** |
| **FR-12** | Voice Assistance | Text-to-Speech (TTS) icon to read diagnostic result and remedy aloud. | P2 (Nice to have) | **Planned Post-MVP** |

---

## 2. Non-Functional Requirements (NFRs)

* **Usability:** Visual iconography; maximum 3 taps to complete a scan journey; optimized for $360\text{px}$ viewports.
* **Performance (Proposed Targets):** Client cold launch $\le 2.0\text{s}$; Client canvas quality pre-check $\le 150\text{ms}$; Simulated inference transition $\le 1.5\text{s}$.
* **Reliability:** Graceful handling of network dropouts; zero client crash on oversized uploads ($\le 10\text{MB}$ file gate).
* **Localization:** 100% UI strings decoupled in i18n dictionary.

---

## 3. User Stories & Acceptance Criteria

### User Story 1: Rapid In-Field Disease Diagnosis
> **As a** marginal farmer noticing dark lesions on potato leaves,  
> **I want to** photograph the affected leaf and view a simple diagnostic summary,  
> **So that I can** take corrective cultural or biological steps before the whole field is lost.

* **Acceptance Criteria 1.1:** Tapping "Scan Leaf" launches camera/gallery file picker instantly without login.
* **Acceptance Criteria 1.2:** System displays an animated scanning indicator during processing.
* **Acceptance Criteria 1.3:** Diagnostic result card shows disease name in vernacular script (e.g., *"पछेती झुलसा / Late Blight"*), a model confidence bar, and simulated severity tier.
* **Acceptance Criteria 1.4:** Results provide immediate practical non-hazardous steps (e.g., *"Prune infected leaves, clear drainage"*).

---

### User Story 2: Handling Blurry or Inadequate Field Photographs
> **As a** farmer taking photos under harsh outdoor sunlight,  
> **I want** the app to warn me if my photo is blurry or dark before processing,  
> **So that I do not** get an incorrect diagnosis based on a bad image.

* **Acceptance Criteria 2.1:** If the uploaded image fails pixel luminance or sharpness thresholds, an amber warning banner appears.
* **Acceptance Criteria 2.2:** App provides concrete advice: *"Image is blurry or dark. Hold phone steady in good light."*
* **Acceptance Criteria 2.3:** User can tap "Retake Photo" without resetting the application state.

---

## 4. Edge Cases & Handling Strategy

| Scenario Code | Edge Case Description | System Reaction | User Recovery Path |
| :--- | :--- | :--- | :--- |
| **EC-01** | Non-Leaf / Irrelevant Photo (e.g., tractor, shoe, person). | Quality gate / Fallback detects unsupported input. | Displays friendly alert: *"No plant leaf detected. Please take a close-up photo of the affected crop leaf."* |
| **EC-02** | Total Network Loss during Cloud Scan. | Client detects offline status; accesses local cache. | Shows offline notice: *"Operating offline. Scan saved to local history."* |
| **EC-03** | Low Model Confidence (<65%). | Result suppressed; routes to Uncertainty Fallback. | Displays alert: *"Diagnosis uncertain. Try another photo or contact local KVK."* |
| **EC-04** | Over-sized Raw Photo (>10 MB). | Client-side HTML5 Canvas downscales image before processing. | Resampled smoothly to $1024\text{px}$ maximum dimension. |
| **EC-05** | Healthy Leaf Scanned. | System displays "Healthy / No Disease Detected". | Green affirmative badge displayed with general crop maintenance tips. |
