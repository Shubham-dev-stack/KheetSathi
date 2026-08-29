# Final Pre-Prototype Review & Architectural Audit

**Project:** KheetSathi (खेती साथी) — AI-Assisted Crop Disease Detection Platform  
**Target Milestone:** Smart IGNOU Hackathon 2026 / SIH 2026 PS #2  
**Review Status:** Completed & Approved for Prototype Development (Post Technical Consistency Review)  
**Document Code:** AUDIT-2026-FINAL  

---

## 1. Executive Assessment Against SIH Criteria

```
+----------------------------------------------------------------------------------------------------+
|                                    COMPREHENSIVE AUDIT MATRIX                                      |
+------------------------------------+-----------+---------------------------------------------------+
| Audit Dimension                    | Status    | Evaluator Notes                                   |
+------------------------------------+-----------+---------------------------------------------------+
| 1. Direct Alignment with PS #2     | **PASS**  | Fully centered on smartphone crop disease vision. |
| 2. Technical Feasibility           | **PASS**  | MobileNetV3 / FastAPI / PWA is mature and viable. |
| 3. Academic & AI Honesty           | **PASS**  | All mock outputs and simulated metrics disclosed. |
| 4. Architecture Consistency        | **PASS**  | PWA, FastAPI, DB, and ML pipelines are decoupled. |
| 5. Database & API Alignment        | **PASS**  | Entity models map 1:1 with REST endpoint schemas. |
| 6. UI/UX Consistency with Personas | **PASS**  | High contrast, Hindi/English parity, 3-tap flow.  |
| 7. Prototype Scope Viability       | **PASS**  | Self-contained interactive PWA achievable rapidly.|
| 8. Meaningful Differentiation      | **PASS**  | Quality gate + Uncertainty filter + 3-tier remedy.|
| 9. SIH 6-Slide Compatibility       | **PASS**  | Structured cleanly into exact 6-slide template.   |
| 10. Zero Contradictions Across Docs| **PASS**  | Naming, schemas, and taxonomies synchronized.     |
+------------------------------------+-----------+---------------------------------------------------+
```

---

## 2. Key Strengths of the Solution

1. **Grounded In Agronomic Reality:** Unlike generic student hackathon projects that merely output raw pathogen names, KheetSathi delivers a complete **3-Tier Actionable Advisory** (Cultural practices first, biological controls second, and general safe chemical guidance with strict safety warnings and no unsupported dosage claims).
2. **Upfront Image Quality Gate:** Catching motion blur and poor exposure (mean grayscale pixel luminance $<35$ or $>230$) on the client device before transmission prevents misclassifications and saves bandwidth.
3. **Calibrated Confidence Gating:** Explicitly routing low-confidence or non-leaf scans ($<65\%$ confidence score) to a dedicated Fallback State builds deep trust with farmers and hackathon judges alike.
4. **Resilient Low-Bandwidth Architecture:** Offline-first caching of past scans, local disease guides, and an architectural path toward on-device TFLite INT8 inference.
5. **Rigorous Academic Honesty:** Clear labeling of prototype simulated outputs prevents credibility loss during judge cross-examination.

---

## 3. Honest Weaknesses & Technical Constraints

1. **Laboratory-to-Field Domain Gap:** Existing open-source datasets (e.g. PlantVillage) were captured under laboratory lighting with uniform backgrounds. Real-world farm deployment requires fine-tuning on diverse field corpuses (PlantDoc, CropPest) and extensive data augmentations.
2. **Early-Stage Asymptomatic Infections:** Visual computer vision cannot detect internal vascular bacterial infections or root nematodes before visible foliar lesions develop.
3. **Regional Pesticide Discrepancies:** Chemical approvals and local brand availability differ across Indian states. The system restricts recommendations to generic active ingredient classes approved by ICAR and CIBRC.

---

## 4. Unresolved Questions & Human Approval Points

1. **Team Information Finalization:** Team Leader name, registration number, and the 5 student team members (including the mandatory female member) must be populated into Slide 1 before the August 30 deadline.
2. **Kisan Call Center Verification:** The toll-free helpline number (`1800-180-1551`) must be verified against current official Government of India portal listings before final deployment.
3. **Audio Readout Feature Priority:** Confirm if browser Web Speech API (speechSynthesis) should be activated in the visual prototype for voice readout of Hindi remedies.

---

## 5. Working Assumptions

1. Target farmers have access to a basic touchscreen smartphone running Android 8.0+ with modern WebKit/Chromium browser support.
2. Farmers can take a reasonably steady photo of a leaf when assisted by on-screen framing guidelines.
3. Basic Hindi (Devanagari script) and visual color codes (Green/Yellow/Red) are sufficient for non-English literate farmers in North and Central India.

---

## 6. Top 5 Priorities for Frontend Prototype Development

1. **Build the Clean Mobile-First Layout:** Deliver the responsive PWA shell with high-contrast agriculture theme, top navigation bar, and one-tap language toggle (`हिन्दी / English`).
2. **Implement Crop Selection & Camera Ingestion:** Integrate the visual 5-crop selector and HTML5 camera/gallery file uploader with drag-and-drop support.
3. **Implement Client-Side Canvas Image Quality Pre-check:** Code the real-time blur and luminance assessment heuristic to flag degraded photos with instant guidance.
4. **Implement Interactive Diagnostic State Machine:** Build the animated radar scanning state, high-confidence diagnosis card, 3-tier treatment accordion, and fallback uncertainty screen.
5. **Implement LocalStorage Scan History & Helpline Link:** Wire persistent local history saving and dialer link for Kisan Call Center (`1800-180-1551`, to be verified from official source).
