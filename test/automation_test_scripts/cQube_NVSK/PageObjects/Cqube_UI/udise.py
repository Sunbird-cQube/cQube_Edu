import re
import time

from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By

from PageObjects.Cqube_UI.BasePage import Base
from Utilities.ReadProperties import ReadConfig


class Udise(Base):
    """Locators for dashboard and ncf program"""

    dashboard_button = (By.ID, 'menu-item-0')
    udise = (By.ID, 'menu-item-6')
    vanity_card = (By.CSS_SELECTOR, "div.sb-cQ-card")
    total_students_i_tag = (By.XPATH, "//app-school-registry/div[1]/div/div[1]/sb-cqube-info-card/div/img")
    total_students_value = (By.XPATH, "//app-school-registry/div[1]/div/div[1]/sb-cqube-info-card/div/div/span[1]")
    total_students_label = (By.XPATH, "//app-school-registry/div[1]/div/div[1]/sb-cqube-info-card/div/div/span[2]")
    ptr_i_tag = (By.XPATH, "//app-school-registry/div[1]/div/div[2]/sb-cqube-info-card/div/img")
    ptr_value = (By.XPATH, "//app-school-registry/div[1]/div/div[2]/sb-cqube-info-card/div/div/span[1]")
    ptr_label = (By.XPATH, "//app-school-registry/div[1]/div/div[2]/sb-cqube-info-card/div/div/span[2]")
    per_schools_with_electric_connection_i_tag = (By.XPATH, "//app-school-registry/div[1]/div/div["
                                                            "3]/sb-cqube-info-card/div/img")
    per_schools_with_electric_connection_value = (By.XPATH, "//app-school-registry/div[1]/div/div["
                                                            "3]/sb-cqube-info-card/div/div/span[1]")
    per_schools_with_electric_connection_label = (By.XPATH, "//app-school-registry/div[1]/div/div["
                                                            "3]/sb-cqube-info-card/div/div/span[2]")
    per_schools_with_library_i_tag = (By.XPATH, "//app-school-registry/div[1]/div/div[4]/sb-cqube-info-card/div/img")
    per_schools_with_library_value = (By.XPATH, "//app-school-registry/div[1]/div/div["
                                                "4]/sb-cqube-info-card/div/div/span[1]")
    per_schools_with_library_label = (By.XPATH, "//app-school-registry/div[1]/div/div["
                                                "4]/sb-cqube-info-card/div/div/span[2]")
    per_schools_with_computer_i_tag = (By.XPATH, "//app-school-registry/div[1]/div/div[5]/sb-cqube-info-card/div/img")
    per_schools_with_computer_value = (By.XPATH, "//app-school-registry/div[1]/div/div["
                                                 "5]/sb-cqube-info-card/div/div/span[1]")
    per_schools_with_computer_label = (By.XPATH, "//app-school-registry/div[1]/div/div["
                                                 "5]/sb-cqube-info-card/div/div/span[2]")
    implementation_status_tab = (By.XPATH, "//*[contains(text(),'Implementation Status')]//ancestor::div[1]")
    a_plus = (By.ID, "font-size-increase")
    a_minus = (By.ID, "font-size-decrease")
    a_default = (By.ID, "font-size-reset")
    state_wise_performance_tab = (By.XPATH, "//*[contains(text(),'State Wise Performance')]//ancestor::div[1]")
    metrics_dropdown = (By.ID, "metricFilter-Metrics to be shown")
    options = "//div[@role='option']/span"
    udise_metric_dropdown = (By.XPATH, options)
    metrics_dropdown_value = (By.XPATH, "//div[starts-with(@id,'a') and contains(@id,"'-'"{}" + ")]")
    legend_text = (By.XPATH, "//*[@id='map']/div[2]/div[2]/div/strong")
    district_button = (By.ID, "button-1")
    state_dropdown = (By.ID, "filter-State/UT")

    # correlation
    correlation_tab = (By.XPATH, "//*[contains(text(),'Correlation')]//ancestor::div[1]")
    x_axis_dropdown_options = (By.XPATH, options)
    y_axis_dropdown_options = (By.XPATH, options)
    x_axis_dropdown_button = (By.ID, "filter-X-Axis")
    y_axis_dropdown_button = (By.ID, "filter-Y-Axis")
    scatter_plot = (By.CSS_SELECTOR, "g>path")
    tooltip_state_name = (By.XPATH, '//*[@id="map"]/div[1]/div[6]/div/div[1]/div/b[1]')

    def __init__(self, driver):
        super().__init__(driver)

    """This function is used to open the cQube application"""

    def open_cqube_application(self):
        self.get_url(ReadConfig.get_application_url())

    """This function is used to click on the cQube dashboard"""

    def click_dashboard(self):
        self.click(self.dashboard_button)

    """This function is used to click on the Udise button"""

    def click_udise(self):
        self.click(self.udise)

    """ This functionality is to get i teger value from vanity metric"""

    @staticmethod
    def get_integer_value(text):
        result = re.sub('\D', "", text)
        return result

    """This function is used to get the vanity card i-tag information"""

    def get_total_students_card_info(self):
        return self.get_attribute_value('title', self.total_students_i_tag)

    """This function is used to get the vanity card values or metrics"""

    def get_total_students_card_value(self):
        return self.get_web_element_text(self.total_students_value)

    """This function is used to get the vanity card label"""

    def get_total_students_card_label(self):
        return self.get_web_element_text(self.total_students_label)

    """This function is used to get the vanity card info"""

    def get_ptr_card_info(self):
        return self.get_attribute_value('title', self.ptr_i_tag)

    """This function is used to get the vanity card values or metrics"""

    def get_ptr_card_value(self):
        return self.get_web_element_text(self.ptr_value)

    """This function is used to get the vanity card label"""

    def get_ptr_card_label(self):
        return self.get_web_element_text(self.ptr_label)

    """This function is used to get the vanity card info"""

    def get_per_shools_with_electric_connection_card_info(self):
        return self.get_attribute_value('title', self.per_schools_with_electric_connection_i_tag)

    """This function is used to get the vanity card values or metrics"""

    def get_per_shools_with_electric_connection_card_value(self):
        return self.get_web_element_text(self.per_schools_with_electric_connection_value)

    """This function is used to get the vanity card label"""

    def get_per_shools_with_electric_connection_card_label(self):
        return self.get_web_element_text(self.per_schools_with_electric_connection_label)

    """This function is used to get the vanity card info"""

    def get_per_shools_with_library_card_info(self):
        return self.get_attribute_value('title', self.per_schools_with_library_i_tag)

    """This function is used to get the vanity card values or metrics"""

    def get_per_shools_with_library_card_value(self):
        return self.get_web_element_text(self.per_schools_with_library_value)

    """This function is used to get the vanity card label"""

    def get_per_shools_with_library_card_label(self):
        return self.get_web_element_text(self.per_schools_with_library_label)

    """This function is used to get the vanity card info"""

    def get_per_shools_with_computer_card_info(self):
        return self.get_attribute_value('title', self.per_schools_with_computer_i_tag)

    """This function is used to get the vanity card values or metrics"""

    def get_per_shools_with_computer_card_value(self):
        return self.get_web_element_text(self.per_schools_with_computer_value)

    """This function is used to get the vanity card label"""

    def get_per_shools_with_computer_card_label(self):
        return self.get_web_element_text(self.per_schools_with_computer_label)

    """This function is to get attribute of implementation status tab"""

    def click_implementation_status_tab(self):
        return self.get_attribute_value('aria-selected', self.implementation_status_tab)

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

    """This function is to get tooltip value"""

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

    """This function is to click on state wise performance tab"""

    def click_on_state_wise_performance(self):
        self.click(self.state_wise_performance_tab)

    """This function is to get attribute of state wise performance tab"""

    def get_state_wise_performance_attribute(self):
        return self.get_attribute_value('aria-selected', self.state_wise_performance_tab)

    """This function is to click on metric dropdown"""

    def click_metric_dropdown(self):
        self.click(self.metrics_dropdown)

    """ This functionality is to get dropdown values"""

    def get_metrics_dropdown_values(self):
        metric_dropdown_options = self.get_web_elements(self.udise_metric_dropdown)
        return metric_dropdown_options

    """This functionality is to get id of each metric in dropdown"""

    def get_each_dropdown_value_id(self, metric_dropdown_id):
        metrics_dropdown_value = self.metrics_dropdown_value
        metrics_dropdown_value = list(metrics_dropdown_value)
        metrics_dropdown_value[1] = metrics_dropdown_value[1].format(metric_dropdown_id)
        metrics_dropdown_value = tuple(metrics_dropdown_value)
        res = self.get_web_element((By.XPATH, str(metrics_dropdown_value[1])))
        return res

    """ This functionality is to get legend text"""

    def get_legend_text(self):
        return self.get_web_element_text(self.legend_text)

    """This functionality is to click on the district button """

    def click_on_district_button(self):
        self.click(self.district_button)

    """This functionality is to click on state dropdown dropdown"""

    def click_state_dropdown(self):
        self.click(self.state_dropdown)

    """This functionality is to click on correlation tab"""

    def click_on_correlation_tab(self):
        self.click(self.correlation_tab)

    """This function is to get attribute of correlation tab button"""

    def get_correlation_attribute(self):
        return self.get_attribute_value('aria-selected', self.correlation_tab)

    """This function is to click on x axis dropdown"""

    def click_on_x_axis(self):
        self.click(self.x_axis_dropdown_button)

    """This function is to click on y axis dropdown"""

    def click_on_y_axis(self):
        self.click(self.y_axis_dropdown_button)

    """This function is to get values of x-axis dropdown"""

    def get_x_axis_values(self):
        x_axis_dropdown_options = self.get_web_elements(self.x_axis_dropdown_options)
        return x_axis_dropdown_options

    """This function is to get values of y axis dropdown"""

    def get_y_axis_values(self):
        y_axis_dropdown_options = self.get_web_elements(self.y_axis_dropdown_options)
        return y_axis_dropdown_options

    """ This function is to get scatter plot count"""

    def get_scatter_plot_count(self):
        scatter_plot = self.get_web_elements(self.scatter_plot)
        return scatter_plot

    """This functionality is to get vanity card information"""

    def get_vanity_metrics_card_details(self):
        res = self.get_web_elements(self.vanity_card)
        return res

    """This functionality is to get tooltip state name"""

    def get_tooltip_state_name(self):
        res = self.get_web_element(self.tooltip_state_name)
        return res
