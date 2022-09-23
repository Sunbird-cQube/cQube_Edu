import configparser
import os

config = configparser.RawConfigParser()
config.read('../Configurations/config.ini')


class ReadConfig:
    """Method that returns the application url"""
    @staticmethod
    def get_application_url():
        url = config.get('config', 'url')
        return url

    """Method that returns the downloads dir path """
    @staticmethod
    def get_download_dir():
        current_directory = os.path.dirname(__file__)
        current_directory = current_directory.replace("Utilities", "")
        download_path = os.path.join(current_directory, 'Downloads')
        return download_path

    """Method that returns the drivers dir path """
    @staticmethod
    def get_chrome_driver_directory():
        current_directory = os.path.dirname(__file__)
        current_directory = current_directory.replace("Utilities", "")
        chrome_directory_path = os.path.join(current_directory, 'Drivers/chromedriver')
        return chrome_directory_path

    """Method that returns the screenshots dir path """
    @staticmethod
    def get_screenshot_directory():
        current_directory = os.path.dirname(__file__)
        current_directory = current_directory.replace("Utilities", "")
        screenshot_directory = os.path.join(current_directory, 'Screenshots')
        return screenshot_directory

    """Method that returns the logs dir path """
    @staticmethod
    def get_logs_directory():
        current_directory = os.path.dirname(__file__)
        current_directory = current_directory.replace("Utilities", "")
        logs_directory = os.path.join(current_directory, 'Logs')
        return logs_directory
