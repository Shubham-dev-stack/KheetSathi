import os
import zipfile
import shutil

def extract_and_organize():
    # 1. Rice OOD
    ood_zip = 'data/ood_raw/rice-leaf-diseases.zip'
    if os.path.exists(ood_zip):
        print(f"Extracting {ood_zip}...")
        with zipfile.ZipFile(ood_zip, 'r') as zip_ref:
            zip_ref.extractall('data/ood_raw')
        os.remove(ood_zip)
        
        extracted = os.listdir('data/ood_raw')
        if len(extracted) == 1 and os.path.isdir(os.path.join('data/ood_raw', extracted[0])):
            subfolder = os.path.join('data/ood_raw', extracted[0])
            for item in os.listdir(subfolder):
                shutil.move(os.path.join(subfolder, item), 'data/ood_raw')
            os.rmdir(subfolder)
            
    # 2. PlantVillage
    pv_zip = 'data/plantvillage_raw/plantdisease.zip'
    if os.path.exists(pv_zip):
        print(f"Extracting {pv_zip} (This may take a while)...")
        with zipfile.ZipFile(pv_zip, 'r') as zip_ref:
            zip_ref.extractall('data/plantvillage_raw')
        os.remove(pv_zip)
        
        pv_sub = 'data/plantvillage_raw/PlantVillage'
        if os.path.exists(pv_sub):
            for item in os.listdir(pv_sub):
                shutil.move(os.path.join(pv_sub, item), 'data/plantvillage_raw')
            os.rmdir(pv_sub)
            
    # 3. PlantDoc
    pd_zip = 'data/plantdoc_raw/plantdoc.zip'
    if os.path.exists(pd_zip):
        print(f"Extracting {pd_zip}...")
        with zipfile.ZipFile(pd_zip, 'r') as zip_ref:
            zip_ref.extractall('data/plantdoc_raw')
        os.remove(pd_zip)
        
        pd_repo = 'data/plantdoc_raw/PlantDoc-Dataset-master'
        if os.path.exists(pd_repo):
            for split in ['train', 'test']:
                split_dir = os.path.join(pd_repo, split)
                if os.path.exists(split_dir):
                    for cls in os.listdir(split_dir):
                        src = os.path.join(split_dir, cls)
                        dst = os.path.join('data/plantdoc_raw', cls)
                        if os.path.isdir(src):
                            if not os.path.exists(dst):
                                os.makedirs(dst)
                            for img in os.listdir(src):
                                shutil.move(os.path.join(src, img), dst)
            shutil.rmtree(pd_repo)
            
    print("Extraction and organization complete.")

if __name__ == '__main__':
    extract_and_organize()
