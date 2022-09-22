import re
import time

from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By

from PageObjects.Cqube_UI.BasePage import Base
from Utilities.ReadProperties import ReadConfig


class NCF(Base):
    """Locators for dashboard and ncf program"""

    dashboard_button = (By.ID, 'menu-item-0')
    ncf = (By.ID, 'menu-item-10')
    vanity_card = (By.CSS_SELECTOR, "div.sb-cQ-card")
    total_dcr_completed_i_tag = (By.XPATH, "//app-curriculum-framework/div[1]/div/div[1]/sb-cqube-info-card/div/img")
    total_dcr_completed_value = (By.XPATH, "//app-curriculum-framework/div[1]/div/div["
                                           "1]/sb-cqube-info-card/div/div/span[1]")
    total_dcr_completed_label = (By.XPATH, "//app-curriculum-framework/div[1]/div/div["
                                           "1]/sb-cqube-info-card/div/div/span[2]")
    total_mobile_surver_i_tag = (By.XPATH, "//app-curriculum-framework/div[1]/div/div[2]/sb-cqube-info-card/div/img")
    total_mobile_surver_value = (By.XPATH, "//app-curriculum-framework/div[1]/div/div["
                                           "2]/sb-cqube-info-card/div/div/span[1]")
    total_mobile_surver_label = (By.XPATH, "//app-curriculum-framework/div[1]/div/div["
                                           "2]/sb-cqube-info-card/div/div/span[2]")
    total_ndgs_created_i_tag = (By.XPATH, "//app-curriculum-framework/div[1]/div/div[3]/sb-cqube-info-card/div/img")
    total_ndgs_created_value = (By.XPATH, "//app-curriculum-framework/div[1]/div/div["
                                          "3]/sb-cqube-info-card/div/div/span[1]")
    total_ndgs_created_label = (By.XPATH, "//app-curriculum-framework/div[1]/div/div["
                                          "3]/sb-cqube-info-card/div/div/span[2]")

    # progress status
    progress_status_tab = (By.XPATH, "//*[contains(text(),'Progress Status')]//ancestor::div[1]")
    a_plus = (By.ID, "font-size-increase")
    a_minus = "font-size-decrease"
    a_default = (By.ID, "font-size-reset")
    metrics_dropdown = (By.ID, "metricFilter-Metrics to be shown")
    ncf_metric_dropdown = (By.XPATH, "//div[@role='option']/span")
    legend_text = (By.XPATH, "//*[@id='map']/div[2]/div[2]/div/strong")
    metrics_dropdown_value = (By.XPATH, "//div[starts-with(@id,'a') and contains(@id,"'-'"{}" + ")]")
    map = (By.XPATH, "//*[@id='map']")

    def __init__(self, driver):
        super().__init__(driver)

    """This function is used to open the cQube application"""

    def open_cqube_application(self):
        self.get_url(ReadConfig.get_application_url())

    """This function is used to click on the cQube dashboard"""

    def click_dashboard(self):
        self.click(self.dashboard_button)

    """This function is used to click on the PM Poshan button"""

    def click_ncf(self):
        self.click(self.ncf)

    """This function is used to get the vanity card i-tag information"""

    def get_total_dcr_completed_card_info(self):
        return self.get_attribute_value('title', self.total_dcr_completed_i_tag)

    """This function is used to get the vanity card values or metrics"""

    def get_total_dcr_completed_card_value(self):
        return self.get_web_element_text(self.total_dcr_completed_value)

    """This function is used to get the vanity card label"""

    def get_total_dcr_completed_card_label(self):
        return self.get_web_element_text(self.total_dcr_completed_label)

    """This function is used to get the vanity card i-tag information"""

    def get_total_mobile_survey_card_info(self):
        return self.get_attribute_value('title', self.total_mobile_surver_i_tag)

    """This function is used to get the vanity card values or metrics"""

    def get_total_mobile_survey_card_value(self):
        return self.get_web_element_text(self.total_mobile_surver_value)

    """This function is used to get the vanity card label"""

    def get_total_mobile_survey_card_label(self):
        return self.get_web_element_text(self.total_mobile_surver_label)

    """This function is used to get the vanity card i-tag information"""

    def get_total_ndgs_created_card_info(self):
        return self.get_attribute_value('title', self.total_mobile_surver_i_tag)

    """This function is used to get the vanity card values or metrics"""

    def get_total_ndgs_created_card_value(self):
        return self.get_web_element_text(self.total_mobile_surver_value)

    """This function is used to get the vanity card label"""

    def get_total_ndgs_created_card_label(self):
        return self.get_web_element_text(self.total_mobile_surver_label)

    """This function is used to click on progress status tab"""

    def click_progress_status_tab(self):
        return self.get_attribute_value('aria-selected', self.progress_status_tab)

    """ This function is to click on default font size button"""

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

    """ This function is to click on font size increase button"""

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

    """This function is to click on font size decrease button"""

    def click_on_A_minus_button(self):
        count = 0
        self.click(self.a_minus)
        time.sleep(2)
        if 'style="font-size: 14px;"' in self.driver.page_source:
            self.driver.refresh()
            assert True
        else:
            count = count + 1
        return count

    """ This function is to get map tooltip value"""

    def get_map_tooltip_info_validation(self):
        lst = self.driver.find_elements(By.CLASS_NAME, "leaflet-interactive")
        print("No of States", len(lst) - 1)
        blue_marks = 0
        white_marks = 0
        time.sleep(2)
        map_data = []
        # for x in range(1, 3):
        for x in range(1, len(lst)):
            if lst[x].get_attribute('fill') == '#FFFFFF':
                white_marks = white_marks + 1
            else:
                blue_marks = blue_marks + 1
            act = ActionChains(self.driver)
            act.move_to_element(lst[x]).perform()
            act.pause(4)
            time.sleep(2)
            txt = self.driver.find_element(By.XPATH, "//div[@class='leaflet-pane leaflet-tooltip-pane']")
            map_data.append(txt.text)
        return map_data

    """ This functionality is to click on dropdown button"""

    def click_dropdown(self):
        self.click(self.metrics_dropdown)

    """ This functionality is to get legend text"""

    def get_legend_text(self):
        return self.get_web_element_text(self.legend_text)

    """ This functionality is to get i teger value from vanity metric"""

    @staticmethod
    def get_integer_value(text):
        result = re.sub('\D', "", text)
        return result

    """ This functionality is to get dropdown values"""

    def get_metrics_dropdown_values(self):
        metric_dropdown_options = self.get_web_elements(self.ncf_metric_dropdown)
        return metric_dropdown_options

    """This functionality is to get id of each metric in dropdown"""

    def get_each_dropdown_value_id(self, metrics_dropdown_id):
        metrics_dropdown_value = self.metrics_dropdown_value
        metrics_dropdown_value = list(metrics_dropdown_value)
        metrics_dropdown_value[1] = metrics_dropdown_value[1].format(metrics_dropdown_id)
        metrics_dropdown_value = tuple(metrics_dropdown_value)
        res = self.get_web_element((By.XPATH, str(metrics_dropdown_value[1])))
        return res

    """This functionality is to get vanity card information"""

    def get_vanity_metrics_card_details(self):
        res = self.get_web_elements(self.vanity_card)
        return res

    """THis functionality is to get map information"""

    def get_map_information(self):
        map_info = self.get_web_elements(self.map)
        return map_info
