#!/usr/bin/env python
# coding: utf-8

# # TensorFlow2教程-Keras概述
# 
# Keras 是一个用于构建和训练深度学习模型的高阶 API。它可用于快速设计原型、高级研究和生产。
# 
# Keras的3个优点：
# 方便用户使用、模块化和可组合、易于扩展
# 
# 
# ##  1 导入tf.keras
# TensorFlow2推荐使用tf.keras构建网络，常见的神经网络都包含在tf.keras.layer中(最新的tf.keras的版本可能和keras不同)

# In[1]:


import tensorflow as tf
from tensorflow.keras import layers
print(tf.__version__)
print(tf.keras.__version__)


# ## 2 构建简单模型
# ### 2.1 模型堆叠
# 最常见的模型类型是层的堆叠：tf.keras.Sequential 模型

# In[2]:


model = tf.keras.Sequential()
model.add(layers.Dense(32, activation='relu'))
model.add(layers.Dense(32, activation='relu'))
model.add(layers.Dense(10, activation='softmax'))


# ### 2.2 网络配置
# 
# tf.keras.layers中主要的网络配置参数如下：
# 
# activation：设置层的激活函数。此参数可以是函数名称字符串，也可以是函数对象。默认情况下，系统不会应用任何激活函数。
# 
# kernel_initializer 和 bias_initializer：创建层权重（核和偏置）的初始化方案。此参数是一个名称或可调用的函数对象，默认为 "Glorot uniform" 初始化器。
# 
# kernel_regularizer 和 bias_regularizer：应用层权重（核和偏置）的正则化方案，例如 L1 或 L2 正则化。默认情况下，系统不会应用正则化函数。

# In[3]:


layers.Dense(32, activation='sigmoid')
layers.Dense(32, activation=tf.sigmoid)
layers.Dense(32, kernel_initializer='orthogonal')
layers.Dense(32, kernel_initializer=tf.keras.initializers.glorot_normal)
layers.Dense(32, kernel_regularizer=tf.keras.regularizers.l2(0.01))
layers.Dense(32, kernel_regularizer=tf.keras.regularizers.l1(0.01))


# ## 3 训练和评估
# ### 3.1 设置训练流程
# 构建好模型后，通过调用 compile 方法配置该模型的学习流程：
# 

# In[4]:


model = tf.keras.Sequential()
model.add(layers.Dense(32, activation='relu'))
model.add(layers.Dense(32, activation='relu'))
model.add(layers.Dense(10, activation='softmax'))
model.compile(optimizer=tf.keras.optimizers.Adam(0.001),
             loss=tf.keras.losses.categorical_crossentropy,
             metrics=[tf.keras.metrics.categorical_accuracy])


# ### 3.2 输入Numpy数据
# 对于小型数据集，可以使用Numpy构建输入数据。

# In[5]:


import numpy as np

train_x = np.random.random((1000, 72))
train_y = np.random.random((1000, 10))

val_x = np.random.random((200, 72))
val_y = np.random.random((200, 10))

model.fit(train_x, train_y, epochs=10, batch_size=100,
          validation_data=(val_x, val_y))


# ### 3.3 tf.data输入数据
# 对于大型数据集可以使用tf.data构建训练输入。

# In[6]:


dataset = tf.data.Dataset.from_tensor_slices((train_x, train_y))
dataset = dataset.batch(32)
dataset = dataset.repeat()
val_dataset = tf.data.Dataset.from_tensor_slices((val_x, val_y))
val_dataset = val_dataset.batch(32)
val_dataset = val_dataset.repeat()

model.fit(dataset, epochs=10, steps_per_epoch=30,
          validation_data=val_dataset, validation_steps=3)


# ### 3.4 评估与预测
# 评估和预测函数：tf.keras.Model.evaluate和tf.keras.Model.predict方法，都可以可以使用NumPy和tf.data.Dataset构造的输入数据进行评估和预测

# In[7]:


# 模型评估
test_x = np.random.random((1000, 72))
test_y = np.random.random((1000, 10))
model.evaluate(test_x, test_y, batch_size=32)
test_data = tf.data.Dataset.from_tensor_slices((test_x, test_y))
test_data = test_data.batch(32).repeat()
model.evaluate(test_data, steps=30)


# In[8]:


# 模型预测
result = model.predict(test_x, batch_size=32)
print(result)


