# Document 01: Project Overview & Product Vision

**Project Working Title:** KheetSathi (खेती साथी / खेत साथी) — *AI-Assisted Crop Health & Disease Diagnostic Companion*  
**Hackathon Event:** Smart IGNOU Hackathon 2026 (Internal Gateway for Smart India Hackathon 2026)  
**Selected Problem Statement:** PS #2 — *"AI-Based Crop Disease Detection: Develop mobile applications that identify crop diseases using smartphone images."*  
**Submission Deadline:** August 30, 2026  
**Document Status:** Technical Architecture & Planning Baseline (Pre-Prototype Specification)  
**Document Version:** 1.1.0 (Strict Technical Consistency Review)  

---

## 1. Executive Summary

In Indian agriculture, small and marginal farmers (comprising >85% of operational agricultural holdings) lose an estimated 15% to 25% of potential crop yield annually to plant pathogens, fungal infections, bacterial blights, and pest attacks *(illustrative domain assumption)*. In rural environments, access to certified agricultural extension officers or plant pathologists is severely constrained, leading farmers to rely on guesswork, unverified word-of-mouth, or arbitrary over-application of costly chemical pesticides.

**KheetSathi** is a mobile-first, farmer-centric AI diagnostic platform designed to provide rapid, localized, and uncertainty-aware crop disease identification from smartphone photographs. Rather than functioning as a black-box "image in, label out" utility, KheetSathi bridges diagnostic intelligence with actionable, vernacular agronomic advice, an upfront client-side image-quality gate, clear model confidence indicators, and low-connectivity resilience.

> [!NOTE]
> **Prototype Phase & Capability Disclosure:**  
> This project is in its hackathon architecture and prototype phase. In accordance with strict academic and technical integrity:
> - **Live Prototype Features:** Mobile PWA shell, bilingual (Hindi/English) layout, client-side camera/gallery image ingestion, HTML5 canvas image luminance and blur assessment heuristic, and local storage scan persistence.
> - **Simulated Prototype Behavior:** Disease identification output, model confidence scores, qualitative severity ratings, and curated agronomic remedy cards represent **simulated prototype outputs and mock fixtures**.
> - **Planned Post-MVP:** Dedicated cloud API (FastAPI), training on real-world hybrid datasets, and human-in-the-loop expert ticketing.
> - **Future Production Capabilities:** On-device quantized TFLite edge inference, quantitative lesion area segmentation, and regional disease outbreak surveillance.
> No clinical or field agricultural accuracy is claimed at this stage.

---

## 2. Product Name Comparison & Brand Selection

To ensure strong cultural resonance, ease of pronunciation across diverse linguistic regions, and high hackathon memorability without trademark conflicts, multiple naming candidates were systematically evaluated:

| Candidate Name | Linguistic & Conceptual Meaning | Strengths | Limitations | Evaluation |
| :--- | :--- | :--- | :--- | :--- |
| **KheetSathi / KhetSathi** | *"Field Companion / Farmer's Friend"* (Hindi/Sanskrit root) | Highly relatable, evokes trusted companionship, zero tech intimidation, easy to pronounce in North and Central India. | Simple, requires strong tagline to indicate AI capability. | **Selected (Recommended)** |
| **KrishiNidan** | *"Agricultural Diagnosis"* (Sanskritized) | Formally precise, sounds institutional and scientific. | Slightly rigid/formal; harder for grassroots non-literate farmers to connect with. | Runner-Up |
| **FasalVaidya** | *"Crop Doctor / Physician"* | Strong metaphor of care and medical diagnostics for plants. | May over-promise absolute medical precision for a vision AI model. | Strong Alternative |
| **DrishtiKrishi** | *"Vision for Agriculture"* | Highlights computer vision and technological capability. | Generic; resembles various existing government research initiatives. | Discarded |
| **PlantMitra** | *"Plant Friend"* (Hinglish blend) | Simple, approachable for youth and student workers. | Feels less rooted in rural farming vocabulary than *Khet*. | Discarded |
| **AnnadataAI** | *"Nourisher's AI"* | Emotionally respectful towards farmers. | Overly emphasizes "AI" which can alienate non-technical end users. | Discarded |

### Recommendation Rationale
**KheetSathi** is selected as the primary brand name. It centers the farmer's reality (*Khet* = field, *Sathi* = trusted companion) rather than alienating them with jargon. It positions the technology as a supportive partner in the field rather than an infallible, opaque machine.

---

## 3. Problem Breakdown & Context

```
+-----------------------------------------------------------------------------------+
|                              THE GROUND REALITY                                   |
|                                                                                   |
|  Crop Infection   --->   Delayed Diagnosis   --->   Excessive / Wrong Agrochemical|
|  (Fungal/Blight)         (No Extension Agent)       (Financial Debt + Crop Loss)  |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                             KHEETSATHI SOLUTION                                   |
|                                                                                   |
|  Smartphone Photo ---> Quality Gate ---> Lightweight ML ---> Actionable Guidance  |
|  (In-Field Leaf)       (Blur/Exposure)   (Confidence-Aware)  (Vernacular + Safe)  |
+-----------------------------------------------------------------------------------+
```

### 3.1 Problem Facts vs. Assumptions vs. Proposed Solutions

#### A. Problem Facts (Domain Reality)
1. **Pest and Disease Losses:** Pests, fungi, bacteria, and viruses cause significant yield reduction in staple Indian crops (paddy, wheat, tomato, potato, cotton).
2. **Extension Ratio Scarcity:** The operational ratio of agricultural extension officers to operational holdings in India creates physical turnaround delays of days to weeks for diagnostic visits.
3. **Smartphone Penetration:** Low-cost 4G Android smartphones are widely present in rural households, even where digital literacy is basic.
4. **Input Misapplication:** Farmers frequently purchase generic broad-spectrum agrochemicals based on retail dealer recommendations, escalating cost of cultivation and soil toxicity.

#### B. Product Assumptions (Working Hypotheses)
1. Farmers can capture reasonably framed leaf/plant photographs with minimal on-screen visual guidance.
2. Low-bandwidth or store-and-forward mobile workflows can adequately serve areas with fluctuating cellular coverage.
3. Vernacular explanations paired with qualitative severity indicators and non-chemical cultural practices build greater trust than raw scientific pathogen names alone.

#### C. Proposed Technical Solution
1. A mobile-first Progressive Web App (PWA) providing guided image capture.
2. An upfront **Image Quality Pre-check** (blur and pixel luminance/exposure heuristics) to reject unprocessable inputs before server transmission.
3. A mobile-optimized Convolutional Neural Network (CNN) pipeline (e.g., MobileNetV3 / EfficientNet-Lite) designed to return top-1 and top-3 candidates with explicit low-confidence rejection thresholds.
4. Plain-language agronomic advisories (symptoms, cultural management, organic controls, general safe chemical guidelines, and safety disclaimers).

#### D. Future Opportunities
1. Edge-based on-device inference using TFLite / ONNX Runtime without internet connection.
2. Geotagged aggregate disease surveillance maps for regional Krishi Vigyan Kendras (KVKs).
3. Two-way human-in-the-loop expert escalation for novel or ambiguous symptoms.

---

## 4. Product Vision & Value Proposition

### 4.1 Vision Statement
To democratize plant pathology expertise for every Indian farmer by providing an honest, accessible, and resilient mobile diagnostic companion that preserves crop yields and prevents agrochemical misapplication.

### 4.2 Beyond Generic "Image In $\rightarrow$ Disease Out"

```
[Smartphone Capture]
        |
        v
[Image Quality Gate] ----------(Fails: Blurry/Under-exposed)-----> [Instant Retake Guidance]
        | (Passes)
        v
[Crop Context Confirmation] (e.g., Tomato / Potato / Rice)
        |
        v
[Vision AI Inference Engine]
        |
   +----+---------------------------------------+
   | (Model Confidence Score >= 65%)            | (Low Confidence < 65% / Unsupported Input)
   v                                            v
[Likely Condition Identified]                [Uncertain Result Flagged]
- Qualitative Severity Level (Simulated)     - Clear Advisory to Retake Photo
- Symptoms in Vernacular Language            - Guidance to Consult Local KVK
- Immediate Cultural & Bio Measures          - Expert Escalation Option
- General Chemical Safety Guidance
        |
        +---------------------------------------+
        |
        v
[Local Scan History & Offline Cache]
```

---

## 5. Target Stakeholders & User Personas

### 5.1 Primary Persona: Ramesh Patel (Marginal Farmer)
* **Age & Background:** 44 years old, Vidarbha region; cultivates 3 acres of soybean and cotton.
* **Technology Profile:** Uses an entry-level Android phone; communicates via voice notes; reads Marathi/Hindi.
* **Core Pain Point:** Noticed yellowish-brown speckling on leaves. Local shop sold him an expensive fungicide that did not cure the bacterial infection.
* **Product Need:** Visual, simple, vernacular app that clearly indicates if the crop has a disease, how severe it is, and whether low-cost cultural/bio remedies exist.

### 5.2 Secondary Persona: Sunita Sharma (Extension Volunteer)
* **Age & Background:** 26 years old, Agricultural Diploma holder; visits 15-20 small farms weekly.
* **Technology Profile:** Comfortable with mobile apps, seeks fast reference verification and historical tracking across multiple plots.
* **Product Need:** Rapid scan workflow, ability to log farm location, clear diagnostic notes to educate farmers on the spot.

---

## 6. Core Product Principles

1. **Farmer-First UX Simplicity:** Large touch targets, high-contrast visual cues, zero clutter, vernacular language parity (Hindi + English MVP foundation).
2. **Honest Confidence & Uncertainty Awareness:** If the model confidence score is below threshold ($<65\%$), it **never guesses**. It explicitly informs the user that the scan is uncertain and advises retaking the photo or consulting an expert.
3. **No Dangerous Pesticide Prescriptions:** The app never prescribes hazardous chemical dosages autonomously. It provides general agronomic practices, cultural controls, and directs users to certified local authorities (such as KVKs).
4. **Upfront Image Quality Verification:** Poor lighting and motion blur are caught locally before wasting bandwidth or computing erroneous inferences.
5. **Bandwidth Resilience:** Optimized payload sizes, aggressive local caching for scan history, and an architectural trajectory toward on-device edge execution.
6. **Academic & Technical Honesty:** Strict demarcation between live prototype code, simulated prototype outputs, and future planned infrastructure.

---

## 7. Success Criteria & Key Performance Indicators (KPIs)

| Metric Category | Proposed Target (Hackathon Prototype Phase) | Proposed Target (Future Production Scope) |
| :--- | :--- | :--- |
| **UX Accessibility** | Zero-typing task completion through visual icons and vernacular layouts. | Verified usability across 5+ regional Indian languages. |
| **Diagnostic Flow Latency** | Simulated UI feedback $\le 1.5\text{ s}$; Payload size $\le 400\text{ KB}$ per scan. | Cloud inference $\le 800\text{ ms}$; Edge TFLite inference $\le 150\text{ ms}$. |
| **Input Rejection Rate** | Quality gate flags synthetic test images with extreme blur or severe under-exposure. | Robust field image quality rejection with user remediation cues. |
| **Safety Compliance** | 100% of simulated recommendations accompanied by safety disclaimers. | Endorsed by certified ICAR / KVK agronomic protocols. |
