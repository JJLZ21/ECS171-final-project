import pandas as pd
import pickle
print("Hello from Python!")

# road the model from the python code and the run it
filename = 'finalized_model.sav'
loaded_model = pickle.load(open(filename, 'rb'))
input_for_weight = [16.75, 4, 400, 150, 8, 81, 1]
load_model_predicted = loaded_model.predict([input_for_weight])
print('The expected weight class is:', load_model_predicted[0])
