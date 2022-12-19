import re
import time

from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By

from PageObjects.Cqube_UI.BasePage import Base
from Utilities.ReadProperties import ReadConfig


class NipunBharat(Base):
    """ Locators for dashboard and NipunBharat """
    k = 0
    dashboard_button = (By.ID, 'menu-item-0')
    nipun_button = (By.ID, 'menu-item-8')
    a_plus = (By.ID, "font-size-increase")
    a_minus = (By.ID, "font-size-decrease")
    a_default = (By.ID, "font-size-reset")
    nipun_learning_i_tag = (By.XPATH, "//app-foundational-literacy-numeracy/div[1]/div/div["
                                      "1]/sb-cqube-info-card/div/img")
    nipun_learning_value = (By.XPATH, "//app-foundational-literacy-numeracy/div[1]/div/div["
                                      "1]/sb-cqube-info-card/div/div/span[1]")
    nipun_learning_title = (By.XPATH, "//app-foundational-literacy-numeracy/div[1]/div/div["
                                      "1]/sb-cqube-info-card/div/div/span[2]")
    nipun_digital_info = (By.XPATH, "//app-foundational-literacy-numeracy/div[1]/div/div[2]/sb-cqube-info-card/div/img")
    nipun_digital_value = (By.XPATH, "//app-foundational-literacy-numeracy/div[1]/div/div["
                                     "2]/sb-cqube-info-card/div/div/span[1]")
    nipun_digital_title = (By.XPATH, "//app-foundational-literacy-numeracy/div[1]/div/div["
                                     "2]/sb-cqube-info-card/div/div/span[2]")
    nipun_content_info = (By.XPATH, "//app-foundational-literacy-numeracy/div[1]/div/div[3]/sb-cqube-info-card/div/img")
    nipun_content_value = (By.XPATH, "//app-foundational-literacy-numeracy/div[1]/div/div["
                                     "3]/sb-cqube-info-card/div/div/span[1]")
    nipun_content_title = (By.XPATH, "//app-foundational-literacy-numeracy/div[1]/div/div["
                                     "3]/sb-cqube-info-card/div/div/span[2]")
    nipun_session_info = (By.XPATH, "//app-foundational-literacy-numeracy/div[1]/div/div[4]/sb-cqube-info-card/div/img")
    nipun_session_value = (By.XPATH, "//app-foundational-literacy-numeracy/div[1]/div/div["
                                     "4]/sb-cqube-info-card/div/div/span[1]")
    nipun_session_title = (By.XPATH, "//app-foundational-literacy-numeracy/div[1]/div/div["
                                     "4]/sb-cqube-info-card/div/div/span[2]")
    textbook_status_tab = (By.XPATH, "//div[contains(text(),'Textbook Status')]")
    learning_session_tab = (By.XPATH, "//div[contains(text(),'Learning Sessions')]")
    subject_filter_dropdown = (By.ID, 'filter-Subject')
    subject_options = "//*[@role='option']"
    subject_option_selection = ""
    L = r'L\.|[^\d.]'
    K_value = r'K\.|[^\d.]'
    textbook_tab_result = "//*[@role='tab'][1]"
    session_tab_result = "//*[@role='tab'][2]"

    no_of_stacked_bars = "rect.highcharts-point"
    stacked_bar_chart = "//*[@class='highcharts-series-group']/*/*[{}]"
    dropdown_option_id = "//div[starts-with(@id,'a') and contains(@id,'-{}')]"
    dropdown_option_name = "//div[starts-with(@id,'a') and contains(@id,'-{}')]/span"
    bar_text = "//*[@class='highcharts-axis-labels highcharts-xaxis-labels']/*[{}]"

    def __init__(self, driver):
        super().__init__(driver)
        self.count = 0

    '''Functions to get application url from configuration file'''

    def open_cqube_application(self):
        self.get_url(ReadConfig.get_application_url())
        self.driver.implicitly_wait(30)

    """This function is used to click on the cQube dashboard"""

    def click_dashboard(self):
        self.click(self.dashboard_button)

    """This function is used to click on the Nipun Bharat button"""

    def click_nipun_bharat(self):
        self.click(self.nipun_button)

    '''Function to get the integer digits'''

    @staticmethod
    def get_integer_value(value):
        return re.sub("\D", '', value)

    """This function is used to click on the TextBook Status Tab"""

    def click_textbook_status(self):
        self.click(self.textbook_status_tab)

    """This function is used to click on the Learning Status Tab"""

    def click_learning_session(self):
        self.click(self.learning_session_tab)

    """This function is used to get the Learning outcome card metrics"""

    def get_learning_card_info(self):
        return self.get_attribute_value('title', self.nipun_learning_i_tag)

    def get_learning_card_value(self):
        return self.get_web_element_text(self.nipun_learning_value)

    def get_learning_card_title(self):
        return self.get_web_element_text(self.nipun_learning_title)

    """This function is used to get the Digital Books card metrics"""

    def get_digital_books_card_info(self):
        return self.get_attribute_value('title', self.nipun_digital_info)

    def get_digital_books_card_value(self):
        return self.get_web_element_text(self.nipun_digital_value)

    def get_digital_books_card_title(self):
        return self.get_web_element_text(self.nipun_digital_title)

    """This function is used to get the Total Content card metrics"""

    def get_total_content_card_info(self):
        return self.get_attribute_value('title', self.nipun_content_info)

    def get_total_content_card_value(self):
        return self.get_web_element_text(self.nipun_content_value)

    def get_total_content_card_title(self):
        return self.get_web_element_text(self.nipun_content_title)

    """This function is used to get the Learning Sessions card metrics"""

    def get_learning_session_card_info(self):
        return self.get_attribute_value('title', self.nipun_session_info)

    def get_learning_session_card_value(self):
        return self.get_web_element_text(self.nipun_session_value)

    def get_learning_session_card_title(self):
        return self.get_web_element_text(self.nipun_session_title)

    ''' Function to get tab clicked status'''

    def get_textbook_status_tab(self):
        self.click(self.textbook_status_tab)
        result = Base.get_tab_result(self, 'aria-selected', self.textbook_tab_result)
        return result

    ''' Function to get tab clicked status'''

    def get_session_status_tab(self):
        self.click(self.learning_session_tab)
        result = Base.get_tab_result(self, 'aria-selected', self.session_tab_result)
        return result

    '''Functions to get number of bars in the chart'''

    def get_count_of_stacked_bar_chart(self):
        lst = self.driver.find_elements(By.CSS_SELECTOR, self.no_of_stacked_bars)
        if len(lst) - 1 != 0 and len(lst) - 1 > 0:
            print(" TextBook Status Tab showing Stack Bar Chart ", len(lst) - 1)
        else:
            self.count = self.count + 1
        return self.count

    '''Function to get Stacked Bar tooltip validation'''

    def get_stacked_bar_tooltip_validation(self):
        lst = self.driver.find_elements(By.CSS_SELECTOR, self.no_of_stacked_bars)
        for x in range(1, len(lst) - 1):
            act = ActionChains(self.driver)
            bar_one = self.driver.find_element(By.XPATH, self.stacked_bar_chart.format(x))
            act.move_to_element(bar_one).perform()
            act.pause(5)
            text_info = self.driver.find_element(By.XPATH, self.bar_text.format(x)).text
            time.sleep(2)
            if text_info in self.driver.page_source:
                print(text_info, " Tooltip is Displaying... ")
        return self.count

    '''Function to click the Subject Dropdown'''

    def click_subject_dropdown(self):
        self.click(self.subject_filter_dropdown)

    '''Functional to get count of dropdown options '''

    def get_count_of_dropdown_options(self):
        self.click_subject_dropdown()
        lst = self.driver.find_elements(By.XPATH, self.subject_options)
        if len(lst) - 1 != 0 and len(lst) - 1 > 0:
            print(" Learning Session Dropdown options ", len(lst) - 1)
        else:
            self.count = self.count + 1
        return self.count

    '''Function to get validation of tooltip with subject selection '''

    def get_subjection_options_validate_tooltips(self):
        self.click_subject_dropdown()
        lst = self.driver.find_elements(By.XPATH, self.subject_options)
        for i in range(len(lst)):
            opt_sel = self.driver.find_element(By.XPATH, self.dropdown_option_id.format(i))
            opt_name = self.driver.find_element(By.XPATH, self.dropdown_option_name.format(i)).text
            opt_sel.click()
            time.sleep(3)
            res = self.get_stacked_bar_tooltip_validation()
            if res == 0:
                print(opt_name, "having tooltip information on bar chart")
                assert True
            else:
                self.count = self.count + 1
                assert False
            self.click_subject_dropdown()
        return self.count

    ''' Function to default A button click'''

    def test_click_on_a_default_button(self):
        self.click(self.a_default)
        time.sleep(2)
        if 'style="font-size: 16px;"' in self.driver.page_source:
            self.driver.refresh()
            assert True
        else:
            self.count = self.count + 1
        return self.count

    '''Function to click the A+ button '''

    def test_click_on_a_plus_button(self):
        self.click(self.a_plus)
        time.sleep(2)
        if 'style="font-size: 18px;"' in self.driver.page_source:
            self.driver.refresh()
            assert True
        else:
            self.count = self.count + 1
        return self.count

    '''Function to click the A- button '''

    def test_click_on_a_minus_button(self):
        self.click(self.a_minus)
        time.sleep(2)
        if 'style="font-size: 14px;"' in self.driver.page_source:
            self.driver.refresh()
            assert True
        else:
            self.count = self.count + 1
        return self.count
