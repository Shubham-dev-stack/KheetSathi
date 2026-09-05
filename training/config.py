"""
KheetSathi Crop Disease Classification — Training & Pipeline Configuration
"""

from dataclasses import dataclass, field
from typing import List, Tuple

# 38 PlantVillage Classes in exact alphabetical/index order matching model/class_labels.json
CLASS_NAMES: List[str] = [
    "Apple Scab",
    "Apple with Black Rot",
    "Cedar Apple Rust",
    "Healthy Apple",
    "Healthy Blueberry Plant",
    "Cherry with Powdery Mildew",
    "Healthy Cherry Plant",
    "Corn (Maize) with Cercospora and Gray Leaf Spot",
    "Corn (Maize) with Common Rust",
    "Corn (Maize) with Northern Leaf Blight",
    "Healthy Corn (Maize) Plant",
    "Grape with Black Rot",
    "Grape with Esca (Black Measles)",
    "Grape with Isariopsis Leaf Spot",
    "Healthy Grape Plant",
    "Orange with Citrus Greening",
    "Peach with Bacterial Spot",
    "Healthy Peach Plant",
    "Bell Pepper with Bacterial Spot",
    "Healthy Bell Pepper Plant",
    "Potato with Early Blight",
    "Potato with Late Blight",
    "Healthy Potato Plant",
    "Healthy Raspberry Plant",
    "Healthy Soybean Plant",
    "Squash with Powdery Mildew",
    "Strawberry with Leaf Scorch",
    "Healthy Strawberry Plant",
    "Tomato with Bacterial Spot",
    "Tomato with Early Blight",
    "Tomato with Late Blight",
    "Tomato with Leaf Mold",
    "Tomato with Septoria Leaf Spot",
    "Tomato with Spider Mites or Two-spotted Spider Mite",
    "Tomato with Target Spot",
    "Tomato Yellow Leaf Curl Virus",
    "Tomato Mosaic Virus",
    "Healthy Tomato Plant"
]

@dataclass
class TrainingConfig:
    # Paths
    data_dir: str = "data/plantvillage"
    output_dir: str = "training/checkpoints"
    onnx_output_path: str = "model/model.onnx"
    
    # Model Architecture
    model_name: str = "mobilenet_v2"
    num_classes: int = 38
    pretrained: bool = True
    dropout_rate: float = 0.2
    
    # Input Image Dimensions & Normalization
    # Matches KheetSathi's preprocessor_config.json: shortest_edge 256, center_crop 224, mean=0.5, std=0.5
    image_size: int = 224
    shortest_edge: int = 256
    norm_mean: Tuple[float, float, float] = (0.5, 0.5, 0.5)
    norm_std: Tuple[float, float, float] = (0.5, 0.5, 0.5)
    
    # Training Hyperparameters
    batch_size: int = 32
    num_epochs: int = 30
    learning_rate: float = 1e-4
    weight_decay: float = 1e-2
    label_smoothing: float = 0.1
    
    # Stratified Splits
    train_ratio: float = 0.70
    val_ratio: float = 0.15
    test_ratio: float = 0.15
    random_seed: int = 42
    
    # Hardware & Optimization
    num_workers: int = 4
    early_stopping_patience: int = 5
    lr_scheduler: str = "cosine"  # "cosine" or "step"
    min_lr: float = 1e-6
    
    # Decision Gate Baseline Thresholds (mirrors KheetSathi client-side gates)
    min_raw_confidence: float = 0.30
    min_crop_mass: float = 0.25
    min_conditional_confidence: float = 0.50
    min_top_margin: float = 0.05
    max_ood_entropy: float = 4.25
