# Document 14: Engineering & Product Roadmap

**Project Name:** KheetSathi (खेती साथी)  
**Document Code:** ROADMAP-2026-V1.1  
**Planning Horizon:** August 2026 – March 2027  
**Status:** Approved Phased Execution Plan (Post Technical Consistency Review)  

---

## 1. Phased Development Horizons

```
+----------------------------------------------------------------------------------------------------+
|                                    KHEETSATHI RELEASE HORIZONS                                     |
+----------------------------------------------------------------------------------------------------+
| [ PHASE 0: FOUNDATION & DOCS (Aug 2026) ]                                                          |
| - Problem formulation & PRD baseline                                                               |
| - System & AI/ML architecture with capability tiering                                              |
| - SIH 6-Slide blueprint & Judge defense strategy                                                   |
+----------------------------------------------------------------------------------------------------+
| [ PHASE 1: FRONTEND PROTOTYPE (Current Milestone - Aug 2026) ]                                     |
| - Interactive mobile-first PWA frontend with Hindi/English i18n                                   |
| - Client-side Image Quality Gate (Blur & Luminance canvas heuristic)                               |
| - Realistic simulated AI detection flow & transparent confidence visualization                   |
| - LocalStorage scan history & 3-tier remedy cards                                                 |
| - Smart IGNOU Hackathon submission baseline                                                        |
+----------------------------------------------------------------------------------------------------+
| [ PHASE 2: BACKEND & API GATEWAY (Sep - Oct 2026) ]                                                |
| - FastAPI backend deployment with Pydantic schemas                                                 |
| - Relational database integration (PostgreSQL / SQLite)                                            |
| - Secure image upload, compression, and EXIF sanitization pipeline                                 |
| - User feedback and diagnostic audit logging                                                       |
+----------------------------------------------------------------------------------------------------+
| [ PHASE 3: REAL ML PIPELINE & QUANTIZATION (Oct - Nov 2026) ]                                      |
| - Data collection & augmentation pipeline (PlantDoc + CropPest)                                    |
| - MobileNetV3 / EfficientNet-Lite fine-tuning with PyTorch                                         |
| - Post-training INT8 quantization ($\le 4\text{ MB}$ model binary target)                          |
| - Confidence threshold calibration & out-of-distribution (OOD) validation                          |
+----------------------------------------------------------------------------------------------------+
| [ PHASE 4: FULL STACK INTEGRATION & OFFLINE PWA (Nov - Dec 2026) ]                                 |
| - End-to-end integration between PWA frontend and live FastAPI/ML service                          |
| - Service Worker caching for complete offline app shell                                            |
| - On-device TensorFlow Lite / ONNX Web runtime integration                                         |
+----------------------------------------------------------------------------------------------------+
| [ PHASE 5: FIELD VALIDATION & KVK PILOT (Jan - Feb 2027) ]                                         |
| - Pilot deployment with 30-50 rural extension volunteers and KVK personnel                         |
| - Accuracy benchmarking on live field crops (Potato, Tomato, Paddy)                                |
| - Vernacular UX refinement based on field feedback                                                 |
+----------------------------------------------------------------------------------------------------+
| [ PHASE 6: SIH GRAND FINALE & SCALABILITY POLISH (Mar 2027) ]                                      |
| - Additional Indian regional languages (Marathi, Telugu, Punjabi, Bengali, Tamil, Kannada)        |
| - Geotagged regional disease surveillance heatmap dashboard for KVK administrators                |
| - Final demo polish and presentation delivery for National SIH Finale                              |
+----------------------------------------------------------------------------------------------------+
```

---

## 2. Milestone Deliverables & Acceptance Checklist

| Milestone | Deliverable | Target Date | Success Criteria |
| :--- | :--- | :--- | :--- |
| **M0** | Documentation & Architecture Suite | Aug 28, 2026 | Technical documentation suite with strict technical consistency review. |
| **M1** | Interactive Frontend Prototype | Aug 29, 2026 | Standalone, responsive PWA demonstrating full scan workflow with mock data. |
| **M2** | SIH 6-Slide Proposal PDF | Aug 30, 2026 | High-impact proposal PDF ready for IGNOU submission gateway. |
| **M3** | Live FastAPI + PyTorch Backend | Oct 15, 2026 | Cloud inference endpoint operational with sub-1.2s response time target. |
| **M4** | Quantized INT8 Edge Inference | Nov 30, 2026 | On-device TFLite model running locally on mobile browser with $<150\text{ms}$ latency target. |
| **M5** | KVK Extension Pilot Report | Feb 15, 2027 | Empirically verified Top-1 accuracy $\ge 85\%$ target on field leaf samples. |
