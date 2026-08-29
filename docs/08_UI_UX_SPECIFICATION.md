# Document 08: UI/UX Specification & Design System

**Project Name:** KheetSathi (खेती साथी)  
**Document Code:** UIUX-2026-V1.1  
**Design Paradigm:** Farmer-Centric / High-Contrast Vernacular / Mobile-First PWA  
**Status:** Approved Design Specification (Post Technical Consistency Review)  

---

## 1. Design Philosophy & Visual Language

The user interface of KheetSathi is deliberately tailored to the realities of Indian rural farming:
1. **Zero Jargon & Visual Clarity:** Avoid intimidating AI/data-science terminology. Use recognizable agricultural motifs alongside bilingual text.
2. **High-Contrast Sunlight Legibility:** Tested for readability under direct outdoor sunlight on entry-level Android displays (WCAG AAA contrast ratios $\ge 7:1$).
3. **Generous Touch Targets:** All tappable buttons and cards have a minimum touch footprint of $48 \times 48\text{ px}$ with tactile feedback.
4. **Bilingual Parity:** English and Hindi have identical visual weight and layout stability without text clipping.

---

## 2. Design System Tokens

```
+----------------------------------------------------------------------------------------+
|                                    COLOR PALETTE                                       |
+---------------------+-------------+----------------------------------------------------+
| Token Name          | Hex Code    | Usage / Semantic Purpose                           |
+---------------------+-------------+----------------------------------------------------+
| `--primary-green`   | `#1B5E20`   | Brand Primary: Deep Forest Green (Trust & Crops)   |
| `--accent-emerald`  | `#2E7D32`   | Primary CTAs, active badges, healthy indicators    |
| `--leaf-lime`       | `#4CAF50`   | Highlights, success borders, focus rings           |
| `--earth-gold`      | `#F57F17`   | Warning badges, moderate severity, caution alerts  |
| `--alert-crimson`   | `#C62828`   | Severe infection tag, critical safety warnings     |
| `--surface-sand`    | `#F9FBF7`   | Warm agricultural background surface               |
| `--card-bg`         | `#FFFFFF`   | Elevated content cards with subtle 2px border      |
| `--text-primary`    | `#1A2E1C`   | High-contrast deep slate green for headings & body |
| `--text-secondary`  | `#4A5568`   | Muted metadata, dates, secondary labels            |
+---------------------+-------------+----------------------------------------------------+
```

---

## 3. Screen-by-Screen UI Specification (16 Key Views & States)

### View 01: Splash & Quick Welcome
* **Goal:** Instantly communicate brand identity and load offline resources within 1.5 seconds.
* **Main Elements:** Animated KheetSathi leaf logo, bilingual tagline (*"आपकी फसल का सच्चा साथी / Your Crop's Trusted Companion"*), offline indicator badge.
* **Primary CTA:** Auto-advances to Home / Onboarding in 1.2s.

### View 02: One-Tap Onboarding & Language Picker
* **Goal:** Allow first-time farmers to choose their preferred language in one tap without requiring phone registration.
* **Main Elements:** Two large card buttons: **"हिन्दी (Hindi)"** and **"English"**, illustrative icons.
* **Primary CTA:** Tapping either language card stores preference and transitions to Home.

### View 03: Home Dashboard
* **Goal:** Central hub providing immediate access to the scan workflow, recent scan summaries, and seasonal advisory tips.
* **Main Elements:** Top App Bar with KheetSathi Logo, Language Toggle (`HI/EN`), "Scan Crop Leaf" hero button, and Recent Scans list.
* **Primary CTA:** **"New Leaf Scan / फसल की जांच करें"**.

### View 04: Crop Selection Sheet
* **Goal:** Narrow the diagnostic scope by confirming crop species.
* **Main Elements:** Grid of 5 primary crop cards (Potato, Tomato, Rice, Wheat, Cotton) with native names, plus **"Auto-Detect / Other"**.
* **Primary CTA:** Tap on selected crop card.

### View 05: Camera Ingestion & File Upload
* **Goal:** Capture or select a high-resolution leaf photo with visual guidance.
* **Main Elements:** Dual Action Modal: [ 📷 Open Camera ] and [ 📁 Choose from Gallery ], visual bounding box overlay.

### View 06: Image Preview & Pre-check Quality Feedback
* **Goal:** Let the user review their captured photo and see real-time quality verification results before submitting.
* **Main Elements:** Large photo thumbnail, Quality Status Badge (Green: Sharp & clear; Amber: Blurry or low luminance).
* **Primary CTA:** **"Analyze Leaf / जांच शुरू करें"**.
* **Secondary CTA:** **"Retake / दोबारा फोटो लें"**.

### View 07: Analyzing & Inference Loading State
* **Goal:** Keep user engaged during the 1.0 - 2.0 second simulated model computation window.
* **Main Elements:** Animated pulsing leaf scanner graphic with moving radar sweep line, subtext: *"Simulated AI processing for prototype demonstration."*

### View 08: Diagnostic Result Screen
* **Goal:** Deliver clear, transparent, and honest disease identification.
* **Main Elements:**
  * Diagnosis Header Card with color-coded severity tag (Mild, Moderate, Severe — *simulated qualitative rating*).
  * Primary Name: Bold bilingual text (e.g. *"पछेती झुलसा / Late Blight"*).
  * Model Confidence Bar (e.g. `89% Confidence Score`).
  * Explicit Prototype Watermark: *"Prototype Result — Simulated AI Output"*.
* **Primary CTA:** **"View Treatment & Action Steps / उपाय देखें"**.
* **Secondary CTA:** Save Scan / Share Result.

### View 09: Disease Details & Visual Symptoms Tab
* **Goal:** Educate farmer on how to visually confirm the disease on other leaves.
* **Main Elements:** "What to look for in your field" bulleted card, disease cause overview, and risk factor notes.

### View 10: 3-Tier Agronomic Recommendations Screen
* **Goal:** Provide structured, practical, non-hazardous remediation guidance without unsupported chemical dosages.
* **Main Elements:**
  * 🟢 **Tier 1: Cultural Steps (खेत सुधार):** Pruning, air circulation, drainage.
  * 🟡 **Tier 2: Organic / Bio (जैविक उपचार):** Bio-agents (Trichoderma / Neem formulations).
  * 🔵 **Tier 3: General Chemical Guidance (रासायनिक सलाह):** Recommended chemical class.
  * **Statutory Safety Box (Crimson border):** *"Always wear mask & gloves. Consult local KVK before chemical spraying."*
* **Primary CTA:** **"Call Kisan Call Center (1800-180-1551)"** *(To be verified from current official government source)*.

### View 11: Scan History Screen
* **Goal:** Review past scans chronologically to monitor farm health trends over time.
* **Main Elements:** Chronological list cards with thumbnail, crop name, date, and diagnosis tag.

### View 12: Scan Detail (History Item Replay)
* **Goal:** Reopen complete diagnostic report and action plan from local storage without network fetch.

### View 13: Language Selection Drawer
* **Goal:** Instant modal toggle between Hindi and English anywhere in the app.

### View 14: Farmer Profile & Settings
* **Goal:** Manage farm state, district for localized KVK routing, and clear cache.

### View 15: Help & "How to Photograph a Leaf" Guide
* **Goal:** Train farmers on taking optimal photos to maximize diagnostic accuracy.

### View 16: Error & Low-Confidence Fallback States
* **Goal:** Provide actionable recovery paths when edge cases occur.
* **States Covered:**
  * *State 16A (Low Confidence < 65%):* Amber banner *"AI Uncertain — Please retake with clearer lighting."*
  * *State 16B (Non-Leaf Detected):* Blue notice *"No plant leaf detected. Please take a close-up photo of the affected plant."*
  * *State 16C (Network Disconnected):* Offline badge *"Scan saved to offline queue."*