# ## 4 构建复杂模型
# 
# ### 4.1 函数式API
# tf.keras.Sequential 模型是层的简单堆叠，无法表示任意模型。使用 Keras的函数式API可以构建复杂的模型拓扑，例如：
# 
# - 多输入模型，
# 
# - 多输出模型，
# 
# - 具有共享层的模型（同一层被调用多次），
# 
# - 具有非序列数据流的模型（例如，残差连接）。
# 
# **使用函数式 API 构建的模型具有以下特征：**
# 
# - 层实例可调用并返回张量。
# - 输入张量和输出张量用于定义 tf.keras.Model 实例。
# - 此模型的训练方式和 Sequential 模型一样。

# In[9]:


input_x = tf.keras.Input(shape=(72,))
hidden1 = layers.Dense(32, activation='relu')(input_x)
hidden2 = layers.Dense(16, activation='relu')(hidden1)
pred = layers.Dense(10, activation='softmax')(hidden2)
# 构建tf.keras.Model实例
model = tf.keras.Model(inputs=input_x, outputs=pred)
model.compile(optimizer=tf.keras.optimizers.Adam(0.001),
             loss=tf.keras.losses.categorical_crossentropy,
             metrics=['accuracy'])
model.fit(train_x, train_y, batch_size=32, epochs=5)


# ## 4.2 模型子类化
# 可以通过对 tf.keras.Model 进行子类化并定义自己的前向传播来构建完全可自定义的模型。
# - 在\__init\__ 方法中创建层并将它们设置为类实例的属性。
# - 在\__call\__方法中定义前向传播

# In[10]:


class MyModel(tf.keras.Model):
    def __init__(self, num_classes=10):
        super(MyModel, self).__init__(name='my_model')
        self.num_classes = num_classes
        # 定义网络层
        self.layer1 = layers.Dense(32, activation='relu')
        self.layer2 = layers.Dense(num_classes, activation='softmax')

    def call(self, inputs):
        # 定义前向传播
        h1 = self.layer1(inputs)
        out = self.layer2(h1)
        return out
    
    def compute_output_shape(self, input_shape):
        # 计算输出shape
        shape = tf.TensorShape(input_shape).as_list()
        shape[-1] = self.num_classes
        return tf.TensorShape(shape)

# 实例化模型类，并训练
model = MyModel(num_classes=10)
model.compile(optimizer=tf.keras.optimizers.RMSprop(0.001),
             loss=tf.keras.losses.categorical_crossentropy,
             metrics=['accuracy'])

model.fit(train_x, train_y, batch_size=16, epochs=5)


# ## 4.3 自定义层
# 通过对 tf.keras.layers.Layer 进行子类化并实现以下方法来创建自定义层：
# 
# - \__init\__: (可选)定义该层要使用的子层
# - build：创建层的权重。使用 add_weight 方法添加权重。
# 
# - call：定义前向传播。
# 
# - compute_output_shape：指定在给定输入形状的情况下如何计算层的输出形状。
# - 可选，可以通过实现 get_config 方法和 from_config 类方法序列化层。
# 

# In[11]:


class MyLayer(layers.Layer):
    def __init__(self, output_dim, **kwargs):
        self.output_dim = output_dim
        super(MyLayer, self).__init__(**kwargs)
    
    def build(self, input_shape):
        shape = tf.TensorShape((input_shape[1], self.output_dim))
        self.kernel = self.add_weight(name='kernel1', shape=shape,
                                   initializer='uniform', trainable=True)
        super(MyLayer, self).build(input_shape)
    
    def call(self, inputs):
        return tf.matmul(inputs, self.kernel)

    def compute_output_shape(self, input_shape):
        shape = tf.TensorShape(input_shape).as_list()
        shape[-1] = self.output_dim
        return tf.TensorShape(shape)

    def get_config(self):
        base_config = super(MyLayer, self).get_config()
        base_config['output_dim'] = self.output_dim
        return base_config

    @classmethod
    def from_config(cls, config):
        return cls(**config)

# 使用自定义网络层构建模型
model = tf.keras.Sequential(
[
    MyLayer(10),
    layers.Activation('softmax')
])


model.compile(optimizer=tf.keras.optimizers.RMSprop(0.001),
             loss=tf.keras.losses.categorical_crossentropy,
             metrics=['accuracy'])

model.fit(train_x, train_y, batch_size=16, epochs=5)

        


# ## 4.3 回调
# 回调是传递给模型以自定义和扩展其在训练期间的行为的对象。我们可以编写自己的自定义回调，或使用tf.keras.callbacks中的内置函数，常用内置回调函数如下：
# 
# - tf.keras.callbacks.ModelCheckpoint：定期保存模型的检查点。
# - tf.keras.callbacks.LearningRateScheduler：动态更改学习率。
# - tf.keras.callbacks.EarlyStopping：验证性能停止提高时进行中断培训。
# - tf.keras.callbacks.TensorBoard：使用TensorBoard监视模型的行为 。

