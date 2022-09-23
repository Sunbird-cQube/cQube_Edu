import re
import time

from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By

from PageObjects.Cqube_UI.BasePage import Base
from Utilities.ReadProperties import ReadConfig


class NcertQuiz(Base):
    """Locators for dashboard and ncert_quiz"""

    dashboard_button = (By.ID, 'menu-item-0')
    ncert_quiz_button = (By.ID, 'menu-item-9')
    Total_Quizzes_i_tag = (By.XPATH, "//app-quiz/div[1]/div/div[1]/sb-cqube-info-card/div/img")
    Total_Quizzes_vanity_card_value = (By.XPATH, "//app-quiz/div[1]/div/div[1]/sb-cqube-info-card/div/div/span[1]")
    Total_Quizzes_vanity_card_label = (By.XPATH, "//app-quiz/div[1]/div/div[1]/sb-cqube-info-card/div/div/span[2]")

    Total_medium_i_tag = (By.XPATH, "//app-quiz/div[1]/div/div[2]/sb-cqube-info-card/div/img")
    Total_medium_vanity_card_value = (By.XPATH, "//app-quiz/div[1]/div/div[2]/sb-cqube-info-card/div/div/span[1]")
    Total_medium_vanity_card_label = (By.XPATH, '//app-quiz/div[1]/div/div[2]/sb-cqube-info-card/div/div/span[2]')

    Total_participating_i_tag = (By.XPATH, "//app-quiz/div[1]/div/div[3]/sb-cqube-info-card/div/img")
    Total_participating_vanity_card_value = (
        By.XPATH, "//app-quiz/div[1]/div/div[3]/sb-cqube-info-card/div/div/span[1]")
    Total_participating_vanity_card_label = (
        By.XPATH, "//app-quiz/div[1]/div/div[3]/sb-cqube-info-card/div/div/span[2]")

    Total_Enrolment_i_tag = (By.XPATH, "//app-quiz/div[1]/div/div[4]/sb-cqube-info-card/div/img")
    Total_Enrolment_vanity_card_value = (By.XPATH, "//app-quiz/div[1]/div/div[4]/sb-cqube-info-card/div/div/span[1]")
    Total_Enrolment_vanity_card_label = (By.XPATH, "//app-quiz/div[1]/div/div[4]/sb-cqube-info-card/div/div/span[2]")

    Total_Certification_i_tag = (By.XPATH, "//app-quiz/div[1]/div/div[4]/sb-cqube-info-card/div/img")
    Total_Certification_vanity_card_value = (
        By.XPATH, "//app-quiz/div[1]/div/div[4]/sb-cqube-info-card/div/div/span[1]")
    Total_Certification_vanity_card_label = (
        By.XPATH, "//app-quiz/div[1]/div/div[4]/sb-cqube-info-card/div/div/span[2]")

    # implementation status

    implementation_status_tab = (By.XPATH, "//*[contains(text(),'Implementation Status')]//ancestor::div[1]")
    implementation_status_button = (By.XPATH, "//*[contains(text(),'Implementation Status')]")
    a_plus = (By.ID, "font-size-increase")
    a_minus = (By.ID, "font-size-decrease")
    a_default = (By.ID, "font-size-reset")

    # participation status
    participation_status_tab = (By.XPATH, "//*[contains(text(),'Participation Status')]//ancestor::div[1]")
    participation_status_validation = (By.XPATH, "//*[contains(text(),'Participation Status')]//ancestor::div[1]")
    participation_status_button = (By.XPATH, "//*[contains(text(),'participation_status')]")
    quiz_dropdown = (By.XPATH, '//*[@id="filter-Quiz Name"]/div/div/div[1]')
    legend_text = (By.XPATH, '//*[@id="map"]/div[2]/div[2]/div/strong')
    quiz_dropdown_value = (By.XPATH, "//div[starts-with(@id,'a') and contains(@id,"'-'"{}" + ")]")
    quiz_options = (By.XPATH, "//div[@role='option']/span")

    # quiz wise status tab
    quiz_wise_status_tab = (By.XPATH, "//*[contains(text(),'Quiz wise Status')]//ancestor::div[1]")
    quiz_wise_status_button = (By.XPATH, "//*[contains(text(),'Quiz wise Status')]")

    quiz_name_column = (By.XPATH, "//th[@role='columnheader'][1]")
    total_enrolment_column = (By.XPATH, "//th[@role='columnheader'][2]")
    certification_issued_column = (By.XPATH, "//th[@role='columnheader'][3]")
    completion_column = (By.XPATH, "//th[@role='columnheader'][4]")
    medium_column = (By.XPATH, "//th[@role='columnheader'][5]")

    quiz_name_header = (By.XPATH, "//app-material-heat-chart-table/div/table/thead/tr/th[1]/div/div[1]")
    total_Enrolment_header = (By.XPATH, "//app-material-heat-chart-table/div/table/thead/tr/th[2]/div/div[1]")
    certificate_Issued_header = (By.XPATH, "//app-material-heat-chart-table/div/table/thead/tr/th[3]/div/div[1]")
    completion_header = (By.XPATH, "//app-material-heat-chart-table/div/table/thead/tr/th[4]/div/div[1]")
    medium_header = (By.XPATH, "//app-material-heat-chart-table/div/table/thead/tr/th[5]/div/div[1]")

    quiz_name_values = (By.CSS_SELECTOR, "svg > g.highcharts-label.highcharts-tooltip.highcharts-color-0 > text")
    quiz_name_column_each_row = (By.XPATH, "//td[1]")
    total_enrolment_column_each_row = (By.XPATH, "//td[2]")
    certificate_issued_column_each_row = (By.XPATH, "//td[3]")
    completion_column_each_row = (By.XPATH, "//td[4]")
    medium_column_each_row = (By.XPATH, "//td[5]")
    quiz_column_heat_chart = (By.XPATH, "//app-material-heat-chart-table/div/table/tbody/tr[{}]/td[1]")
    total_enrolment_column_heat_chart = (By.XPATH, "//app-material-heat-chart-table/div/table/tbody/tr[{}]/"
                                                   "td[2]")
    certification_issued_column_heat_chart = (By.XPATH, "//app-material-heat-chart-table/div/table/tbody/tr[{}]"
                                                        "/td[3]")
    completion_column_heat_chart = (By.XPATH, "//app-material-heat-chart-table/div/table/tbody/tr[{}]"
                                              "/td[4]")
    medium_column_heat_chart = (By.XPATH, "//app-material-heat-chart-table/div/table/tbody/tr[{}]"
                                          "/td[5]")
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

    def __init__(self, driver):
        super().__init__(driver)

    """This function is used to open the cQube application"""

    def open_cqube_application(self):
        self.get_url(ReadConfig.get_application_url())

    """This function is used to click on the cQube dashboard"""

    def click_dashboard(self):
        self.click(self.dashboard_button)

    """This function is used to click on the ncert quizzes button"""

    def click_ncert_quiz(self):
        self.click(self.ncert_quiz_button)

    """This function is used to get the vanity card i-tag information"""

    def get_vanity_card_info(self):
        return self.get_attribute_value('title', self.Total_Quizzes_i_tag)

    """This function is used to get the vanity card values or metrics"""

    def get_vanity_card_value(self):
        return self.get_web_element_text(self.Total_Quizzes_vanity_card_value)

    """This function is used to get the vanity card label"""

    def get_vanity_card_label(self):
        return self.get_web_element_text(self.Total_Quizzes_vanity_card_label)

    """This function is used to click on implementation status tab"""

    def click_implementation_status_tab(self):
        self.click(self.implementation_status_button)

    """This function is used to get implementation status attribute"""

    def get_implementation_status_tab_attribute(self):
        return self.get_attribute_value("aria-selected", self.implementation_status_tab)

    """This function is used to click implementation status tooltip"""

    def click_Quizzes_Implementation_status_tooltip(self):
        return self.get_attribute_value('aria-selected', self.implementation_status_tab)

    """This function is used to get implemetation status tooltip validation"""

    def get_IM_map_tooltip_info_validation(self):
        return self.get_attribute_value('aria-selected', self.get_map_tooltip_info_validation)

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
    """This function is used to click on participation status tab"""

    def click_participation_status_tab(self):
        self.click(self.participation_status_tab)

    """This function is used to click on participation status button"""

    def get_quiz_click_participation_status(self):
        self.click(self.participation_status_button)

    """This function is used to get participation status tab attribute"""

    def get_participation_status_tab_attribute(self):
        return self.get_attribute_value('aria-selected', self.participation_status_validation)

    """This function is used to click on quiz wise status tab"""

    def click_quiz_wise_status_tab(self):
        self.click(self.quiz_wise_status_tab)

    """This function is used to get quiz wise status tab attribute"""

    def get_quiz_wise_status_tab_attribute(self):
        return self.get_attribute_value('aria-selected', self.quiz_wise_status_tab)

    """This function is used to get legend text"""

    def get_legend_text(self):
        return self.get_web_element_text(self.legend_text)

    """This function is used to get integer value"""

    @staticmethod
    def get_integer_value(text):
        result = re.sub('\D', "", text)
        return result

    """This function is used to click on dropdowns"""

    def click_dropdown(self):
        self.click(self.quiz_dropdown)

    """This function is used to get quiz dropdown value"""

    def get_quiz_dropdown_values(self):
        quiz_dropdown_options = self.get_web_elements(self.quiz_options)
        return quiz_dropdown_options

    """This function is used to get each dropdown value id"""

    def get_each_dropdown_value_id(self, column_id):
        quiz_dropdown_value = self.quiz_dropdown_value
        quiz_dropdown_value = list(quiz_dropdown_value)
        quiz_dropdown_value[1] = quiz_dropdown_value[1].format(column_id)
        metrics_dropdown_value = tuple(quiz_dropdown_value)
        res = self.get_web_element((By.XPATH, str(metrics_dropdown_value[1])))
        return res

    """This function is to get attribute of quiz wise status tab"""

    def get_quiz_wise_tab_attribute(self):
        return self.get_attribute_value('aria-selected', self.quiz_wise_status_tab)

    """This function is to click quiz wise status tab"""

    def click_quiz_wise_tab(self):
        self.click(self.quiz_wise_status_tab)

    """This function is to get quiz wise status column"""

    def get_quiz_wise_column(self):
        return self.get_attribute_value('aria-sort', self.quiz_name_column)

    """This function is to click quiz name header"""

    def click_quiz_name_header(self):
        self.click(self.quiz_name_header)

    """This function is to click total enrolment header"""

    def click_total_enrolment_header(self):
        self.click(self.total_Enrolment_header)

    """This function is to get total enrolment column"""

    def get_total_enrolment_column(self):
        return self.get_attribute_value('aria-sort', self.total_Enrolment_header)

    """This function is to click certificate issued header"""

    def click_certificate_issued_header(self):
        self.click(self.certificate_Issued_header)

    """This function is to get certification issued column"""

    def get_certificate_issued_column(self):
        return self.get_attribute_value('aria-sort', self.certificate_Issued_header)

    """This function is to click completion header"""

    def click_completion_header(self):
        self.click(self.completion_header)

    """This function is to get completion column"""

    def get_completion_column(self):
        return self.get_attribute_value('aria-sort', self.completion_header)

    """This function is to click medium header"""

    def click_medium_header(self):
        self.click(self.medium_header)

    """This function is to get medium column"""

    def get_medium_column(self):
        return self.get_attribute_value('aria-sort', self.medium_header)

    """This function is to get quiz name"""

    def get_quiz_name(self):
        state_list = self.get_web_element(self.quiz_name_values)
        return state_list

    """This function is to get rows from quiz name column"""

    def get_rows_from_quiz_name_column(self):
        rows = self.get_web_elements(self.quiz_name_column_each_row)
        return rows

    """This function is to get rows from total enrolment"""

    def get_rows_from_total_enrolment(self):
        rows = self.get_web_elements(self.total_enrolment_column_each_row)
        return rows

    """This function is to get rows from certification issued"""

    def get_rows_from_certification_issued(self):
        rows = self.get_web_elements(self.certificate_issued_column_each_row)
        return rows

    """This function is to get rows from completion"""

    def get_rows_from_completion(self):
        rows = self.get_web_elements(self.completion_column_each_row)
        return rows

    """This function is to get rows from medium"""

    def get_rows_from_medium(self):
        rows = self.get_web_elements(self.medium_column_each_row)
        return rows

    """This functionality is to get id of each metric in dropdown"""

    def get_column_quiz_name(self, column_id):
        heat_chart_table = self.quiz_column_heat_chart
        heat_chart_table = list(heat_chart_table)
        heat_chart_table[1] = heat_chart_table[1].format(column_id)
        heat_chart_table = tuple(heat_chart_table)
        res = self.get_web_element((By.XPATH, str(heat_chart_table[1])))
        return res

    """This functionality is to get id of each metric in dropdown"""

    def get_column_total_enrolment(self, column_id):
        heat_chart_table = self.total_enrolment_column_heat_chart
        heat_chart_table = list(heat_chart_table)
        heat_chart_table[1] = heat_chart_table[1].format(column_id)
        heat_chart_table = tuple(heat_chart_table)
        res = self.get_web_element((By.XPATH, str(heat_chart_table[1])))
        return res

    """This functionality is to get id of each metric in dropdown"""

    def get_column_certification_issued(self, column_id):
        heat_chart_table = self.certification_issued_column_heat_chart
        heat_chart_table = list(heat_chart_table)
        heat_chart_table[1] = heat_chart_table[1].format(column_id)
        heat_chart_table = tuple(heat_chart_table)
        res = self.get_web_element((By.XPATH, str(heat_chart_table[1])))
        return res

    """This functionality is to get id of each metric in dropdown"""

    def get_column_completion(self, column_id):
        heat_chart_table = self.completion_column_heat_chart
        heat_chart_table = list(heat_chart_table)
        heat_chart_table[1] = heat_chart_table[1].format(column_id)
        heat_chart_table = tuple(heat_chart_table)
        res = self.get_web_element((By.XPATH, str(heat_chart_table[1])))
        return res

    """This functionality is to get id of each metric in dropdown"""

    def get_column_medium(self, column_id):
        heat_chart_table = self.medium_column_heat_chart
        heat_chart_table = list(heat_chart_table)
        heat_chart_table[1] = heat_chart_table[1].format(column_id)
        heat_chart_table = tuple(heat_chart_table)
        res = self.get_web_element((By.XPATH, str(heat_chart_table[1])))
        return res
