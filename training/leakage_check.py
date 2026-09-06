import os
import glob
import json
import hashlib
from PIL import Image
import numpy as np

def get_sha256(filepath):
    hasher = hashlib.sha256()
    with open(filepath, 'rb') as f:
        hasher.update(f.read())
    return hasher.hexdigest()

def get_phash(filepath):
    try:
        with Image.open(filepath) as img:
            img = img.convert("L").resize((8, 8), Image.Resampling.LANCZOS)
            pixels = np.array(img.getdata()).reshape((8, 8))
            avg = pixels.mean()
            diff = pixels > avg
            return sum(1 << i for i, v in enumerate(diff.flatten()) if v)
    except:
        return None

def hamming_distance(hash1, hash2):
    return bin(hash1 ^ hash2).count('1')

def check_leakage(pv_dir, pd_dir):
    print("Starting Leakage Detection (PV vs PlantDoc)...")
    
    pv_images = glob.glob(os.path.join(pv_dir, '**', '*.*'), recursive=True)
    pd_images = glob.glob(os.path.join(pd_dir, '**', '*.*'), recursive=True)
    
    pv_images = [f for f in pv_images if os.path.isfile(f)]
    pd_images = [f for f in pd_images if os.path.isfile(f)]
    
    print(f"Hashing {len(pv_images)} PlantVillage images...")
    pv_hashes = {}
    for i, img in enumerate(pv_images):
        pv_hashes[img] = {
            "sha256": get_sha256(img),
            "phash": get_phash(img)
        }
        if i > 0 and i % 5000 == 0:
            print(f"  ... {i} done")
            
    print(f"Hashing {len(pd_images)} PlantDoc images...")
    pd_hashes = {}
    for img in pd_images:
        pd_hashes[img] = {
            "sha256": get_sha256(img),
            "phash": get_phash(img)
        }
        
    print("Comparing hashes...")
    
    # 1. Exact SHA256 matches
    pv_sha256_map = {v["sha256"]: k for k, v in pv_hashes.items()}
    exact_collisions = []
    
    for pd_img, h in pd_hashes.items():
        if h["sha256"] in pv_sha256_map:
            exact_collisions.append({
                "plantdoc_file": pd_img,
                "plantvillage_file": pv_sha256_map[h["sha256"]]
            })
            
    # 2. Perceptual hash matches (Hamming < 5)
    # This is O(N*M), so we only do it if counts are reasonable, or we optimize.
    # For ~2500 PD vs ~54000 PV, it's ~135 million comparisons. Feasible in Python.
    phash_collisions = []
    
    # To speed up, we can filter out None hashes
    pv_p = {k: v["phash"] for k, v in pv_hashes.items() if v["phash"] is not None}
    pd_p = {k: v["phash"] for k, v in pd_hashes.items() if v["phash"] is not None}
    
    for pd_img, pd_hash in pd_p.items():
        for pv_img, pv_hash in pv_p.items():
            if hamming_distance(pd_hash, pv_hash) < 5:
                phash_collisions.append({
                    "plantdoc_file": pd_img,
                    "plantvillage_file": pv_img,
                    "distance": hamming_distance(pd_hash, pv_hash)
                })
                break # Only need one collision to flag it
                
    report = {
        "exact_sha256_collisions": exact_collisions,
        "perceptual_collisions": phash_collisions,
        "total_flagged_plantdoc": len(set([x["plantdoc_file"] for x in exact_collisions] + [x["plantdoc_file"] for x in phash_collisions]))
    }
    
    print(f"\n--- LEAKAGE REPORT ---")
    print(f"Exact Collisions: {len(exact_collisions)}")
    print(f"Perceptual Collisions (<5 distance): {len(phash_collisions)}")
    print(f"Total PlantDoc Images Flagged for Exclusion: {report['total_flagged_plantdoc']}")
    
    with open('data/reports/leakage_report.json', 'w') as f:
        json.dump(report, f, indent=4)

if __name__ == "__main__":
    if os.path.exists("data/plantvillage_raw") and os.path.exists("data/plantdoc_raw"):
        check_leakage("data/plantvillage_raw", "data/plantdoc_raw")
    else:
        print("Raw directories not found.")
