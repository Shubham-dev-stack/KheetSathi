# Document 03: Detailed Feature Specification

**Project Name:** KheetSathi (खेती साथी)  
**Document Code:** FSPEC-2026-V1.1  
**Target Milestone:** Hackathon Prototype & MVP Baseline  
**Status:** Approved Technical Feature Specification  

---

## 1. Feature Index & Capability Classification Matrix

| Feature Code | Feature Name | Primary Target User | Capability Status | MVP Priority |
| :--- | :--- | :--- | :--- | :--- |
| **FEAT-01** | One-Tap Language Switcher | Marginal Farmer / Rural User | **Live Prototype Feature** | **P0 (Must)** |
| **FEAT-02** | Guided Crop Context Selector | Marginal Farmer / Extension Worker | **Live Prototype Feature** | **P0 (Must)** |
| **FEAT-03** | In-Browser Camera & File Uploader | Marginal Farmer / Field Agent | **Live Prototype Feature** | **P0 (Must)** |
| **FEAT-04** | Client-Side Image Quality Pre-check | All Users | **Live Prototype Feature** | **P0 (Must)** |
| **FEAT-05** | Diagnostic Visualizer & Confidence Meter | All Users | **Simulated Prototype Behavior** | **P0 (Must)** |
| **FEAT-06** | 3-Tier Agronomic Treatment Card | Farmer / Extension Worker | **Simulated Prototype Behavior** | **P0 (Must)** |
| **FEAT-07** | Low-Confidence & Non-Leaf Fallback | Farmer / Extension Worker | **Live Prototype Feature** | **P0 (Must)** |
| **FEAT-08** | Offline Local Scan History & Telemetry | Farmer / Field Agent | **Live Prototype Feature** | **P0 (Must)** |
| **FEAT-09** | KVK Extension Escalation Card | Marginal Farmer | **Live Prototype Link** | **P1 (Should)** |
| **FEAT-10** | Audio Readout / Vernacular TTS | Low-literacy Farmer | **Planned Post-MVP** | **P1 (Should)** |
| **FEAT-11** | Regional Disease Outbreak Surveillance | Extension Officer / KVK Admin | **Future Production Capability** | **P2 (Could)** |

---

## 2. Comprehensive Feature Specifications

---

### FEAT-01: One-Tap Language Switcher
* **Purpose:** Ensures complete interface accessibility in local languages (starting with Hindi and English) without barriers for rural farmers.
* **Capability Tier:** **Live Prototype Feature**.
* **User Workflow:**
  1. User taps the language badge (`HI` / `EN`) in the top navigation bar.
  2. Language drawer/modal opens showing available languages with native scripts (हिन्दी, English).
  3. User selects desired language.
  4. Interface instantly re-renders all navigation, headings, labels, and advisory summaries in the chosen language without page reload.
* **Inputs:** Selected language code (`"hi"` or `"en"`).
* **Outputs:** Reactive update to application i18n state; persistence of preference in `localStorage.kheet_lang`.
* **Dependencies:** Client-side i18n dictionary object.
* **MVP Priority:** **P0 (Must)**.

---

### FEAT-02: Guided Crop Context Selector
* **Purpose:** Enables the farmer to indicate the crop species (Potato, Tomato, Rice, Wheat, Cotton) prior to image analysis, narrowing the diagnostic scope.
* **Capability Tier:** **Live Prototype Feature**.
* **User Workflow:**
  1. User accesses the scan initiation view.
  2. A visual grid of crop cards (with crop photos and vernacular names) is presented.
  3. User selects the active crop (or taps "Auto-Detect / General Crop").
  4. System confirms selection and enables camera capture.
* **Inputs:** Selected `cropId` (`"potato"`, `"tomato"`, `"rice"`, `"wheat"`, `"cotton"`).
* **Outputs:** Crop context object passed to image processing pipeline.
* **MVP Priority:** **P0 (Must)**.

---

### FEAT-03: In-Browser Camera & File Uploader
* **Purpose:** Provides a responsive, zero-install mechanism to capture leaf photos directly via mobile hardware camera or select existing photos from gallery.
* **Capability Tier:** **Live Prototype Feature**.
* **User Workflow:**
  1. User taps "Take Photo" or "Upload from Gallery".
  2. Native device camera or file picker opens with file filter (`image/*`).
  3. User snaps/selects leaf picture and confirms.
  4. App captures file stream, generates an instant client-side thumbnail preview.
* **Inputs:** HTML5 File Blob / Camera stream (`image/jpeg`, `image/png`, `image/webp`).
* **Outputs:** Resampled image DataURL and binary payload.
* **MVP Priority:** **P0 (Must)**.

---

