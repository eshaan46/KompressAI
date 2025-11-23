#libraries
import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim
#variebles
device = "cuda" if torch.cuda.is_available() else "cpu"
#print(device)
csv = "compression_matrix_encoded.csv"
data = pd.read_csv(csv)
X = data.drop("best_strategy",axis=1).values
y = data["best_strategy"].values
X = torch.tensor(X,dtype=torch.float32).to(device)
y = torch.tensor(y,dtype=torch.long).to(device)
#print(X.shape)
#print(y.shape)
#print(X.device)
#print(y.device)
x = 2
model = nn.Sequential(
    nn.Linear(2,x*x),
    nn.SiLU(),
    nn.Linear(x*x,x*x*x),
    nn.SiLU(),
    nn.Linear(x*x*x,x*x*x*x),
    nn.SiLU(),
    nn.Linear(x*x*x*x,x*x*x*x*x),
    nn.SiLU(),
    nn.Linear(x*x*x*x*x,x*x*x*x*x*x),
    nn.SiLU(),
    nn.Linear(x*x*x*x*x*x,x*x*x*x*x),
    nn.SiLU(),
    nn.Linear(x*x*x*x*x,x*x*x*x),
    nn.SiLU(),
    nn.Linear(x*x*x*x,x*x*x),
    nn.SiLU(),
    nn.Linear(x*x*x,x*x*x),

)
model.to(device)
model.float()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(),lr=0.01)
epochs = 1000
#functions
def train(epochs):
    model.train()
    for i in range(epochs):
        optimizer.zero_grad()
        outputs = model(X)
        loss = criterion(outputs.squeeze(),y)
        loss.backward()
        optimizer.step()
        print(outputs.squeeze())
        print(f"{loss.item():.4f}")
def evaluate_model(epochs):
    model.eval()
    print("Evaluating Model...")
    outputs = model(X)
    loss = criterion(outputs, y)
    print(f'Loss: {loss.item():.4f}')


#main propgram
train(epochs)
evaluate_model(epochs)
torch.save(model,"compression_model.pth")