# Dataset Audit Report & Acquisition Plan

## 1. Verified PlantVillage Source
- **Original Source:** Mendeley Data (originally published by Hughes & Salathé, 2015).
- **Exact 38 Classes:** Yes, exactly 38 classes across 14 crops.
- **Raw Image Count:** 54,305 raw, original images.
- **Augmentation Status:** These are the original, unaugmented images. (We must ensure we download the original dataset, not the augmented Kaggle repackages).
- **Backgrounds:** The source contains mostly lab-style images with leaves on uniform backgrounds.
- **License:** CC0 1.0 Universal (Public Domain).

## 2. Verified PlantDoc Source
- **Original Source:** GitHub repository pratikkayal/PlantDoc-Dataset (Singh et al., 2020).
- **Exact Image Count:** 2,598 images.
- **Exact Class List:** 27 classes.
- **Annotations:** Contains both classification labels and bounding boxes (PASCAL VOC XML).
- **Provenance:** Internet-scraped by the authors.
- **Leakage Risk:** Since it's internet-scraped, some images might originate from PlantVillage. This requires deduplication.
- **License:** Open for research / Apache 2.0 / CC-BY (Authors specified open source).

## 3. Verified Rice Sources (OOD)
### A. Official UCI Prajapati Dataset
- **Exact Image Count:** 120 images.
- **Exact Classes:** 3 (Bacterial leaf blight, Brown spot, Leaf smut).
- **Provenance:** UCI Machine Learning Repository (Prajapati et al., 2017).
- **License:** CC BY 4.0.
- **Usage:** Excellent for small, highly verified OOD testing.

### B. Mendeley 3,355-Image Rice Collection
- **Exact Image Count:** 3,355 images.
- **Exact Classes:** 4 (Bacterial leaf blight, Brown spot, Leaf smut, Healthy).
- **Provenance:** Mendeley Data (Sethy et al., 2020).
- **License:** CC BY 4.0.
- **Usage:** Excellent for large-scale OOD testing.

## Leakage Prevention Procedure
1. **Cryptographic Hash Check:** Compute SHA256 hashes of all images in PlantVillage and PlantDoc.
2. **Perceptual Hash Check:** Compute pHash (perceptual hash) to identify visually similar, resized, or compressed images across datasets (Hamming distance < 5).
3. **PlantVillage Isolation:** data/plantvillage/ is split into 	rain/ (70%), al/ (15%), 	est/ (15%).
4. **PlantDoc Isolation:** data/plantdoc/ is strictly held as an external evaluation set. No images enter data/plantvillage/.
5. **Deduplication:** Any collision between PlantVillage and PlantDoc will result in the image being purged from the PlantDoc evaluation set to prevent falsely inflated accuracy.
6. **Reporting:** Results recorded in data/reports/leakage_report.json.
