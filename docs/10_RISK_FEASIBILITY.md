# Document 10: Risk Assessment & Feasibility Analysis

**Project Name:** KheetSathi (खेती साथी)  
**Document Code:** RISK-2026-V1.1  
**Target Submission:** Smart IGNOU Hackathon 2026 / SIH 2026  
**Status:** Approved Feasibility & Risk Baseline (Post Technical Consistency Review)  

---

## 1. Multi-Dimensional Feasibility Analysis

```
+----------------------------------------------------------------------------------------------------+
|                                    FEASIBILITY SCORECARD                                           |
+---------------------+-------------------+----------------------------------------------------------+
| Dimension           | Feasibility Level | Strategic Justification                                  |
+---------------------+-------------------+----------------------------------------------------------+
| **Technical**       | **High**          | MobileNetV3 / FastAPI / PWA stack is mature and viable;  |
|                     |                   | client-side canvas heuristics require zero heavy plugins.|
| **Operational**     | **High**          | Zero hardware sensor deployment required; leverages      |
|                     |                   | farmer's existing smartphone camera.                     |
| **Economic**        | **Very High**     | Minimal cloud compute overhead per scan; client-side pre-|
|                     |                   | processing reduces backend bandwidth by >70% (target).   |
| **Data Availability**| **Moderate-High**| Public benchmark datasets (PlantVillage, PlantDoc) enable|
|                     |                   | rapid base pre-training.                                 |
| **User Adoption**   | **High**          | Frictionless zero-login guest mode; complete vernacular  |
|                     |                   | parity in Hindi and English.                             |
| **Connectivity**    | **High**          | Client-side offline caching ensures scan history and     |
|                     |                   | remedies remain accessible without internet.             |
| **Scalability**     | **Very High**     | Stateless API design; serverless container autoscaling   |
|                     |                   | during seasonal agricultural surges.                     |
+---------------------+-------------------+----------------------------------------------------------+
```

---

## 2. Comprehensive Risk Matrix

| Risk ID | Risk Description | Prob. | Impact | Mitigation Strategy | Fallback Plan |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **RSK-01** | **Field Photography Degradation:** Real-world field photos suffer from harsh sun glare, shadows, motion blur, and dirty lenses. | High | High | Integrate client-side **Image Quality Gate** that evaluates pixel sharpness and luminance before model inference. | Alert user with clear on-screen visual guide on how to frame and stabilize the leaf. |
| **RSK-02** | **Over-Reliance on AI Diagnosis:** Farmer blind trusts an incorrect AI classification and purchases wrong chemical input. | Med | High | Display prominent **Uncertainty Fallbacks**, explicit disclaimer badges, and non-hazardous cultural/organic remedies first. | Force low-confidence cases to display: *"AI Uncertain — Consult local KVK before spraying."* |
| **RSK-03** | **Lab-to-Field Generalization Gap:** Model trained purely on clean lab photos fails on complex in-field backgrounds with weeds. | High | High | Employ aggressive data augmentation (Cutout, Color Jitter, Motion Blur) and fine-tune on in-field datasets (PlantDoc). | Restrict model output to top-3 differential candidate classes with confidence scores. |
| **RSK-04** | **Poor Rural Connectivity:** High-resolution image uploads fail or timeout on weak cellular networks. | High | Med | Perform client-side canvas compression down to $< 400\text{ KB}$ (proposed target); implement local caching. | Persist offline scan record and allow manual deferred sync when connection is restored. |
| **RSK-05** | **Novel or Unsupported Pathogen:** Farmer scans a disease or crop not present in the model's training catalog. | Med | Med | Apply low-confidence thresholding ($<65\%$) and non-plant class heuristic fallback. | Reject classification with *"Condition not recognized — Connect with an agricultural specialist."* |
| **RSK-06** | **Low Digital Literacy:** Farmer cannot navigate multi-step text-heavy forms. | High | High | Minimalistic 3-tap workflow, large touch targets, color-coded status badges, and audio-ready layout. | One-tap link to Kisan Call Center (1800-180-1551, *to be verified from current official government source*). |

---

## 3. Technical Limitations (Honesty Disclosure)

1. **Visual-Only Pathogen Indicators:** Some root-borne or vascular wilt infections exhibit foliar wilting symptoms in early stages. Vision AI can flag foliar wilting but cannot substitute for soil/root laboratory testing.
2. **Early Asymptomatic Incubation:** Deep learning models can only identify diseases once visual lesions, chlorosis, or necrotic spots manifest on leaf surfaces.
3. **Pesticide Regulation Compliance:** Agronomic chemical approvals vary by state and central CIBRC regulations. KheetSathi recommends general active ingredient classes rather than commercial brand names.
