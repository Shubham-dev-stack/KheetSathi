# Document 16: Final Hackathon Technical & Scope Review

**Project Name:** KheetSathi (खेती साथी) — AI-Assisted Crop Disease Detection Platform  
**Target Event:** Smart IGNOU Hackathon 2026 (Internal Gateway for SIH 2026)  
**Problem Statement:** PS #2 — *"AI-Based Crop Disease Detection: Develop mobile applications that identify crop diseases using smartphone images."*  
**Review Type:** Strict Technical Consistency, Scope Gating & Academic Integrity Audit  
**Document Code:** AUDIT-TECH-2026-V1.1  
**Status:** Audit Completed — APPROVED  

---

## 1. Executive Summary of Audit

A strict technical consistency and hackathon-scope review was performed across all 15 technical documents, data fixtures, system architecture designs, and presentation blueprints of the **KheetSathi** project. 

The purpose of this audit was to ensure that every technical claim, heuristic calculation, agronomic advisory, and AI inference representation is **technically sound, defensible under hostile hackathon judge questioning, free of internal contradictions, and strictly honest regarding prototype vs. production capabilities**.

---

## 2. Technical Issues Identified & Rectified

```
+----------------------------------------------------------------------------------------------------+
|                                SUMMARY OF ISSUES AUDITED & RESOLVED                                |
+----+-----------------------------+-----------------------------------+-----------------------------+
| #  | Identified Issue Area       | Previous Description              | Technical Correction Applied|
+----+-----------------------------+-----------------------------------+-----------------------------+
| 1  | **Physical Lux Claims**     | Claimed canvas measured lux (<30) | Replaced with mean grayscale|
|    |                             | from browser RGB pixels.          | luminance ($Y \in [0, 255]$)|
+----+-----------------------------+-----------------------------------+-----------------------------+
| 2  | **Severity Area Calculation**| Implied live quantitative lesion  | Reframed as simulated       |
|    |                             | area percentage was computed.     | qualitative rating (Mild/   |
|    |                             |                                   | Mod); segmentation to future|
+----+-----------------------------+-----------------------------------+-----------------------------+
| 3  | **Statistical Probability** | Equated raw Softmax output with   | Termed "model confidence    |
|    |                             | calibrated empirical probability. | score"; formal calibration  |
|    |                             |                                   | mapped to Phase 3 ML target.|
+----+-----------------------------+-----------------------------------+-----------------------------+
| 4  | **OOD Framing**             | Claimed mathematical OOD entropy  | Framed as low-confidence and|
|    |                             | filter was live in prototype.     | non-leaf fallback workflow. |
+----+-----------------------------+-----------------------------------+-----------------------------+
| 5  | **Chemical Prescriptions**  | Included exact dosages (e.g. 5g/L)| Removed unsupported dosage  |
|    |                             | that posed liability risks.       | numbers; restricted to safe |
|    |                             |                                   | generic classes + KVK note. |
+----+-----------------------------+-----------------------------------+-----------------------------+
| 6  | **Helpline Verification**   | Stated Kisan Call Center number   | Explicitly tagged: "(To be  |
|    |                             | without verification caveat.      | verified from official gov  |
|    |                             |                                   | source prior to production)"|
+----+-----------------------------+-----------------------------------+-----------------------------+
| 7  | **Capability Tiering**      | Mixed live code with roadmap items| Strictly separated into 4   |
|    |                             | in single feature lists.          | distinct capability tiers.  |
+----+-----------------------------+-----------------------------------+-----------------------------+
```

---

## 3. Four-Tier Capability Demarcation Matrix

To maintain 100% technical honesty before the SIH evaluation committee, all system capabilities are partitioned into four unambiguous tiers:

