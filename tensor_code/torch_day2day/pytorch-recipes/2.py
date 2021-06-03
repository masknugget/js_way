import torch

# how to perform random sampling of the tensors
torch.manual_seed(1234)
torch.manual_seed(1234)
torch.randn(4,4)

 

#generate random numbers from a statistical distribution
torch.Tensor(4, 4).uniform_(0, 1) #random number from uniform distribution

 

#now apply the distribution assuming the input values from the 
#tensor are probabilities
torch.bernoulli(torch.Tensor(4, 4).uniform_(0, 1))

 

#how to perform sampling from a multinomial distribution
torch.Tensor([10, 10, 13, 10,34,45,65,67,87,89,87,34])

torch.multinomial(torch.tensor([10., 10., 13., 10.,
                                34., 45., 65., 67., 
                                87., 89., 87., 34.]), 
                  3)

 

torch.multinomial(torch.tensor([10., 10., 13., 10., 
                                34., 45., 65., 67., 
                                87., 89., 87., 34.]), 
                  5, replacement=True)

 

#generate random numbers from the normal distribution

 

torch.normal(mean=torch.arange(1., 11.), 
             std=torch.arange(1, 0, -0.1))


torch.normal(mean=0.5, 
             std=torch.arange(1., 6.))

torch.normal(mean=0.5, 
             std=torch.arange(0.2,0.6))

 

#computing the descriptive statistics: mean
torch.mean(torch.tensor([10., 10., 13., 10., 34., 
                         45., 65., 67., 87., 89., 87., 34.]))

 

# mean across rows and across columns
d = torch.randn(4, 5)
d


torch.mean(d,dim=0)
torch.mean(d,dim=1)

 

#compute median
torch.median(d,dim=0)
torch.median(d,dim=1)

 

# compute the mode
torch.mode(d)
torch.mode(d,dim=0)
torch.mode(d,dim=1)

 

#compute the standard deviation
torch.std(d)
torch.std(d,dim=0)
torch.std(d,dim=1)

 

#compute variance
torch.var(d)
torch.var(d,dim=0)
torch.var(d,dim=1)

# compute min and max
torch.min(d)
torch.min(d,dim=0)
torch.min(d,dim=1)

torch.max(d)
torch.max(d,dim=0)
torch.max(d,dim=1)

 

# sorting a tensor
torch.sort(d)
torch.sort(d,dim=0)
torch.sort(d,dim=0,descending=True)
torch.sort(d,dim=1,descending=True)

 

from torch.autograd import Variable

Variable(torch.ones(2,2),requires_grad=True)

a, b = 12,23
x1 = Variable(torch.randn(a,b),
            requires_grad=True)
x2 = Variable(torch.randn(a,b),
            requires_grad=True)
x3 =Variable(torch.randn(a,b),
            requires_grad=True)

 

c = x1 * x2
d = a + x3
e = torch.sum(d)

e.backward()

print(e)

x1.data

x2.data

x3.data

 

from torch import FloatTensor
from torch.autograd import Variable

a = Variable(FloatTensor([5]))

weights = [Variable(FloatTensor([i]), requires_grad=True) for i in (12, 53, 91, 73)]

w1, w2, w3, w4 = weights

b = w1 * a
c = w2 * a
d = w3 * b + w4 * c
Loss = (10 - d)

Loss.backward()

for index, weight in enumerate(weights, start=1):
    gradient, *_ = weight.grad.data
    print(f"Gradient of w{index} w.r.t to Loss: {gradient}")


# Using forward pass
def forward(x):
    return x * w

 

import torch
from torch.autograd import Variable

x_data = [11.0, 22.0, 33.0]
y_data = [21.0, 14.0, 64.0]

w = Variable(torch.Tensor([1.0]),  requires_grad=True)  # Any random value

# Before training
print("predict (before training)",  4, forward(4).data[0])

 

# define the Loss function
def loss(x, y):
    y_pred = forward(x)
    return (y_pred - y) * (y_pred - y)

 

# Run the Training loop
for epoch in range(10):
    for x_val, y_val in zip(x_data, y_data):
        l = loss(x_val, y_val)
        l.backward()
        print("\tgrad: ", x_val, y_val, w.grad.data[0])
        w.data = w.data - 0.01 * w.grad.data

        # Manually set the gradients to zero after updating weights
        w.grad.data.zero_()

    print("progress:", epoch, l.data[0])

 

# After training
print("predict (after training)",  4, forward(4).data[0])

 

z = Variable(torch.Tensor(4, 4).uniform_(-5, 5))
print(z)

 

print('Requires Gradient : %s ' % (z.requires_grad))
print('Volatile : %s ' % (z.volatile))
print('Gradient : %s ' % (z.grad))
print(z.data)

 

x = Variable(torch.Tensor(4, 4).uniform_(-4, 5))
y = Variable(torch.Tensor(4, 4).uniform_(-3, 2))
# matrix multiplication
z = torch.mm(x, y)
print(z.size())

x.data

#tensor operations
mat1 = torch.FloatTensor(4,4).uniform_(0,1)
mat1

mat2 = torch.FloatTensor(5,4).uniform_(0,1)
mat2

vec1 = torch.FloatTensor(4).uniform_(0,1)
vec1

# scalar addition
mat1 + 10.5

# scalar subtraction
mat2 - 0.20

 

# vector and matrix addition
mat1 + vec1
mat2 + vec1

 

# matrix-matrix addition
mat1 + mat2
mat1 * mat1

 

# about Bernoulli distribution

from torch.distributions.bernoulli import Bernoulli
dist = Bernoulli(torch.tensor([0.3,0.6,0.9]))
dist.sample() #sample is binary, it takes 1 with p and 0 with 1-p

 

#Creates a Bernoulli distribution parameterized by probs 
#Samples are binary (0 or 1). They take the value 1 with probability p 
#and 0 with probability 1 - p.

 

from torch.distributions.beta import Beta
dist = Beta(torch.tensor([0.5]), torch.tensor([0.5]))
dist

dist.sample()

from torch.distributions.binomial import Binomial
dist = Binomial(100, torch.tensor([0 , .2, .8, 1]))

dist.sample()

 

# 100- count of trials
# 0, 0.2, 0.8 and 1 are event probabilities

from torch.distributions.categorical import Categorical

dist = Categorical(torch.tensor([ 0.20, 0.20, 0.20, 0.20, 0.20 ]))
dist
dist.sample()

 

# 0.20, 0.20, 0.20, 0.20,0.20 event probabilities

 

# Laplace distribution parameterized by loc and ‘scale’.

 

from torch.distributions.laplace import Laplace

dist = Laplace(torch.tensor([10.0]), torch.tensor([0.990]))
dist
dist.sample()

 

#Normal (Gaussian) distribution parameterized by loc and ‘scale’.

from torch.distributions.normal import Normal
dist = Normal(torch.tensor([100.0]), torch.tensor([10.0]))
dist

dist.sample()

