#!/usr/bin/env python
# coding: utf-8

# # TensorFlow2教程-用keras构建自己的网络层

# ## 1 构建一个简单的网络层
# 我们可以通过继承tf.keras.layer.Layer,实现一个自定义的网络层。

# In[1]:


from __future__ import absolute_import, division, print_function
import tensorflow as tf

tf.keras.backend.clear_session()
import tensorflow.keras as keras
import tensorflow.keras.layers as layers


# In[2]:


# 定义网络层就是：设置网络权重和输出到输入的计算过程
class MyLayer(layers.Layer):
    def __init__(self, input_dim=32, unit=32):
        super(MyLayer, self).__init__()

        w_init = tf.random_normal_initializer()
        # 权重变量
        self.weight = tf.Variable(initial_value=w_init(
            shape=(input_dim, unit), dtype=tf.float32), trainable=True)

        b_init = tf.zeros_initializer()
        # 偏置变量
        self.bias = tf.Variable(initial_value=b_init(
            shape=(unit,), dtype=tf.float32), trainable=True)

    def call(self, inputs):
        # 全连接网络
        return tf.matmul(inputs, self.weight) + self.bias


x = tf.ones((3, 5))
my_layer = MyLayer(5, 4)
out = my_layer(x)
print(out)


# 按上面构建网络层，图层会自动跟踪权重w和b，当然我们也可以直接用add_weight的方法构建权重

# In[3]:


class MyLayer(layers.Layer):
    def __init__(self, input_dim=32, unit=32):
        super(MyLayer, self).__init__()
        # 使用add_weight添加网络变量，使其可追踪
        self.weight = self.add_weight(shape=(input_dim, unit),
                                      initializer=keras.initializers.RandomNormal(),
                                      trainable=True)
        self.bias = self.add_weight(shape=(unit,),
                                    initializer=keras.initializers.Zeros(),
                                    trainable=True)

    def call(self, inputs):
        return tf.matmul(inputs, self.weight) + self.bias


x = tf.ones((3, 5))
my_layer = MyLayer(5, 4)
out = my_layer(x)
print(out)


# 也可以设置不可训练的权重

# In[4]:


class AddLayer(layers.Layer):
    def __init__(self, input_dim=32):
        super(AddLayer, self).__init__()
        # 只存储，不训练的变量
        self.sum = self.add_weight(shape=(input_dim,),
                                   initializer=keras.initializers.Zeros(),
                                   trainable=False)

    def call(self, inputs):
        self.sum.assign_add(tf.reduce_sum(inputs, axis=0))
        return self.sum


x = tf.ones((3, 3))
my_layer = AddLayer(3)
out = my_layer(x)
print(out.numpy())
out = my_layer(x)
print(out.numpy())
print('weight:', my_layer.weights)
print('non-trainable weight:', my_layer.non_trainable_weights)
print('trainable weight:', my_layer.trainable_weights)


# 当定义网络时不知道网络的维度是可以重写build()函数，用获得的shape构建网络

# In[5]:


class MyLayer(layers.Layer):
    def __init__(self, unit=32):
        super(MyLayer, self).__init__()
        self.unit = unit

    def build(self, input_shape):
        # 在build时获取input_shape
        self.weight = self.add_weight(shape=(input_shape[-1], self.unit),
                                      initializer=keras.initializers.RandomNormal(),
                                      trainable=True)
        self.bias = self.add_weight(shape=(self.unit,),
                                    initializer=keras.initializers.Zeros(),
                                    trainable=True)

    def call(self, inputs):
        return tf.matmul(inputs, self.weight) + self.bias


my_layer = MyLayer(3)
x = tf.ones((3, 5))
out = my_layer(x)
print(out)
my_layer = MyLayer(3)

x = tf.ones((2, 2))
out = my_layer(x)
print(out)


# ## 2 使用子层递归构建网络层
# 可以在自定义网络层中调用其他自定义网络层

# In[6]:


class MyBlock(layers.Layer):
    def __init__(self):
        super(MyBlock, self).__init__()
        # 其他自定义网络层
        self.layer1 = MyLayer(32)
        self.layer2 = MyLayer(16)
        self.layer3 = MyLayer(2)

    def call(self, inputs):
        h1 = self.layer1(inputs)
        h1 = tf.nn.relu(h1)
        h2 = self.layer2(h1)
        h2 = tf.nn.relu(h2)
        return self.layer3(h2)


