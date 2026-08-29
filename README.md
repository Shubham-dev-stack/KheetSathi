# KheetSathi (खेती साथी) — AI-Assisted Crop Health Companion

> **"खेती का सच्चा साथी"** *(The True Companion of Farming)*  
> Smart IGNOU Hackathon 2026 / Smart India Hackathon (SIH 2026) • **Problem Statement #2: AI-Based Crop Disease Detection**

---

## 🌾 Overview

**KheetSathi** is an offline-resilient, mobile-first Progressive Web Application (PWA) designed to empower smallholder Indian farmers with edge image quality coaching, transparent foliar disease diagnostics, actionable 3-tier remediation guidance, and longitudinal crop health tracking.

---

## 🚀 Key Features

* **📷 Real Edge Image Quality Gate:** Client-side HTML5 Canvas calculates grayscale luminance ($Y$) and 2D Laplacian convolution variance ($\sigma^2$) to detect under-exposure, glare, and blur before running analysis.
* **🛡️ Transparent AI Pipeline & Uncertainty Routing:** Honest prototype disclosure with fallback guidance for non-leaf or poor-quality photos.
* **📋 3-Tier Action Hierarchy:**
  1. *01 Immediate Field Sanitation (Cultural)*
  2. *02 Biological & Organic Options (Neem extract, Trichoderma)*
  3. *03 Safe Chemical Guidelines with Kisan Call Center Helpline (`1800-180-1551`)*
* **📈 Crop Health Timeline:** Track foliar recovery progression across multiple dates (*Improving / Stable / Needs Attention*).
* **⚖️ Side-by-Side Scan Comparison:** Compare earlier vs. latest leaf scans to observe physical changes over time.
* **🌾 My Crops Space:** Manage and track personal crops (Potato, Tomato, Rice, Wheat, Cotton).
* **🗣️ Vernacular Voice Guidance:** Web Speech API text-to-speech audio readout in Hindi (`hi-IN`) and English (`en-US`).
* **🌐 100% Offline PWA Shell:** Built with Vanilla ES6 JS, modern CSS3, and Cache-First Service Worker (`sw.js`). Bundle size $< 120\text{ KB}$.

---

## 💻 Tech Stack

* **Frontend:** Vanilla HTML5, CSS3 Custom Properties, Modern ES6+ JavaScript
* **Computer Vision:** HTML5 Canvas API (Pixel-level luminance & discrete 2D Laplacian kernel)
* **PWA & Offline:** Service Worker Cache API, Web App Manifest, LocalStorage
* **Accessibility:** Web Speech API (Text-to-Speech), Web Share API

---

## 🏃 Running Locally

```bash
# Start local static server (Python 3)
python -m http.server 8080

# Open in browser:
# http://localhost:8080
```

---

## 📄 Complete Documentation
* Master System Manual: [`PROJECT_DOCUMENTATION.md`](./PROJECT_DOCUMENTATION.md)
* SIH 6-Slide Pitch Blueprint: [`docs/12_SIH_PPT_BLUEPRINT.md`](./docs/12_SIH_PPT_BLUEPRINT.md)
