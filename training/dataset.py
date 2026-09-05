"""
KheetSathi Crop Disease Dataset & Stratified DataLoader Module
"""

import os
import random
from typing import Dict, List, Tuple
from pathlib import Path

try:
    import torch
    from torch.utils.data import DataLoader, Dataset, Subset
    from torchvision import datasets, transforms
    from sklearn.model_selection import StratifiedShuffleSplit
except ImportError:
    torch = None


def get_transforms(config):
    """
    Constructs train and validation/test transforms matching KheetSathi's preprocessing:
    - Train: Agricultural field augmentations (rotations, color jitter for sunlight/shadows, crops)
    - Val/Test: Shortest edge 256px -> Center crop 224x224px -> Normalization [-1.0, 1.0]
    """
    if torch is None:
        raise ImportError("PyTorch and torchvision must be installed to create transforms.")

    train_transform = transforms.Compose([
        transforms.Resize(config.shortest_edge),
        transforms.RandomResizedCrop(config.image_size, scale=(0.8, 1.0)),
        transforms.RandomHorizontalFlip(p=0.5),
        transforms.RandomVerticalFlip(p=0.2),
        transforms.RandomRotation(degrees=30),
        transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2, hue=0.05),
        transforms.ToTensor(),
        transforms.Normalize(mean=config.norm_mean, std=config.norm_std)
    ])

    eval_transform = transforms.Compose([
        transforms.Resize(config.shortest_edge),
        transforms.CenterCrop(config.image_size),
        transforms.ToTensor(),
        transforms.Normalize(mean=config.norm_mean, std=config.norm_std)
    ])

    return train_transform, eval_transform


def build_dataloaders(config) -> Tuple[DataLoader, DataLoader, DataLoader, Dict[int, str]]:
    """
    Builds stratified train, validation, and test DataLoaders from a directory of images.
    Guarantees zero data leakage and preserves class distribution across all splits.
    
    Raises:
        FileNotFoundError: If the dataset directory is missing or empty.
    """
    if not os.path.exists(config.data_dir):
        raise FileNotFoundError(
            f"TRAINING DATASET NOT AVAILABLE — TRAINING CANNOT BE PERFORMED YET.\n"
            f"Expected dataset directory not found at: '{os.path.abspath(config.data_dir)}'\n"
            f"Please download the PlantVillage dataset (e.g. from Kaggle/Zenodo) and place classes into '{config.data_dir}'."
        )

    # Check that directory contains subfolders or images
    subdirs = [d for d in os.listdir(config.data_dir) if os.path.isdir(os.path.join(config.data_dir, d))]
    if not subdirs:
        raise FileNotFoundError(
            f"TRAINING DATASET NOT AVAILABLE — TRAINING CANNOT BE PERFORMED YET.\n"
            f"Directory '{config.data_dir}' exists but contains no class subdirectories."
        )

    train_transform, eval_transform = get_transforms(config)

    # Base dataset for indexing
    base_dataset = datasets.ImageFolder(root=config.data_dir)
    class_to_idx = base_dataset.class_to_idx
    idx_to_class = {v: k for k, v in class_to_idx.items()}
    targets = [s[1] for s in base_dataset.samples]

    total_samples = len(targets)
    if total_samples == 0:
        raise ValueError(f"No image files found in '{config.data_dir}'.")

    # Stratified Split 1: Train vs (Val + Test)
    val_test_ratio = config.val_ratio + config.test_ratio
    sss1 = StratifiedShuffleSplit(n_splits=1, test_size=val_test_ratio, random_state=config.random_seed)
    train_indices, val_test_indices = next(sss1.split(range(total_samples), targets))

    # Stratified Split 2: Val vs Test
    val_test_targets = [targets[i] for i in val_test_indices]
    relative_test_ratio = config.test_ratio / val_test_ratio
    sss2 = StratifiedShuffleSplit(n_splits=1, test_size=relative_test_ratio, random_state=config.random_seed)
    val_sub_indices, test_sub_indices = next(sss2.split(val_test_indices, val_test_targets))

    val_indices = [val_test_indices[i] for i in val_sub_indices]
    test_indices = [val_test_indices[i] for i in test_sub_indices]

    # Create distinct dataset instances with appropriate transforms
    train_dataset = datasets.ImageFolder(root=config.data_dir, transform=train_transform)
    val_dataset = datasets.ImageFolder(root=config.data_dir, transform=eval_transform)
    test_dataset = datasets.ImageFolder(root=config.data_dir, transform=eval_transform)

    train_set = Subset(train_dataset, train_indices)
    val_set = Subset(val_dataset, val_indices)
    test_set = Subset(test_dataset, test_indices)

    print(f"[Dataset] Found {total_samples} total images across {len(class_to_idx)} classes.")
    print(f"[Dataset] Stratified Splits -> Train: {len(train_set)} ({config.train_ratio*100:.0f}%), "
          f"Val: {len(val_set)} ({config.val_ratio*100:.0f}%), "
          f"Test: {len(test_set)} ({config.test_ratio*100:.0f}%)")

    train_loader = DataLoader(
        train_set,
        batch_size=config.batch_size,
        shuffle=True,
        num_workers=config.num_workers,
        pin_memory=True
    )

    val_loader = DataLoader(
        val_set,
        batch_size=config.batch_size,
        shuffle=False,
        num_workers=config.num_workers,
        pin_memory=True
    )

    test_loader = DataLoader(
        test_set,
        batch_size=config.batch_size,
        shuffle=False,
        num_workers=config.num_workers,
        pin_memory=True
    )

    return train_loader, val_loader, test_loader, idx_to_class
