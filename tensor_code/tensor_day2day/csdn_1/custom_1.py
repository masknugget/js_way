import numpy as np
import tensorflow as tf
import datetime
import os

from tensorflow.keras.datasets import mnist
from tensorflow.keras.layers import Dense, Flatten, Conv2D, MaxPool2D


def load_dataset():
    (x_train, y_train), (x_test, y_test) = mnist.load_data()
    x_train, x_test = x_train / 255.0, x_test / 255.0

    return x_train, y_train, x_test, y_test


x_train, y_train, x_test, y_test = load_dataset()

print(np.shape(x_train))

x_train = x_train[..., tf.newaxis]
x_test = x_test[..., tf.newaxis]

train_ds = tf.data.Dataset.from_tensor_slices((x_train, y_train)).shuffle(10000).batch(32)
test_ds = tf.data.Dataset.from_tensor_slices((x_test, y_test)).batch(32)


class MyDense(tf.keras.layers.Layer):
    def __init__(self, units=32, **kwargs):
        super(MyDense, self).__init__(**kwargs)
        self.units = units

    def build(self, input_shape):
        super(MyDense, self).build(input_shape)  # 相当于设置self.build = True
        self.w = self.add_weight(shape=(input_shape[-1], self.units),
                                 initializer='random_normal',
                                 trainable=True,
                                 name='w')
        self.b = self.add_weight(shape=(self.units,),
                                 initializer='random_normal',
                                 trainable=True,
                                 name='b')

    def call(self, inputs):
        return tf.matmul(inputs, self.w) + self.b

    def get_config(self):
        config = super(MyDense, self).get_config()
        config.update({'units': self.units})
        return config


class MyBlock(tf.keras.Model):
    def __init__(self, units=[32, 32]):
        super(MyBlock, self).__init__(name='')

        self.dense1 = MyDense(units[0])
        self.dense2 = MyDense(units[1])

    def call(self, input_tensor):
        x = self.dense1(input_tensor)
        return self.dense2(x)


class MyModel(tf.keras.Model):
    def __init__(self, num_classes=10):
        super(MyModel, self).__init__()

        self.conv1 = Conv2D(4, 3, activation='relu')
        self.pool1 = MaxPool2D(pool_size=(2, 2))
        self.conv2 = Conv2D(6, 3, activation='relu')
        self.pool2 = MaxPool2D(pool_size=(2, 2))
        self.flatten = Flatten()
        self.block = MyBlock(units=[60, 40])
        self.d = Dense(10)

    @tf.function(input_signature=[tf.TensorSpec([None, 28, 28, 1], tf.float32, name='inputs')])
    def call(self, input_tensor):
        x = self.conv1(input_tensor)
        x = self.pool1(x)
        x = self.conv2(x)
        x = self.pool2(x)
        x = self.flatten(x)
        x = self.block(x)
        return self.d(x)


def training_model():
    Epochs = 10
    model = MyModel()
    loss_obj = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)
    optimizer = tf.keras.optimizers.Adam(0.001)

    train_loss = tf.keras.metrics.Mean(name='train_loss')
    test_loss = tf.keras.metrics.Mean(name='test_loss')
    test_acc = tf.keras.metrics.SparseCategoricalAccuracy(name='test_acc')

    def train_step(images, labels):
        with tf.GradientTape() as tape:
            logits = model(images)
            loss = loss_obj(labels, logits)

        grads = tape.gradient(loss, model.trainable_variables)
        optimizer.apply_gradients(zip(grads, model.trainable_variables))

        train_loss(loss)

    def test_step(images, labels):
        logits = model(images)
        loss = loss_obj(labels, logits)

        test_loss(loss)
        test_acc(labels, logits)

    for epoch in range(Epochs):
        train_loss.reset_states()
        test_loss.reset_states()
        test_acc.reset_states()

        for images, labels in train_ds:
            train_step(images, labels)

        for images, labels in test_ds:
            test_step(images, labels)

        tmp = 'Epoch {}, train_loss: {}, test_loss: {}, test_acc: {}'
        print(tmp.format(epoch + 1, train_loss.result(), test_loss.result(), test_acc.result()))


training_model()

