# Document 15: Requirements Traceability Matrix (RTM)

**Project Name:** KheetSathi (खेती साथी)  
**Document Code:** RTM-2026-V1.1  
**Scope:** Complete End-to-End Traceability from SIH Problem Statement #2 to Prototype & PPT  
**Status:** Approved (Post Technical Consistency Review)  

---

## 1. Traceability Architecture

This matrix guarantees that every single requirement originating from the IGNOU / SIH Problem Statement #2 maps directly to a concrete functional feature, technical subsystem, user interface view, API endpoint, mock data fixture, and presentation slide.

```
+-----------------------------------------------------------------------------------------------------------------------------+
|                                              REQUIREMENTS TRACEABILITY MATRIX                                               |
+---------+--------------------+------------------+---------------------+--------------+----------------+------------+--------+
| PS Req  | Product Feature    | Tech Component   | UI Screen View      | API Endpoint | Data Fixture   | Capability | SIH    |
| Code    | Name               | Subsystem        |                     |              |                | Tier       | Slide  |
+---------+--------------------+------------------+---------------------+--------------+----------------+------------+--------+
| **R-01**| Smartphone Image   | Client Camera &  | View 04, View 05:   | `POST /scan` | `crops.json`   | LIVE       | Slide 2|
|         | Ingestion (Leaf)   | File Uploader    | Crop Select & Camera| (Multipart)  |                | PROTOTYPE  | & 3    |
+---------+--------------------+------------------+---------------------+--------------+----------------+------------+--------+
| **R-02**| Pre-Inference      | Canvas Laplacian | View 06:            | Client-Side  | Quality Gate   | LIVE       | Slide 3|
|         | Image Quality Gate | Variance Filter  | Image Preview & Pre | Heuristic    | Rules Engine   | PROTOTYPE  | & 4    |
+---------+--------------------+------------------+---------------------+--------------+----------------+------------+--------+
| **R-03**| Crop Disease AI    | MobileNetV3 CNN  | View 07, View 08:   | `POST /scan` | `diseases.json`| SIMULATED  | Slide 2|
|         | Identification     | Inference Engine | Analyzing & Result  |              |                | BEHAVIOR   | & 3    |
+---------+--------------------+------------------+---------------------+--------------+----------------+------------+--------+
| **R-04**| Transparent Conf.  | Model Confidence | View 08:            | `predictions`| `scans.json`   | SIMULATED  | Slide 3|
|         | & Severity Rating  | Display Bar      | Result Card         | payload      |                | BEHAVIOR   | & 4    |
+---------+--------------------+------------------+---------------------+--------------+----------------+------------+--------+
| **R-05**| Honest Uncertainty | Low-Confidence / | View 16A, 16B:      | Status:      | `diseases.json`| LIVE       | Slide 4|
|         | & Fallback Handler | Non-Leaf Filter  | Uncertainty Fallback| `uncertain`  | (`unknown`)    | PROTOTYPE  | & 6    |
+---------+--------------------+------------------+---------------------+--------------+----------------+------------+--------+
| **R-06**| 3-Tier Actionable  | Agronomic Rules  | View 10:            | `GET /diseas-| `recommenda-   | SIMULATED  | Slide 2|
|         | Advisory Protocol  | Knowledge Engine | 3-Tier Treatment    |  es/{id}`    |  tions.json`   | BEHAVIOR   | & 5    |
+---------+--------------------+------------------+---------------------+--------------+----------------+------------+--------+
| **R-07**| Offline Scan Log & | LocalStorage /   | View 11, View 12:   | Client Store | `scans.json`   | LIVE       | Slide 3|
|         | History Tracking   | IndexedDB Cache  | History & Details   | & `GET /scan`|                | PROTOTYPE  | & 5    |
+---------+--------------------+------------------+---------------------+--------------+----------------+------------+--------+
| **R-08**| Vernacular Farmer  | Client i18n JSON | View 02, View 13:   | Client State | i18n Dictionary| LIVE       | Slide 2|
|         | Localization (HI)  | State Engine     | Language Switcher   | / Preferences| (HI / EN)      | PROTOTYPE  | & 5    |
+---------+--------------------+------------------+---------------------+--------------+----------------+------------+--------+
| **R-09**| Expert Escalation  | Helpline Dialer  | View 10, View 16:   | `tel:1800...`| Helpline       | LIVE LINK  | Slide 4|
|         | Link               | Protocol         | KVK Helpline Link   | *(to verify)*| Metadata       | (To verify)| & 5    |
+---------+--------------------+------------------+---------------------+--------------+----------------+------------+--------+
| **R-10**| Low-Bandwidth      | Canvas Resize &  | Global App Shell    | Gzip / WebP  | Asset Bundler  | LIVE       | Slide 3|
|         | Optimization       | Payload Minifier | (All Views)         | Payloads     |                | PROTOTYPE  | & 4    |
+---------+--------------------+------------------+---------------------+--------------+----------------+------------+--------+
```
