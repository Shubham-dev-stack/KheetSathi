import os
import urllib.request
import zipfile
import shutil
import re

def sanitize_filename(name):
    return re.sub(r'[<>:"/\\|?*]', '_', name)

def download_and_extract_plantdoc():
    url = "https://github.com/pratikkayal/PlantDoc-Dataset/archive/refs/heads/master.zip"
    pd_zip = 'data/plantdoc.zip'
    pd_raw = r'\\?\%s' % os.path.abspath('data/plantdoc_raw')
    
    print("Downloading PlantDoc...")
    urllib.request.urlretrieve(url, pd_zip)
    
    print("Extracting PlantDoc with NTFS sanitization...")
    with zipfile.ZipFile(pd_zip, 'r') as z:
        for info in z.infolist():
            # Skip directories
            if info.filename.endswith('/'): continue
            
            # We want to extract images from train/ and test/ only
            parts = info.filename.split('/')
            # structure: PlantDoc-Dataset-master/train/Class_Name/image.jpg
            if len(parts) >= 4 and parts[1] in ['train', 'test']:
                cls_name = parts[2]
                filename = parts[-1]
                
                # Sanitize filename (replaces ? with _)
                safe_filename = sanitize_filename(filename)
                
                # Build target path
                target_dir = os.path.join(pd_raw, cls_name)
                os.makedirs(target_dir, exist_ok=True)
                
                target_path = os.path.join(target_dir, safe_filename)
                
                with z.open(info.filename) as source, open(target_path, "wb") as target:
                    shutil.copyfileobj(source, target)
                    
    os.remove(pd_zip)
    print("PlantDoc extraction and sanitization complete!")

if __name__ == '__main__':
    download_and_extract_plantdoc()
