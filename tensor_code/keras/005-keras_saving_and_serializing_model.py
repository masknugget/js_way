#!/usr/bin/env python
# coding: utf-8

# # TensorFlow2教程-keras模型保存和序列化
# 
# ## 1 保存序列模型或函数式模型

# In[1]:


# 构建一个简单的模型并训练
from __future__ import absolute_import, division, print_function
import tensorflow as tf
tf.keras.backend.clear_session()
from tensorflow import keras
from tensorflow.keras import layers

inputs = keras.Input(shape=(784,), name='digits')
x = layers.Dense(64, activation='relu', name='dense_1')(inputs)
x = layers.Dense(64, activation='relu', name='dense_2')(x)
outputs = layers.Dense(10, activation='softmax', name='predictions')(x)

model = keras.Model(inputs=inputs, outputs=outputs, name='3_layer_mlp')
model.summary()
(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()
x_train = x_train.reshape(60000, 784).astype('float32') / 255
x_test = x_test.reshape(10000, 784).astype('float32') / 255

model.compile(loss='sparse_categorical_crossentropy',
              optimizer=keras.optimizers.RMSprop())
history = model.fit(x_train, y_train,
                    batch_size=64,
                    epochs=1)

predictions = model.predict(x_test)


# ### 1.1 保存整个模型
# 可以对整个模型进行保存，其保持的内容包括：
# - 该模型的架构
# - 模型的权重（在训练期间学到的）
# - 模型的训练配置（传递给编译的）
# - 优化器及其状态（这使您可以从中断的地方重新启动训练）
# 

# In[2]:


import numpy as np
# 模型保存
model.save('the_save_model.h5')
# 导入模型
new_model = keras.models.load_model('the_save_model.h5')
new_prediction = new_model.predict(x_test)
np.testing.assert_allclose(predictions, new_prediction, atol=1e-6) # 预测结果一样


# ### 1.2 导出为SavedModel文件
# SavedModel是Tensorflow对象的独立序列化格式，支持使用Tensorflow Serving server来部署模型，支持其他语言读取。

# In[4]:


# 导出为tf的SavedModel文件
model.save('save_model', save_format='tf')
# 从SavedModel文件中导入模型
new_model = keras.models.load_model('save_model')

new_prediction = new_model.predict(x_test)
np.testing.assert_allclose(predictions, new_prediction, atol=1e-6) # 预测结果一样


# SaveModel创建的文件包含：
# - 权重
# - 网络图

# ### 1.3 仅保存网络结构
# 仅保持网络结构，这样导出的模型并未包含训练好的参数

# In[5]:


# 获取网络结构配置
config = model.get_config()
reinitialized_model = keras.Model.from_config(config)

new_prediction = reinitialized_model.predict(x_test)
assert abs(np.sum(predictions-new_prediction)) >0


# 也可以使用json保存网络结构

# In[6]:


# 将网络结构导出为json格式
json_config = model.to_json()
reinitialized_model = keras.models.model_from_json(json_config)

new_prediction = reinitialized_model.predict(x_test)
assert abs(np.sum(predictions-new_prediction)) >0


# ### 1.4 仅保存网络权重参数

# In[7]:


# 获取网络权重
weights = model.get_weights()
# 对网络权重进行赋值
model.set_weights(weights)


# 可以把结构和参数保存结合起来

# In[8]:


config = model.get_config()
weights = model.get_weights()

new_model = keras.Model.from_config(config) # config只能用keras.Model的这个api
new_model.set_weights(weights)

new_predictions = new_model.predict(x_test)
np.testing.assert_allclose(predictions, new_predictions, atol=1e-6)


# ### 1.5 完整的模型保存方法

# In[10]:


# 导出网络结构和权重
json_config = model.to_json()
with open('model_config.json', 'w') as json_file:
    json_file.write(json_config)
model.save_weights('path_to_my_weights.h5')
# 载入网络结构和权重
with open('model_config.json') as json_file:
    json_config = json_file.read()
new_model = keras.models.model_from_json(json_config)
new_model.load_weights('path_to_my_weights.h5')

new_predictions = new_model.predict(x_test)
np.testing.assert_allclose(predictions, new_predictions, atol=1e-6)


# In[11]:


# 当然也可以一步到位
model.save('path_to_my_model.h5')
del model
model = keras.models.load_model('path_to_my_model.h5')


# ### 1.6 权重保存格式
# 有.h5或.keras后缀时保存为keras HDF5格式文件，否则默认为TensorFlow Checkpoint格式文件。可以使用save_format显式确定。

# In[12]:


model.save_weights('weight_tf_savedmodel')
model.save_weights('weight_tf_savedmodel.h5')


# In[13]:


model.save_weights('weight_tf_savedmodel_tf', save_format='tf')
model.save_weights('weight_tf_savedmodel_h5', save_format='h5')


# ### 1.7 子类模型权重保存
# 子类模型的结构无法保存和序列化，只能保持参数

# In[16]:


# 构建模型
class ThreeLayerMLP(keras.Model):
  
    def __init__(self, name=None):
        super(ThreeLayerMLP, self).__init__(name=name)
        self.dense_1 = layers.Dense(64, activation='relu', name='dense_1')
        self.dense_2 = layers.Dense(64, activation='relu', name='dense_2')
        self.pred_layer = layers.Dense(10, activation='softmax', name='predictions')

    def call(self, inputs):
        x = self.dense_1(inputs)
        x = self.dense_2(x)
        return self.pred_layer(x)

def get_model():
    return ThreeLayerMLP(name='3_layer_mlp')

model = get_model()


# 首先，无法保存从未使用过的子类模型。
# 
# 这是因为需要在某些数据上调用子类模型才能创建其权重。

# In[17]:


# 训练模型
(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()
x_train = x_train.reshape(60000, 784).astype('float32') / 255
x_test = x_test.reshape(10000, 784).astype('float32') / 255

model.compile(loss='sparse_categorical_crossentropy',
              optimizer=keras.optimizers.RMSprop())
history = model.fit(x_train, y_train,
                    batch_size=64,
                    epochs=1)


# 推荐的保存子类模型的方法是使用save_weights创建TensorFlow SavedModel检查点。
# 
# 该检查点将包含与模型关联的所有变量的值：
# - 图层的权重
# - 优化器的状态 
# - 与有状态模型指标关联的任何变量
# 

# In[18]:


# 保持权重参数
model.save_weights('my_model_weights', save_format='tf')

# 输出结果，供后面对比

predictions = model.predict(x_test)
first_batch_loss = model.train_on_batch(x_train[:64], y_train[:64])


# 要还原模型，将需要访问创建模型对象的代码。
# 
# 请注意，为了恢复优化器状态和任何有状态度量的状态，应该先编译模型（使用与以前完全相同的参数）。

# In[19]:


# 读取保存的模型参数
new_model = get_model()
new_model.compile(loss='sparse_categorical_crossentropy',
                  optimizer=keras.optimizers.RMSprop())

#new_model.train_on_batch(x_train[:1], y_train[:1])

new_model.load_weights('my_model_weights')

new_predictions = new_model.predict(x_test)
np.testing.assert_allclose(predictions, new_predictions, atol=1e-6)


new_first_batch_loss = new_model.train_on_batch(x_train[:64], y_train[:64])
assert first_batch_loss == new_first_batch_loss


# In[ ]:




