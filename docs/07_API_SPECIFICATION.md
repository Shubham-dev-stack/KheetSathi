# Document 07: REST API Interface Specification

**Project Name:** KheetSathi (खेती साथी)  
**Document Code:** API-2026-V1.1  
**Base URL:** `https://api.kheetsathi.in/api/v1` (Production) / `http://localhost:8000/api/v1` (Local Dev)  
**Protocol:** HTTPS / JSON & Multipart-Form-Data  
**Status:** Approved API Specification (Post Technical Consistency Review)  

---

## 1. API Route Summary Matrix

| Method | Endpoint | Purpose | Auth | Typical Latency (Target) |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/scan` | Submit crop leaf image for quality pre-check and AI diagnostic analysis. | Optional / Guest | $< 1200\text{ ms}$ |
| `GET` | `/scan/{id}` | Retrieve complete diagnostic report, confidence, and remedies for a specific scan. | Optional / Guest | $< 150\text{ ms}$ |
| `GET` | `/scans` | Retrieve paginated scan history for the current device/user. | Optional / Session | $< 200\text{ ms}$ |
| `GET` | `/crops` | Fetch master list of supported crops and their localized metadata. | Public | $< 100\text{ ms}$ |
| `GET` | `/diseases/{id}` | Fetch disease details, symptoms, and 3-tier localized agronomic advisories. | Public | $< 120\text{ ms}$ |
| `POST` | `/feedback` | Submit farmer/expert verification or correction on a diagnostic result. | Optional / Guest | $< 200\text{ ms}$ |
| `GET` | `/profile` | Retrieve user preferences (language, location) and scan count. | Optional / Session | $< 100\text{ ms}$ |

---

## 2. Detailed Endpoint Specifications

---

### 2.1 `POST /scan` — Submit Crop Leaf Image for Analysis
* **Purpose:** Primary diagnostic endpoint. Ingests smartphone photograph, verifies image payload, runs computer vision classification, and returns the diagnostic summary with actionable remedies.
* **Content-Type:** `multipart/form-data`

#### Request Payload
```http
POST /api/v1/scan HTTP/1.1
Host: api.kheetsathi.in
Content-Type: multipart/form-data; boundary=---Boundary12345

---Boundary12345
Content-Disposition: form-data; name="image"; filename="leaf_sample.jpg"
Content-Type: image/jpeg

[BINARY IMAGE DATA]
---Boundary12345
Content-Disposition: form-data; name="crop_id"

potato
---Boundary12345
Content-Disposition: form-data; name="lang_code"

hi
---Boundary12345
Content-Disposition: form-data; name="user_id"

550e8400-e29b-41d4-a716-446655440000
---Boundary12345--
```

#### Success Response: High-Confidence Diagnosis (`200 OK`)
```json
{
  "status": "success",
  "data": {
    "scan_id": "8fa1b930-b3e1-482a-9f5e-d28c399b1a01",
    "scanned_at": "2026-08-28T21:45:00Z",
    "crop": {
      "crop_id": "potato",
      "name_en": "Potato",
      "name_hi": "आलू"
    },
    "diagnosis": {
      "disease_id": "potato_late_blight",
      "common_name_en": "Late Blight",
      "common_name_hi": "पछेती झुलसा",
      "scientific_name": "Phytophthora infestans",
      "pathogen_type": "fungal",
      "confidence_score": 0.89,
      "severity_estimate": "moderate",
      "is_uncertain": false,
      "is_mock_result": true
    },
    "visual_symptoms": {
      "en": "Water-soaked dark lesions on leaf tips turning black, accompanied by pale white mold under humid conditions.",
      "hi": "पत्तियों के किनारों पर गहरे भूरे-काले धब्बे, नमी में पत्तियों के नीचे सफेद फफूंद की परत।"
    },
    "recommendations": {
      "cultural": [
        "संक्रमित पत्तियों को तुरंत काटकर खेत से दूर नष्ट करें।",
        "खेत में जलभराव न होने दें; जल निकासी नालियों को साफ रखें।"
      ],
      "biological": [
        "ट्राइकोडर्मा विरिडी (Trichoderma viride) या नीम आधारित सत्व का पैकेज अनुसार छिड़काव करें।"
      ],
      "chemical_guidance": [
        "स्थानीय कृषि विश्वविद्यालय द्वारा अनुशंसित संपर्क कवकनाशी (जैसे मैनकोजेब समूह) का सुरक्षात्मक छिड़काव करें।"
      ],
      "safety_warning": "कीटनाशक का प्रयोग करते समय मास्क और दस्ताने पहनें। दवा के छिड़काव से पहले नजदीकी कृषि विज्ञान केंद्र (KVK) से सलाह लें।"
    },
    "image_quality": {
      "score": 92.4,
      "status": "good"
    }
  }
}
```

#### Low-Confidence / Uncertain Result Response (`200 OK`)
```json
{
  "status": "uncertain",
  "data": {
    "scan_id": "8fa1b930-b3e1-482a-9f5e-d28c399b1a99",
    "diagnosis": {
      "disease_id": "unknown",
      "confidence_score": 0.44,
      "is_uncertain": true,
      "message": "AI को रोग की पुष्टि में अनिश्चितता है। कृपया बेहतर रोशनी में स्पष्ट फोटो लें या कृषि विशेषज्ञ से संपर्क करें।"
    },
    "fallback_actions": {
      "can_retake": true,
      "kvk_helpline": "1800-180-1551 (to be verified from current official government source)"
    }
  }
}
```

#### Error Responses
* `400 Bad Request` — Unsupported file format or missing image field.
* `413 Payload Too Large` — Uploaded image exceeds 10MB limit.
* `422 Unprocessable Entity` — Severe image quality failure (e.g. extreme underexposure with mean pixel luminance < 20).
