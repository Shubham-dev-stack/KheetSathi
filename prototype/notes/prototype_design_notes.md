# Prototype Design & Implementation Notes

**Project:** KheetSathi (खेती साथी)  
**Target:** Fast, Clean, High-Fidelity Frontend Prototype (PWA Ready)  
**Status:** Approved Prototype Engineering Notes (Post Technical Consistency Review)  

---

## 1. Single-Page Application (SPA) State Architecture

The frontend prototype is designed as a zero-dependency, ultra-fast vanilla HTML5/Tailwind/ES6 application to ensure instantaneous load times even on 2G/3G speeds and zero build-step friction.

```
State Container:
├── currentView: 'home' | 'select_crop' | 'preview' | 'analyzing' | 'result' | 'history' | 'profile' | 'fallback'
├── currentLang: 'hi' | 'en' (default: 'hi')
├── selectedCrop: { crop_id, name_en, name_hi, icon }
├── capturedImage: { dataUrl, qualityScore, isBlurry, isDark }
├── currentResult: { disease_id, name_en, name_hi, confidenceScore, severityLevel, isUncertain, recommendations }
├── scanHistory: Array<ScanRecord> (synced with localStorage.kheet_scans)
└── isOffline: boolean (navigator.onLine reactive listener)
```

---

## 2. Client-Side Image Quality Heuristic (HTML5 Canvas)

When a photo is ingested (via `<input type="file" capture="environment">` or gallery upload):
1. **Luminance & Exposure Check:**
   $$\text{Mean Luminance } Y = \frac{1}{N} \sum_{i=1}^N (0.299 R_i + 0.587 G_i + 0.114 B_i), \quad Y \in [0, 255]$$
   * If $Y < 35$: Flag as *Under-exposed / Photo Too Dark (कम रोशनी)*.
   * If $Y > 230$: Flag as *Overexposed / Harsh Glare (अत्यधिक चमक)*.

2. **Sharpness / Variance Proxy:**
   * Downscale to $256 \times 256$ grayscale canvas.
   * Compute edge gradient intensity via $3 \times 3$ discrete Laplacian convolution kernel.
   * If gradient energy falls below baseline, flag *Photo is Blurry (धुंधली फोटो)*.

---

## 3. Simulated Diagnostic State Machine

To demonstrate the full diagnostic spectrum to hackathon judges, the prototype includes pre-configured demo test cards:
* **Sample 1 (Potato Late Blight):** Returns 89% confidence score, Moderate severity, 3-tier treatment card.
* **Sample 2 (Tomato Leaf Curl Virus):** Returns 84% confidence score, High severity, vector control guidelines.
* **Sample 3 (Rice Bacterial Blight):** Returns 91% confidence score, High severity, water drainage protocol.
* **Sample 4 (Blurry / Non-Leaf Image):** Triggers Image Quality Warning & Uncertainty Fallback Screen.
* **Sample 5 (Healthy Leaf):** Returns Healthy Plant badge with general maintenance tips.
