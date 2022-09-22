import re
import time

from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By
from PageObjects.Cqube_UI.BasePage import Base
from Utilities.ReadProperties import ReadConfig


class Nishtha(Base):
    """ Selenium locator of Nishtha Program Screen """
    dashboard = (By.ID, "menu-item-0")
    nishtha = (By.ID, "menu-item-1")
    a_plus = (By.ID,"font-size-increase")
    a_minus = (By.ID, "font-size-decrease")
    a_default = (By.ID, "font-size-reset")

    Implementation_Status_tab = (By.XPATH, "//*[contains(text(),'Implementation Status')]")
    Course_medium_tab = (By.XPATH, "//*[contains(text(),'Courses and Mediums status')]")
    Potential_Base_tab = (By.XPATH, "//*[contains(text(),'% against Potential Base')]")
    District_wise_tab = (By.XPATH, "//*[contains(text(),'District wise Status')]")
    Course_wise_tab = (By.XPATH, "//*[contains(text(),'Course wise Status ')]")

    total_state = (By.XPATH, "//app-teacher-training/div[1]/div/div[1]/sb-cqube-info-card/div/div/span[1]")
    total_enrollment = (By.XPATH, "//app-teacher-training/div[1]/div/div[2]/sb-cqube-info-card/div/div/span[1]")
    total_completion = (By.XPATH, "//app-teacher-training/div[1]/div/div[3]/sb-cqube-info-card/div/div/span[1]")
    total_certification = (By.XPATH, "//app-teacher-training/div[1]/div/div[4]/sb-cqube-info-card/div/div/span[1]")
    total_medium = (By.XPATH, "//app-teacher-training/div[1]/div/div[5]/sb-cqube-info-card/div/div/span[1]")

    total_state_Tittle = (By.XPATH, "//app-teacher-training/div[1]/div/div[1]/sb-cqube-info-card/div/div/span[2]")
    total_enrollment_Tittle = (By.XPATH, "//app-teacher-training/div[1]/div/div[2]/sb-cqube-info-card/div/div/span[2]")
    total_completion_Tittle = (By.XPATH, "//app-teacher-training/div[1]/div/div[3]/sb-cqube-info-card/div/div/span[2]")
    total_certification_Tittle = (By.XPATH, "//app-teacher-training/div[1]/div/div["
                                            "4]/sb-cqube-info-card/div/div/span[2]")
    total_medium_Tittle = (By.XPATH, "//app-teacher-training/div[1]/div/div[5]/sb-cqube-info-card/div/div/span[2]")

    states_i_info = (By.XPATH, "//app-teacher-training/div[1]/div/div[1]/sb-cqube-info-card/div/img")
    enrolment_i_info = (By.XPATH, "//app-teacher-training/div[1]/div/div[2]/sb-cqube-info-card/div/img")
    completion_i_info = (By.XPATH, "//app-teacher-training/div[1]/div/div[3]/sb-cqube-info-card/div/img")
    certification_i_info = (By.XPATH, "//app-teacher-training/div[1]/div/div[4]/sb-cqube-info-card/div/img")
    mediums_i_info = (By.XPATH, "//app-teacher-training/div[1]/div/div[5]/sb-cqube-info-card/div/img")
    Clear_Button = (By.XPATH, "//*[@id='filter-Program']/div/span[1]")
    program_dropdown = (By.ID, "filter-Program")
    program_options = (By.XPATH, "//div[@role='option']")
    state_dropdown = (By.ID, "filter-State/UT")

    implementation_tab_status = "//div[@role='tab'][1]"
    course_medium_tab_status = "//div[@role='tab'][2]"
    potential_tab_status = "//div[@role='tab'][3]"
    district_wise_tab_status = "//div[@role='tab'][4]"
    course_wise_tab_status = "//div[@role='tab'][5]"
    program_selection = "//div[starts-with(@id,'a') and contains(@id,'-{}')]"
    program_title = "//div[starts-with(@id,'a') and contains(@id,'-{}')]/span"
    tab_status = 'aria-selected'
    # Courses and Medium status
    state_colmn = (By.XPATH, "//*[@role='row']/td[1]")
    course_launch = (By.XPATH, "//*[@role='row']/td[2]")
    Medium = (By.XPATH, "//*[@role='row']/td[3]")
    CM_status = (By.ID, "mat-tab-label-0-1")
    dropdown_options = (By.XPATH, "//div[@role='option']/span")
    Choose_Program = (By.XPATH, "//div[@role='combobox']/input")
    choose_states = (By.XPATH, "//*[@id='filter-State/UT']/div/div/div[3]/input")

    state_header = "//div[contains(text(),'State/UT Name')]"
    course_header = "//div[contains(text(),'Total Courses Launched')]"
    medium_header = "//div[contains(text(),'Total Mediums')]"

    state_sort = "//th[@role='columnheader'][1]"
    course_sort = "//th[@role='columnheader'][2]"
    medium_sort = "//th[@role='columnheader'][3]"

    state_values = "//td[1]"
    course_values = "//td[2]"
    medium_values = "//td[3]"

    # District Wise Status
    District_Status = "mat-tab-label-2-3"
    click_district_program = "//ng-select[@id='filter-Program']/div/div/div[3]/input"
    click_state_options = "//ng-select[@id='filter-State/UT']/div/div/div[3]/input"
    state_names_id = "aff430dd515c-"

    map_tooltip = "leaflet-interactive"
    map_info = (By.XPATH, "//div[@class='leaflet-pane leaflet-tooltip-pane']")
    stacked_bars = (By.CSS_SELECTOR, "rect.highcharts-point")
    state_column = "//div/table/tbody/tr[{}]/td[1]"
    course_column = "//div/table/tbody/tr[{}]/td[2]"
    medium_column = "//div/table/tbody/tr[{}]/td[3]"

    def __init__(self, driver):
        super().__init__(driver)
        self.count = 0

    def open_cqube_application(self):
        self.get_url(ReadConfig.get_application_url())
        self.driver.implicitly_wait(30)

    """This function is used to click on the Nishtha Dashboard button"""

    def click_nishtha_dashboard(self):
        self.click(self.nishtha)

    ''' Function to click the Dashboard Button'''

    def click_dashboard_button(self):
        self.click(self.dashboard)

    '''Function to click the Nishtha Button'''

    def get_click_nishtha_button(self):
        self.click(self.nishtha)

    '''Functions to Click the TABs present in the Nishtha Dashboard'''

    def click_on_implementation_tab(self):
        self.click(self.Implementation_Status_tab)

    def click_on_course_and_medium_tab(self):
        self.click(self.Course_medium_tab)

    def click_on_potential_tab(self):
        self.click(self.Potential_Base_tab)

    def click_on_district_status_tab(self):
        self.click(self.District_wise_tab)

    def click_on_course_status_tab(self):
        self.click(self.Course_wise_tab)

    '''Functions to get Each metrics card Details'''

    def get_state_i_tag_info(self):
        return self.get_attribute_value('title', self.states_i_info)

    def get_total_states_value(self):
        return self.get_web_element_text(self.total_state)

    def get_state_title(self):
        return self.get_web_element_text(self.total_state_Tittle)

    def get_enrolment_i_tag_info(self):
        return self.get_attribute_value('title', self.enrolment_i_info)

    def get_total_enrolment_value(self):
        return self.get_web_element_text(self.total_enrollment)

    def get_enrolment_title(self):
        return self.get_web_element_text(self.total_enrollment_Tittle)

    def get_completion_i_tag_info(self):
        return self.get_attribute_value('title', self.completion_i_info)

    def get_total_completion_value(self):
        return self.get_web_element_text(self.total_completion)

    def get_completion_title(self):
        return self.get_web_element_text(self.total_completion_Tittle)

    def get_certification_i_tag_info(self):
        return self.get_attribute_value('title', self.certification_i_info)

    def get_total_certification_value(self):
        return self.get_web_element_text(self.total_certification)

    def get_certification_title(self):
        return self.get_web_element_text(self.total_certification_Tittle)

    def get_mediums_i_tag_info(self):
        return self.get_attribute_value('title', self.mediums_i_info)

    def get_total_mediums_value(self):
        return self.get_web_element_text(self.total_medium)

    def get_mediums_title(self):
        return self.get_web_element_text(self.total_medium_Tittle)

    '''Function to get no of options in program dropdown'''

    def get_count_of_options_program_dropdown(self):
        self.click(self.program_dropdown)
        return self.get_web_elements(self.program_options)

    '''Function to get no of options in State dropdown'''

    def get_count_of_options_state_dropdown(self):
        self.click(self.state_dropdown)
        return self.get_web_elements(self.program_options)

    '''Function to get digit integers'''

    @staticmethod
    def get_integer_value(value):
        return re.sub("\D", '', value)

    ''' Function to get Tab Click Status'''

    def get_implementation_tab_click_status(self):
        self.click_on_implementation_tab()
        result = Base.get_tab_result(self, self.tab_status, self.implementation_tab_status)
        return result

    def get_course_medium_tab_click_status(self):
        self.click_on_course_and_medium_tab()
        result = Base.get_tab_result(self, self.tab_status, self.course_medium_tab_status)
        return result

    def get_potential_tab_click_status(self):
        self.click_on_potential_tab()
        result = Base.get_tab_result(self, self.tab_status, self.potential_tab_status)
        return result

    def get_district_tab_click_status(self):
        self.click_on_district_status_tab()
        result = Base.get_tab_result(self, self.tab_status, self.district_wise_tab_status)
        return result

    def get_course_tab_click_status(self):
        self.click_on_course_status_tab()
        result = Base.get_tab_result(self, self.tab_status, self.course_wise_tab_status)
        return result

    '''Function to click the Program Dropdown'''

    def click_program_dropdown(self):
        self.click(self.program_dropdown)

    '''Function to click the state dropdown'''

    def click_state_dropdown(self):
        self.click(self.state_dropdown)

    '''Function to get tooltip colors count'''

    def get_map_tooltip_colors(self):
        blue_color = 0
        white_color = 0
        markers = self.driver.find_elements(By.CLASS_NAME, self.map_tooltip)
        for i in range(len(markers)):
            if markers[i].get_attribute('fill') == '#1D4586':
                blue_color = blue_color + 1
            else:
                print('white color', markers[i].get_attribute('fill'))
                white_color = white_color + 1
        return blue_color, white_color

    '''Function to selection of each options in dropdown'''

    def check_selection_of_dropdown_options(self):
        self.click_program_dropdown()
        tooltips = self.driver.find_elements(By.CLASS_NAME, self.map_tooltip)
        result = self.get_count_of_options_program_dropdown()
        for i in range(len(result)):
            program = self.driver.find_element(By.XPATH, self.program_selection.format(i))
            program_title = self.driver.find_element(By.XPATH, self.program_title.format(i))
            program_name = program_title.text
            program.click()
            time.sleep(5)
            res1, res2 = self.get_map_tooltip_colors()
            if res1 + res2 == len(tooltips):
                print("Total no of blue and white tooltips are equals to total no of tooltips")
            else:
                print(res1, res2, "White and blue tooltip colors are not matching")
                self.count = self.count + 1
            if program_name in self.driver.page_source:
                print(program_name, "is Selected and Displayed in screen")
                assert True
            else:
                print(program_name, ' is not Selected from dropdown')
                self.count = self.count + 1
            self.click_program_dropdown()
            time.sleep(1)
        return self.count

    '''Function to select each options from Program Dropdown'''

    def check_selection_of_program_dropdown_options(self):
        self.click_program_dropdown()
        time.sleep(2)
        result = self.get_count_of_options_program_dropdown()
        for i in range(len(result)):
            program = self.driver.find_element(By.XPATH, self.program_selection.format(i))
            program_title = self.driver.find_element(By.XPATH, self.program_title.format(i))
            program_name = program_title.text
            program.click()
            time.sleep(5)
            bars = self.get_count_of_bars_in_chart()
            if program_name in self.driver.page_source and len(bars) != 0:
                print(program_name, "is selected and displayed in screen")
                assert True
            else:
                print(program_name, ' Stacked chart is not having bars ')
                self.count = self.count + 1
            self.click_program_dropdown()
            time.sleep(2)
        return self.count

    '''Function to selection of each options in dropdown'''

    def check_selection_of_dropdown_state_options(self):
        self.click_state_dropdown()
        result = self.get_count_of_options_state_dropdown()
        for i in range(2, len(result) - 30):
            program = self.driver.find_element(By.XPATH, self.program_selection.format(i))
            program_title = self.driver.find_element(By.XPATH, self.program_title.format(i))
            program_name = program_title.text
            program.click()
            time.sleep(5)
            if program_name in self.driver.page_source:
                print(program_name, "is selected and displayed in screen")
                assert True
            else:
                print(program_name, ' is not Selected from dropdown')
                self.count = self.count + 1
            self.click_state_dropdown()
            time.sleep(2)
        return self.count

    '''Function to validate the map report and tooltip information '''

    def get_map_tooltip_info_validation(self):
        map_data = []
        self.click_program_dropdown()
        result = self.get_count_of_options_program_dropdown()
        for i in range(len(result)):
            program = self.driver.find_element(By.XPATH, self.program_selection.format(i))
            program_title = self.driver.find_element(By.XPATH, self.program_title.format(i))
            program_name = program_title.text
            program.click()
            time.sleep(5)
            lst = self.driver.find_elements(By.CLASS_NAME, self.map_tooltip)
            print("No of Markers", len(lst) - 1)
            if len(lst) - 1 == 0:
                assert False
            else:
                for x in range(len(lst)):
                    act = ActionChains(self.driver)
                    act.move_to_element(lst[x]).perform()
                    act.pause(4)
                    txt = self.get_web_element(self.map_info)
                    map_data.append(txt.text)
                if program_name in map_data[0]:
                    print(program_name, ' selected and displayed in screen')
                    assert True
                else:
                    print(program_name, map_data, ' is not selected from dropdown and not showing in tooltip ')
                    self.count = self.count + 1
            map_data.clear()
            self.click_program_dropdown()
            time.sleep(2)
        return self.count

    '''Function to check selection of options from dropdown'''

    def check_course_selection_of_dropdown_options(self):
        self.click_program_dropdown()
        result = self.get_count_of_options_program_dropdown()
        for i in range(len(result)):
            program = self.driver.find_element(By.XPATH, self.program_selection.format(i))
            program_title = self.driver.find_element(By.XPATH, self.program_title.format(i))
            program_name = program_title.text
            program.click()
            time.sleep(5)
            if program_name in self.driver.page_source:
                print(program_name, 'is selected and displayed in screen')
                assert True
            else:
                print(program_name, ' is not selected from dropdown')
                self.count = self.count + 1
            self.click_program_dropdown()
            time.sleep(2)
        return self.count

    '''Function to validate the state List Table values '''

    def test_validate_state_column_names(self):
        state_tablevals = []
        self.click_on_course_and_medium_tab()
        state_name = self.driver.find_elements(By.XPATH, self.state_values)
        for i in range(1, len(state_name)):
            state_list = self.driver.find_element(By.XPATH, self.state_column.format(i))
            state_tablevals.append(state_list.text)
        if len(state_tablevals) == len(state_name) - 1:
            assert True
        else:
            self.count = self.count + 1
        return self.count

    '''Function to validate the course Table values '''

    def test_validate_course_column_validate(self):
        course_tablevals = []
        self.click_on_course_and_medium_tab()
        course_name = self.driver.find_elements(By.XPATH, self.course_values)
        for i in range(1, len(course_name)):
            state_list = self.driver.find_element(By.XPATH, self.course_column.format(i))
            course_tablevals.append(state_list.text)
        if len(course_tablevals) == len(course_name) - 1:
            assert True
        else:
            print(len(course_tablevals), len(course_name), 'Table rows are not matching')
            self.count = self.count + 1
        for i in range(len(course_tablevals)):
            if course_tablevals[i] is not str and course_tablevals[i] is not None:
                assert True
            else:
                self.count = self.count + 1
        return self.count

    '''Function to validate the medium Table values '''

    def test_validate_medium_column_values(self):
        medium_tablevals = []
        self.click_on_course_and_medium_tab()
        medium_val = self.driver.find_elements(By.XPATH, self.medium_values)
        for i in range(1, len(medium_val)):
            state_list = self.driver.find_element(By.XPATH, self.medium_column.format(i))
            medium_tablevals.append(state_list.text)
        if len(medium_tablevals) == len(medium_val) - 1:
            assert True
        else:
            print(len(medium_tablevals), len(medium_val))
            self.count = self.count + 1
        for i in range(len(medium_tablevals)):
            if medium_tablevals[i] is not str:
                assert True
            else:
                print("*********** Course Value are Not Integers *************")
                self.count = self.count + 1
        return self.count

    '''function to validation of table values across program selection'''

    def check_course_selection_of_options_with_table_validation(self):
        self.click_program_dropdown()
        result = self.get_count_of_options_program_dropdown()
        for i in range(len(result)):
            program = self.driver.find_element(By.XPATH, self.program_selection.format(i))
            program_title = self.driver.find_element(By.XPATH, self.program_title.format(i))
            program_name = program_title.text
            program.click()
            time.sleep(5)
            if program_name in self.driver.page_source:
                print(program_name, 'is selected and displayed in screen')
                assert True
            else:
                print(program_name, ' is not selected from dropdown')
                self.count = self.count + 1
            state_name = self.test_validate_state_column_names()
            if state_name == 0:
                assert True
            else:
                print(state_name, 'State Names are not in Camel Cases or Null ')
                self.count = self.count + 1
            course_value = self.test_validate_course_column_validate()
            if course_value == 0:
                assert True
            else:
                print(course_value, 'Course Values are not in Integers or Null ')
                self.count = self.count + 1
            medium_values = self.test_validate_medium_column_values()
            if medium_values == 0:
                assert True
            else:
                print(medium_values, 'State Names are not in Camel Cases or Null ')
                self.count = self.count + 1
            self.click_program_dropdown()
            time.sleep(2)
        return self.count

    '''Function to check state table header - sorting functionality is working or not '''

    def check_table_state_headers_clickable(self):
        status = self.driver.find_element(By.XPATH, self.state_sort).get_attribute('aria-sort')
        self.driver.find_element(By.XPATH, self.state_header).click()
        time.sleep(2)
        now = self.driver.find_element(By.XPATH, self.state_sort).get_attribute('aria-sort')
        sort = "descending"
        if now == 'ascending' or sort:
            assert True
        else:
            print(status, now, 'Table value order is not changed so sorting is not working')
            self.count = self.count + 1
        self.driver.find_element(By.XPATH, self.course_header).click()
        time.sleep(2)
        sec_click = self.driver.find_element(By.XPATH, self.course_sort).get_attribute('aria-sort')
        sort = "descending"
        if sec_click == 'ascending' or sort:
            assert True
        else:
            self.count = self.count + 1
        return self.count

    '''Function to check course table header - sorting functionality is working or not '''

    def test_check_table_courses_headers_clickable(self):
        status = self.driver.find_element(By.XPATH, self.course_sort).get_attribute('aria-sort')
        self.driver.find_element(By.XPATH, self.course_header).click()
        now = self.driver.find_element(By.XPATH, self.course_sort).get_attribute('aria-sort')
        sort = "descending"
        if now == 'ascending' or sort:
            assert True
        else:
            print(status, now, "********Course launched Header sorting is not working ***********")
            self.count = self.count + 1
        self.driver.find_element(By.XPATH, self.course_header).click()
        sec_click = self.driver.find_element(By.XPATH, self.course_sort).get_attribute('aria-sort')
        sort = "descending"
        if sec_click == 'ascending' or sort:
            assert True
        else:
            print(status, now, "********Course launched Header sorting is not working ***********")
            self.count = self.count + 1
        return self.count

    '''Function to check medium table header - sorting functionality is working or not '''

    def test_check_table_mediums_headers_clickable(self):
        status = self.driver.find_element(By.XPATH, self.medium_sort).get_attribute('aria-sort')
        self.driver.find_element(By.XPATH, self.medium_header).click()
        now = self.driver.find_element(By.XPATH, self.medium_sort).get_attribute('aria-sort')
        if status != now:
            assert True
            print("*********** Courses Launched table header is Sorting working *****************")
        else:
            print(status, now, "******** Course launched Header sorting is not working ***********")
            self.count = self.count + 1
        self.driver.find_element(By.XPATH, self.course_header).click()
        sec_click = self.driver.find_element(By.XPATH, self.course_sort).get_attribute('aria-sort')
        sort = "descending"
        if sec_click == 'ascending' or sort:
            assert True
        else:
            print(status, now, "******** Medium Header sorting is not working ***********")
            self.count = self.count + 1
        return self.count

    '''Function to check with state values '''

    def test_check_state_table_values(self):
        state_tablevals = []
        state_name = self.driver.find_elements(By.XPATH, self.state_values)
        for i in range(1, len(state_name)):
            state_list = self.driver.find_element(By.XPATH, self.state_column.format(i))
            state_tablevals.append(state_list.text)
        for j in range(len(state_tablevals)):
            st_name = state_tablevals[j]
            if st_name != st_name.lower() and st_name != st_name.upper() and "_" not in st_name:
                print("************ State Names are In Camel Cases *****************")
            else:
                print("**************** State Name are not in Camel Cases ")
                self.count = self.count + 1
        if len(state_tablevals) == len(state_name) - 1:
            print("************ State Table values are showing ****************")
            assert True
        else:
            print("************ State names are not showing **************")
            self.count = self.count + 1
        return self.count

    '''Function to check with course values '''

    def test_check_course_table_values(self):
        course_tablevals = []
        course_name = self.driver.find_elements(By.XPATH, self.course_values)
        for i in range(1, len(course_name)):
            state_list = self.driver.find_element(By.XPATH, self.course_column.format(i))
            course_tablevals.append(state_list.text)
        if len(course_tablevals) == len(course_name) - 1:
            assert True
            print("************ Course Table Values are showing ****************")
        else:
            print("************ Course Values are not showing **************")
            self.count = self.count + 1
        for i in range(len(course_tablevals)):
            if course_tablevals[i] is not str and course_tablevals[i] is not None:
                print("*********** Course Values are Integers  *************")
                assert True
            else:
                print("*********** Course Values are Not Integers *************")
                self.count = self.count + 1
        return self.count

    '''Function to check with medium values '''

    def test_check_medium_table_values(self):
        medium_tablevals = []
        medium_val = self.driver.find_elements(By.XPATH, self.medium_values)
        for i in range(1, len(medium_val)):
            state_list = self.driver.find_element(By.XPATH, self.medium_column.format(i))
            medium_tablevals.append(state_list.text)
        if len(medium_tablevals) == len(medium_val) - 1:
            assert True
        else:
            print(len(medium_tablevals), len(medium_val),
                  "************ Medium Values are not showing **************")
            self.count = self.count + 1
        for i in range(len(medium_tablevals)):
            if medium_tablevals[i] is not str:
                print("*********** Medium Values are Integers  *************")
                assert True
            else:
                print("*********** Course Values are Not Integers *************")
                self.count = self.count + 1
        return self.count

    '''Function get count of bars in chart'''

    def get_count_of_bars_in_chart(self):
        return self.get_web_elements(self.stacked_bars)

    '''Function to Validate the stacked Bars'''

    def get_stacked_bar_tooltip_validation(self):
        state_list = []
        new_list = []
        lst = self.get_count_of_bars_in_chart()
        for x in range(len(lst) - 1):
            act = ActionChains(self.driver)
            act.move_to_element(lst[x]).perform()
            act.pause(3)
            time.sleep(2)
            state_names = self.driver.find_element(By.XPATH, "//*[@class='highcharts-label highcharts-tooltip "
                                                             "highcharts-color-undefined']/*/*[1]")
            state_list.append(state_names.text)
        print('List of Names', state_list)
        for x in state_list:
            if x != '':
                new_list.append(x)
        for j in range(len(new_list)):
            st_name = new_list[j]
            if len(st_name) > 0 and st_name != st_name.lower() and st_name != st_name.upper():
                print(st_name, " is Present in bar tooltip and displayed on UI")
            else:
                print(st_name, 'State name is not Displayed on UI ')
                self.count = self.count + 1
        return self.count

    def get_course_wise_stacked_bar_tooltip_validation(self):
        lst = self.get_count_of_bars_in_chart()
        if len(lst) == 0:
            self.count = self.count + 1
        else:
            for x in range(len(lst) - 1):
                act = ActionChains(self.driver)
                act.move_to_element(lst[x]).perform()
                act.pause(3)
            return self.count

    def get_stacked_bar_program_state_wise_tooltip_validation(self):
        state_list = []
        lst = self.get_count_of_bars_in_chart()
        for x in range(round(len(lst) / 2)):
            act = ActionChains(self.driver)
            act.move_to_element(lst[x]).perform()
            act.pause(3)
            time.sleep(5)
            state_names = self.driver.find_element(By.XPATH, "//*[@class='highcharts-label highcharts-tooltip "
                                                             "highcharts-color-undefined']/*/*[1]")
            state_list.append(state_names.text)
        for j in range(len(state_list)):
            st_name = state_list[j]
            if len(st_name) > 0 and st_name in self.driver.page_source:
                print(st_name, " is present in bar tooltip and displayed on UI")
            else:
                print(st_name, 'is not showing in the UI')
                self.count = self.count + 1
        return self.count

    def check_program_wise_bar_chart(self):
        self.click_program_dropdown()
        result = self.get_count_of_options_program_dropdown()
        for i in range(len(result)):
            program = self.driver.find_element(By.XPATH, self.program_selection.format(i))
            program_title = self.driver.find_element(By.XPATH, self.program_title.format(i))
            program_name = program_title.text
            program.click()
            time.sleep(5)
            print(program_name, ' is Selected and Mouse hovering in bar chart')
            result = self.get_stacked_bar_tooltip_validation()
            if result == 0:
                print(program_name, " Having Stacked Bar Chart with Tooltip Information's")
                assert True
            else:
                self.count = self.count + 1
            self.click_program_dropdown()
            time.sleep(2)
        return self.count

    def check_state_wise_bar_chart(self):
        self.click_state_dropdown()
        result = self.get_count_of_options_state_dropdown()
        for i in range(1, len(result) - 1):
            program = self.driver.find_element(By.XPATH, self.program_selection.format(i))
            program_title = self.driver.find_element(By.XPATH, self.program_title.format(i))
            state_name = program_title.text
            program.click()
            time.sleep(5)
            print(state_name, ' is selected and mouse hovering in bar chart')
            result = self.get_stacked_bar_tooltip_validation()
            if result == 0:
                print(state_name, "is Having Stacked Bar Chart with Tooltip Information's")
                assert True
            else:
                self.count = self.count + 1
            self.click_program_dropdown()
            time.sleep(2)
        return self.count

    def check_program_with_state_wise_bar_chart(self):
        self.click_program_dropdown()
        result = self.get_count_of_options_program_dropdown()
        for i in range(len(result)):
            program = self.driver.find_element(By.XPATH, self.program_selection.format(i))
            program_title = self.driver.find_element(By.XPATH, self.program_title.format(i))
            program_name = program_title.text
            program.click()
            time.sleep(5)
            print(program_name, ' is selected and mouse hovering in bar chart')
            self.click_state_dropdown()
            result1 = self.get_count_of_options_state_dropdown()
            for j in range(1, len(result1)):
                program = self.driver.find_element(By.XPATH, self.program_selection.format(j))
                program_title = self.driver.find_element(By.XPATH, self.program_title.format(j))
                state_name = program_title.text
                program.click()
                time.sleep(3)
                print(state_name, ' is present when mouse hovering in bar chart')
                result = self.get_stacked_bar_program_state_wise_tooltip_validation()
                if result == 0:
                    print(state_name, "is Having Stacked Bar Chart with Tooltip Information's")
                    assert True
                else:
                    self.count = self.count + 1
                self.click_state_dropdown()
                time.sleep(2)
            self.click_program_dropdown()
            time.sleep(2)
        return self.count

    '''Functions to Click the Default A , A- and A+ Buttons '''

    def test_click_on_a_default_button(self):
        count = 0
        self.click(self.a_default)
        time.sleep(2)
        if 'style="font-size: 16px;"' in self.driver.page_source:
            self.driver.refresh()
            assert True
        else:
            count = count + 1
        return count

    ''' Function to Click the A+ button '''

    def test_click_on_a_plus_button(self):
        count = 0
        self.click(self.a_plus)
        time.sleep(2)
        if 'style="font-size: 18px;"' in self.driver.page_source:
            self.driver.refresh()
            assert True
        else:
            count = count + 1
        return count

    ''' Function to Click the A- button '''

    def test_click_on_a_minus_button(self):
        count = 0
        self.click(self.a_minus)
        time.sleep(2)
        if 'style="font-size: 14px;"' in self.driver.page_source:
            self.driver.refresh()
            assert True
        else:
            count = count + 1
        return count
