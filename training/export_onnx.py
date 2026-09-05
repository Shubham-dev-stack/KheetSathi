"""
KheetSathi ONNX Model Exporter & Numerical Parity Verifier
Converts PyTorch checkpoint to ONNX format matching KheetSathi's JS MLEngine specification.
"""

import os
import sys
import argparse
from pathlib import Path

# Add project root to sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from config import TrainingConfig, CLASS_NAMES

def main():
    parser = argparse.ArgumentParser(description="Export PyTorch Model to ONNX for KheetSathi")
    parser.add_argument("--checkpoint", type=str, default="training/checkpoints/best_model.pth", help="PyTorch checkpoint")
    parser.add_argument("--output-onnx", type=str, default="model/model.onnx", help="Target ONNX export path")
    args = parser.parse_args()

    if not os.path.exists(args.checkpoint):
        print(f"[Error] Checkpoint not found at: '{args.checkpoint}'. Run training/train.py first.")
        sys.exit(1)

    try:
        import torch
        from torchvision import models
        import onnx
        import onnxruntime as ort
        import numpy as np
    except ImportError as e:
        print(f"[Error] Missing dependency: {e}")
        print("Please install requirements: pip install -r training/requirements.txt")
        sys.exit(1)

    config = TrainingConfig()

    print(f"[ONNX Export] Loading weights from: {args.checkpoint}")
    checkpoint = torch.load(args.checkpoint, map_location="cpu")

    model = models.mobilenet_v2()
    in_features = model.classifier[1].in_features
    model.classifier = torch.nn.Sequential(
        torch.nn.Dropout(p=config.dropout_rate),
        torch.nn.Linear(in_features, config.num_classes)
    )
    model.load_state_dict(checkpoint['model_state_dict'])
    model.eval()

    dummy_input = torch.randn(1, 3, config.image_size, config.image_size, dtype=torch.float32)

    os.makedirs(os.path.dirname(os.path.abspath(args.output_onnx)), exist_ok=True)
    print(f"[ONNX Export] Exporting to: {args.output_onnx}")

    torch.onnx.export(
        model,
        dummy_input,
        args.output_onnx,
        export_params=True,
        opset_version=14,
        do_constant_folding=True,
        input_names=['pixel_values'],
        output_names=['logits'],
        dynamic_axes={
            'pixel_values': {0: 'batch_size'},
            'logits': {0: 'batch_size'}
        }
    )

    # Validate ONNX model structure
    onnx_model = onnx.load(args.output_onnx)
    onnx.checker.check_model(onnx_model)
    print("[ONNX Export] ONNX model structure verified successfully.")

    # Numerical Parity Check: PyTorch vs ONNX Runtime
    with torch.no_grad():
        pytorch_logits = model(dummy_input).numpy()

    ort_session = ort.InferenceSession(args.output_onnx, providers=['CPUExecutionProvider'])
    ort_inputs = {'pixel_values': dummy_input.numpy()}
    ort_logits = ort_session.run(None, ort_inputs)[0]

    max_diff = np.max(np.abs(pytorch_logits - ort_logits))
    print(f"[ONNX Export] Numerical parity test: max absolute difference = {max_diff:.6e}")
    if max_diff < 1e-4:
        print("[ONNX Export] SUCCESS: PyTorch and ONNX models produce identical outputs.")
        print(f"File ready for KheetSathi Web application at: {args.output_onnx}")
    else:
        print("[ONNX Export] WARNING: Large numerical divergence detected between PyTorch and ONNX.")

if __name__ == "__main__":
    main()
