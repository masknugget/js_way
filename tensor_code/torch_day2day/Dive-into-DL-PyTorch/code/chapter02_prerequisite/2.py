 

# 2.2 数据操作
import torch

torch.manual_seed(0)
torch.cuda.manual_seed(0)
print(torch.__version__)

## 2.2.1 创建`Tensor`

#创建一个5x3的未初始化的`Tensor`：
x = torch.empty(5, 3)
print(x)

#创建一个5x3的随机初始化的`Tensor`:

x = torch.rand(5, 3)
print(x)

# 创建一个5x3的long型全0的`Tensor`:

x = torch.zeros(5, 3, dtype=torch.long)
print(x)

 

# 直接根据数据创建:
x = torch.tensor([5.5, 3])
print(x)

#还可以通过现有的`Tensor`来创建，此方法会默认重用输入`Tensor`的一些属性，例如数据类型，除非自定义数据类型。
x = x.new_ones(5, 3, dtype=torch.float64)      # 返回的tensor默认具有相同的torch.dtype和torch.device
print(x)

x = torch.randn_like(x, dtype=torch.float)    # 指定新的数据类型
print(x)                                    

 

#我们可以通过`shape`或者`size()`来获取`Tensor`的形状:
print(x.size())
print(x.shape)

 
#> 注意：返回的torch.Size其实就是一个tuple, 支持所有tuple的操作。


## 2.2.2 操作
### 算术操作
# * **加法形式一**
y = torch.rand(5, 3)
print(x + y)

# * **加法形式二**
print(torch.add(x, y))


result = torch.empty(5, 3)
torch.add(x, y, out=result)
print(result)

# adds x to y
y.add_(x)
print(y)


#> **注：PyTorch操作inplace版本都有后缀"_", 例如`x.copy_(y), x.t_()`**

### 索引
#我们还可以使用类似NumPy的索引操作来访问`Tensor`的一部分，需要注意的是：**索引出来的结果与原数据共享内存，也即修改一个，另一个会跟着修改。** 

y = x[0, :]
y += 1
print(y)
print(x[0, :]) # 源tensor也被改了

### 改变形状
#用`view()`来改变`Tensor`的形状：


y = x.view(15)
z = x.view(-1, 5)  # -1所指的维度可以根据其他维度的值推出来
print(x.size(), y.size(), z.size())

 

# **注意`view()`返回的新tensor与源tensor共享内存，也即更改其中的一个，另外一个也会跟着改变。**

x += 1
print(x)
print(y) # 也加了1

 

#如果不想共享内存，推荐先用`clone`创造一个副本然后再使用`view`。
x_cp = x.clone().view(15)
x -= 1
print(x)
print(x_cp)

 

# 另外一个常用的函数就是`item()`, 它可以将一个标量`Tensor`转换成一个Python number：
x = torch.randn(1)
print(x)
print(x.item())


## 2.2.3 广播机制

x = torch.arange(1, 3).view(1, 2)
print(x)
y = torch.arange(1, 4).view(3, 1)
print(y)
print(x + y)

 

## 2.2.4 运算的内存开销

x = torch.tensor([1, 2])
y = torch.tensor([3, 4])
id_before = id(y)
y = y + x
print(id(y) == id_before)


x = torch.tensor([1, 2])
y = torch.tensor([3, 4])
id_before = id(y)
y[:] = y + x
print(id(y) == id_before)

 

x = torch.tensor([1, 2])
y = torch.tensor([3, 4])
id_before = id(y)
torch.add(x, y, out=y) # y += x, y.add_(x)
print(id(y) == id_before)

 

## 2.2.5 `Tensor`和NumPy相互转换
# **`numpy()`和`from_numpy()`这两个函数产生的`Tensor`和NumPy array实际是使用的相同的内存，改变其中一个时另一个也会改变！！！**
### `Tensor`转NumPy

 

a = torch.ones(5)
b = a.numpy()
print(a, b)

a += 1
print(a, b)
b += 1
print(a, b)

 

### NumPy数组转`Tensor`

import numpy as np
a = np.ones(5)
b = torch.from_numpy(a)
print(a, b)

a += 1
print(a, b)
b += 1
print(a, b)

 

# 直接用`torch.tensor()`将NumPy数组转换成`Tensor`，该方法总是会进行数据拷贝，返回的`Tensor`和原来的数据不再共享内存。

 

# 用torch.tensor()转换时不会共享内存
c = torch.tensor(a)
a += 1
print(a, c)

 

## 2.2.6 `Tensor` on GPU

 

# 以下代码只有在PyTorch GPU版本上才会执行
if torch.cuda.is_available():
    device = torch.device("cuda")          # GPU
    y = torch.ones_like(x, device=device)  # 直接创建一个在GPU上的Tensor
    x = x.to(device)                       # 等价于 .to("cuda")
    z = x + y
    print(z)
    print(z.to("cpu", torch.double))       # to()还可以同时更改数据类型

