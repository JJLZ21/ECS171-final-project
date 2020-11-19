import pandas as pd

data = {'Test Column 1': ['First Val', 'Second Val'],
        'Test Column 2': ['Second Val', 'Second Val']}

<<<<<<< HEAD
df = pd.DataFrame(data, columns=['Test Column 1', 'Test Column 2'])
=======
df = pd.DataFrame(data , columns = ['Test Column 1', 'Test Column 2']);
>>>>>>> 850c857143bb11fe5d09b25d1bb3fa5df19ea507

print(df.to_json())
