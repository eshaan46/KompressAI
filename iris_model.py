#libraries
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim

#variebles
device = 'cuda' if torch.cuda.is_available() else 'cpu'
df = load_iris()
X = df.data
y = df.target
dframe = pd.DataFrame(df.data, columns=df.feature_names)
dframe["target"] = df.target
dframe.to_csv('iris_features.csv', index=False)
Xt , xt , Yt , yt = train_test_split(X,y,test_size = 0.2)
Xt = torch.tensor(Xt,dtype=torch.float32).to(device)
Yt = torch.tensor(Yt,dtype=torch.long).to(device)
xt = torch.tensor(xt,dtype=torch.float32).to(device)
yt = torch.tensor(yt,dtype=torch.long).to(device)
x = 4#dont modify cause its the number of features
model = nn.Sequential(
    nn.Linear(x , x*x),
    nn.SiLU(),
    nn.Linear(x*x, x*x*x),
    nn.SiLU(),
    nn.Linear(x*x*x, x*x),
    nn.SiLU(),
    nn.Linear(x*x, 3),
)
model.to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.0001)
epoch = 1600
#funcitons
def train_model(epochs):
    model.train()
    for epoch in range(epochs):
        optimizer.zero_grad()
        outputs = model(Xt)
        loss = criterion(outputs, Yt)
        loss.backward()
        optimizer.step()
        if (epoch+1) % 10 == 0:
            print(f'Epoch [{epoch+1}/{epochs}], Loss: {loss.item():.4f}')
def evaluate_model(epochs):
    model.eval()
    print("Evaluating Model...")
    outputs = model(xt)
    loss = criterion(outputs, yt)
    print(f'Epoch [{epoch+1}/{epochs}], Loss: {loss.item():.4f}')



#main program
train_model(epoch)
evaluate_model(epoch)
torch.save(model, 'iris_model.pth')