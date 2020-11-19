import pandas as pd

data = {'Test Column 1': ['First Val', 'Second Val'],
        'Test Column 2': ['Second Val', 'Second Val']}

df = pd.DataFrame(data , columns = ['Test Column 1', 'Test Column 2']);

print(df.to_json())
