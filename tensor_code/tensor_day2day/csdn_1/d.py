import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import datasets, layers, optimizers, Sequential, metrics

import os

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

(x, y), (test_x, test_y) = datasets.cifar10.load_data()
print(x.shape, y.shape)


def progross(x, y):
    x = 2 * tf.cast(x, dtype=tf.float32) / 255. - 1.
    y = tf.one_hot(y, depth=10, dtype=tf.int32)
    y = tf.squeeze(y, axis=0)
    return x, y


db_train = tf.data.Dataset.from_tensor_slices((x, y)).shuffle(1000)
db_train = db_train.map(progross).batch(128)

db_test = tf.data.Dataset.from_tensor_slices((test_x, test_y))
db_test = db_test.map(progross).batch(128)

train_inter = iter(db_train)
train_next = next(train_inter)
print(train_next[0].shape, train_next[1][1])


# 继承layers.Layer方法
class myDense(layers.Layer):
    # 实现__init__()方法
    def __init__(self, in_dim, out_dim):
        # 调用母类中的__init__()
        super(myDense, self).__init__()

        self.kernel = self.add_variable('w', [in_dim, out_dim])
        self.bias = self.add_variable('b', [out_dim])

    # 实现call()方法
    def call(self, inputs, training=None):
        # 构建模型结构
        out = inputs @ self.kernel + self.bias
        return out


# 继承keras.Model母类
class myModel(keras.Model):

    def __init__(self):
        # 调用母类中的__init__()方法
        super(myModel, self).__init__()
        # 调用自定义层类 并构建每一层的连接数
        self.fc1 = myDense(32 * 32 * 3, 256)
        self.fc2 = myDense(256, 128)
        self.fc3 = myDense(128, 64)
        self.fc4 = myDense(64, 32)
        self.fc5 = myDense(32, 10)

    # 构建一个五层的全连接网络
    def call(self, inputs, training=None):
        # 把输入模型中的图片进行打平操作
        inputs = tf.reshape(inputs, [-1, 32 * 32 * 3])
        # 把训练数据输入到自定义层中
        x = self.fc1(inputs)
        # 利用relu函数进行非线性激活操作
        out = tf.nn.relu(x)
        x = self.fc2(out)
        out = tf.nn.relu(x)
        x = self.fc3(out)
        out = tf.nn.relu(x)
        x = self.fc4(out)
        out = tf.nn.relu(x)
        x = self.fc5(out)
        return x


netWork = myModel()
netWork.build(input_shape=[None, 32 * 32 * 3])
netWork.summary()

netWork.compile(optimizer=optimizers.Adam(lr=1e-3),
                loss=tf.losses.CategoricalCrossentropy(from_logits=True),
                metrics=['accuracy']
                )
netWork.fit(db_train, epochs=10, validation_data=db_test,
            validation_freq=2
            )
netWork.evaluate(db_test)