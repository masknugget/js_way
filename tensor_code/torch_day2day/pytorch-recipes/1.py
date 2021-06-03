from __future__ import print_function
import torch

torch.version.__version__

x = [12, 23, 34, 45, 56, 67, 78]
torch.is_tensor(x)
torch.is_storage(x)
y = torch.randn(1, 2, 3, 4, 5)
torch.is_tensor(y)
torch.is_storage(y)
torch.numel(y)  # the total number of elements in the input Tensor
torch.zeros(4, 4)
torch.numel(torch.zeros(4, 4))
torch.eye(3)
torch.eye(5)
torch.eye(3, 4)
torch.eye(5, 4)

type(x)

import numpy as np
x1 = np.array(x)

x1
torch.from_numpy(x1)
torch.linspace(2, 10, steps=25)  # linear spacing
torch.linspace(-10, 10, steps=15)
torch.logspace(start=-10, end=10, steps=15)  # logarithmic spacing

torch.ones(4)
torch.ones(4, 5)

# random numbers from a uniform distribution between the values
# 0 and 1
torch.rand(10)

torch.rand(4, 5)
# random values between 0 and 1 and fillied with a matrix of 
# size rows 4 and columns 5


# random numbers from a normal distribution,
# with mean =0 and standard deviation =1
torch.randn(10)

torch.randn(4, 5)

# selecting values from a range, this is called random permutation
torch.randperm(10)

# usage of range function
torch.arange(10, 40, 2)  # step size 2

torch.arange(10, 40)  # step size 1

d = torch.randn(4, 5)
d

torch.argmin(d, dim=1)

torch.argmax(d, dim=1)

# create a 2dtensor filled with values as 0
torch.zeros(4, 5)

# create a 1d tensor filled with values as 0
torch.zeros(10)

# indexing and performing operation on the tensors
x = torch.randn(4, 5)

x

# concatenate two tensors
torch.cat((x, x))

# concatenate n times based on array size
torch.cat((x, x, x))

# concatenate n times based on array size, over column
torch.cat((x, x, x), 1)

# concatenate n times based on array size, over rows
torch.cat((x, x), 0)

# how to split a tensor among small chunks

help(torch.chunk)
a = torch.randn(4, 4)
print(a)
torch.chunk(a, 2)
torch.chunk(a, 2, 0)
torch.chunk(a, 2, 1)
torch.Tensor([[11, 12], [23, 24]])

torch.gather(torch.Tensor([[11, 12], [23, 24]]), 1,
             torch.LongTensor([[0, 0], [1, 0]]))

torch.LongTensor([[0, 0], [1, 0]])

# the 1D tensor containing the indices to index
a = torch.randn(4, 4)
print(a)
indices = torch.LongTensor([0, 2])
torch.index_select(a, 0, indices)
torch.index_select(a, 1, indices)

# identify null input tensors using nonzero function
torch.nonzero(torch.tensor([10, 00, 23, 0, 0.0]))

torch.nonzero(torch.Tensor([10, 00, 23, 0, 0.0]))

# splitting the tensor into small chunks
torch.split(torch.tensor([12, 21, 34, 32, 45, 54, 56, 65]), 2)

# splitting the tensor into small chunks
torch.split(torch.tensor([12, 21, 34, 32, 45, 54, 56, 65]), 3)
torch.zeros(3, 2, 4)
torch.zeros(3, 2, 4).size()

# how to reshape the tensors along a new dimension


x

x.t()  # transpose is one option to change the shape of the tensor

# transpose partially based on rows and columns


x.transpose(1, 0)

# how to remove a dimension from a tensor
x

torch.unbind(x, 1)  # dim=1 removing a column

torch.unbind(x)  # dim=0 removing a row

x

# how to compute the basic mathematrical functions
torch.abs(torch.FloatTensor([-10, -23, 3.000]))

# adding value to the existing tensor, scalar addition
torch.add(x, 20)

x

# scalar multiplication
torch.mul(x, 2)

x

# how do we represent the equation in the form of a tensor


# y = intercept + (beta * x)


intercept = torch.randn(1)
intercept

x = torch.randn(2, 2)
x

beta = 0.7456
beta

torch.mul(x, beta)

torch.add(x, beta, intercept)

torch.mul(intercept, x)

torch.mul(x, beta)

## y = intercept + (beta * x)
torch.add(torch.mul(intercept, x), torch.mul(x, beta))  # tensor y

# how to round up tensor values
torch.manual_seed(1234)
torch.randn(5, 5)

torch.manual_seed(1234)
torch.ceil(torch.randn(5, 5))

torch.manual_seed(1234)
torch.floor(torch.randn(5, 5))

# truncate the values in a range say 0,1
torch.manual_seed(1234)
torch.clamp(torch.floor(torch.randn(5, 5)), min=-0.3, max=0.4)

# truncate with only lower limit
torch.manual_seed(1234)
torch.clamp(torch.floor(torch.randn(5, 5)), min=-0.3)

# truncate with only upper limit
torch.manual_seed(1234)
torch.clamp(torch.floor(torch.randn(5, 5)), max=0.3)

# scalar division
torch.div(x, 0.10)

# compute the exponential of a tensor
torch.exp(x)
np.exp(x)

# how to get the fractional portion of each tensor
torch.add(x, 10)

torch.frac(torch.add(x, 10))

# compute the log of the values in a tensor

x

torch.log(x)  # log of negatives are nan

# to rectify the negative values do a power tranforamtion
torch.pow(x, 2)

# rounding up similar to numpy


x
np.round(x)
torch.round(x)

# how to compute the sigmoid of the input tensor


x
torch.sigmoid(x)

# finding the square root of the values

x
torch.sqrt(x)
