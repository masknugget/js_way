import numpy as np
import keras
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten
from keras.layers import Conv2D, MaxPooling2D
from keras.optimizers import SGD
#这一行新加的，用于导入绘图包
from keras.utils import plot_model
# 生成数据
#生成100张图片，每张图片100*100大小，是3通道的。
x_train = np.random.random((100, 100, 100, 3))
y_train = keras.utils.to_categorical(np.random.randint(10, size=(100, 1)), num_classes=10)
x_test = np.random.random((20, 100, 100, 3))
y_test = keras.utils.to_categorical(np.random.randint(10, size=(20, 1)), num_classes=10)

model = Sequential()
#一层卷积层，包含了32个卷积核，大小为3*3
model.add(Conv2D(32, (3, 3), activation='relu', input_shape=(100, 100, 3)))
model.add(Conv2D(32, (3, 3), activation='relu'))
#一个最大池化层，池化大小为2*2
model.add(MaxPooling2D(pool_size=(2, 2)))
#遗忘层，遗忘速率为0.25
model.add(Dropout(0.25))
#添加一个卷积层，包含64个卷积和，每个卷积和仍为3*3
model.add(Conv2D(64, (3, 3), activation='relu'))
model.add(Conv2D(64, (3, 3), activation='relu'))
#来一个池化层
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))
#压平层
model.add(Flatten())
#来一个全连接层
model.add(Dense(256, activation='relu'))
#来一个遗忘层
model.add(Dropout(0.5))
#最后为分类层
model.add(Dense(10, activation='softmax'))

sgd = SGD(lr=0.01, decay=1e-6, momentum=0.9, nesterov=True)
model.compile(loss='categorical_crossentropy', optimizer=sgd)

model.fit(x_train, y_train, batch_size=32, epochs=10)
score = model.evaluate(x_test, y_test, batch_size=32)
#这一行新加的，用于绘图
plot_model(model, to_file='modelcnn.png',show_shapes=True)
model.save("CNN.model")



# 一维卷，二维卷， 池化，拍平

keras.layers.convolutional.Conv1D(
filters, #卷积核的数目（即输出的维度）
kernel_size,#整数或由单个整数构成的list/tuple，卷积核的空域或时域窗长度
strides=1, #整数或由单个整数构成的list/tuple，为卷积的步长。任何不为1的strides均与任何不为1的dilation_rate均不兼容
padding='valid', #补0策略，为“valid”, “same” 或“causal”，
#“causal”这是1维卷积独有的，它一次卷积只会卷积一个新样本，其余的均为之前的样本，尤其是边缘时，则需要补卷积长度-1个0。目的是为了保证时序性，也就是你不能看到未来发生的事情才对。
#“valid”这是说只从边界开始卷积，不进行补0。
#“same”对边界也进行补0，但是保证输入维度与输出维度相同。
dilation_rate=1, #整数或由单个整数构成的list/tuple，指定dilated convolution中的膨胀比例。任何不为1的dilation_rate均与任何不为1的strides均不兼容。
activation=None, #激活函数，为预定义的激活函数名（参考激活函数），或逐元素（element-wise）的Theano函数。如果不指定该参数，将不会使用任何激活函数（即使用线性激活函数：a(x)=x）
use_bias=True, #布尔值，是否使用偏置项
kernel_initializer='glorot_uniform', #权值初始化方法，为预定义初始化方法名的字符串，或用于初始化权重的初始化器。
bias_initializer='zeros', #权值初始化方法，为预定义初始化方法名的字符串，或用于初始化权重的初始化器。
kernel_regularizer=None, #施加在权重上的正则项
bias_regularizer=None, #施加在偏置向量上的正则项
activity_regularizer=None, #施加在输出上的正则项
kernel_constraint=None, #施加在权重上的约束项
bias_constraint=None#施加在偏置上的约束项
)


keras.layers.convolutional.Conv2D(
filters,
kernel_size,
strides=(1, 1),#单个整数或由两个整数构成的list/tuple，卷积核的宽度和长度。如为单个整数，则表示在各个空间维度的相同长度。
padding='valid',
data_format=None, #字符串，“channels_first”或“channels_last”之一，代表图像的通道维的位置。
#“channels_last”对应原本的“tf”，
#“channels_first”对应原本的“th”。
#以128x128的RGB图像为例，“channels_first”应将数据组织为（3,128,128），而“channels_last”应将数据组织为（128,128,3）。
#该参数的默认值是~/.keras/keras.json中设置的值，若从未设置过，则为“channels_last”。
dilation_rate=(1, 1), #单个整数或由两个整数构成的list/tuple，为卷积的步长。如为单个整数，则表示在各个空间维度的相同步长。任何不为1的strides均与任何不为1的dilation_rate均不兼容
activation=None,
use_bias=True,
kernel_initializer='glorot_uniform',
bias_initializer='zeros',
kernel_regularizer=None,
bias_regularizer=None,
activity_regularizer=None,
kernel_constraint=None,
bias_constraint=None)



#1维最大池化
keras.layers.pooling.MaxPooling1D(
pool_size=2,#整数，池化窗口大小
strides=None, #整数或None，下采样因子，例如设2将会使得输出shape为输入的一半，若为None则默认值为pool_size。
padding='valid'#‘valid’或者‘same’
)
#2维最大池化
keras.layers.pooling.MaxPooling2D(
pool_size=(2, 2),
 strides=None,
data_format=None#代表图像的通道维的位置。
)
#对于时间信号的全局最大池化
keras.layers.pooling.GlobalMaxPooling1D()
#为空域信号施加全局最大值池化
keras.layers.pooling.GlobalMaxPooling2D(dim_ordering='default')



keras.layers.core.Flatten()

model = Sequential()
model.add(Convolution2D(64, 3, 3,
            border_mode='same',
            input_shape=(3, 32, 32)))
# now: model.output_shape == (None, 64, 32, 32)
model.add(Flatten())
# now: model.output_shape == (None, 65536)