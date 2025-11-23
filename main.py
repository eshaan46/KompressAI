# Libraries
import pandas as pd
import torch
import json_file as jf
import copy
import torch.nn as nn
import torch.nn.functional as F
import torch.nn.utils.prune as prune
import os
import torch.quantization

# Variables
device = "cuda" if torch.cuda.is_available() else "cpu"
compression_model = torch.load('compression_model.pth', weights_only=False)
compression_model.to(device)
compression_model.eval()
# Helper: robust model device getter
def get_model_device(model, X=None):
    try:
        return next(model.parameters()).device
    except StopIteration:
        try:
            return next(model.buffers()).device
        except StopIteration:
            if isinstance(X, torch.Tensor):
                return X.device
            return torch.device("cpu")
# Generic evaluation
def evaluate_model(model, X, y, criterion: int):
    model.eval()
    model_device = get_model_device(model, X)

    X_dev = X.to(model_device)
    y_dev = y.to(model_device)

    with torch.no_grad():
        outputs = model(X_dev)

        if criterion == 0:
            # Classification
            if outputs.dim() == 1:
                outputs = outputs.unsqueeze(1)
            loss = F.cross_entropy(outputs, y_dev.long())
            print(f"CE loss: {loss.item():.4f}")

        elif criterion == 1:
            # Regression
            if outputs.shape == y_dev.shape:
                outputs_flat = outputs.float()
            elif outputs.dim() == 2 and outputs.size(1) == 1 and y_dev.dim() == 1:
                outputs_flat = outputs.squeeze(1).float()
            else:
                raise ValueError(
                    f"For MSE, expected model output shape {y_dev.shape} or [N,1], "
                    f"but got {tuple(outputs.shape)}."
                )
            loss = F.mse_loss(outputs_flat, y_dev.float())
            print(f"MSE: {loss.item():.4f}")

        else:
            raise ValueError("criterion must be 0 (CrossEntropy) or 1 (MSE)")

    return loss.item()
# 1. Dynamic Quantization (Post-Training, CPU-only)
def apply_dynamic_quantization(model, X, y, criterion: int):
    m = copy.deepcopy(model).cpu().eval()

    m_quant = torch.quantization.quantize_dynamic(
        m,
        {nn.Linear},
        dtype=torch.qint8
    )

    print("[Dynamic Quantization]")
    return m_quant
# 2. Unstructured Magnitude Pruning
def apply_unstructured_pruning(model, X, y, criterion: int, amount: float = 0.3):
    device_m = get_model_device(model, X)
    m = copy.deepcopy(model).to(device_m).eval()

    for module in m.modules():
        if isinstance(module, nn.Linear):
            prune.l1_unstructured(module, name="weight", amount=amount)
            prune.remove(module, "weight")

    print(f"[Unstructured Pruning amount={amount}]")
    return m
# 3. Weight Sharing (Simple Uniform Quantization of Weights)
def apply_weight_sharing(model, X, y, criterion: int, K: int = 16):
    device_m = get_model_device(model, X)
    m = copy.deepcopy(model).to(device_m).eval()

    def quantize_param(param, K):
        with torch.no_grad():
            w = param.data.view(-1)
            if w.numel() == 0:
                return
            w_min, w_max = w.min(), w.max()
            if w_min == w_max:
                return
            centers = torch.linspace(w_min, w_max, steps=K, device=w.device)
            diff = w.unsqueeze(1) - centers.unsqueeze(0)
            idx = torch.argmin(diff.abs(), dim=1)
            w_q = centers[idx]
            param.data.copy_(w_q.view_as(param.data))

    for module in m.modules():
        if isinstance(module, nn.Linear):
            quantize_param(module.weight, K)

    print(f"[Weight Sharing K={K}]")
    return m
