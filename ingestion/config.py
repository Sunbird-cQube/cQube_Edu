from logging import FileHandler
import logging
from env import *

file_handler = FileHandler('error.log')
file_handler.setLevel(logging.ERROR)

logger = logging.getLogger('werkzeug')
access_handler = FileHandler('access.log')
access_handler.setLevel(logging.INFO)
logger.addHandler(access_handler)