### FEAT-04: Client-Side Image Quality Pre-check
* **Purpose:** Prevents wasted bandwidth and inaccurate AI inferences by evaluating photo quality (blur and pixel exposure/luminance) locally on the device prior to submission.
* **Capability Tier:** **Live Prototype Feature** (Canvas Heuristic).
* **User Workflow:**
  1. Image is loaded into an off-screen HTML5 Canvas.
  2. Heuristic algorithms calculate pixel gradient variance (blur proxy) and mean grayscale luminance $Y = 0.299R + 0.587G + 0.114B$.
  3. If mean luminance is $<35$ (under-exposed) or $>230$ (harsh glare), or blur metric is low, an informative warning badge is displayed.
  4. Farmer can choose to "Retake Photo" or "Proceed Anyway".
* **Inputs:** Image pixel buffer.
* **Outputs:** Quality Assessment Object `{ isBlurry: boolean, isDark: boolean, qualityScore: number (0-100), message: string }`.
* **MVP Priority:** **P0 (Must)**.

---

### FEAT-05: Diagnostic Visualizer & Confidence Meter
* **Purpose:** Presents the detected condition, vernacular description, scientific pathogen name, and model confidence score in a transparent visual format.
* **Capability Tier:** **Simulated Prototype Behavior**.
* **User Workflow:**
  1. Following analysis, the result screen displays a top status card.
  2. Condition name is shown in bold bilingual text (e.g., *"पछेती झुलसा / Late Blight"*).
  3. A color-coded model confidence bar indicates model certainty (Green: $\ge 80\%$, Amber: $65-79\%$, Warning: $< 65\%$).
  4. Simulated severity tag indicates spread level (Mild / Moderate / Severe). *(True quantitative lesion segmentation is planned for Future ML scope)*.
  5. A prominent badge states: *"Prototype Result — Simulated AI Output"*.
* **Inputs:** Inference result payload `{ diseaseId, diseaseName, confidenceScore, severityLevel, isMock: true }`.
* **Outputs:** Rendered diagnostic summary card.
* **MVP Priority:** **P0 (Must)**.

---

### FEAT-06: 3-Tier Agronomic Treatment Card
* **Purpose:** Provides structured, safety-conscious actionable guidance categorized into cultural management, organic/biological treatment, and general safe chemical guidelines without unsupported dosage prescriptions.
* **Capability Tier:** **Simulated Prototype Behavior** (Curated Fixture).
* **User Workflow:**
  1. Under the diagnostic result, user reviews the 3 treatment tiers.
  2. **Tier 1: Cultural Practices** (e.g., prune infected foliage, clear drainage, avoid overhead watering).
  3. **Tier 2: Biological / Organic Controls** (e.g., Neem-based sprays, bio-fungicides as per package of practices).
  4. **Tier 3: General Chemical Guidance** (Generic fungicide classes with mandatory PPE warnings and advisory to verify regional formulations with local extension officers).
* **Inputs:** `diseaseId` mapped to curated agronomic knowledge fixture.
* **Outputs:** Formatted 3-tier remedy view with safety warnings.
* **MVP Priority:** **P0 (Must)**.

---

### FEAT-07: Low-Confidence & Non-Leaf Fallback Handler
* **Purpose:** Enforces AI safety by refusing to generate false certainty when an image is blurry, ambiguous, non-plant, or unsupported.
* **Capability Tier:** **Live Prototype Feature** (Fallback View).
* **User Workflow:**
  1. When model confidence score is $< 65\%$ or non-plant features are detected, the system routes to the Fallback View.
  2. App displays an alert: *"Diagnosis Uncertain — AI could not verify this disease with sufficient confidence."*
  3. Provides clear action buttons: [Take Another Photo] and [Call Kisan Call Center].
* **Inputs:** Inference response with `confidence < 0.65` or `diseaseId: "unknown"`.
* **Outputs:** Safety-first fallback screen.
* **MVP Priority:** **P0 (Must)**.

---

### FEAT-08: Offline Local Scan History & Telemetry
* **Purpose:** Allows farmers to review previous diagnoses, track crop health over time, and access remedies even without an internet connection.
* **Capability Tier:** **Live Prototype Feature** (Local Persistence).
* **User Workflow:**
  1. Every scan automatically saves a record into local browser storage.
  2. User taps "History" in navigation.
  3. Displays chronological list of past scans with thumbnail, crop name, date, and diagnosis tag.
  4. Tapping any item reopens the complete diagnostic and treatment card offline.
* **Inputs:** Scan record object `{ id, timestamp, crop, disease, confidence, thumbnailDataUrl }`.
* **Outputs:** Persisted entries in `localStorage.kheet_scans`; rendered history list.
* **MVP Priority:** **P0 (Must)**.
