import pandas as pd
import sys
import os
csv_file = sys.argv[1]
reader = pd.read_csv(csv_file)
path = "parse_files"
# Check whether the specified path exists or not
isExist = os.path.exists(path)
if not isExist:
    # Create a new directory because it does not exist
    os.makedirs(path)
reader.to_json("parse_files/sample.json", orient='records')

