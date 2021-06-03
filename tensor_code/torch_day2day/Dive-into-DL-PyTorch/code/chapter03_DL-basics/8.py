#%% md

# 3.8 多层感知机

#%%
import torch
import numpy as np
import matplotlib.pylab as plt
import sys
sys.path.append("..")
import d2lzh_pytorch as d2l

print(torch.__version__)

#%% md

## 3.8.2 激活函数

#%%

def xyplot(x_vals, y_vals, name):
    d2l.set_figsize(figsize=(5, 2.5))
    d2l.plt.plot(x_vals.detach().numpy(), y_vals.detach().numpy())
    d2l.plt.xlabel('x')
    d2l.plt.ylabel(name + '(x)')

#%% md

### 3.8.2.1 ReLU函数

#%%

x = torch.arange(-8.0, 8.0, 0.1, requires_grad=True)
y = x.relu()
xyplot(x, y, 'relu')

#%%

y.sum().backward()
xyplot(x, x.grad, 'grad of relu')

#%% md

### 3.8.2.2 sigmoid函数

#%%

y = x.sigmoid()
xyplot(x, y, 'sigmoid')

#%%

x.grad.zero_()
y.sum().backward()
xyplot(x, x.grad, 'grad of sigmoid')

#%% md

### 3.8.2.3 tanh函数

#%%

y = x.tanh()
xyplot(x, y, 'tanh')

#%%

x.grad.zero_()
y.sum().backward()
xyplot(x, x.grad, 'grad of tanh')

#%%


