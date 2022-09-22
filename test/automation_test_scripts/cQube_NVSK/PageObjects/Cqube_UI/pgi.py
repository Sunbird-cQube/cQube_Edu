import re
import time
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By
from PageObjects.Cqube_UI.BasePage import Base
from Utilities.ReadProperties import ReadConfig


class Pgi(Base):
    dashboard_button = (By.ID, "menu-item-0")
    pgi_button = (By.ID, "menu-item-7")
    a_plus = (By.ID, "font-size-increase")
    a_minus = (By.ID, "font-size-decrease")
    a_default = (By.ID, "font-size-reset")
    learning_info = (By.XPATH, "//app-school-education/div[1]/div/div[1]/sb-cqube-info-card/div/img")
    learning_value = (By.XPATH, "//app-school-education/div[1]/div/div[1]/sb-cqube-info-card/div/div/span[1]")
    learning_text = (By.XPATH, "//app-school-education/div[1]/div/div[1]/sb-cqube-info-card/div/div/span[2]")
    access_info = (By.XPATH, "//app-school-education/div[1]/div/div[2]/sb-cqube-info-card/div/img")
    access_value = (By.XPATH, "//app-school-education/div[1]/div/div[2]/sb-cqube-info-card/div/div/span[1]")
    access_text = (By.XPATH, "//app-school-education/div[1]/div/div[2]/sb-cqube-info-card/div/div/span[2]")
    infrastructure_info = (By.XPATH, "//app-school-education/div[1]/div/div[3]/sb-cqube-info-card/div/img")
    infrastructure_value = (By.XPATH, "//app-school-education/div[1]/div/div[3]/sb-cqube-info-card/div/div/span[1]")
    infrastructure_text = (By.XPATH, "//app-school-education/div[1]/div/div[3]/sb-cqube-info-card/div/div/span[2]")
    equity_info = (By.XPATH, "//app-school-education/div[1]/div/div[4]/sb-cqube-info-card/div/img")
    equity_value = (By.XPATH, "//app-school-education/div[1]/div/div[4]/sb-cqube-info-card/div/div/span[1]")
    equity_text = (By.XPATH, "//app-school-education/div[1]/div/div[4]/sb-cqube-info-card/div/div/span[2]")
    governance_info = (By.XPATH, "//app-school-education/div[1]/div/div[5]/sb-cqube-info-card/div/img")
    governance_value = (By.XPATH, "//app-school-education/div[1]/div/div[5]/sb-cqube-info-card/div/div/span[1]")
    governance_text = (By.XPATH, "//app-school-education/div[1]/div/div[5]/sb-cqube-info-card/div/div/span[2]")
    implementation_tab_result = "//*[@role='tab'][1]"
    state_wise_perf_tab_result = "//*[@role='tab'][2]"
    district_wise_tab_result = "//*[@role='tab'][3]"
    pgi_implementation_tab = (By.XPATH, "//div[contains(text(),'Implementation Status')]")
    pgi_state_wise_tab = (By.XPATH, "//div[contains(text(),'State Wise Performance')]")
    pgi_district_wise_tab = (By.XPATH, "//div[contains(text(),'District Wise Performance')]")
    click_metric_dropdown = (By.ID, "metricFilter-Metrics to be shown")
    click_state_dropdown = (By.ID, "filter-State/UT")
    count_dropdown_options = (By.XPATH, "//*[@role='option']")
    map_tooltip = (By.CLASS_NAME, "leaflet-interactive")
    tooltip_information = (By.XPATH, "//div[@class='leaflet-pane leaflet-tooltip-pane']")
    dropdown_option_id = "//div[starts-with(@id,'a') and contains(@id,'-{}')]"
    dropdown_option_name = "//div[starts-with(@id,'a') and contains(@id,'-{}')]/span"

    def __init__(self, driver):
        super().__init__(driver)
        self.count = 0

    def open_cqube_application(self):
        self.get_url(ReadConfig.get_application_url())
        self.driver.implicitly_wait(30)

    """This function is used to click on the cQube dashboard"""

    def click_dashboard(self):
        self.click(self.dashboard_button)

    """This function is used to click on the PGI Dashboard button"""

    def click_pgi_dashboard(self):
        self.click(self.pgi_button)

    '''This function is used to click the PGI Dashboard Tabs'''

    def click_implementation_state_tab(self):
        self.click(self.pgi_implementation_tab)

    def click_state_performance_tab(self):
        self.click(self.pgi_state_wise_tab)

    def click_district_performance_tab(self):
        self.click(self.pgi_district_wise_tab)

    '''Function to get Integer Value'''

    @staticmethod
    def get_integer_value(value):
        return re.sub("\D", '', value)

    '''This functions to get result of tab clicked or not '''

    def get_implementation_tab_status(self):
        self.click_implementation_state_tab()
        result = Base.get_tab_result(self, 'aria-selected', self.implementation_tab_result)
        return result

    def get_state_wise_tab_status(self):
        self.click(self.pgi_state_wise_tab)
        result = Base.get_tab_result(self, 'aria-selected', self.state_wise_perf_tab_result)
        return result

    def get_district_wise_tab_status(self):
        self.click(self.pgi_district_wise_tab)
        result = Base.get_tab_result(self, 'aria-selected', self.district_wise_tab_result)
        return result

    '''This method return the count of map markers'''

    def get_count_of_map_tooltips(self):
        return self.get_web_elements(self.map_tooltip)

    """This function is used to get the Learning outcome card metrics"""

    def get_learning_card_info(self):
        return self.get_attribute_value('title', self.learning_info)

    def get_learning_card_value(self):
        return self.get_web_element_text(self.learning_value)

    def get_learning_card_title(self):
        return self.get_web_element_text(self.learning_text)

    """This function is used to get the Access card metrics"""

    def get_access_card_info(self):
        return self.get_attribute_value('title', self.access_info)

    def get_access_card_value(self):
        return self.get_web_element_text(self.access_value)

    def get_access_card_title(self):
        return self.get_web_element_text(self.access_text)

    """This function is used to get the Infrastructure Facilities card metrics"""

    def get_infrastructure_card_info(self):
        return self.get_attribute_value('title', self.infrastructure_info)

    def get_infrastructure_card_value(self):
        return self.get_web_element_text(self.infrastructure_value)

    def get_infrastructure_card_title(self):
        return self.get_web_element_text(self.infrastructure_text)

    """This function is used to get the Equity card metrics"""

    def get_equity_card_info(self):
        return self.get_attribute_value('title', self.equity_info)

    def get_equity_card_value(self):
        return self.get_web_element_text(self.equity_value)

    def get_equity_card_title(self):
        return self.get_web_element_text(self.equity_text)

    """This function is used to get the Governance Process card metrics"""

    def get_governance_card_info(self):
        return self.get_attribute_value('title', self.governance_info)

    def get_governance_card_value(self):
        return self.get_web_element_text(self.governance_value)

    def get_governance_card_title(self):
        return self.get_web_element_text(self.governance_text)

    '''This function is for Click on the dropdown menu '''

    def click_on_metric_dropdown(self):
        self.click(self.click_metric_dropdown)

    '''Function to Click State Dropdown'''

    def click_on_state_dropdown(self):
        self.click(self.click_state_dropdown)

    '''Function to return the no of options in the Metric Dropdown'''

    def get_count_metric_dropdown_options(self):
        self.click(self.click_metric_dropdown)
        return self.get_web_elements(self.count_dropdown_options)

    '''Function to return the no of options in the State Dropdown'''

    def get_count_state_dropdown_options(self):
        self.click(self.click_state_dropdown)
        return self.get_web_elements(self.count_dropdown_options)

    '''Function to the validate the Leaflet Map Report '''

    def get_map_tooltip_info_validation(self):
        blue_marks = 0
        white_marks = 0
        map_data = []
        lst = self.driver.find_elements(By.CLASS_NAME, "leaflet-interactive")
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
                txt = self.get_web_element_text(self.tooltip_information)
                map_data.append(txt)
        return map_data

    '''Function to select the metric dropdown options'''

    def get_selection_of_each_metric_options(self):
        options = self.get_count_metric_dropdown_options()
        for i in range(len(options)):
            opts = self.driver.find_element(By.XPATH, self.dropdown_option_id.format(i))
            opt_name = self.driver.find_element(By.XPATH, self.dropdown_option_name.format(i))
            opt_text = opt_name.text
            print(opt_text)
            opts.click()
            time.sleep(2)
            result = self.get_map_tooltip_info_validation()
            if opt_text in result[0]:
                assert True
            else:
                self.count = self.count + 1
                assert False
            self.click(self.click_metric_dropdown)
            time.sleep(2)
        return self.count

    '''Function to validate the map markers in the report'''

    def get_map_markers_tooltip_info_validation(self):
        lst = self.driver.find_elements(By.CLASS_NAME, "leaflet-interactive")
        print("No of Markers", len(lst) - 1)
        blue_marks = 0
        white_marks = 0
        time.sleep(2)
        for x in range(1, 5):
            if lst[x].get_attribute('fill') == '#FFFFFF':
                white_marks = white_marks + 1
            else:
                blue_marks = blue_marks + 1
            act = ActionChains(self.driver)
            act.move_to_element(lst[x]).perform()
            act.pause(4)
            # txt = self.driver.find_elements(By.CLASS_NAME, "//*[@class='leaflet-popup-content']/b") for i in range(
            # len(txt)): details = self.driver.find_elements(By.CLASS_NAME, "//*[@class='leaflet-popup-content']/b[
            # "+str(i)+"]") map_data.append(details)
        return len(lst)

    "Function to click district button and select metric options"

    def check_select_metrics_option_from_district_tab(self):
        options = self.get_count_metric_dropdown_options()
        for i in range(len(options)):
            opts = self.driver.find_element(By.XPATH, self.dropdown_option_id.format(i))
            opt_name = self.driver.find_element(By.XPATH, self.dropdown_option_name.format(i))
            opt_text = opt_name.text
            opts.click()
            time.sleep(2)
            result = self.get_map_markers_tooltip_info_validation()
            if result != 0 and opt_text in self.driver.page_source:
                assert True
            else:
                self.count = self.count + 1
                assert False
            self.click(self.click_metric_dropdown)
            time.sleep(2)
        return self.count

    '''Function to click state button and check with state dropdown options'''

    def check_each_state_dropdown_options_from_district_tab(self):
        options = self.get_count_state_dropdown_options()
        for i in range(len(options) - 1):
            opts = self.driver.find_element(By.XPATH, self.dropdown_option_id.format(i))
            opt_name = self.driver.find_element(By.XPATH, self.dropdown_option_name.format(i))
            opt_text = opt_name.text
            print(opt_text)
            opts.click()
            time.sleep(3)
            total_markers = 0
            lst = self.get_count_of_map_tooltips()
            for x in range(1, len(lst) - 30):
                if lst[x].get_attribute('stroke-dasharray') != '0':
                    total_markers = total_markers + 1

            print(opt_text, "No of Markers: ", total_markers)
            time.sleep(2)
            if total_markers != 0 and opt_text in self.driver.page_source:
                assert True
            else:
                self.count = self.count + 1
            self.click(self.click_state_dropdown)
            time.sleep(2)
        return self.count

    '''Function to select the metric options from clicking state button '''

    def check_selection_of_metrics_state_dropdown_options(self):
        options = self.get_count_metric_dropdown_options()
        for i in range(len(options)):
            self.click(self.click_metric_dropdown)
            time.sleep(2)
            opts = self.driver.find_element(By.XPATH, self.dropdown_option_id.format(i))
            opt_name = self.driver.find_element(By.XPATH, self.dropdown_option_name.format(i))
            metric_option = opt_name.text
            opts.click()
            time.sleep(2)
            options = self.get_count_state_dropdown_options()
            for j in range(1, len(options) - 30):
                opts = self.driver.find_element(By.XPATH, self.dropdown_option_id.format(j))
                opt_name = self.driver.find_element(By.XPATH, self.dropdown_option_name.format(j))
                state_name = opt_name.text
                opts.click()
                time.sleep(4)
                lst = self.get_count_of_map_tooltips()
                if metric_option and state_name in self.driver.page_source:
                    print(metric_option, state_name)
                    assert True
                else:
                    self.count = self.count + 1
                total_markers = 0
                for x in range(1, len(lst) - 1):
                    if lst[x].get_attribute('stroke-dasharray') != '0':
                        total_markers = total_markers + 1
                self.click(self.click_state_dropdown)
                time.sleep(2)
        return self.count

    '''Functions to Click the Default A , A- and A+ Buttons '''

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
