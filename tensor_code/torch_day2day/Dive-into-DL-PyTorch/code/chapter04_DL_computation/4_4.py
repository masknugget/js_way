#%% md

# 4.5 读取和存储

#%%

import torch
from torch import nn

print(torch.__version__)

#%% md

## 4.5.1 读写`Tensor`

#%%

x = torch.ones(3)
torch.save(x, 'x.pt')

#%%

x2 = torch.load('x.pt')
x2

#%%

y = torch.zeros(4)
torch.save([x, y], 'xy.pt')
xy_list = torch.load('xy.pt')
xy_list

#%%

torch.save({'x': x, 'y': y}, 'xy_dict.pt')
xy = torch.load('xy_dict.pt')
xy

#%% md

## 4.5.2 读写模型
### 4.5.2.1 `state_dict`

#%%

class MLP(nn.Module):
    def __init__(self):
        super(MLP, self).__init__()
        self.hidden = nn.Linear(3, 2)
        self.act = nn.ReLU()
        self.output = nn.Linear(2, 1)

    def forward(self, x):
        a = self.act(self.hidden(x))
        return self.output(a)

net = MLP()
net.state_dict()

#%%

optimizer = torch.optim.SGD(net.parameters(), lr=0.001, momentum=0.9)
optimizer.state_dict()

#%% md

### 4.5.2.2 保存和加载模型

#%%

X = torch.randn(2, 3)
Y = net(X)

PATH = "./net.pt"
torch.save(net.state_dict(), PATH)

net2 = MLP()
net2.load_state_dict(torch.load(PATH))
Y2 = net2(X)
Y2 == Y

#%%


