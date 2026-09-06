import os
import sys
import glob
import hashlib
from PIL import Image
import json

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from config import CANONICAL_DIR_NAMES

IMAGE_EXTS = {'.jpg', '.jpeg', '.png', '.bmp', '.webp', '.JPG', '.JPEG', '.PNG'}

def get_hash(filepath):
    hasher = hashlib.sha256()
    with open(filepath, 'rb') as f:
        while chunk := f.read(65536):
            hasher.update(chunk)
    return hasher.hexdigest()

def check_dataset(data_dir):
    print(f"Auditing PlantVillage at: {data_dir}")
    
    # Filter only genuine canonical class directories
    all_dirs = [d for d in os.listdir(data_dir) if os.path.isdir(os.path.join(data_dir, d))]
    classes = sorted([d for d in all_dirs if d in CANONICAL_DIR_NAMES])
    extra_dirs = [d for d in all_dirs if d not in CANONICAL_DIR_NAMES]
    
    print(f"Found {len(classes)} / {len(CANONICAL_DIR_NAMES)} canonical classes.")
    if extra_dirs:
        print(f"WARNING: Found unexpected non-canonical directories: {extra_dirs}")
    if len(classes) != 38:
        print(f"WARNING: Class count is not exactly 38! Missing: {set(CANONICAL_DIR_NAMES) - set(classes)}")
        
    stats = {}
    corrupt = []
    duplicates = {}
    seen_hashes = {}
    
    for cls in classes:
        cls_dir = os.path.join(data_dir, cls)
        # Fully recursive glob across all nested subdirectories
        all_files = glob.glob(os.path.join(cls_dir, '**', '*.*'), recursive=True)
        images = [f for f in all_files if os.path.splitext(f)[1] in IMAGE_EXTS]
        valid_count = 0
        
        for img_path in images:
            try:
                with Image.open(img_path) as img:
                    img.verify()
                    
                with Image.open(img_path) as img:
                    width, height = img.size
                    
                h = get_hash(img_path)
                if h in seen_hashes:
                    if h not in duplicates:
                        duplicates[h] = [seen_hashes[h]]
                    duplicates[h].append(img_path)
                else:
                    seen_hashes[h] = img_path
                    
                valid_count += 1
            except Exception as e:
                corrupt.append((img_path, str(e)))
                
        stats[cls] = valid_count
        print(f"[{cls}]: {valid_count} images")

    total_valid = sum(stats.values())
    exact_dups = sum(len(v)-1 for v in duplicates.values())
    
    print(f"\n--- AUDIT SUMMARY ---")
    print(f"Total Valid Images: {total_valid}")
    print(f"Corrupt Files: {len(corrupt)}")
    print(f"Exact Duplicates (SHA256): {exact_dups}")
    
    manifest_path = 'data/manifests/plantvillage_manifest.json'
    os.makedirs(os.path.dirname(manifest_path), exist_ok=True)
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump({
            "classes": classes,
            "class_counts": stats,
            "total_valid": total_valid,
            "corrupt_files": corrupt,
            "duplicate_count": exact_dups
        }, f, indent=2)
    print(f"Saved verified manifest to: {manifest_path}")

if __name__ == "__main__":
    check_dataset("data/plantvillage_raw")
