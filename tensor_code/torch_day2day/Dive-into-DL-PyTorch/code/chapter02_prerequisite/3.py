# %%

import torch
print(torch.__version__)

# %% md

# 2.3 自动求梯度
## 2.3.1 概念

## 2.3.2 `Tensor`

# %%

x = torch.ones(2, 2, requires_grad=True)
print(x)
print(x.grad_fn)

# %%

y = x + 2
print(y)
print(y.grad_fn)

# %% md

# 注意x是直接创建的，所以它没有
# `grad_fn`, 而y是通过一个加法操作创建的，所以它有一个为
# ` < AddBackward > `的`
# grad_fn
# `。

print(x.is_leaf, y.is_leaf)

# %%

z = y * y * 3
out = z.mean()
print(z, out)

# %% md

# 通过
# `.requires_grad_()
# `来用in - place的方式改变`
# requires_grad
# `属性：


a = torch.randn(2, 2)  # 缺失情况下默认 requires_grad = False
a = ((a * 3) / (a - 1))
print(a.requires_grad)  # False
a.requires_grad_(True)
print(a.requires_grad)  # True
b = (a * a).sum()
print(b.grad_fn)


## 2.3.3 梯度
#
# 因为
# `out`
# 是一个标量，所以调用
# `backward()`
# 时不需要指定求导变量：


out.backward()  # 等价于 out.backward(torch.tensor(1.))
print(x.grad)

# 注意：grad在反向传播过程中是累加的(accumulated)，这意味着每一次运行反向传播，梯度都会累加之前的梯度，所以一般在反向传播之前需把梯度清零。

# 再来反向传播一次，注意grad是累加的
out2 = x.sum()
out2.backward()
print(x.grad)

out3 = x.sum()
x.grad.data.zero_()
out3.backward()
print(x.grad)



x = torch.tensor([1.0, 2.0, 3.0, 4.0], requires_grad=True)
y = 2 * x
z = y.view(2, 2)
print(z)


# 现在
# `y`
# 不是一个标量，所以在调用
# `backward`
# 时需要传入一个和
# `y`
# 同形的权重向量进行加权求和得到一个标量。
#
# # %%

v = torch.tensor([[1.0, 0.1], [0.01, 0.001]], dtype=torch.float)
z.backward(v)

print(x.grad)

# %% md
# 再来看看中断梯度追踪的例子：

x = torch.tensor(1.0, requires_grad=True)
y1 = x ** 2
with torch.no_grad():
    y2 = x ** 3
y3 = y1 + y2

print(x, x.requires_grad)
print(y1, y1.requires_grad)
print(y2, y2.requires_grad)
print(y3, y3.requires_grad)

y3.backward()
print(x.grad)


# 为什么是2呢？$ y_3 = y_1 + y_2 = x ^ 2 + x ^ 3$，当 $x = 1$ 时 $\frac
# {dy_3}
# {dx}$ 不应该是5吗？事实上，由于 $y_2$ 的定义是被
# `torch.no_grad(): `包裹的，所以与 $y_2$ 有关的梯度是不会回传的，只有与 $y_1$ 有关的梯度才会回传，即 $x ^ 2$ 对 $x$ 的梯度。
#
# 上面提到，`y2.requires_grad = False
# `，所以不能调用
# `y2.backward()`。


# y2.backward() # 会报错 RuntimeError: element 0 of tensors does not require grad and does not have a grad_fn

# 如果我们想要修改
# `tensor`
# 的数值，但是又不希望被
# `autograd`
# 记录（即不会影响反向传播），那么我么可以对
# `tensor.data`
# 进行操作.


x = torch.ones(1, requires_grad=True)

print(x.data)  # 还是一个tensor
print(x.data.requires_grad)  # 但是已经是独立于计算图之外

y = 2 * x
x.data *= 100  # 只改变了值，不会记录在计算图，所以不会影响梯度传播

y.backward()
print(x)  # 更改data的值也会影响tensor的值
print(x.grad)
