#%% md

# 4.6 GPU计算

#%%

# !nvidia-smi # 对Linux/macOS用户有效

#%%

import torch
from torch import nn

print(torch.__version__)

#%% md

## 4.6.1 计算设备

#%%

torch.cuda.is_available() # cuda是否可用

#%%

torch.cuda.device_count() # gpu数量

#%%

torch.cuda.current_device() # 当前设备索引, 从0开始

#%%

torch.cuda.get_device_name(0) # 返回gpu名字

#%% md

## 4.6.2 `Tensor`的GPU计算

#%%

x = torch.tensor([1, 2, 3])
x

#%%

x = x.cuda(0)
x

#%%

x.device

#%%

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

x = torch.tensor([1, 2, 3], device=device)
# or
x = torch.tensor([1, 2, 3]).to(device)
x

#%%

y = x**2
y

#%%

# z = y + x.cpu()

#%% md

## 4.6.3 模型的GPU计算

#%%

net = nn.Linear(3, 1)
list(net.parameters())[0].device

#%%

net.cuda()
list(net.parameters())[0].device

#%%

x = torch.rand(2,3).cuda()
net(x)

#%%