my_block = MyBlock()
print('trainable weights:', len(my_block.trainable_weights))
y = my_block(tf.ones(shape=(3, 64)))
# 构建网络在build()里面，所以执行了才有网络
print('trainable weights:', len(my_block.trainable_weights))


# 可以通过构建网络层的方法来收集loss，并可以递归调用。

# In[7]:


class LossLayer(layers.Layer):

    def __init__(self, rate=1e-2):
        super(LossLayer, self).__init__()
        self.rate = rate

    def call(self, inputs):
        # 添加loss
        self.add_loss(self.rate * tf.reduce_sum(inputs))
        return inputs


class OutLayer(layers.Layer):
    def __init__(self):
        super(OutLayer, self).__init__()
        self.loss_fun = LossLayer(1e-2)

    def call(self, inputs):
        # 就一个loss层
        return self.loss_fun(inputs)


my_layer = OutLayer()
print(len(my_layer.losses))  # 还未call
y = my_layer(tf.zeros(1, 1))
print(len(my_layer.losses))  # 执行call之后
y = my_layer(tf.zeros(1, 1))
print(len(my_layer.losses))  # call之前会重新置0


# 如果中间调用了keras网络层，里面的正则化loss也会被加入进来

# In[8]:


class OuterLayer(layers.Layer):

    def __init__(self):
        super(OuterLayer, self).__init__()
        # 子层中正则化loss也会添加到总的loss中
        self.dense = layers.Dense(32, kernel_regularizer=tf.keras.regularizers.l2(1e-3))

    def call(self, inputs):
        return self.dense(inputs)


my_layer = OuterLayer()
y = my_layer(tf.zeros((1, 1)))
print(my_layer.losses)
print(my_layer.weights)


# # 3 其他网络层配置
# ## 3.1 使自己的网络层可以序列化

# In[9]:


class Linear(layers.Layer):

    def __init__(self, units=32, **kwargs):
        super(Linear, self).__init__(**kwargs)
        self.units = units

    def build(self, input_shape):
        self.w = self.add_weight(shape=(input_shape[-1], self.units),
                                 initializer='random_normal',
                                 trainable=True)
        self.b = self.add_weight(shape=(self.units,),
                                 initializer='random_normal',
                                 trainable=True)

    def call(self, inputs):
        return tf.matmul(inputs, self.w) + self.b

    def get_config(self):
        # 获取网络配置，用于实现序列化
        config = super(Linear, self).get_config()
        config.update({'units': self.units})
        return config


layer = Linear(125)
config = layer.get_config()
print(config)
# 从配置中构建网络，（已知网络结构，不知超参的情况）
new_layer = Linear.from_config(config)


# 如果在反序列化中(从配置中构建网络)需要更大的灵活性，可以重写from_config方法。

# In[10]:


def from_config(cls, config):
    return cls(**config)


# ## 3.2 配置训练时特有参数
# 有一些网络层， 如BatchNormalization层和Dropout层，在训练和推理中具有不同的行为，对于此类层，则需要在方法中使用train等参数进行控制。

# In[11]:


class MyDropout(layers.Layer):
    def __init__(self, rate, **kwargs):
        super(MyDropout, self).__init__(**kwargs)
        self.rate = rate

    def call(self, inputs, training=None):
        return tf.cond(training,
                       lambda: tf.nn.dropout(inputs, rate=self.rate),
                       lambda: inputs)


# # 4 构建自己的模型
# 通常，我们使用Layer类来定义内部计算块，并使用Model类来定义外部模型 - 即要训练的对象。
# 
# Model类与Layer的区别：
# - 它对外开放内置的训练，评估和预测函数（model.fit(),model.evaluate(),model.predict()）。 
# - 它通过model.layers属性开放其内部网络层列表。 
# - 它对外开放保存和序列化API。

# ## 4.1 自定义模型
# 下面通过构建一个变分自编码器（VAE），来介绍如何构建自己的网络， 并使用内置的函数进行训练。

# In[12]:


