#%% md

# 3.1 线性回归

#%%

import torch
from time import time

print(torch.__version__)

#%%

a = torch.ones(1000)
b = torch.ones(1000)

#%% md

# 将这两个向量按元素逐一做标量加法:

#%%

start = time()
c = torch.zeros(1000)
for i in range(1000):
    c[i] = a[i] + b[i]
print(time() - start)

#%% md

# 将这两个向量直接做矢量加法:

#%%

start = time()
d = a + b
print(time() - start)

#%% md

# **结果很明显，后者比前者更省时。因此，我们应该尽可能采用矢量计算，以提升计算效率。**

#%% md


#%%

a = torch.ones(3)
b = 10
print(a + b)

#%%


