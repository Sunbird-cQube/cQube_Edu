from selenium import webdriver
from Utilities.ReadProperties import ReadConfig


class ConfTest:

    """Below method is used to get the web driver"""
    @staticmethod
    def get_driver():
        options = webdriver.ChromeOptions()
        prefs = {'download.default_directory': ReadConfig.get_download_dir()}
        options.add_experimental_option('prefs', prefs)
        options.add_argument("--window-size=3860,2160")
        # options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-gpu')
        driver = webdriver.Chrome(options=options,
                                  executable_path=ReadConfig.get_chrome_driver_directory())
        driver.implicitly_wait(30)
        return driver
