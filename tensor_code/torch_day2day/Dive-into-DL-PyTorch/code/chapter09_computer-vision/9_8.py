#%% md

# 9.8 区域卷积神经网络（R-CNN）系列

#%%

import torch
import torchvision

print(torchvision.__version__)

#%% md

## 9.8.2 Fast R-CNN

#%%

X = torch.arange(16, dtype=torch.float).view(1, 1, 4, 4)
X

#%%

rois = torch.tensor([[0, 0, 0, 20, 20], [0, 0, 10, 30, 30]], dtype=torch.float)

#%%

torchvision.ops.roi_pool(X, rois, output_size=(2, 2), spatial_scale=0.1)

#%%


