import json
def load_config():
    with open('epstine_file.json', 'r') as file:
        config = json.load(file)
    model = config['ai_model_name']
    dataset = config['dataset_bundle']
    constraint = config['optimization_level']
    criterion = config['criterion']
    device = config['device']
    if criterion == "regression":
        loss = 1
    else:
        loss = 0
    if device == "GPU":
        d = 1
    elif device == "CPU":
        d = 2
    elif device == "MCU":
        d = 3
    else:
        d = 4
    if constraint == "accuracy":
        c = 1
    elif constraint == "latency":
        c = 2
    elif constraint == "size":
        c = 3
    return model, dataset, c, loss, d
compressed_model = "compressed_model.pth"
def save_config():
    with open('epstine_file.json', 'r') as file:
        config = json.load(file)
    config['compressed_model'] = compressed_model
    with open('epstine_file.json', 'w') as file:
        json.dump(config, file, indent=4)
