import os
import glob
import hashlib
from PIL import Image
import json

def get_hash(filepath):
    hasher = hashlib.sha256()
    with open(filepath, 'rb') as f:
        hasher.update(f.read())
    return hasher.hexdigest()

def check_dataset(data_dir):
    print(f"Auditing PlantVillage at: {data_dir}")
    classes = sorted([d for d in os.listdir(data_dir) if os.path.isdir(os.path.join(data_dir, d))])
    print(f"Found {len(classes)} classes (Expected: 38)")
    
    if len(classes) != 38:
        print("WARNING: Class count is not exactly 38!")
        
    stats = {}
    corrupt = []
    duplicates = {}
    seen_hashes = {}
    
    for cls in classes:
        cls_dir = os.path.join(data_dir, cls)
        images = glob.glob(os.path.join(cls_dir, '*.*'))
        valid_count = 0
        
        for img_path in images:
            try:
                with Image.open(img_path) as img:
                    img.verify()
                    
                # Reopen to check dimensions (verify() doesn't load data)
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

    print(f"\n--- AUDIT SUMMARY ---")
    print(f"Total Valid Images: {sum(stats.values())}")
    print(f"Corrupt Files: {len(corrupt)}")
    print(f"Exact Duplicates (SHA256): {sum(len(v)-1 for v in duplicates.values())}")
    
    with open('data/manifests/plantvillage_manifest.json', 'w') as f:
        json.dump({
            "classes": classes,
            "class_counts": stats,
            "total_valid": sum(stats.values()),
            "corrupt_files": corrupt,
            "duplicates": duplicates
        }, f, indent=4)
        
if __name__ == "__main__":
    check_dataset("data/plantvillage_raw")
