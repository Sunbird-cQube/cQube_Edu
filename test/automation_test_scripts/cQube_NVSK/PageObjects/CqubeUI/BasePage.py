from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class Base:

    def __init__(self, driver):
        self.driver = driver
        self.default_explicit_wait = 30

    """ Function that clicks the web element """
    def click(self, locator):
        WebDriverWait(self.driver, self.default_explicit_wait).until(EC.presence_of_element_located(locator)).click()

    """ Function that sends the keys to the web element """
    def send_keys(self, locator, text):
        # Sends the keys to web element
        WebDriverWait(self.driver, self.default_explicit_wait).until(
            EC.visibility_of_element_located(locator)).send_keys(text)

    """ Function that returns the text of the web element """
    def get_web_element_text(self, locator):
        # Gets the web element text
        element = WebDriverWait(self.driver, self.default_explicit_wait).until(EC.presence_of_element_located(locator))
        return element.text

    """Function that returns the status of the web element"""
    def is_enabled(self, locator):
        """ Checks whether the web element is enabled """
        element = WebDriverWait(self.driver, self.default_explicit_wait).until(
            EC.visibility_of_element_located(locator))
        return element

    """ Function that returns the title of the web element"""
    def get_title(self, title):
        """ Gets the title of the web element """
        WebDriverWait(self.driver, self.default_explicit_wait).until(EC.title_is(title))
        return self.driver.title

    """ Function used to go to the particular website"""
    def get_url(self, url):
        self.driver.get(url)

    """ Function that returns single web element object """
    def get_web_element(self, locator):
        element = WebDriverWait(self.driver, self.default_explicit_wait).until(
            EC.presence_of_element_located(locator))
        return element

    """ Function that returns multiple web element objects"""
    def get_web_elements(self, locator):
        elements = WebDriverWait(self.driver, self.default_explicit_wait).until(
            EC.presence_of_all_elements_located(locator))
        return elements

    """ Function that returns the web elements attribute"""
    def get_attribute_value(self, attribute_name, locator):
        element = WebDriverWait(self.driver, self.default_explicit_wait).until(
            EC.presence_of_element_located(locator)).get_attribute(attribute_name)
        return element

    """ Function that returns the tab clicked result """
    def get_tab_result(self, attribute_name, locator):
        result = self.driver.find_element(By.XPATH, locator).get_attribute(attribute_name)
        return result
