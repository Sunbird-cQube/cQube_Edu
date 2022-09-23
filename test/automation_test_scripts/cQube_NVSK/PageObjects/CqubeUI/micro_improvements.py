import re
import time

from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By

from PageObjects.Cqube_UI.BasePage import Base
from Utilities.ReadProperties import ReadConfig


class MicroImprovements(Base):

    """Locators for dashboard and micro_improvements"""

    dashboard_button = (By.ID, 'menu-item-0')
    micro_improvements_button = (By.ID, 'menu-item-3')
    mi_ongoing_i_tag = (By.XPATH, "//app-improvement-program/div[1]/div/div[1]/sb-cqube-info-card/div/img")
    mi_ongoing_vanity_card_value = (By.XPATH, "//app-improvement-program/div[1]/div/div["
                                              "1]/sb-cqube-info-card/div/div/span[1]")
    mi_ongoing_vanity_card_label = (By.XPATH, "//app-improvement-program/div[1]/div/div[1]/sb-cqube-info-card/div/img")

    mi_started_i_tag = "//app-improvement-program/div[1]/div/div[2]/sb-cqube-info-card/div/img"
    mi_started_vanity_card_value = "//app-improvement-program/div[1]/div/div[2]/sb-cqube-info-card/div/div/span[1]"
    mi_started_vanity_card_label = "//app-improvement-program/div[1]/div/div[2]/sb-cqube-info-card/div/div/span[2]"

    mi_in_progress_i_tag = "//app-improvement-program/div[1]/div/div[3]/sb-cqube-info-card/div/img"
    mi_in_progress_vanity_card_value = "//app-improvement-program/div[1]/div/div[3]/sb-cqube-info-card/div/div/span[1]"
    mi_in_progress_vanity_card_label = "//app-improvement-program/div[1]/div/div[3]/sb-cqube-info-card/div/div/span[2]"

    mi_submitted_i_tag = "//app-improvement-program/div[1]/div/div[4]/sb-cqube-info-card/div/img"
    mi_submitted_vanity_card_value = "//app-improvement-program/div[1]/div/div[4]/sb-cqube-info-card/div/div/span[1]"
    mi_submitted_vanity_card_label = "//app-improvement-program/div[1]/div/div[4]/sb-cqube-info-card/div/div/span[2]"

    mi_submitted_with_evidence_i_tag = "//app-improvement-program/div[1]/div/div[5]/sb-cqube-info-card/div/img"
    mi_submitted_with_evidence_vanity_card_value = "//app-improvement-program/div[1]/div/div[" \
                                                   "5]/sb-cqube-info-card/div/div/span[1] "
    mi_submitted_with_evidence_vanity_card_label = "//app-improvement-program/div[1]/div/div[" \
                                                   "5]/sb-cqube-info-card/div/div/span[2] "

    Implementation_Status_mi = "//*[contains(text(),'Implementation Status')]//ancestor::div[1]"

    # implementation status

    implementation_status_tab = (By.XPATH, "//*[contains(text(),'Implementation Status')]//ancestor::div[1]")
    implementation_status_button = (By.XPATH, "//*[contains(text(),'Implementation Status')]")
    a_plus = (By.ID, "font-size-increase")
    a_minus = (By.ID, "font-size-decrease")
    a_default = (By.ID, "font-size-reset")

    # improvements status
    improvements_status_tab = (By.XPATH, "//*[contains(text(),'Improvements Status')]//ancestor::div[1]")
    improvements_status_button = (By.XPATH, "//*[contains(text(),'Improvements Status')]")
    metric_dropdown = (By.ID, "metricFilter-Metrics to be shown")
    legend_text = (By.XPATH, '//*[@id="map"]/div[2]/div[2]/div/strong')
    metric_dropdown_value = (By.XPATH, "//div[starts-with(@id,'a') and contains(@id,"'-'"{}" + ")]")
    metric_options = (By.XPATH, "//div[@role='option']/span")

    def __init__(self, driver):
        super().__init__(driver)

    """This function is used to open the cQube application"""
    def open_cqube_application(self):
        self.get_url(ReadConfig.get_application_url())

    """This function is used to click on the cQube dashboard"""
    def click_dashboard(self):
        self.click(self.dashboard_button)

    """This function is used to click on the micro implementation button"""
    def click_micro_improvements(self):
        self.click(self.micro_improvements_button)

    """This function is used to get the vanity card i-tag information"""
    def get_vanity_card_info(self):
        return self.get_attribute_value('title', self.mi_ongoing_i_tag)

    """This function is used to get the vanity card values or metrics"""
    def get_vanity_card_value(self):
        return self.get_web_element_text(self.mi_ongoing_vanity_card_value)

    """This function is used to get the vanity card label"""
    def get_vanity_card_label(self):
        return self.get_web_element_text(self.mi_ongoing_vanity_card_label)

    """This function is used to click on implementation status tab"""

    def click_implementation_status_tab(self):
        self.click(self.implementation_status_button)

    def get_implementation_status_tab_attribute(self):
        return self.get_attribute_value("aria-selected", self.implementation_status_tab)

    """This function is used to click on improvements status tab"""

    def click_improvements_status_tab(self):
        self.click(self.improvements_status_button)

    def get_improvements_status_tab_attribute(self):
        return self.get_attribute_value("aria-selected", self.improvements_status_tab)

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

    """This function is used to click dropdowns"""

    def click_dropdown(self):
        self.click(self.metric_dropdown)

    """This function is used to get legend text"""

    def get_legend_text(self):
        return self.get_web_element_text(self.legend_text)

    """This function is used to get integer value"""

    @staticmethod
    def get_integer_value(text):
        result = re.sub('\D', "", text)
        return result

    """This function is used to get metric dropdown value"""

    def get_metrics_dropdown_values(self):
        metric_dropdown_options = self.get_web_elements(self.metric_options)
        return metric_dropdown_options

    """This function is used to get each dropdown value id"""

    def get_each_dropdown_value_id(self, metric_id):
        metrics_dropdown_value = self.metric_dropdown_value
        metrics_dropdown_value = list(metrics_dropdown_value)
        metrics_dropdown_value[1] = metrics_dropdown_value[1].format(metric_id)
        metrics_dropdown_value = tuple(metrics_dropdown_value)
        res = self.get_web_element((By.XPATH, str(metrics_dropdown_value[1])))
        return res
