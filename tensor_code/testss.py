# !pip install tf-nightly

# %%

import tensorflow as tf

from tensorflow.keras import layers
from tensorflow.keras import losses
from tensorflow.keras import preprocessing
from tensorflow.keras.layers.experimental.preprocessing import TextVectorization

# %%

print(tf.__version__)

# %% md

### Download the BigQuery dataset

# %%

url = "http://storage.googleapis.com/download.tensorflow.org/data/stack_overflow_16k.tar.gz"

tf.keras.utils.get_file("stack_overflow_16k.tar.gz", url,
                        untar=True, cache_dir='.',
                        cache_subdir='')

# %%

batch_size = 32

raw_train_ds = tf.keras.preprocessing.text_dataset_from_directory(
    'train', batch_size=batch_size, validation_split=0.2, subset='training', seed=42)

raw_val_ds = tf.keras.preprocessing.text_dataset_from_directory(
    'train', batch_size=batch_size, validation_split=0.2, subset='validation', seed=42)

raw_test_ds = tf.keras.preprocessing.text_dataset_from_directory(
    'test', batch_size=batch_size)

# %% md

### Explore the data

# %%

print(raw_train_ds.class_names)

# %%

for text_batch, label_batch in raw_train_ds.take(1):
    for i in range(5):
        print(text_batch.numpy()[i])
        print(label_batch.numpy()[i])
        print()

# %% md

### Prepare data for training

# %%

max_features = 5000
embedding_dim = 128
sequence_length = 500

vectorize_layer = TextVectorization(
    max_tokens=max_features,
    output_mode='int',
    output_sequence_length=sequence_length)

# %%

# Make a text-only dataset (no labels) and call adapt
text_ds = raw_train_ds.map(lambda x, y: x)
vectorize_layer.adapt(text_ds)


# %% md

### Vectorize the data


# %%

def vectorize_text(text, label):
    text = tf.expand_dims(text, -1)
    return vectorize_layer(text), label


train_ds = raw_train_ds.map(vectorize_text)
val_ds = raw_val_ds.map(vectorize_text)
test_ds = raw_test_ds.map(vectorize_text)

# %% md

### Configure the dataset for performance

# %%

AUTOTUNE = tf.data.experimental.AUTOTUNE

train_ds = train_ds.cache().prefetch(buffer_size=AUTOTUNE)
val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)
test_ds = test_ds.cache().prefetch(buffer_size=AUTOTUNE)

# %% md

### Build the model


model = tf.keras.Sequential([
    layers.Embedding(max_features + 1, embedding_dim),
    layers.Dropout(0.2),
    layers.GlobalAveragePooling1D(),
    layers.Dropout(0.2),
    layers.Dense(4)])

# %%

model.compile(
    loss=losses.SparseCategoricalCrossentropy(from_logits=True),
    optimizer='adam',
    metrics=['accuracy'])

# %% md

### Train the model

# %%

history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=5)

# %% md

### Evaluate the model

# %%

loss, accuracy = model.evaluate(test_ds)

print("Loss: ", loss)
print("Accuracy: ", accuracy)
