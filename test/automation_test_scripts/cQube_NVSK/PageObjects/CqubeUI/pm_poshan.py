import re
import time

from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By

from PageObjects.Cqube_UI.BasePage import Base
from Utilities.ReadProperties import ReadConfig


class PmPoshan(Base):
    """Locators for dashboard and pm poshan"""

    dashboard_button = (By.ID, 'menu-item-0')
    pm_poshan_button = (By.ID, 'menu-item-4')
    pm_poshan_i_tag = (By.XPATH, "//app-nutrition-health/div[1]/div/div[1]/sb-cqube-info-card/div/img")
    pm_poshan_vanity_card_value = (By.XPATH, "//app-nutrition-health/div[1]/div/div["
                                             "1]/sb-cqube-info-card/div/div/span[1]")
    pm_poshan_vanity_card_label = (By.XPATH, "//app-nutrition-health/div[1]/div/div["
                                             "1]/sb-cqube-info-card/div/div/span[2]")
    pm_schools_info = (By.XPATH, "//app-nutrition-health/div[1]/div/div[2]/sb-cqube-info-card/div/img")
    pm_schools_value = (By.XPATH, "//app-nutrition-health/div[1]/div/div[2]/sb-cqube-info-card/div/div/span[1]")
    pm_schools_title = (By.XPATH, "//app-nutrition-health/div[1]/div/div[2]/sb-cqube-info-card/div/div/span[2]")
    pm_implementation_tab = (By.XPATH, "//*[contains(text(),'Implementation Status')]")
    pm_progress_status_tab = (By.XPATH, "//*[contains(text(),'Progress Status')]")
    poshan_implementation_result = (By.XPATH, "//*[@role='tab'][1]")
    poshan_progress_result = (By.XPATH, "//*[@role='tab'][2]")
    map_tooltip = "leaflet-interactive"
    map_info = (By.XPATH, "//div[@class='leaflet-pane leaflet-tooltip-pane']")
    poshan_state_btn = (By.ID, "button-0")
    poshan_district_btn = (By.ID, "button-1")
    poshan_metric_options = (By.XPATH, "//*[@role='option']")
    poshan_choose_dropdown = (By.XPATH, "//*[@class='ng-input']/input")
    poshan_click_metrics = (By.ID, "metricFilter-Metrics to be shown")
    poshan_click_state = (By.ID, "filter-State/UT")
    a_plus = (By.ID, "font-size-increase")
    a_minus = (By.ID, "font-size-decrease")
    a_default = (By.ID, "font-size-reset")
    dropdown_option_id = "//div[starts-with(@id,'a') and contains(@id,'-{}')]"
    dropdown_option_name = "//div[starts-with(@id,'a') and contains(@id,'-{}')]/span"

    def __init__(self, driver):
        super().__init__(driver)
        self.count = 0

    """This function is used to open the cQube application"""

    def open_cqube_application(self):
        self.get_url(ReadConfig.get_application_url())

    """This function is used to click on the cQube dashboard"""

    def click_dashboard(self):
        self.click(self.dashboard_button)

    """This function is used to click on the PM Poshan button"""

    def click_pm_poshan(self):
        self.click(self.pm_poshan_button)

    """This function is used to click on the Implementation Tab"""

    def click_implementation_tab(self):
        self.click(self.pm_implementation_tab)

    """This function is used to click on the Progress Tab"""

    def click_progress_status_tab(self):
        self.click(self.pm_progress_status_tab)

    """This function is used to get the vanity card i-tag information"""

    def get_vanity_card_info(self):
        return self.get_attribute_value('title', self.pm_poshan_i_tag)

    """This function is used to get the vanity card values or metrics"""

    def get_vanity_card_value(self):
        return self.get_web_element_text(self.pm_poshan_vanity_card_value)

    """This function is used to get the vanity card label"""

    def get_vanity_card_label(self):
        return self.get_web_element_text(self.pm_poshan_vanity_card_label)

    """This function is used to get the Total School Card Metrics"""

    def get_total_school_card_info(self):
        return self.get_attribute_value('title', self.pm_poshan_i_tag)

    def get_total_school_card_value(self):
        return self.get_web_element_text(self.pm_poshan_vanity_card_value)

    def get_total_school_card_label(self):
        return self.get_web_element_text(self.pm_poshan_vanity_card_label)

    def get_implementation_tab_result(self):
        self.click(self.pm_implementation_tab)
        return self.get_attribute_value('aria-selected', self.poshan_implementation_result)

    """This function is used to get the Progress Tab Status"""
    def get_progress_tab_result(self):
        self.click(self.pm_progress_status_tab)
        return self.get_attribute_value('aria-selected', self.poshan_progress_result)

    """This function is used to click the State button"""
    def get_click_on_state_button(self):
        return self.click(self.poshan_state_btn)

    """This function is used to click the District button"""

    def get_click_on_district_button(self):
        return self.click(self.poshan_district_btn)

    """This function is used to click the Metrics button"""
    def get_click_metrics_dropdown(self):
        return self.click(self.poshan_click_metrics)

    """This function is used to get count of dropdown button"""
    def get_dropdown_options_count(self):
        return self.get_web_elements(self.poshan_metric_options)

    '''This function is used to get count of state dropdown button'''
    def get_click_state_dropdown(self):
        return self.click(self.poshan_click_state)

    '''This function is used to get map tooltip validation'''
    def get_map_tooltip_info_validation(self):
        blue_marks = 0
        white_marks = 0
        map_data = []
        lst = self.driver.find_elements(By.CLASS_NAME, self.map_tooltip)
        print("No of Markers", len(lst) - 1)
        if len(lst) - 1 == 0:
            assert False
        else:
            for x in range(1, 3):
                if lst[x].get_attribute('fill') == '#FFFFFF':
                    white_marks = white_marks + 1
                else:
                    blue_marks = blue_marks + 1
                act = ActionChains(self.driver)
                act.move_to_element(lst[x]).perform()
                act.pause(4)
                txt = self.get_web_element(self.map_info)
                map_data.append(txt.text)
        return map_data

    '''This function is used to get map tooltip validation in progress tab'''
    def get_map_tooltip_validation_in_progress_tab(self):
        self.get_click_metrics_dropdown()
        time.sleep(2)
        options = self.get_dropdown_options_count()
        opt_count = len(options)
        for i in range(opt_count):
            option_name = self.driver.find_element(By.XPATH, self.dropdown_option_name.format(i))
            state_ids = self.driver.find_element(By.XPATH, self.dropdown_option_id.format(i))
            opt_name = option_name.text
            state_ids.click()
            time.sleep(4)
            lst = self.driver.find_elements(By.CLASS_NAME, self.map_tooltip)
            print(opt_name, "No of Markers", len(lst) - 1)
            if len(lst) - 1 == 0:
                self.count = self.count + 1
                assert False
            else:
                for x in range(1, 3):
                    act = ActionChains(self.driver)
                    act.move_to_element(lst[x]).perform()
                    act.pause(4)
            self.get_click_metrics_dropdown()
            time.sleep(2)
        return self.count

    ''' This function is to get selection of district and state dropdown options '''
    def get_district_with_state_selection(self):
        state_list = []
        self.get_click_state_dropdown()
        time.sleep(2)
        options = self.get_dropdown_options_count()
        opt_count = len(options)
        for i in range(opt_count):
            state_ids = self.driver.find_element(By.XPATH, self.dropdown_option_id.format(i))
            state_name = self.driver.find_element(By.XPATH, self.dropdown_option_name.format(i))
            state_list.append(state_name.text)
            state_ids.click()
            time.sleep(2)
            res = self.get_map_tooltip_info_validation()
            print(res)
            self.get_click_state_dropdown()
            time.sleep(2)
        return opt_count, state_list

    ''' This Functions to get count of Metric Dropdown Options '''
    def check_metric_dropdown_options(self):
        self.get_click_metrics_dropdown()
        time.sleep(2)
        options = self.get_dropdown_options_count()
        opt_count = len(options)
        return opt_count

    ''' Function to get district button and metrics options validation '''
    def check_district_metrics_state_dropdown_options(self):
        self.get_click_metrics_dropdown()
        time.sleep(1)
        metrics = self.get_dropdown_options_count()
        metrics_options = len(metrics)
        self.get_click_state_dropdown()
        time.sleep(1)
        states = self.get_dropdown_options_count()
        state_options = len(states)
        return metrics_options, state_options

    '''Function to get integer digits'''
    @staticmethod
    def get_integer_value(value):
        return re.sub("\D", '', value)

    ''' Function to get the check district wise metric and state dropdown option selection and map validation '''
    def check_district_metric_and_state_dropdown(self):
        state_list = []
        self.get_click_metrics_dropdown()
        time.sleep(2)
        options = self.get_dropdown_options_count()
        opt_count = len(options)
        for i in range(opt_count):
            state_ids = self.driver.find_element(By.XPATH, self.dropdown_option_id.format(i))
            state_ids.click()
            time.sleep(2)
            self.get_click_state_dropdown()
            time.sleep(2)
            options = self.get_dropdown_options_count()
            state_opts = len(options)
            for j in range(state_opts):
                state_ids = self.driver.find_element(By.XPATH, self.dropdown_option_id.format(j))
                state_name = self.driver.find_element(By.XPATH, self.dropdown_option_name.format(j)) 
                state_list.append(state_name.text)
                state_ids.click()
                time.sleep(3)
                res = self.get_map_tooltip_info_validation()
                print(res)
                self.get_click_state_dropdown()
                time.sleep(2)
            self.get_click_metrics_dropdown()
            time.sleep(2)
        for k in range(len(state_list)):
            s = state_list[k]
            if s != s.lower() and s != s.upper() and s != s.isalnum():
                assert True
            else:
                self.count = self.count + 1
        return self.count

    ''' Function to Click the Default A button '''
    def test_click_on_a_default_button(self):
        self.click(self.a_default)
        time.sleep(2)
        if 'style="font-size: 16px;"' in self.driver.page_source:
            self.driver.refresh()
            assert True
        else:
            self.count = self.count + 1
        return self.count

    ''' Function to Click the A+ button '''
    def test_click_on_a_plus_button(self):
        self.click(self.a_plus)
        time.sleep(2)
        if 'style="font-size: 18px;"' in self.driver.page_source:
            self.driver.refresh()
            assert True
        else:
            self.count = self.count + 1
        return self.count

    ''' Function to Click the A- button '''
    def test_click_on_a_minus_button(self):
        self.click(self.a_minus)
        time.sleep(2)
        if 'style="font-size: 14px;"' in self.driver.page_source:
            self.driver.refresh()
            assert True
        else:
            self.count = self.count + 1
        return self.count
