import os
import glob
import json

PLANTDOC_MAPPING = {
    "Apple Scab Leaf": {"target": "Apple___Apple_scab", "status": "EXACT"},
    "Apple leaf": {"target": "Apple___healthy", "status": "EXACT"},
    "Apple rust leaf": {"target": "Apple___Cedar_apple_rust", "status": "EXACT"},
    "Bell_pepper leaf spot": {"target": "Pepper,_bell___Bacterial_spot", "status": "EXACT"},
    "Corn leaf blight": {"target": "Corn_(maize)___Northern_Leaf_Blight", "status": "EXACT"},
    "Corn rust leaf": {"target": "Corn_(maize)___Common_rust_", "status": "EXACT"},
    "Potato leaf early blight": {"target": "Potato___Early_blight", "status": "EXACT"},
    "Potato leaf late blight": {"target": "Potato___Late_blight", "status": "EXACT"},
    "Tomato Early blight leaf": {"target": "Tomato___Early_blight", "status": "EXACT"},
    "Tomato Septoria leaf spot": {"target": "Tomato___Septoria_leaf_spot", "status": "EXACT"},
    "Tomato leaf mosaic virus": {"target": "Tomato___Tomato_mosaic_virus", "status": "EXACT"},
    "Tomato leaf yellow virus": {"target": "Tomato___Tomato_Yellow_Leaf_Curl_Virus", "status": "EXACT"},
    "Cherry leaf": {"target": "Cherry_(including_sour)___healthy", "status": "EXACT"},
    "Peach leaf": {"target": "Peach___healthy", "status": "EXACT"},
    
    "Tomato leaf": {"target": "Tomato___healthy", "status": "PARTIAL"},
    "Potato leaf": {"target": "Potato___healthy", "status": "PARTIAL"},
    "Bell_pepper leaf": {"target": "Pepper,_bell___healthy", "status": "PARTIAL"},
    
    "Soybean leaf": {"target": "Soybean___healthy", "status": "UNSUPPORTED"},
    "Squash leaf": {"target": "Squash___Powdery_mildew", "status": "UNSUPPORTED"},
    "Strawberry leaf": {"target": "Strawberry___healthy", "status": "UNSUPPORTED"},
}

def prepare_plantdoc(data_dir):
    print(f"Auditing PlantDoc at: {data_dir}")
    if not os.path.exists(data_dir):
        print("PlantDoc raw directory not found.")
        return
        
    classes = sorted([d for d in os.listdir(data_dir) if os.path.isdir(os.path.join(data_dir, d))])
    
    manifest = {
        "EXACT": {},
        "PARTIAL": {},
        "UNSUPPORTED": {},
        "UNMAPPED": {},
        "files": []
    }
    
    for cls in classes:
        cls_dir = os.path.join(data_dir, cls)
        images = glob.glob(os.path.join(cls_dir, '*.*'))
        
        mapping = PLANTDOC_MAPPING.get(cls, {"target": None, "status": "UNMAPPED"})
        status = mapping["status"]
        
        if cls not in manifest[status]:
            manifest[status][cls] = 0
            
        manifest[status][cls] += len(images)
        
        for img in images:
            manifest["files"].append({
                "path": img,
                "original_class": cls,
                "mapped_class": mapping["target"],
                "status": status
            })
            
    print("\n--- PLANTDOC MAPPING SUMMARY ---")
    for status in ["EXACT", "PARTIAL", "UNSUPPORTED", "UNMAPPED"]:
        print(f"[{status}]: {sum(manifest[status].values())} images")
        for cls, count in manifest[status].items():
            print(f"  - {cls}: {count}")
            
    with open('data/manifests/plantdoc_manifest.json', 'w') as f:
        json.dump(manifest, f, indent=4)
        
if __name__ == "__main__":
    # Assuming PlantDoc classes might be directly in data/plantdoc_raw or inside a train/test subfolder
    prepare_plantdoc("data/plantdoc_raw")
