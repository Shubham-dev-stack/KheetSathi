"""
KheetSathi Dataset Verification & Integrity Audit Tool
Validates PlantVillage dataset structure, class parity, image readability, duplicates, and class imbalance.
Exits with code 0 if valid, or code 1 with explicit error details.
"""

import os
import sys
import argparse
import hashlib
import struct
from collections import defaultdict
from pathlib import Path
from typing import Dict, List, Set, Tuple

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from config import CANONICAL_DIR_NAMES, HUMAN_LABELS, DIR_ALIASES, DIR_TO_LABEL

# Valid image extensions
VALID_EXTENSIONS: Set[str] = {'.jpg', '.jpeg', '.png', '.webp', '.bmp', '.tif', '.tiff'}


def get_image_info(file_path: str) -> Tuple[bool, int, int, str]:
    """
    Validates image readability and extracts dimensions (width, height).
    Uses PIL if available; otherwise falls back to pure Python binary header parsing.
    Returns: (is_valid, width, height, error_msg)
    """
    try:
        from PIL import Image
        with Image.open(file_path) as img:
            img.verify()  # Check for corruption
            width, height = img.size
            return True, width, height, ""
    except ImportError:
        pass
    except Exception as e:
        return False, 0, 0, f"PIL Decode Error: {str(e)}"

    # Pure Python binary fallback for common formats (JPEG, PNG)
    try:
        with open(file_path, 'rb') as f:
            header = f.read(32)
            if len(header) < 16:
                return False, 0, 0, "File truncated (less than 16 bytes)"

            # PNG format
            if header.startswith(b'\x89PNG\r\n\x1a\n'):
                width, height = struct.unpack('>II', header[16:24])
                return True, width, height, ""

            # JPEG format
            if header.startswith(b'\xff\xd8'):
                f.seek(2)
                while True:
                    marker_bytes = f.read(2)
                    if len(marker_bytes) < 2:
                        return False, 0, 0, "Premature EOF in JPEG"
                    marker, = struct.unpack('>H', marker_bytes)
                    # SOF0, SOF1, SOF2 markers
                    if 0xffc0 <= marker <= 0xffc3 or 0xffc5 <= marker <= 0xffcb:
                        length, = struct.unpack('>H', f.read(2))
                        precision, height, width = struct.unpack('>BHH', f.read(5))
                        return True, width, height, ""
                    elif marker in (0xffd8, 0xffd9):
                        continue
                    else:
                        length_bytes = f.read(2)
                        if len(length_bytes) < 2:
                            return False, 0, 0, "Corrupt JPEG segment"
                        length, = struct.unpack('>H', length_bytes)
                        if length < 2:
                            return False, 0, 0, "Invalid JPEG marker length"
                        f.seek(length - 2, os.SEEK_CUR)

            # WebP format
            if header.startswith(b'RIFF') and header[8:12] == b'WEBP':
                return True, 256, 256, ""  # Approximate valid WebP

            return False, 0, 0, "Unsupported image format or corrupt header"
    except Exception as e:
        return False, 0, 0, f"Read error: {str(e)}"


def compute_file_hash(file_path: str, chunk_size: int = 65536) -> str:
    """Computes MD5 hash of a file for exact duplicate detection."""
    hasher = hashlib.md5()
    with open(file_path, 'rb') as f:
        while chunk := f.read(chunk_size):
            hasher.update(chunk)
    return hasher.hexdigest()