```
+---------------------------------------------------------------------------------------+
|                               FOUR-TIER CAPABILITY MATRIX                             |
+------------------------------------+--------------------------------------------------+
| Capability Tier                    | Verified In-Scope Items                          |
+------------------------------------+--------------------------------------------------+
| **TIER 1: LIVE PROTOTYPE FEATURE** | - High-contrast, mobile-first PWA layout         |
| *(Fully executable in web client)* | - Instant Hindi (हिन्दी) & English i18n engine   |
|                                    | - Camera & file upload ingestion pipeline        |
|                                    | - HTML5 Canvas image quality pre-check           |
|                                    |   (Laplacian blur & luminance $Y \in [35, 230]$) |
|                                    | - Offline LocalStorage scan history persistence  |
|                                    | - Low-confidence / Non-leaf safety fallback view |
|                                    | - Direct link to Kisan Call Center (to verify)   |
+------------------------------------+--------------------------------------------------+
| **TIER 2: SIMULATED PROTOTYPE**    | - AI disease identification diagnostic output    |
| **BEHAVIOR** *(Demonstration)*     | - Model confidence score display (0-100%)        |
|                                    | - Qualitative severity rating (Mild / Moderate)  |
|                                    | - Curated 3-tier agronomic treatment cards       |
|                                    |   (Cultural, Bio, Safe General Chemical)        |
+------------------------------------+--------------------------------------------------+
| **TIER 3: PLANNED POST-MVP**       | - Dedicated FastAPI Python cloud backend service |
| *(Phases 2-3 Milestone)*           | - MobileNetV3 CNN fine-tuned on hybrid datasets  |
|                                    | - Server-side EXIF stripping & sanitization      |
|                                    | - Vernacular Text-to-Speech (TTS) voiceover      |
|                                    | - Human extension officer ticketing loop         |
+------------------------------------+--------------------------------------------------+
| **TIER 4: FUTURE PRODUCTION**      | - On-device quantized TFLite INT8 edge inference |
| **CAPABILITY** *(Phases 4-6)*      | - Quantitative lesion area semantic segmentation |
|                                    | - Temperature calibration & formal OOD gating    |
|                                    | - Regional geotagged disease outbreak heatmap    |
+------------------------------------+--------------------------------------------------+
```

---

## 4. Claims Requiring External Verification Prior to Production

1. **National Kisan Call Center Number:** The toll-free dialer target (`1800-180-1551`) must be re-verified with the Ministry of Agriculture & Farmers Welfare portal prior to deploying production builds.
2. **State-Level Agrochemical Approval Lists:** While the generic chemical groups listed (e.g., Mancozeb, Chlorothalonil) are standard ICAR recommendations, commercial brand regulations and bans vary across Indian states. All chemical advisories must be formally vetted by a certified Krishi Vigyan Kendra (KVK) agronomist.
3. **Student Team Roster:** Student names, enrollment numbers, and the mandatory female team member details must be inserted into Slide 1 of the PPT before submission on August 30, 2026.

---

## 5. Prototype-Safe vs. Production-Only Claims Summary

### A. Prototype-Safe Claims (Defensible for SIH Judges)
* *"Our prototype demonstrates an end-to-end farmer diagnostic journey in Hindi and English with zero install friction."*
* *"Our client-side image quality gate checks pixel blur and luminance locally, preventing bad photos from wasting bandwidth."*
* *"Our interface is uncertainty-aware: when confidence is low or an image is unsupported, it refuses to guess and guides the farmer to retake the photo or seek extension help."*
* *"Our recommendations prioritize zero-cost cultural sanitation and biological controls, with general chemical safety warnings."*
* *"All scan records are cached locally on the device for offline review."*

### B. Production-Only Claims (Mapped to Roadmap, Not Claimed as Finished)
* ❌ *Do not claim:* "Our model has an 88% field accuracy on 50,000 live Indian crops." $\rightarrow$ ✔️ *Claim:* "Our Phase 3 training pipeline targets $\ge 85\%$ Top-1 accuracy on hybrid in-field datasets."
* ❌ *Do not claim:* "The app calculates exact percentage of leaf lesion damage." $\rightarrow$ ✔️ *Claim:* "The prototype displays qualitative severity tiers, with quantitative lesion segmentation planned for future ML milestones."
* ❌ *Do not claim:* "The app executes full offline edge AI on the phone today." $\rightarrow$ ✔️ *Claim:* "The prototype operates offline for cached history, with an architectural roadmap to package quantized INT8 TFLite models for zero-connectivity edge inference."

---

## 6. Final Recommendation

```
+---------------------------------------------------------------------------------------+
|                              FINAL ARCHITECTURAL VERDICT                              |
+---------------------------------------------------------------------------------------+
|                                                                                       |
|     VERDICT: >>> READY FOR FRONTEND PROTOTYPE PLANNING & IMPLEMENTATION <<<           |
|                                                                                       |
|  - All 15 documents are technically consistent and free of contradictions.           |
|  - Capabilities are rigorously tiered into Live, Simulated, Post-MVP, and Future.     |
|  - All unsupported dosage and physical lux claims have been removed.                 |
|  - The product is perfectly aligned with Smart IGNOU Hackathon 2026 PS #2.            |
|                                                                                       |
+---------------------------------------------------------------------------------------+
```
