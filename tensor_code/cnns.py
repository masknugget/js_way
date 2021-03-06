# -*- coding: utf-8 -*-
"""CNNs.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1ibfKtpxC_hIhZlPbefCoqpAS7jTdyiFw
"""

import tensorflow as tf

# Load MNIST data
(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()
# Preprocessing
x_train = x_train / 255.0
x_test = x_test / 255.0

# Add one domention to make 3D images
x_train = x_train[..., tf.newaxis]
x_test = x_test[..., tf.newaxis]

# Track the data type
dataType, dataShape = x_train.dtype, x_train.shape
print(f"Data type and shape x_train: {dataType} {dataShape}")
labelType, labelShape = y_train.dtype, y_train.shape
print(f"Data type and shape y_train: {labelType} {labelShape}")

im_list = []
n_samples_to_show = 16
c = 0
for i in range(n_samples_to_show):
    im_list.append(x_train[i])
# Visualization
import matplotlib.pyplot as plt
from mpl_toolkits.axes_grid1 import ImageGrid

fig = plt.figure(figsize=(4., 4.))
# Ref: https://matplotlib.org/3.1.1/gallery/axes_grid1/simple_axesgrid.html
grid = ImageGrid(fig, 111,  # similar to subplot(111)
                 nrows_ncols=(4, 4),  # creates 2x2 grid of axes
                 axes_pad=0.1,  # pad between axes in inch.
                 )
# Show image grid
for ax, im in zip(grid, im_list):
    # Iterating over the grid returns the Axes.
    ax.imshow(im[:, :, 0], 'gray')
plt.show()

"""## Training"""

# Model building
NUM_CLASSES = 10
model = tf.keras.Sequential([
    tf.keras.layers.Conv2D(16, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Conv2D(32, (3, 3), activation='relu'),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(NUM_CLASSES, activation='sigmoid')]
)

# Compiling the model with the high-level keras
model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=False),
              metrics=['accuracy'])

# Model training
model.fit(x_train, y_train, epochs=5)

"""## Evaluation"""

eval_loss, eval_acc = model.evaluate(x_test, y_test, verbose=1)
print('Eval accuracy percentage: {:.2f}'.format(eval_acc * 100))