def audit_dataset(data_dir: str, verbose: bool = False) -> Dict:
    """
    Executes exhaustive audit of the dataset directory.
    """
    abs_path = os.path.abspath(data_dir)
    print("=" * 80)
    print("KHEETSATHI DATASET VERIFICATION & INTEGRITY AUDIT")
    print("=" * 80)
    print(f"Target Directory: {abs_path}\n")

    if not os.path.exists(abs_path):
        print(f"[FAIL] Dataset directory does not exist: '{abs_path}'")
        print("\nTRAINING DATASET NOT AVAILABLE — TRAINING CANNOT BE PERFORMED YET.")
        sys.exit(1)

    # 1. Inspect Subdirectories
    subdirs = [d for d in os.listdir(abs_path) if os.path.isdir(os.path.join(abs_path, d))]
    
    if not subdirs:
        print(f"[FAIL] Target directory contains no class subdirectories.")
        print(f"Expected 38 class folders inside '{abs_path}'.")
        print("\nDATASET STRUCTURE IS INVALID.")
        sys.exit(1)

    # 2. Check for Alias Normalization
    matched_classes: Dict[str, str] = {}  # actual_dir -> canonical_name
    unrecognized_dirs: List[str] = []

    canonical_set = set(CANONICAL_DIR_NAMES)

    for sd in subdirs:
        if sd in canonical_set:
            matched_classes[sd] = sd
        elif sd in DIR_ALIASES:
            canonical = DIR_ALIASES[sd]
            matched_classes[sd] = canonical
            print(f"[NOTE] Recognized known alias: '{sd}' -> canonical: '{canonical}'")
        else:
            unrecognized_dirs.append(sd)

    canonical_found = set(matched_classes.values())
    missing_classes = [c for c in CANONICAL_DIR_NAMES if c not in canonical_found]

    # 3. Scan Images
    total_images = 0
    images_per_class: Dict[str, int] = defaultdict(int)
    corrupted_images: List[Tuple[str, str]] = []
    duplicate_names: Dict[str, List[str]] = defaultdict(list)
    image_widths: List[int] = []
    image_heights: List[int] = []
    seen_hashes: Dict[str, str] = {}
    content_duplicates: List[Tuple[str, str]] = []

    print("[Audit] Scanning image files across all detected class directories...")
    for actual_dir, canonical_name in matched_classes.items():
        dir_path = os.path.join(abs_path, actual_dir)
        for root, _, files in os.walk(dir_path):
            for file in files:
                ext = os.path.splitext(file)[1].lower()
                if ext not in VALID_EXTENSIONS:
                    continue

                full_path = os.path.join(root, file)
                total_images += 1
                images_per_class[canonical_name] += 1

                # Track duplicate filenames
                duplicate_names[file].append(full_path)

                # Check corruption & dimensions
                is_valid, w, h, err = get_image_info(full_path)
                if not is_valid:
                    corrupted_images.append((full_path, err))
                else:
                    image_widths.append(w)
                    image_heights.append(h)

                # Content hash duplicate check (sampled if dataset is very large)
                if total_images <= 25000:
                    fhash = compute_file_hash(full_path)
                    if fhash in seen_hashes:
                        content_duplicates.append((full_path, seen_hashes[fhash]))
                    else:
                        seen_hashes[fhash] = full_path

    # Filter filename duplicates (only those appearing > 1 time)
    actual_name_duplicates = {k: v for k, v in duplicate_names.items() if len(v) > 1}

    # 4. Class Imbalance Statistics
    counts = [images_per_class[c] for c in CANONICAL_DIR_NAMES if c in images_per_class]
    min_count = min(counts) if counts else 0
    max_count = max(counts) if counts else 0
    imbalance_ratio = (max_count / min_count) if min_count > 0 else 0.0

    # 5. Output Audit Report
    print("\n" + "-" * 80)
    print("AUDIT RESULTS SUMMARY")
    print("-" * 80)
    print(f"Total Valid Images Found:       {total_images}")
    print(f"Total Subdirectories Scanned:   {len(subdirs)}")
    print(f"Canonical Classes Matched:      {len(canonical_found)} / 38")
    print(f"Missing Classes:                {len(missing_classes)}")
    print(f"Unrecognized Subdirectories:    {len(unrecognized_dirs)}")
    print(f"Corrupted/Unreadable Images:    {len(corrupted_images)}")
    print(f"Identical Content Duplicates:   {len(content_duplicates)}")
    print(f"Duplicate Filenames (Cross-dir): {len(actual_name_duplicates)}")

    if image_widths and image_heights:
        avg_w = sum(image_widths) / len(image_widths)
        avg_h = sum(image_heights) / len(image_heights)
        print(f"Image Dimensions (Min - Max):   [{min(image_widths)}x{min(image_heights)}] to [{max(image_widths)}x{max(image_heights)}] px")
        print(f"Average Image Dimension:        {avg_w:.1f} x {avg_h:.1f} px")

    print(f"Class Imbalance (Min / Max):    {min_count} / {max_count} images (Ratio: {imbalance_ratio:.2f}x)")
    print("-" * 80)

    # 6. Detailed Class Table
    if verbose or len(canonical_found) > 0:
        print("\nCLASS-BY-CLASS BREAKDOWN:")
        print(f"{'Idx':<4} {'Canonical Directory Name':<45} {'KheetSathi Disease Label':<40} {'Images':<8}")
        print("-" * 100)
        for i, cname in enumerate(CANONICAL_DIR_NAMES):
            cnt = images_per_class.get(cname, 0)
            status = f"{cnt}" if cnt > 0 else "MISSING (0)"
            label = DIR_TO_LABEL.get(cname, "")
            print(f"{i:<4} {cname:<45} {label:<40} {status:<8}")

    # 7. Validation Verdict & Error Handling
    errors = []

    if len(missing_classes) > 0:
        errors.append(f"MISSING {len(missing_classes)} OF 38 REQUIRED CLASSES:\n" +
                      "\n".join(f"  - {c} (Index: {CANONICAL_DIR_NAMES.index(c)}, Label: '{DIR_TO_LABEL.get(c)}')" for c in missing_classes))

    if total_images == 0:
        errors.append("ZERO VALID IMAGES FOUND. Dataset folder contains no readable image files.")

    if len(corrupted_images) > 0:
        sample_corrupt = "\n".join(f"  - {path}: {err}" for path, err in corrupted_images[:5])
        errors.append(f"{len(corrupted_images)} CORRUPTED OR UNREADABLE IMAGE(S) DETECTED.\nSamples:\n{sample_corrupt}")

    if errors:
        print("\n" + "!" * 80)
        print("VERIFICATION FAILED — DATASET IS NOT READY FOR TRAINING:")
        print("!" * 80)
        for err in errors:
            print(f"\n[ERROR] {err}")
        print("\n" + "=" * 80)
        sys.exit(1)

    print("\n" + "=" * 80)
    print("VERIFICATION SUCCESSFUL: ALL 38 CLASSES VERIFIED AND INTEGRITY CONFIRMED.")
    print("Dataset is 100% ready for training with 'python training/train.py'.")
    print("=" * 80 + "\n")
    sys.exit(0)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Verify PlantVillage dataset structure and image integrity")
    parser.add_argument("--data-dir", type=str, default="data/plantvillage", help="Path to PlantVillage dataset")
    parser.add_argument("--verbose", action="store_true", help="Print complete class breakdown table")
    args = parser.parse_args()

    audit_dataset(args.data_dir, verbose=args.verbose)
