# Document 09: Frontend Prototype & Demonstration Plan

**Project Name:** KheetSathi (खेती साथी)  
**Document Code:** PROTO-2026-V1.1  
**Target Milestone:** Smart IGNOU Hackathon 2026 Interactive Visual Prototype  
**Status:** Approved Prototype Execution Plan (Post Technical Consistency Review)  

---

## 1. Prototype Objectives & Scope Definition

The primary objective of the hackathon prototype is to provide a **visually polished, fully interactive, and realistic demonstration** of the farmer diagnostic journey that judges can test directly on desktop or mobile browsers.

```
+---------------------------------------------------------------------------------------+
|                               PROTOTYPE REALITY MATRIX                                |
+------------------------------------+--------------------------------------------------+
| Component / Capability             | Prototype Implementation Status                  |
+------------------------------------+--------------------------------------------------+
| Mobile-First Responsive PWA UI     | **LIVE PROTOTYPE FEATURE** (Interactive Web App) |
| Bilingual i18n Engine (HI / EN)    | **LIVE PROTOTYPE FEATURE** (Instant toggle)      |
| Camera & File Upload Ingestion     | **LIVE PROTOTYPE FEATURE** (HTML5 Media/File)    |
| Image Quality Pre-check (Canvas)   | **LIVE PROTOTYPE FEATURE** (Luminance/Blur check)|
| Local Scan History & Persistence   | **LIVE PROTOTYPE FEATURE** (LocalStorage Engine) |
| Low-Confidence Fallback View       | **LIVE PROTOTYPE FEATURE** (Safety workflow)     |
| Sample Crop & Disease Knowledge    | **SIMULATED PROTOTYPE BEHAVIOR** (Mock Fixture)  |
| Vision AI Diagnostic Output        | **SIMULATED PROTOTYPE BEHAVIOR** (Mock Score)    |
| Qualitative Severity Rating        | **SIMULATED PROTOTYPE BEHAVIOR** (Qualitative)   |
| KVK Toll-Free Dialer Link          | **LIVE PROTOTYPE LINK** (To be verified source)  |
| FastAPI Backend Integration        | **PLANNED POST-MVP**                             |
| Quantitative Lesion Segmentation   | **FUTURE PRODUCTION CAPABILITY**                 |
| On-Device TFLite INT8 Execution    | **FUTURE PRODUCTION CAPABILITY**                 |
+------------------------------------+--------------------------------------------------+
```

---

## 2. Mock Data Strategy & Fixture Design

To make the prototype completely self-contained and dependable during offline judge reviews, all mock data fixtures are stored under `/data/mock/`:
1. `crops.json`: Metadata for 5 core crops (Potato, Tomato, Rice, Wheat, Cotton) with localized names.
2. `diseases.json`: Comprehensive disease profiles including pathogens, vernacular names, and symptom summaries.
3. `recommendations.json`: 3-Tier agronomic treatment protocols (Cultural, Bio, Safe General Chemical) in Hindi and English with safety disclaimers.
4. `scans.json`: Initial pre-populated history cards showing realistic past diagnoses.
5. `user.json`: Default farmer profile settings.

---

## 3. Step-by-Step Demonstration Script (Judge Walkthrough)

```
[ Step 1: Open App ]
  └──> Lands on Home Dashboard in Hindi (or English).
  └──> Judges see clean, high-contrast farmer-friendly layout and "Today's Tip".

[ Step 2: Switch Language ]
  └──> Judge taps "English" on the top header; entire UI translates instantly.

[ Step 3: Start Scan & Choose Crop ]
  └──> Judge taps "Scan Crop Leaf".
  └──> Selects "Potato (आलू)" from the visual crop grid.

[ Step 4: Ingest Sample Leaf Photo ]
  └──> Judge uploads a sample Potato Late Blight leaf photo (or snaps a picture).
  └──> Client-side Image Quality Gate analyzes the photo in ~100ms and displays "Quality Pass (Score 92/100)".

[ Step 5: Run Simulated AI Diagnostic ]
  └──> Judge taps "Analyze Leaf".
  └──> An animated scanning radar sweep displays over the leaf for 1.2s.

[ Step 6: Review Transparent Results ]
  └──> Diagnostic Result Card displays: "Late Blight / पछेती झुलसा" (Confidence Score: 89%, Severity: Moderate).
  └──> Prominent badge clearly states: "Prototype Result — Simulated AI Output".

[ Step 7: Explore 3-Tier Treatment Plan ]
  └──> Judge expands Cultural, Bio/Organic, and General Chemical recommendations.
  └──> Reads the prominent KVK Safety Warning disclaimer.

[ Step 8: Test Uncertainty / Fallback Flow ]
  └──> Judge uploads an ambiguous / blurry photo or non-leaf image.
  └──> System triggers the Fallback Screen: "AI Uncertain — Please retake photo or consult KVK."

[ Step 9: Verify Offline History ]
  └──> Judge navigates to "Scan History"; the new scan is automatically saved and viewable offline.
```
