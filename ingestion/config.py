from logging import FileHandler
import logging
from env import *

file_handler = FileHandler('error.log')
file_handler.setLevel(logging.ERROR)

logger = logging.getLogger('werkzeug')
access_handler = FileHandler('access.log')
access_handler.setLevel(logging.INFO)
logger.addHandler(access_handler)

''' configuration details for data  Ingestion  '''
storage = ''                                 # Storage type (e.g. 's3' or 'azure' or 'on-premise')
EMISSION_BUCKET_NAME = ''                    # Emission bucket name of AWS S3 (e.g. 'cqube-demo-emission')
OUTPUT_BUCKET_NAME = ''                      # Output bucket name of AWS S3 (e.g. 'cqube-demo-output')
INPUT_BUCKET_NAME = ''                       # Input bucket name of AWS S3 (e.g. 'cqube-demo-input')
AWS_ACCESS_KEY = ''                          # Access key of AWS S3
AWS_SECRET_KEY = ''                          # Secret Key of Aws S3
AWS_DEFAULT_REGION = ''                      # Region name of AWS S3 (e.g. 'ap-south-1')
destination_folder = ''                      # Full path of Destination Folder for on-premise storage type
AZURE_ACC_NAME = ''                          # Account name of Azure storage type
AZURE_PRIMARY_KEY = ''                       # Primary key of Azure storage type
AZURE_CONTAINER = ''                         # Container name of Azure storage type in which data has to be Ingested
