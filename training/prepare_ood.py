import os
import glob
import json
import hashlib

def get_sha256(filepath):
    hasher = hashlib.sha256()
    with open(filepath, 'rb') as f:
        hasher.update(f.read())
    return hasher.hexdigest()

def prepare_ood(data_dir):
    print(f"Auditing OOD dataset at: {data_dir}")
    if not os.path.exists(data_dir):
        print("OOD raw directory not found.")
        return
        
    classes = sorted([d for d in os.listdir(data_dir) if os.path.isdir(os.path.join(data_dir, d))])
    
    manifest = {
        "dataset": "Rice_OOD",
        "classes": classes,
        "class_counts": {},
        "files": []
    }
    
    total = 0
    for cls in classes:
        cls_dir = os.path.join(data_dir, cls)
        images = glob.glob(os.path.join(cls_dir, '*.*'))
        
        manifest["class_counts"][cls] = len(images)
        total += len(images)
        
        for img in images:
            manifest["files"].append({
                "path": img,
                "class": cls,
                "sha256": get_sha256(img)
            })
            
    print(f"\n--- OOD AUDIT SUMMARY ---")
    print(f"Total OOD Images: {total}")
    for cls, count in manifest["class_counts"].items():
        print(f"  - {cls}: {count}")
        
    with open('data/manifests/ood_manifest.json', 'w') as f:
        json.dump(manifest, f, indent=4)
        
if __name__ == "__main__":
    prepare_ood("data/ood_raw")