# 4. Layer Dropping (for arbitrary nn.Sequential)
def apply_layer_dropping(model, X, y, criterion: int):
    if not isinstance(model, nn.Sequential):
        raise ValueError("Layer dropping expects an nn.Sequential model.")

    device_m = get_model_device(model, X)
    orig_layers = list(model.children())
    n = len(orig_layers)

    if n <= 2:
        m = copy.deepcopy(model).to(device_m).eval()
        print("[Layer Dropping] (nothing to drop, model too shallow)")
        return m

    keep_indices = [0]
    for i in range(1, n - 1):
        if i % 2 == 0:
            keep_indices.append(i)
    if (n - 1) not in keep_indices:
        keep_indices.append(n - 1)

    new_layers = [copy.deepcopy(orig_layers[i]) for i in keep_indices]
    m = nn.Sequential(*new_layers).to(device_m).eval()

    print(f"[Layer Dropping] kept layer indices: {keep_indices}")
    return m
# 5. JIT Fusion (TorchScript tracing)
def apply_jit_fusion(model, X, y, criterion: int):
    device_m = get_model_device(model, X)
    m = copy.deepcopy(model).to(device_m).eval()

    example_input = X[:1].to(device_m)
    traced = torch.jit.trace(m, example_input)

    print("[JIT Fusion]")
    return traced
# MAIN
model_location, data_set_location, constraint, criterion, platform = jf.load_config()
criterion = int(criterion)
usser_model = torch.load(model_location, weights_only=False)
usser_model.to(device)
usser_model.eval()
df = pd.read_csv(data_set_location)
X = torch.tensor(df.drop("target", axis=1).values, dtype=torch.float32)
y = torch.tensor(df["target"].values)
platform_val = float(platform)
constraint_val = float(constraint)
z = torch.tensor([platform_val, constraint_val], dtype=torch.float32).to(device)

with torch.no_grad():
    logits = compression_model(z)
pred_class_idx = torch.argmax(logits).item()
print("Chosen strategy:", pred_class_idx)

compressed_model = usser_model
if pred_class_idx == 0:
    compressed_model = apply_dynamic_quantization(compressed_model, X, y, criterion)

elif pred_class_idx == 1:
    compressed_model = apply_dynamic_quantization(compressed_model, X, y, criterion)
    compressed_model = apply_layer_dropping(compressed_model, X, y, criterion)

elif pred_class_idx == 2:
    compressed_model = apply_dynamic_quantization(compressed_model, X, y, criterion)
    compressed_model = apply_jit_fusion(compressed_model, X, y, criterion)

elif pred_class_idx == 3:
    compressed_model = apply_dynamic_quantization(compressed_model, X, y, criterion)
    compressed_model = apply_weight_sharing(compressed_model, X, y, criterion)

elif pred_class_idx == 4:
    compressed_model = apply_jit_fusion(compressed_model, X, y, criterion)

elif pred_class_idx == 5:
    compressed_model = apply_jit_fusion(compressed_model, X, y, criterion)
    compressed_model = apply_layer_dropping(compressed_model, X, y, criterion)

elif pred_class_idx == 6:
    compressed_model = apply_jit_fusion(compressed_model, X, y, criterion)
    compressed_model = apply_unstructured_pruning(compressed_model, X, y, criterion)

elif pred_class_idx == 7:
    compressed_model = apply_weight_sharing(compressed_model, X, y, criterion)
    compressed_model = apply_unstructured_pruning(compressed_model, X, y, criterion)
else:
    print("Unknown strategy index, leaving model uncompressed.")

print("\nFinal compressed model performance:")
evaluate_model(compressed_model, X, y, criterion)
if isinstance(compressed_model, torch.jit.ScriptModule) or isinstance(
    compressed_model, torch.jit.RecursiveScriptModule
):
    out_path = "compressed_usser_model.pt"
    torch.jit.save(compressed_model, out_path)
else:
    out_path = "compressed_usser_model.pth"
    torch.save(compressed_model, out_path)
size_bytes = os.path.getsize(out_path)
size_mb = size_bytes / (1024 * 1024)
print(f"Compressed model size: {size_mb:.4f} MB")

orig_bytes = os.path.getsize(model_location)
orig_mb = orig_bytes / (1024 * 1024)
print(f"Original model size:   {orig_mb:.4f} MB")
if orig_mb > 0:
    print(f"Reduction: {((orig_mb - size_mb) / orig_mb) * 100:.8f}%")
jf.compressed_model = out_path
jf.save_config()