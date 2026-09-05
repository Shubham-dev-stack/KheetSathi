"""
KheetSathi Crop Disease Classification — Training & Pipeline Configuration
"""

from dataclasses import dataclass, field
from typing import Dict, List, Tuple

# 38 Canonical PlantVillage Directory Names (sorted alphabetically, matching model output indices 0-37)
CANONICAL_DIR_NAMES: List[str] = [
    "Apple___Apple_scab",
    "Apple___Black_rot",
    "Apple___Cedar_apple_rust",
    "Apple___healthy",
    "Blueberry___healthy",
    "Cherry_(including_sour)___Powdery_mildew",
    "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight",
    "Corn_(maize)___healthy",
    "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)",
    "Peach___Bacterial_spot",
    "Peach___healthy",
    "Pepper,_bell___Bacterial_spot",
    "Pepper,_bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Raspberry___healthy",
    "Soybean___healthy",
    "Squash___Powdery_mildew",
    "Strawberry___Leaf_scorch",
    "Strawberry___healthy",
    "Tomato___Bacterial_spot",
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites Two-spotted_spider_mite",
    "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy"
]

# 38 Human-Readable Labels matching model/class_labels.json and model/config.json
HUMAN_LABELS: List[str] = [
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

# For backwards compatibility with scripts importing CLASS_NAMES
CLASS_NAMES: List[str] = HUMAN_LABELS

# Full metadata dictionary for each class
PLANTVILLAGE_CLASSES = [
    {"index": i, "dir_name": CANONICAL_DIR_NAMES[i], "label": HUMAN_LABELS[i]}
    for i in range(38)
]

DIR_TO_INDEX: Dict[str, int] = {name: i for i, name in enumerate(CANONICAL_DIR_NAMES)}
DIR_TO_LABEL: Dict[str, str] = {CANONICAL_DIR_NAMES[i]: HUMAN_LABELS[i] for i in range(38)}
INDEX_TO_DIR: Dict[int, str] = {i: CANONICAL_DIR_NAMES[i] for i in range(38)}
INDEX_TO_LABEL: Dict[int, str] = {i: HUMAN_LABELS[i] for i in range(38)}

# Known minor naming variations found in different releases/mirrors of PlantVillage
DIR_ALIASES: Dict[str, str] = {
    "Corn_(maize)___Common_rust": "Corn_(maize)___Common_rust_",
    "Pepper__bell___Bacterial_spot": "Pepper,_bell___Bacterial_spot",
    "Pepper_bell___Bacterial_spot": "Pepper,_bell___Bacterial_spot",
    "Pepper__bell___healthy": "Pepper,_bell___healthy",
    "Pepper_bell___healthy": "Pepper,_bell___healthy",
    "Orange___Citrus_greening": "Orange___Haunglongbing_(Citrus_greening)",
    "Cherry___Powdery_mildew": "Cherry_(including_sour)___Powdery_mildew",
    "Cherry___healthy": "Cherry_(including_sour)___healthy",
    "Corn___Cercospora_leaf_spot Gray_leaf_spot": "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    "Corn___Common_rust": "Corn_(maize)___Common_rust_",
    "Corn___Common_rust_": "Corn_(maize)___Common_rust_",
    "Corn___Northern_Leaf_Blight": "Corn_(maize)___Northern_Leaf_Blight",
    "Corn___healthy": "Corn_(maize)___healthy"
}

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
