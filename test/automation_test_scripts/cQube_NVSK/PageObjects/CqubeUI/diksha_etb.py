import re
import time

from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By

from PageObjects.Cqube_UI.BasePage import Base
from Utilities.ReadProperties import ReadConfig


class Diksha(Base):
    """Locators for dashboard and diksha_etb program"""

    dashboard_button = (By.ID, 'menu-item-0')
    diksha_etb = (By.ID, 'menu-item-2')
    vanity_card = (By.CSS_SELECTOR, "div.sb-cQ-card")
    total_states_uts_participation_card_i_tag = (By.XPATH, "//app-digital-learning/div[1]/div/div["
                                                           "1]/sb-cqube-info-card/div/img")
    total_states_uts_participation_card_value = (By.XPATH, "//app-digital-learning/div[1]/div/div["
                                                           "1]/sb-cqube-info-card/div/div/span[1]")
    total_states_uts_participation_card_label = (By.XPATH, "//app-digital-learning/div[1]/div/div["
                                                           "1]/sb-cqube-info-card/div/div/span[2]")
    total_etbs_card_i_tag = (By.XPATH, "//app-digital-learning/div[1]/div/div[2]/sb-cqube-info-card/div/img")
    total_etbs_card_value = (By.XPATH, "//app-digital-learning/div[1]/div/div[2]/sb-cqube-info-card/div/div/span[1]")
    total_etbs_card_label = (By.XPATH, "//app-digital-learning/div[1]/div/div[2]/sb-cqube-info-card/div/div/span[2]")
    total_qr_code_card_i_tag = (By.XPATH, "//app-digital-learning/div[1]/div/div[3]/sb-cqube-info-card/div/img")
    total_qr_code_card_value = (By.XPATH, "//app-digital-learning/div[1]/div/div[3]/sb-cqube-info-card/div/div/span[1]")
    total_qr_code_card_label = (By.XPATH, "//app-digital-learning/div[1]/div/div[3]/sb-cqube-info-card/div/div/span[2]")
    total_content_i_tag = (By.XPATH, "//app-digital-learning/div[1]/div/div[4]/sb-cqube-info-card/div/img")
    total_content_value = (By.XPATH, "//app-digital-learning/div[1]/div/div[4]/sb-cqube-info-card/div/div/span[1]")
    total_content_label = (By.XPATH, "//app-digital-learning/div[1]/div/div[4]/sb-cqube-info-card/div/div/span[2]")
    total_time_spent_i_tag = (By.XPATH, "//app-digital-learning/div[1]/div/div[5]/sb-cqube-info-card/div/img")
    total_time_spent_value = (By.XPATH, "//app-digital-learning/div[1]/div/div[5]/sb-cqube-info-card/div/div/span[1]")
    total_time_spent_label = (By.XPATH, "//app-digital-learning/div[1]/div/div[5]/sb-cqube-info-card/div/div/span[2]")

    # implementation status tab
    implementation_status_tab = (By.XPATH, "//*[contains(text(),'Implementation Status')]//ancestor::div[1]")
    a_plus = (By.ID, "font-size-increase")
    a_minus = (By.ID, "font-size-decrease")
    a_default = (By.ID, "font-size-reset")
    etb_coverage_status_tab = (By.XPATH, "//*[contains(text(),'ETB Coverage Status')]//ancestor::div[1]")
    State_column = (By.XPATH, "//th[@role='columnheader'][1]")
    State_header = (By.XPATH, "//div[contains(text(),'State/UT name')]")
    Curiculum_Textbook_column = (By.XPATH, "//th[@role='columnheader'][2]")
    Energised_Textbook_column = (By.XPATH, "//th[@role='columnheader'][3]")
    per_Energised_Textbook_column = (By.XPATH, "//th[@role='columnheader'][4]")
    Curiculum_Textbook_header = (By.XPATH, "//div[contains(text(),'Total Curriculum Textbooks')]")
    Energised_Textbook_header = (By.XPATH, "//div[contains(text(),'Total Energized Textbooks')]")
    per_Energised_Textbook_header = (By.XPATH, "//div[contains(text(),'% Energized Textbooks')]")
    content_coverage_on_qr_tab = (By.XPATH, "//*[contains(text(),'Content Coverage on QR')]//ancestor::div[1]")
    bar_value = (By.CSS_SELECTOR, "tspan.highcharts-text-outline")
    bar_graph = (By.CSS_SELECTOR, "rect.highcharts-point")
    state_values = (By.CSS_SELECTOR, "svg > g.highcharts-label.highcharts-tooltip.highcharts-color-0 > text")
    state_column_each_row = (By.XPATH, "//td[1]")
    total_curiculum_texbook_column_each_row = (By.XPATH, "//td[2]")
    total_energised_textbook_column_each_row = (By.XPATH, "//td[3]")
    per_Energised_Textbook_column_each_row = (By.XPATH, "//td[4]")
    state_column_heat_chart = (By.XPATH, "//app-material-heat-chart-table/div/table/tbody/tr[{}]/td[1]")
    total_curiculum_texbook_column_heat_chart = (By.XPATH, "//app-material-heat-chart-table/div/table/tbody/tr[{}]/"
                                                           "td[2]")
    total_energised_textbook_column_heat_chart = (By.XPATH, "//app-material-heat-chart-table/div/table/tbody/tr[{}]"
                                                            "/td[3]")
    per_energised_textbook_column_heat_chart = (By.XPATH, "//app-material-heat-chart-table/div/table/tbody/tr[{}]"
                                                          "/td[4]")
    learning_session = (By.XPATH, "//*[contains(text(),'Learning Sessions')]//ancestor::div[1]")
    bar_graph_count = (By.CSS_SELECTOR, "g>rect")
    dropdown_value = (By.XPATH, "//div[starts-with(@id,'a') and contains(@id,"'-'"{}" + ")]")
    dropdown_options = (By.XPATH, "//div[@role='option']/span")
    medium_dropdown = (By.ID, "filter-Medium")
    grade_dropdown = (By.ID, "filter-Grade")
    subject_dropdown = (By.ID, "filter-Subject")
    learning_session_on_potential_user = (By.XPATH, "//*[contains(text(),'Learning Sessions on Potential "
                                                    "Users')]//ancestor::div[1]")

    def __init__(self, driver):
        super().__init__(driver)

    """This function is used to open the cQube application"""

    def open_cqube_application(self):
        self.get_url(ReadConfig.get_application_url())

    """This function is used to click on the cQube dashboard"""

    def click_dashboard(self):
        self.click(self.dashboard_button)

    """This function is used to click on the Diksha button"""

    def click_diksha(self):
        self.click(self.diksha_etb)

    """ This functionality is to get i teger value from vanity metric"""

    @staticmethod
    def get_integer_value(text):
        result = re.sub('\D', "", text)
        return result

    """This functionality is to get vanity card information"""

    def get_vanity_metrics_card_details(self):
        res = self.get_web_elements(self.vanity_card)
        return res

    """This function is used to get the vanity card i-tag information"""

    def get_total_states_uts_participation_card_info(self):
        return self.get_attribute_value('title', self.total_states_uts_participation_card_i_tag)

    """This function is used to get the vanity card values or metrics"""

    def get_total_states_uts_participation_card_value(self):
        return self.get_web_element_text(self.total_states_uts_participation_card_value)

    """This function is used to get the vanity card label"""

    def get_total_states_uts_participation_card_label(self):
        return self.get_web_element_text(self.total_states_uts_participation_card_label)

    """This function is used to get the vanity card i-tag information"""

    def get_total_etbs_card_info(self):
        return self.get_attribute_value('title', self.total_etbs_card_i_tag)

    """This function is used to get the vanity card values or metrics"""

    def get_total_etbs_card_value(self):
        return self.get_web_element_text(self.total_etbs_card_value)

    """This function is used to get the vanity card label"""

    def get_total_etbs_card_label(self):
        return self.get_web_element_text(self.total_etbs_card_label)

    """This function is used to get the vanity card i-tag information"""

    def get_total_qr_code_card_info(self):
        return self.get_attribute_value('title', self.total_qr_code_card_i_tag)

    """This function is used to get the vanity card values or metrics"""

    def get_total_qr_code_card_value(self):
        return self.get_web_element_text(self.total_qr_code_card_value)

    """This function is used to get the vanity card label"""

    def get_total_qr_code_card_label(self):
        return self.get_web_element_text(self.total_qr_code_card_label)

    """This function is used to get the vanity card i-tag information"""

    def get_total_content_card_info(self):
        return self.get_attribute_value('title', self.total_content_i_tag)

    """This function is used to get the vanity card values or metrics"""

    def get_total_content_card_value(self):
        return self.get_web_element_text(self.total_content_value)

    """This function is used to get the vanity card label"""

    def get_total_content_card_label(self):
        return self.get_web_element_text(self.total_content_label)

    """This function is used to get the vanity card i-tag information"""

    def get_total_time_spent_info(self):
        return self.get_attribute_value('title', self.total_time_spent_i_tag)

    """This function is used to get the vanity card values or metrics"""

    def get_total_time_spent_card_value(self):
        return self.get_web_element_text(self.total_time_spent_value)

    """This function is used to get the vanity card label"""

    def get_total_time_spent_card_label(self):
        return self.get_web_element_text(self.total_time_spent_label)

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

    """This function is to get attribute of implementation status tab"""
    def get_etb_coverage_status_tab_attribute(self):
        return self.get_attribute_value('aria-selected', self.etb_coverage_status_tab)

    ""'This function is to click on etb coverage status'
    def click_etb_coverage_status_tab(self):
        self.click(self.etb_coverage_status_tab)

    """This function is to get attribute of sort """
    def get_etb_coverage_state_column(self):
        return self.get_attribute_value('aria-sort', self.State_column)

    """This function is to click on state header"""
    def click_state_header(self):
        self.click(self.State_header)

    """This function is to click on cuticulumn textbook header"""
    def click_curiculum_textbook_header(self):
        self.click(self.Curiculum_Textbook_header)

    """This function is to get attribute of sort """
    def get_curiculum_textbook_column(self):
        return self.get_attribute_value('aria-sort', self.Curiculum_Textbook_column)

    """This function is to click on energised textbook header"""
    def click_energised_textbook_header(self):
        self.click(self.Energised_Textbook_header)

    """This function is to get attribute of sort """
    def get_energised_textbook_column(self):
        return self.get_attribute_value('aria-sort', self.Energised_Textbook_column)

    """This funcyion is to click on energised textbook header"""
    def click_per_energised_textbook_header(self):
        self.click(self.per_Energised_Textbook_header)

    """This function is to get attribute of sort """
    def get_per_energised_textbook_column(self):
        return self.get_attribute_value('aria-sort', self.per_Energised_Textbook_column)

    """This function is to click on content coverage on qr"""
    def click_content_coverage_on_qr_tab(self):
        self.click(self.content_coverage_on_qr_tab)

    """This function is to get attribute of content coverage on qr"""
    def get_attribute_content_coverage_on_qr(self):
        return self.get_attribute_value('aria-selected', self.content_coverage_on_qr_tab)

    """This function is to get bar graph values"""
    def get_bar_graph_value(self):
        bar_vaue = self.get_web_elements(self.bar_value)
        return bar_vaue

    """This function is to get bar graph"""
    def get_bar_graph(self):
        bar_graph = self.get_web_elements(self.bar_graph)
        return bar_graph

    """This function is to get state list"""
    def get_state_list(self):
        state_list = self.get_web_element(self.state_values)
        return state_list

    """This function is to get each row from state column"""
    def get_rows_from_state_column(self):
        rows = self.get_web_elements(self.state_column_each_row)
        return rows

    """This function is to get each row from total curiculumn textbook column"""
    def get_rows_from_total_curiculum_textbook(self):
        rows = self.get_web_elements(self.total_curiculum_texbook_column_each_row)
        return rows

    """This function is to get each row from total energised column"""
    def get_rows_from_total_energised_textbook(self):
        rows = self.get_web_elements(self.total_energised_textbook_column_each_row)
        return rows

    """This function is to get each row from per energised column"""
    def get_rows_from_per_energised_textbook(self):
        rows = self.get_web_elements(self.per_Energised_Textbook_column_each_row)
        return rows

    """This function is to get value in the state column """
    def get_each_row_heat_chart_value_id(self, column_id):
        heat_chart_table = self.state_column_heat_chart
        heat_chart_table = list(heat_chart_table)
        heat_chart_table[1] = heat_chart_table[1].format(column_id)
        heat_chart_table = tuple(heat_chart_table)
        res = self.get_web_element((By.XPATH, str(heat_chart_table[1])))
        return res

    """This function is to get value in the total curiculum textbook column """
    def get_column_total_curiculum_textbook(self, column_id):
        heat_chart_table = self.total_curiculum_texbook_column_heat_chart
        heat_chart_table = list(heat_chart_table)
        heat_chart_table[1] = heat_chart_table[1].format(column_id)
        heat_chart_table = tuple(heat_chart_table)
        res = self.get_web_element((By.XPATH, str(heat_chart_table[1])))
        return res

    """This function is to get value in the total energised textbook column """
    def get_column_total_energised_textbook(self, column_id):
        heat_chart_table = self.total_energised_textbook_column_heat_chart
        heat_chart_table = list(heat_chart_table)
        heat_chart_table[1] = heat_chart_table[1].format(column_id)
        heat_chart_table = tuple(heat_chart_table)
        res = self.get_web_element((By.XPATH, str(heat_chart_table[1])))
        return res

    """This function is to get value in the per energised textbook column """
    def get_column_per_energised_textbook(self, column_id):
        heat_chart_table = self.per_energised_textbook_column_heat_chart
        heat_chart_table = list(heat_chart_table)
        heat_chart_table[1] = heat_chart_table[1].format(column_id)
        heat_chart_table = tuple(heat_chart_table)
        res = self.get_web_element((By.XPATH, str(heat_chart_table[1])))
        return res

    """This function is to get bar graph count"""
    def get_bar_graph_count(self):
        count = self.get_web_elements(self.bar_graph_count)
        return count

    """This function is to get tooltip os bar graph"""
    def get_stacked_bar_tooltip_validation(self):
        self.get_bar_graph_value()
        lst = self.get_bar_graph()
        statelist = []
        for x in range(1, round(len(lst) / 2)):
            act = ActionChains(self.driver)
            act.move_to_element(lst[x]).perform()
            act.pause(5)
            time.sleep(2)
            state_names = self.get_state_list()
            statelist.append(state_names.text)
            print(statelist)

    """This function is to click on learning session tab"""
    def click_learning_tab(self):
        self.click(self.learning_session)

    """This function is to get attribute of learning session on QR"""
    def get_attribute_learning_on_qr(self):
        return self.get_attribute_value('aria-selected', self.learning_session)

    """This function is to get values of the option in the dropdown"""
    def get_each_dropdown_value_id(self, column_id):
        dropdown_value = self.dropdown_value
        dropdown_value = list(dropdown_value)
        dropdown_value[1] = dropdown_value[1].format(column_id)
        dropdown_value = tuple(dropdown_value)
        res = self.get_web_element((By.XPATH, str(dropdown_value[1])))
        return res

    """This function is to get options in the dropdown"""
    def get_dropdown_values(self):
        dropdown_options = self.get_web_elements(self.dropdown_options)
        return dropdown_options

    """This function is to click medium dropdown"""
    def click_medium_dropdown(self):
        self.click(self.medium_dropdown)

    """This function is to click grade dropdown"""
    def click_grade_dropdown(self):
        self.click(self.grade_dropdown)

    """This function is to click subject dropdown"""
    def click_subject_dropdown(self):
        self.click(self.subject_dropdown)

    """This function is to click on learning session on potential user"""
    def click_learning_session_on_potential_tab(self):
        self.click(self.learning_session_on_potential_user)

    """This function is to get attribute of learning session on potential user"""
    def get_attribute_learning_session_on_potential(self):
        return self.get_attribute_value('aria-selected', self.learning_session_on_potential_user)