# In[12]:


callbacks = [
    tf.keras.callbacks.EarlyStopping(patience=2, monitor='val_loss'),
    tf.keras.callbacks.TensorBoard(log_dir='./logs')
]
model.fit(train_x, train_y, batch_size=16, epochs=5,
         callbacks=callbacks, validation_data=(val_x, val_y))


# ## 5 模型保存与恢复
# ### 5.1 权重保存

# In[17]:


model = tf.keras.Sequential([
layers.Dense(64, activation='relu', input_shape=(32,)),  # 需要有input_shape
layers.Dense(10, activation='softmax')])

model.compile(optimizer=tf.keras.optimizers.Adam(0.001),
              loss='categorical_crossentropy',
              metrics=['accuracy'])


# In[18]:


# 权重保存与重载
model.save_weights('./weights/model')
model.load_weights('./weights/model')
# 保存为h5格式
model.save_weights('./model.h5', save_format='h5')
model.load_weights('./model.h5')


# ### 5.2 保存网络结构

# In[19]:


# 序列化成json
import json
import pprint
json_str = model.to_json()
pprint.pprint(json.loads(json_str))
# 从json中重建模型
fresh_model = tf.keras.models.model_from_json(json_str)


# In[20]:


# 保持为yaml格式  #需要提前安装pyyaml

yaml_str = model.to_yaml()
print(yaml_str)
# 从yaml数据中重新构建模型
fresh_model = tf.keras.models.model_from_yaml(yaml_str)


# **注意：子类模型不可序列化，因为其体系结构由call方法主体中的Python代码定义。**

# ### 5.3 保存整个模型
# 

# In[21]:


model = tf.keras.Sequential([
  layers.Dense(10, activation='softmax', input_shape=(72,)),
  layers.Dense(10, activation='softmax')
])
model.compile(optimizer='rmsprop',
              loss='categorical_crossentropy',
              metrics=['accuracy'])
model.fit(train_x, train_y, batch_size=32, epochs=5)
# 保存整个模型
model.save('all_model.h5')
# 导入整个模型
model = tf.keras.models.load_model('all_model.h5')


# ## 6 将keras用于Estimator
# Estimator API 用于针对分布式环境训练模型。它适用于一些行业使用场景，例如用大型数据集进行分布式训练并导出模型以用于生产

# In[22]:


model = tf.keras.Sequential([layers.Dense(10,activation='softmax'),
                          layers.Dense(10,activation='softmax')])

model.compile(optimizer=tf.keras.optimizers.RMSprop(0.001),
              loss='categorical_crossentropy',
              metrics=['accuracy'])

estimator = tf.keras.estimator.model_to_estimator(model)


# ## 7 Eager execution

# Eager execution是一个动态执行的编程环境，它可以立即评估操作。Keras不需要此功能，但它受tf.keras程序支持和对检查程序和调试有用。
# 
# 所有的tf.keras模型构建API都与Eager execution兼容。尽管可以使用Sequential和函数API，但Eager execution有利于模型子类化和构建自定义层：其要求以代码形式编写前向传递的API（而不是通过组装现有层来创建模型的API）。

# ## 8 多GPU上运行

# tf.keras模型可使用tf.distribute.Strategy在多个GPU上运行 。该API在多个GPU上提供了分布式培训，几乎无需更改现有代码。
# 
# 当前tf.distribute.MirroredStrategy是唯一受支持的分发策略。MirroredStrategy在单台计算机上使用全缩减进行同步训练来进行图内复制。要使用 distribute.Strategys，请将优化器实例化以及模型构建和编译嵌套在Strategys中.scope()，然后训练模型。
# 
# 以下示例tf.keras.Model在单个计算机上的多GPU分配。
# 
# 首先，在分布式策略范围内定义一个模型：

# In[23]:


strategy = tf.distribute.MirroredStrategy()
with strategy.scope():
    model = tf.keras.Sequential()
    model.add(layers.Dense(16, activation='relu', input_shape=(10,)))
    model.add(layers.Dense(1, activation='sigmoid'))
    optimizer = tf.keras.optimizers.SGD(0.2)
    model.compile(loss='binary_crossentropy', optimizer=optimizer)
model.summary()


# 然后像单gpu一样在数据上训练模型即可

# In[24]:


x = np.random.random((1024, 10))
y = np.random.randint(2, size=(1024, 1))
x = tf.cast(x, tf.float32)
dataset = tf.data.Dataset.from_tensor_slices((x, y))
dataset = dataset.shuffle(buffer_size=1024).batch(32)
model.fit(dataset, epochs=1)


# In[ ]:





# In[ ]:




