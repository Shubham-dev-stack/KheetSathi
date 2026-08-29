# Document 13: Hackathon Judge Q&A & Defense Playbook

**Project Name:** KheetSathi (खेती साथी)  
**Target Event:** Smart IGNOU Hackathon 2026 / SIH 2026  
**Document Status:** Master Defense & Interview Playbook (Post Technical Consistency Review)  

---

## 1. Technical & AI Credibility Questions

---

### Q1: *"There are already apps on the Play Store that claim to detect crop diseases. Why should SIH fund or select your project?"*
* **Judge's Underlying Concern:** Is this just another clone of existing apps with no unique engineering value?
* **Honest Defense Strategy:**
  > *"Most existing apps treat disease detection as a brittle 'image in, label out' black box. They suffer from three fatal flaws on Indian farms: (1) They accept blurry or dark photos and produce hallucinated high-confidence misdiagnoses; (2) They jump straight to prescribing expensive chemical pesticides; and (3) They become unusable when cellular connectivity drops.*  
  > *KheetSathi innovates where the technology meets ground reality: we introduce a client-side **Image Quality Gate** that catches bad photos before inference, a calibrated **Confidence Threshold Filter** that refuses to guess when confidence is $<65\%$, an **offline-first PWA architecture**, and a **3-tier advisory** emphasizing cultural and bio-remedies before chemicals."*

---

### Q2: *"What dataset will you use to train your model, and how will you overcome the laboratory-to-field generalization gap?"*
* **Judge's Underlying Concern:** Did you just train on clean white-background PlantVillage photos that will fail in real muddy fields?
* **Honest Defense Strategy:**
  > *"We acknowledge that training solely on lab datasets like PlantVillage creates severe real-world failure. Our architecture utilizes a two-stage domain adaptation strategy:  
  > 1. Initial representation pre-training on public benchmark corpuses.  
  > 2. Fine-tuning on in-field datasets (such as PlantDoc and CropPest) which include natural complex backgrounds, varying sunlight, partial occlusions, and overlapping leaves.  
  > 3. Heavy domain-specific data augmentations including Gaussian blur, random erasing, and color jitter to ensure robust invariance under unpredictable rural photography conditions."*

---

### Q3: *"What happens when the farmer scans a weed, a tractor, or an unsupported novel disease? Will your AI give a bogus diagnosis?"*
* **Judge's Underlying Concern:** Out-of-distribution hallucinations and safety risks.
* **Honest Defense Strategy:**
  > *"In KheetSathi, we enforce a strict low-confidence thresholding and non-leaf fallback mechanism. If the model's top confidence score falls below 65% or non-plant features are detected, the system suppresses the diagnosis and routes to a designated Fallback State: 'AI Uncertain — No verified disease match found. Please retake photo or consult your local KVK.' In Phase 3, we plan to implement formal entropy and feature-distance out-of-distribution (OOD) gating to further strengthen this boundary."*

---

### Q4: *"How can this app work in deep rural areas where there is zero or intermittent connectivity?"*
* **Judge's Underlying Concern:** Unrealistic cloud-only architecture in rural settings.
* **Honest Defense Strategy:**
  > *"KheetSathi is architected offline-first. The web application shell, icon assets, and complete diagnostic history are cached locally on the device using LocalStorage and browser caching. Farmers can review past diagnoses and treatment guides completely offline. Furthermore, our Phase 4 technical roadmap targets quantized INT8 MobileNetV3 models ($\approx 3.8\text{ MB}$) compiled for on-device TensorFlow Lite execution, enabling 100% offline edge inference directly on the phone's CPU."*

---

### Q5: *"Are you claiming that your AI model is currently trained and 95% accurate in your prototype?"*
* **Judge's Underlying Concern:** Integrity check — catching students making fake AI claims.
* **Honest Defense Strategy:**
  > *"We want to be 100% transparent: our current hackathon prototype uses **simulated AI outputs and curated agronomic fixtures** to demonstrate the complete, resilient user experience, client-side quality gate, and uncertainty handling. We do NOT claim that our production model has completed clinical agricultural validation. Our technical roadmap defines the exact training pipeline, model quantization steps, and KVK pilot benchmarks for Phase 1-3 development."*

---

## 2. Operational, Agronomic & Safety Objections

---

### Q6: *"If your app advises a farmer to spray a chemical and the crop is ruined, who is responsible?"*
* **Judge's Underlying Concern:** Product liability, legal compliance, and hazardous pesticide misuse.
* **Honest Defense Strategy:**
  > *"KheetSathi enforces a strict safety protocol:  
  > 1. We prioritize **Tier 1 (Cultural practices like pruning/drainage)** and **Tier 2 (Organic/Bio-controls like Neem formulations)** as first-line defenses.  
  > 2. For chemical guidance, we only provide standardized generic active ingredients aligned with ICAR package of practices—never unregulated dosage prescriptions.  
  > 3. Every single advisory is coupled with a statutory warning and a direct link to the Government of India's Kisan Call Center (1800-180-1551, to be verified from current official government source) to encourage human extension verification."*

---

### Q7: *"How will illiterate or non-tech-savvy farmers actually use your application?"*
* **Judge's Underlying Concern:** Usability and digital divide in rural India.
* **Honest Defense Strategy:**
  > *"We designed KheetSathi specifically for low-literacy users:  
  > - Tapping the app requires zero typing or registration.  
  > - The flow is completed in just 3 taps: Select Crop Icon $\rightarrow$ Take Photo $\rightarrow$ See Color-Coded Card.  
  > - High-contrast visual color badges communicate disease status instantly without requiring text reading.  
  > - Instant one-tap Hindi / English localization, with architecture ready for vernacular Text-to-Speech (TTS) voice narration."*