# 采样网络
class Sampling(layers.Layer):
    def call(self, inputs):
        z_mean, z_log_var = inputs
        batch = tf.shape(z_mean)[0]
        dim = tf.shape(z_mean)[1]
        epsilon = tf.keras.backend.random_normal(shape=(batch, dim))
        return z_mean + tf.exp(0.5 * z_log_var) * epsilon


# 编码器
class Encoder(layers.Layer):
    def __init__(self, latent_dim=32,
                 intermediate_dim=64, name='encoder', **kwargs):
        super(Encoder, self).__init__(name=name, **kwargs)
        self.dense_proj = layers.Dense(intermediate_dim, activation='relu')
        self.dense_mean = layers.Dense(latent_dim)
        self.dense_log_var = layers.Dense(latent_dim)
        self.sampling = Sampling()

    def call(self, inputs):
        h1 = self.dense_proj(inputs)
        # 获取z_mean和z_log_var
        z_mean = self.dense_mean(h1)
        z_log_var = self.dense_log_var(h1)
        # 进行采样
        z = self.sampling((z_mean, z_log_var))
        return z_mean, z_log_var, z


# 解码器
class Decoder(layers.Layer):
    def __init__(self, original_dim,
                 intermediate_dim=64, name='decoder', **kwargs):
        super(Decoder, self).__init__(name=name, **kwargs)
        self.dense_proj = layers.Dense(intermediate_dim, activation='relu')
        self.dense_output = layers.Dense(original_dim, activation='sigmoid')

    def call(self, inputs):
        # 两层全连接网络
        h1 = self.dense_proj(inputs)
        return self.dense_output(h1)


# 变分自编码器
class VAE(tf.keras.Model):
    def __init__(self, original_dim, latent_dim=32,
                 intermediate_dim=64, name='encoder', **kwargs):
        super(VAE, self).__init__(name=name, **kwargs)

        self.original_dim = original_dim
        self.encoder = Encoder(latent_dim=latent_dim,
                               intermediate_dim=intermediate_dim)
        self.decoder = Decoder(original_dim=original_dim,
                               intermediate_dim=intermediate_dim)

    def call(self, inputs):
        # 编码
        z_mean, z_log_var, z = self.encoder(inputs)
        # 解码
        reconstructed = self.decoder(z)
        # 获取损失函数
        kl_loss = -0.5 * tf.reduce_sum(
            z_log_var - tf.square(z_mean) - tf.exp(z_log_var) + 1)
        self.add_loss(kl_loss)
        return reconstructed


# 训练VAE

# In[13]:


(x_train, _), _ = tf.keras.datasets.mnist.load_data()
x_train = x_train.reshape(60000, 784).astype('float32') / 255
vae = VAE(784, 32, 64)
optimizer = tf.keras.optimizers.Adam(learning_rate=1e-3)

vae.compile(optimizer, loss=tf.keras.losses.MeanSquaredError())
vae.fit(x_train, x_train, epochs=3, batch_size=64)

# 自己编写训练方法

# In[15]:


train_dataset = tf.data.Dataset.from_tensor_slices(x_train)
train_dataset = train_dataset.shuffle(buffer_size=1024).batch(64)

original_dim = 784
vae = VAE(original_dim, 64, 32)

# 优化器
optimizer = tf.keras.optimizers.Adam(learning_rate=1e-3)
# 损失函数
mse_loss_fn = tf.keras.losses.MeanSquaredError()
# 评价指标
loss_metric = tf.keras.metrics.Mean()

# 训练循环
for epoch in range(3):
    print('Start of epoch %d' % (epoch,))

    # 每批次训练
    for step, x_batch_train in enumerate(train_dataset):
        with tf.GradientTape() as tape:
            # 前向传播
            reconstructed = vae(x_batch_train)
            # 计算loss
            loss = mse_loss_fn(x_batch_train, reconstructed)
            loss += sum(vae.losses)  # Add KLD regularization loss
        # 计算梯度
        grads = tape.gradient(loss, vae.trainable_variables)
        # 反向传播
        optimizer.apply_gradients(zip(grads, vae.trainable_variables))
        # 统计指标
        loss_metric(loss)
        # 输出
        if step % 100 == 0:
            print('step %s: mean loss = %s' % (step, loss_metric.result()))

# In[ ]:
