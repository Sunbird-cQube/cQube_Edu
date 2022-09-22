import re
import time

from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By

from PageObjects.Cqube_UI.BasePage import Base
from Utilities.ReadProperties import ReadConfig


class nas(Base):
    """Locators for dashboard and micro_improvements"""

    dashboard_button = (By.ID, 'menu-item-0')
    nas_button = (By.ID, 'menu-item-5')
    state_i_tag = (By.XPATH, "//app-student-learning-survey/div[1]/div/div[1]/sb-cqube-info-card/div/img")
    state_vanity_card_value = (
        By.XPATH, "//app-student-learning-survey/div[1]/div/div[1]/sb-cqube-info-card/div/div/span[1]")
    state_vanity_card_label = (
        By.XPATH, "//app-student-learning-survey/div[1]/div/div[1]/sb-cqube-info-card/div/div/span[2]")

    total_LO_i_tag = (By.XPATH, "//app-student-learning-survey/div[1]/div/div[2]/sb-cqube-info-card/div/img")
    total_LO_card_value = (
        By.XPATH, "//app-student-learning-survey/div[1]/div/div[2]/sb-cqube-info-card/div/div/span[1]")
    total_LO_vanity_card_label = (
        By.XPATH, "//app-student-learning-survey/div[1]/div/div[2]/sb-cqube-info-card/div/div/span[2]")

    teachers_i_tag = (By.XPATH, "//app-student-learning-survey/div[1]/div/div[2]/sb-cqube-info-card/div/img")
    teachers_card_value = (
        By.XPATH, "//app-student-learning-survey/div[1]/div/div[3]/sb-cqube-info-card/div/div/span[1]")
    teachers_vanity_card_label = (
        By.XPATH, "//app-student-learning-survey/div[1]/div/div[3]/sb-cqube-info-card/div/div/span[2]")
    # implementation status
    implementation_status_tab = (By.XPATH, "//*[contains(text(),'Implementation Status')]//ancestor::div[1]")
    implementation_status_button = (By.XPATH, "//*[contains(text(),'Implementation Status')]")
    a_plus = (By.ID, "font-size-increase")
    a_minus = (By.ID, "font-size-decrease")
    a_default = (By.ID, "font-size-reset")

    # state wise performance
    state_wise_performance_tab = (By.XPATH, "//*[contains(text(),'State Wise Performance')]//ancestor::div[1]")
    state_wise_performance_button = (By.XPATH, "//*[contains(text(),'State Wise Performance')]")
    district_button = (By.XPATH, '//*[@id="button-1"]')
    grade = (By.ID, "filter-Grade")
    options_dropdown = "//*[@role='option']"
    grade_values = (By.XPATH, options_dropdown)
    grade_dropdown_value = (By.XPATH, "//div[starts-with(@id,'a') and contains(@id,"'-'"{}" + ")]")
    subject = (By.ID, 'filter-Subject')
    subject_values = (By.XPATH, options_dropdown)
    subject_dropdown_value = (By.XPATH, "//div[starts-with(@id,'a') and contains(@id,"'-'"{}" + ")]")
    learning_outcome = (By.ID, 'filter-Learning Outcome Code')
    learning_outcome_values = (By.XPATH, options_dropdown)
    learning_outcome_dropdown_value = (By.XPATH, "//div[starts-with(@id,'a') and contains(@id,"'-'"{}" + ")]")
    state_option = (By.XPATH, options_dropdown)
    state_values = (By.XPATH, options_dropdown)

    # grade and subject performance tab
    grade_and_subject_performance_tab = (
        By.XPATH, "//*[contains(text(),'Grade & Subject performance')]//ancestor::div[1]")
    grade_and_subject_performance_button = (By.XPATH, "//*[contains(text(),'Grade & Subject performance')]")
    medium_options = (By.XPATH, options_dropdown)
    button = (By.ID, 'button-1')
    state = (By.ID, 'filter-State/UT')
    state_wise_performance = "//*[contains(text(),'State Wise Performance')]//ancestor::div[1]"
    grade_wise = (By.ID, "filter-Grade")
    tooltip_state_name = (By.XPATH, '//*[@id="map"]/div[1]/div[6]/div/div[1]/div/b[1]')
    chart_value = (By.TAG_NAME, "td")

    def __init__(self, driver):
        super().__init__(driver)

    """This function is used to open the cQube application"""

    def open_cqube_application(self):
        self.get_url(ReadConfig.get_application_url())

    """This function is used to click on the cQube dashboard"""

    def click_dashboard(self):
        self.click(self.dashboard_button)

    """This function is used to click on the nas button"""

    def click_nas(self):
        self.click(self.nas_button)

    """This function is used to get the vanity card i-tag information"""

    def get_vanity_card_info(self):
        return self.get_attribute_value('title', self.state_i_tag)

    """This function is used to get the vanity card values or metrics"""

    def get_vanity_card_value(self):
        return self.get_web_element_text(self.state_vanity_card_value)

    """This function is used to get the vanity card label"""

    def get_vanity_card_label(self):
        return self.get_web_element_text(self.state_vanity_card_label)

    """This function is used to get integer value"""

    @staticmethod
    def get_integer_value(text):
        result = re.sub('\D', "", text)
        return result

    """This function is used to click on implementation status tab"""

    def click_implementation_status_tab(self):
        self.click(self.implementation_status_button)

    def get_implementation_status_tab_attribute(self):
        return self.get_attribute_value("aria-selected", self.implementation_status_tab)

    """This function is used to click on state wise performance tab"""

    def click_state_wise_performance_tab(self):
        self.click(self.state_wise_performance_tab)

    def get_state_wise_performance_tab_attribute(self):
        return self.get_attribute_value("aria-selected", self.state_wise_performance_tab)

    """This function is used to click on grade and subject performance tab"""

    def click_on_grade_and_subject_performance_tab(self):
        self.click(self.grade_and_subject_performance_button)

    def get_grade_and_subject_performance_tab_attribute(self):
        return self.get_attribute_value("aria-selected", self.grade_and_subject_performance_tab)

    """This function is to click A button"""

    def click_on_A_default_button(self):
        count = 0
        self.click(self.a_default)
        time.sleep(2)
        if 'style="font-size: 16px;"' in self.driver.page_source:
            self.driver.refresh()
            assert True
        else:
            count = count + 1
        return count

    """This function is to click A+ button"""

    def click_on_A_plus_button(self):
        count = 0
        self.click(self.a_plus)
        time.sleep(2)
        if 'style="font-size: 18px;"' in self.driver.page_source:
            self.driver.refresh()
            assert True
        else:
            count = count + 1
        return count

    """This function is to click A- button"""

    def test_click_on_A_minus_button(self):
        count = 0
        self.click(self.a_minus)
        time.sleep(2)
        if 'style="font-size: 14px;"' in self.driver.page_source:
            self.driver.refresh()
            assert True
        else:
            count = count + 1
        return count

    """This function is to get tooltip value"""

    def get_map_tooltip_info_validation(self):
        lst = self.driver.find_elements(By.CLASS_NAME, "leaflet-interactive")
        print("No of States", len(lst) - 1)
        blue_marks = 0
        white_marks = 0
        map_data = []
        for x in range(1, len(lst)):
            if lst[x].get_attribute('fill') == '#FFFFFF':
                white_marks = white_marks + 1
            else:
                blue_marks = blue_marks + 1
            act = ActionChains(self.driver)
            act.move_to_element(lst[x]).perform()
            act.pause(4)
            txt = self.driver.find_element(By.XPATH, "//div[@class='leaflet-pane leaflet-tooltip-pane']")
            map_data.append(txt.text)
        return map_data

    """ This function is used to click on district button"""

    def click_district_button(self):
        self.click(self.district_button)

    """ This function is used to click on grade drop down"""

    def click_on_grade(self):
        self.click(self.grade_wise)

    """ This function is used to get grade values"""

    def get_grade_values(self):
        grade_values = self.get_web_elements(self.grade_values)
        return grade_values

    """ This function is used to click on subject drop down"""

    def click_on_subject(self):
        self.click(self.subject)

    """"this function is to get tooltip state name"""

    def get_tooltip_state_name(self):
        res = self.get_web_elements(self.tooltip_state_name)
        return res

    """"this function is to get data"""

    def get_data(self):
        res = self.get_web_elements(self.chart_value)
        return res

    """ This function is used to get subject drop down"""

    def get_subject_values(self):
        subject_values = self.get_web_elements(self.subject_values)
        return subject_values

    """ This function is used to click on learning outcome drop down"""

    def click_on_learning_outcome(self):
        self.click(self.learning_outcome)

    """ This function is used to get learning outcome values"""

    def get_learning_outcome_values(self):
        learning_outcome_values = self.get_web_elements(self.learning_outcome_values)
        return learning_outcome_values

    """ This function is used to click on state drop down"""

    def click_on_state(self):
        self.click(self.state)

    """ This function is used to get state value drop down"""

    def get_state_values(self):
        state_values = self.get_web_elements(self.state_values)
        return state_values

    """ This function is used to get each dropdown value id"""

    def get_each_dropdown_value_id(self, grade_id):
        grade_dropdown_value = self.grade_dropdown_value
        grade_dropdown_value = list(grade_dropdown_value)
        grade_dropdown_value[1] = grade_dropdown_value[1].format(grade_id)
        grade_dropdown_value = tuple(grade_dropdown_value)
        res = self.get_web_element((By.XPATH, str(grade_dropdown_value[1])))
        return res
