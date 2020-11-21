import sys
import pandas as pd

print("Number of arguments: " + str(len(sys.argv)))
print("Arg list: " + str(sys.argv))

print("Stdin input")
for line in sys.stdin:
    print(line)

data = {'Test Column 1': ['First Val', 'Second Val'],
        'Test Column 2': ['Second Val', 'Second Val']}

df = pd.DataFrame(data, columns=['Test Column 1', 'Test Column 2'])

print(df.to_json())
