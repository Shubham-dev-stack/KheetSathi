# Verified Master Dataset Audit Report

## 1. PlantVillage Dataset (Training / Benchmark Baseline)
- **Status:** Verified and Complete
- **Classes:** Exactly 38 / 38 Canonical Classes
- **Total Valid Images:** 54,305
- **Corrupt Files:** 0
- **Exact Duplicates (SHA256):** 21 (dropped during dataloading)
- **Provenance & Integrity:** Kaggle mirror (mohitsingh1804/plantvillage) of original Mendeley (Hughes & Salathe, 2015). The archive originally contained pre-split 	rain/ (43,444 images) and al/ (10,861 images) subfolders, which have been fully unified into 38 canonical directories on disk.
- **License:** CC0 1.0 Universal

## 2. PlantDoc Dataset (Real-World External Field Evaluation)
- **Status:** Verified and Complete
- **Total Downloaded Images:** 2,569
- **Exact 1-to-1 PlantVillage Mapped:** 1,406 images across 14 matched classes
- **Partial / Ambiguous Foliar:** 124 images
- **Unsupported Classes:** 96 images
- **Unmapped Field Classes:** 943 images
- **NTFS Sanitization:** Applied on extraction to handle illegal characters (?) and Windows MAX_PATH (>260 chars).
- **License:** Open Research / Apache 2.0 / CC-BY

## 3. Cryptographic Leakage Detection (PlantVillage vs PlantDoc)
- **Methodology:** Block-mean Discrete Cosine / Perceptual Hash (pHash), 64-bit fingerprint, Hamming distance < 5 threshold.
- **Total Images Scanned:** 54,306 PlantVillage + 2,563 PlantDoc.
- **Exact SHA256 Collisions:** 0
- **Perceptual Leakage Detected:** 277 images
- **Action Taken:** All 277 leaked PlantVillage images embedded in PlantDoc have been flagged and purged from the external field evaluation test set (data/reports/leakage_report.json).

## 4. Rice Dataset (Out-of-Distribution / Unsupported Crop Gate)
- **Source:** UCI Machine Learning Repository (Prajapati et al.) via Kaggle bookshelf/rice-leaf-diseases
- **Total Images:** 120 (40 Bacterial leaf blight, 40 Brown spot, 40 Leaf smut)
- **Role:** Strictly isolated for evaluating KheetSathi Gate 2 (Low Confidence / High Entropy OOD rejection).
- **License:** CC BY 4.0

## 5. Offline Model Accuracy Benchmarks
- **PlantVillage In-Domain Top-1 Accuracy:** 94.11% (Balanced 950-image test set)
- **PlantVillage Top-5 Accuracy:** 100.00%
- **PlantDoc Real-World Field Domain Accuracy:** 20.01% (Exact 1,404 clean field images)
- **Rice OOD Entropy:** 1.627 / 3.638 (58.3% rejected by safety gate)
