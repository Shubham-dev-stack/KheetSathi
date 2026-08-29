# Document 12: SIH 6-Slide Idea PPT Blueprint

**Project Name:** KheetSathi (खेती साथी)  
**Target Event:** Smart IGNOU Hackathon 2026 (Internal Selection for SIH-2026)  
**Submission Format:** 6-Slide Presentation (Exported as PDF)  
**Document Status:** Ready for Slide Deck Synthesis (Post Technical Consistency Review)  

---

## Slide 1: Title Page

* **Slide Title:** KheetSathi — AI-Assisted Crop Health & Disease Diagnostic Companion
* **Problem Statement ID:** PS #2 (Smart IGNOU Hackathon 2026 / SIH 2026)
* **Problem Statement Title:** "AI-Based Crop Disease Detection: Develop mobile applications that identify crop diseases using smartphone images."
* **Theme:** Agriculture, Food Security & Rural Development
* **PS Category:** Software / Mobile Application
* **Team Information Block:**
  * **Team Name:** [Team Name to be filled by Student Team]
  * **Team Leader:** [Student Name, Program/Enrollment Details]
  * **Team Members (5 + 1 Mandatory Female Member):** [List of 5 Members with Programs & Contact Details]
  * **Institution:** Indira Gandhi National Open University (IGNOU)
* **Visual Elements:** High-resolution KheetSathi logo, IGNOU emblem, SIH 2026 branding badge.

---

## Slide 2: Proposed Solution & Innovation

* **Core Solution Description:**
  * **KheetSathi** is a mobile-first, vernacular crop health companion that empowers smallholder farmers to photograph diseased leaves, verify photo quality upfront, view transparent diagnostic summaries with model confidence ratings, and follow practical 3-tier remediation plans.
* **Key Solution Highlights:**
  1. **Guided In-Field Image Capture:** Zero-friction mobile PWA interface working on any budget smartphone.
  2. **Upfront Image Quality Gate:** Client-side blur and pixel luminance pre-check preventing inaccurate classifications before network transmission.
  3. **Honest, Confidence-Aware AI:** MobileNetV3 CNN returning transparent model confidence scores and explicit fallback flags.
  4. **3-Tier Agronomic Advisory:** Actionable guidance divided into Cultural, Bio/Organic, and General Safe Chemical steps.
* **Key Innovation Points:**
  * **Uncertainty-Aware Diagnostics:** Never guesses when confidence is $<65\%$.
  * **Zero-Bandwidth Resilience:** Local scan history caching & offline access.
  * **Farmer-First UX:** High-contrast vernacular design in Hindi & English with 1-tap Kisan Call Center link *(to be verified from official source)*.
* **Visual Elements:** 2 high-quality UI prototype mockups (Home Dashboard + Diagnostic Result Screen with Confidence Meter).

---

## Slide 3: Technical Approach & Architecture

* **System Architecture Flow:**
  $$\text{Mobile Client (PWA)} \xrightarrow{\text{Quality Gate}} \text{FastAPI Gateway} \xrightarrow{\text{MobileNetV3}} \text{Confidence Scorer} \xrightarrow{\text{Advisory DB}} \text{Vernacular Result}$$
* **Core Technology Stack:**
  * **Frontend / PWA:** Modern HTML5 / Tailwind CSS / Vanilla ES6 (Zero heavy bundle overhead, instant load).
  * **Backend & API (Planned Post-MVP):** FastAPI (Python 3.11) with Pydantic validation.
  * **AI / CV Pipeline (Roadmap):** MobileNetV3-Small / EfficientNet-Lite CNN with PyTorch / ONNX Runtime (INT8 target).
  * **Storage & Persistence:** Client LocalStorage for offline prototype; PostgreSQL for cloud backend.
* **Inference Pipeline & Quality Gate:**
  * Client canvas calculates Laplacian variance and mean pixel luminance ($Y \in [35, 230]$).
  * Model applies confidence thresholding; low-confidence inputs route to safety fallback.
* **Visual Elements:** Clean System Architecture flowchart + Animated Scanning UI mockup.

---

## Slide 4: Feasibility, Viability & Risk Mitigation

* **Multi-Dimensional Feasibility:**
  * **Technical:** Lightweight CNN architectures achieve $<80\text{ms}$ proposed latency on mobile hardware.
  * **Economic:** Client-side pre-processing reduces cloud bandwidth costs by $>70\%$ (target).
  * **Operational:** Requires zero specialized farm sensors; utilizes existing low-cost Android smartphones.
* **Key Challenges & Mitigation Strategy:**

| Identified Risk / Challenge | Practical Mitigation in KheetSathi | Fallback Strategy |
| :--- | :--- | :--- |
| **Blurry / Dark Field Photos** | Client-side Image Quality Gate verifies sharpness & luminance. | Instant on-screen framing and stabilization tips. |
| **Hallucinated Overconfidence** | Low-confidence thresholding suppresses uncertain outputs ($<65\%$). | Fallback card advising retake or expert review. |
| **Intermittent Rural Connectivity** | Aggressive offline caching of history & remedies via LocalStorage. | Scans saved locally for instant offline review. |
| **Toxic Chemical Misuse** | Cultural & Biological remedies prioritized; safety warnings displayed. | Mandatory disclaimer to consult local KVK. |

---

## Slide 5: Impact, Social Benefits & Scalability

* **Target Beneficiaries:**
  * **Primary:** Over 120 million small and marginal Indian farmers facing delayed agricultural diagnostics *(domain estimate)*.
  * **Secondary:** Village-level extension volunteers, Gram Sevaks, and agricultural students.
* **Direct Social & Economic Impact:**
  * **Yield Preservation:** Early visual identification helps prevent localized crop loss *(estimated 15-25% domain loss)*.
  * **Cost Reduction:** Replaces blind purchasing of expensive agrochemicals with targeted cultural/bio measures.
  * **Soil & Human Health:** Reduces dangerous chemical runoff through safety protocols.
* **Scalability Roadmap:**
  * **Phase 1 (Current):** 5 major staple crops (Potato, Tomato, Rice, Wheat, Cotton) with Hindi/English support.
  * **Phase 2 (Pilot):** Expansion to 15 crops and regional languages (Marathi, Telugu, Punjabi, etc.).
  * **Phase 3 (Enterprise):** Aggregated geotagged disease surveillance heatmaps for agricultural departments.

---

## Slide 6: Research, References & Project Roadmap

* **Academic & Scientific References:**
  1. **PlantVillage Project:** Hughes, D., & Salathé, M. (2015). *An open access repository of images on plant health.*
  2. **In-Field Agricultural Vision:** Singh, A. K., et al. (2020). *Deep learning for plant disease detection in real-world agricultural environments.*
  3. **MobileNetV3 Architecture:** Howard, A., et al. (2019). *Searching for MobileNetV3.* IEEE ICCV.
  4. **ICAR & KVK Agronomic Guidelines:** Standard Crop Protection Packages of Practices.
* **Development Roadmap:**
  * **Aug 2026 (Now):** Solution Architecture, UI/UX Prototype, Simulated AI Diagnostics, SIH Submission.
  * **Oct 2026 (Phase 1):** Real MobileNetV3 Training on Hybrid Datasets, FastAPI Backend Integration.
  * **Dec 2026 (Phase 2):** Field Pilot with KVK Extension Volunteers in North/Central India.
  * **Mar 2027 (Phase 3):** Full On-Device TFLite INT8 Edge Inference & Regional Language Rollout.
