import sys
import time
from update_processor_property import start_processor_group

processor_group_name = sys.argv[1]
stop_hour = int(sys.argv[2])
data_storage_processor = 'cQube_data_storage'
# Stop hour
stop_seconds = stop_hour*60*60
time.sleep(stop_seconds)

# Disable the diksha_transformer_custom
start_processor_group(processor_group_name, 'STOPPED')
start_processor_group(data_storage_processor, 'STOPPED')
time.sleep(5)
start_processor_group(processor_group_name, 'DISABLED')
sys.exit(0)