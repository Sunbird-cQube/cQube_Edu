import logging
from os import remove
from os.path import exists

"""Function retruns the logger object"""


def setup_logger(logger_name, log_file, level=logging.WARNING):
    # Erase log if already exists
    if exists(log_file):
        remove(log_file)
    # Configure log file
    logger = logging.getLogger(logger_name)
    formatter = logging.Formatter('%(asctime)s :%(levelname)s : %(name)s :%(message)s')
    file_handler = logging.FileHandler(log_file, mode='w')
    file_handler.setFormatter(formatter)
    stream_handler = logging.StreamHandler()
    stream_handler.setFormatter(formatter)
    logger.setLevel(level)
    logger.addHandler(file_handler)
    logger.addHandler(stream_handler)
    return logger
