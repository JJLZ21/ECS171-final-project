from tensorflow import keras
import pandas as pd
import pickle
print("Hello from Python!")

# road the model from hw1 the python code and the run it
filename = 'finalized_model.sav'
loaded_model = pickle.load(open(filename, 'rb'))
input_for_weight = [16.75, 4, 400, 150, 8, 81, 1]
load_model_predicted = loaded_model.predict([input_for_weight])
print('The expected weight class is:', load_model_predicted[0])

# road the model from hw2 the python code and the run it
model_new = keras.models.load_model('train_model.h5')
q5_test_in = [[1, 0, 0, 0, 0.555372, 0, 0.569690, 0.123167, 0.654471, 0.119489, 0.575915, 0.357817, 0.10, 0.485423, 0.222222],
              [0, 1, 0, 1, 0.154762, 0, 0.633596, 0.523674, 0.489632, 0.632587, 0.785415, 0.657841, 0.40, 0.123623, 0.333333]]
p = model_new.predict(q5_test_in, batch_size=10)
print('The expected weight class is:', p)
