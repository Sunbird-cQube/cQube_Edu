import logging
import time
from PageObjects.CqubeUI.nistha import Nishtha
from TestCases.conftest import ConfTest
from Utilities import CustomLogger
from Utilities.ReadProperties import ReadConfig


class TestNishtha:
    nishtha = None
    driver = None

    @classmethod
    def setup(cls):
        cls.driver = ConfTest.get_driver()
        cls.nishtha = Nishtha(cls.driver)
        cls.driver.implicitly_wait(30)
        cls.nishtha.open_cqube_application()
        cls.nishtha.click_nishtha_dashboard()
        cls.logger = CustomLogger.setup_logger('Nishtha', ReadConfig.get_logs_directory() + "/Program.log",
                                               level=logging.DEBUG)

    '''Test Script to navigation to the Nishtha Dashboard'''

    def test_navigate_to_nishtha_dashboard(self):
        self.logger.info("**************** Tc_cQube_Nishtha_001 is Started ... *************** ")
        self.nishtha.click_dashboard_button()
        time.sleep(2)
        if 'dashboard' in self.driver.current_url:
            self.logger.info("********** Dashboard button is working ***********")
            assert True
        else:
            self.logger.error("*********** Dashboard button is not clicked ***********")
            assert False
        self.nishtha.click_nishtha_dashboard()
        time.sleep(2)
        if 'nishtha' in self.driver.current_url:
            self.logger.info("************** Nishtha screen is displaying ***************")
        else:
            self.logger.error("*********** Nishtha page is not showing ************** ")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_001 is Ended ... *************** ")

    '''Test Script to Validate the Nishtha - State Metric Card'''

    def test_validate_the_state_metric_card_details(self):
        self.logger.info("**************** Tc_cQube_Nishtha_002 is Started ... *************** ")
        state_info = self.nishtha.get_state_i_tag_info()
        state_value = self.nishtha.get_total_states_value()
        total_state = self.nishtha.get_integer_value(state_value)
        state_title = self.nishtha.get_state_title()
        if state_info is not None and state_info != state_info.upper() and state_info != state_info.lower():
            self.logger.info("******************* Nishtha - State Card showing INFO ********************")
            assert True
        else:
            self.logger.error("*************** Nishtha - State Card is not showing Info ***************")
            assert False
        if total_state is not None and int(total_state) > 0:
            self.logger.info("************* Nishtha - State Card is Value showing in Card *************")
            assert True
        else:
            self.logger.error("***************** Nishtha - State Card Value is not showing in Card **********")
            assert False
        if state_title is not None and state_title != state_title.upper() and state_title != state_title.lower():
            self.logger.info("******************* Nishtha - State Card showing Access Description ********************")
            assert True
        else:
            self.logger.error("*************** Nishtha - State Card is not showing Description ****************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_002 is Ended ... *************** ")

    '''Test Script to Validate the Nishtha - Enrolment Metric Card'''

    def test_validate_the_enrolment_metric_card_details(self):
        self.logger.info("**************** Tc_cQube_Nishtha_003 is Started ... *************** ")
        state_info = self.nishtha.get_enrolment_i_tag_info()
        state_value = self.nishtha.get_total_enrolment_value()
        total_state = self.nishtha.get_integer_value(state_value)
        state_title = self.nishtha.get_enrolment_title()
        if state_info is not None and state_info != state_info.upper() and state_info != state_info.lower():
            self.logger.info("******************* Nishtha - Enrolment Card showing INFO ********************")
            assert True
        else:
            self.logger.error("*************** Nishtha - Enrolment Card is not showing Info ***************")
            assert False
        if total_state is not None and int(total_state) > 0:
            self.logger.info("************* Nishtha - Enrolment Card is Value showing in Card *************")
            assert True
        else:
            self.logger.error("***************** Nishtha - Enrolment Card Value is not showing in Card **********")
            assert False
        if state_title is not None and state_title != state_title.upper() and state_title != state_title.lower():
            self.logger.info("******************* Nishtha - State Card showing Access Description ********************")
            assert True
        else:
            self.logger.error("*************** Nishtha - Enrolment Card is not showing Description ****************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_003 is Ended ... *************** ")

    '''Test Script to Validate the Nishtha - Completion Metric Card'''

    def test_validate_the_completion_metric_card_details(self):
        self.logger.info("**************** Tc_cQube_Nishtha_004 is Started ... *************** ")
        state_info = self.nishtha.get_completion_i_tag_info()
        state_value = self.nishtha.get_total_completion_value()
        total_state = self.nishtha.get_integer_value(state_value)
        state_title = self.nishtha.get_completion_title()
        if state_info is not None and state_info != state_info.upper() and state_info != state_info.lower():
            self.logger.info("******************* Nishtha - Completion Card showing INFO ********************")
            assert True
        else:
            self.logger.error("*************** Nishtha - Completion Card is not showing Info ***************")
            assert False
        if total_state is not None and int(total_state) > 0:
            self.logger.info("************* Nishtha - Completion Card is Value showing in Card *************")
            assert True
        else:
            self.logger.error("***************** Nishtha - Completion Card Value is not showing in Card **********")
            assert False
        if state_title is not None and state_title != state_title.upper() and state_title != state_title.lower():
            self.logger.info("******************* Nishtha - Completion Card showing Access Description "
                             "*****************")
            assert True
        else:
            self.logger.error("*************** Nishtha - Completion Card is not showing Description ****************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_004 is Ended ... *************** ")

    '''Test Script to Validate the Nishtha - Certification Metric Card'''

    def test_validate_the_certification_metric_card_details(self):
        self.logger.info("**************** Tc_cQube_Nishtha_005 is Started ... *************** ")
        state_info = self.nishtha.get_certification_i_tag_info()
        state_value = self.nishtha.get_total_certification_value()
        total_state = self.nishtha.get_integer_value(state_value)
        state_title = self.nishtha.get_certification_title()
        if state_info is not None and state_info != state_info.upper() and state_info != state_info.lower():
            self.logger.info("******************* Nishtha - Completion Card showing INFO ********************")
            assert True
        else:
            self.logger.error("*************** Nishtha - Completion Card is not showing Info ***************")
            assert False
        if total_state is not None and int(total_state) > 0:
            self.logger.info("************* Nishtha - Completion Card is Value showing in Card *************")
            assert True
        else:
            self.logger.error("***************** Nishtha - Completion Card Value is not showing in Card **********")
            assert False
        if state_title is not None and state_title != state_title.upper() and state_title != state_title.lower():
            self.logger.info("******************* Nishtha - Completion Card showing Access Description "
                             "*****************")
            assert True
        else:
            self.logger.error("*************** Nishtha - Completion Card is not showing Description ****************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_005 is Ended ... *************** ")

    '''Test Script to Validate the Nishtha - Medium Metric Card'''

    def test_validate_the_medium_metric_card_details(self):
        self.logger.info("**************** Tc_cQube_Nishtha_006 is Started ... *************** ")
        state_info = self.nishtha.get_mediums_i_tag_info()
        state_value = self.nishtha.get_total_mediums_value()
        total_state = self.nishtha.get_integer_value(state_value)
        state_title = self.nishtha.get_mediums_title()
        if state_info is not None and state_info != state_info.upper() and state_info != state_info.lower():
            self.logger.info("******************* Nishtha - Medium Card showing INFO ********************")
            assert True
        else:
            self.logger.error("*************** Nishtha - Medium Card is not showing Info ***************")
            assert False
        if total_state is not None and int(total_state) > 0:
            self.logger.info("************* Nishtha - Medium Card is Value showing in Card *************")
            assert True
        else:
            self.logger.error("***************** Nishtha - Medium Card Value is not showing in Card **********")
            assert False
        if state_title is not None and state_title != state_title.upper() and state_title != state_title.lower():
            self.logger.info("******************* Nishtha - Medium Card showing Access Description "
                             "*****************")
            assert True
        else:
            self.logger.error("*************** Nishtha - Medium Card is not showing Description ****************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_006 is Ended ... *************** ")

    '''Test Scripts to Click on the Implementation Tab '''

    def test_click_on_the_implementation_tab_button(self):
        self.logger.info("**************** Tc_cQube_Nishtha_006 is Started ... *************** ")
        result = self.nishtha.get_implementation_tab_click_status()
        if "true" == result:
            self.logger.info("************* Implementation Status Tab is Clicked *************")
            assert True
        else:
            self.logger.error("**************** Implementation Status Tab is not clicked *********************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_007 is Ended ... *************** ")

    '''Test Scripts to Click on the Course and Medium Tab '''

    def test_click_on_the_course_medium_tab_button(self):
        self.logger.info("**************** Tc_cQube_Nishtha_008 is Started ... *************** ")
        result = self.nishtha.get_course_medium_tab_click_status()
        if "true" == result:
            self.logger.info("************* Course and Medium Status Tab is Clicked *************")
            assert True
        else:
            self.logger.error("**************** Course and Medium Status Tab is not clicked *********************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_008 is Ended ... *************** ")

    '''Test Scripts to Click on the Potential Tab '''

    def test_click_on_the_potential_tab_button(self):
        self.logger.info("**************** Tc_cQube_Nishtha_009 is Started ... *************** ")
        result = self.nishtha.get_potential_tab_click_status()
        if "true" == result:
            self.logger.info("************* Potential Status Tab is Clicked *************")
            assert True
        else:
            self.logger.error("**************** Potential Status Tab is not clicked *********************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_009 is Ended ... *************** ")

    '''Test Scripts to Click on the District Wise Tab '''

    def test_click_on_the_district_tab_button(self):
        self.logger.info("**************** Tc_cQube_Nishtha_010 is Started ... *************** ")
        result = self.nishtha.get_district_tab_click_status()
        if "true" == result:
            self.logger.info("************* District Wise Status Tab is Clicked *************")
            assert True
        else:
            self.logger.error("**************** District Wise Status Tab is not clicked *********************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_010 is Ended ... *************** ")

    '''Test Scripts to Click on the Course Wise Tab '''

    def test_click_on_the_course_tab_button(self):
        self.logger.info("**************** Tc_cQube_Nishtha_011 is Started ... *************** ")
        result = self.nishtha.get_course_tab_click_status()
        print(result)
        if "true" == result:
            self.logger.info("************* Course Wise Status Tab is Clicked *************")
            assert True
        else:
            self.logger.error("**************** Course Wise Status Tab is not clicked *********************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_011 is Ended ... *************** ")

    '''Test Scripts to check Program Dropdown Options present or not '''

    def test_program_dropdown_options(self):
        self.logger.info("**************** Tc_cQube_Nishtha_012 is Started ... *************** ")
        self.nishtha.click_on_implementation_tab()
        result = self.nishtha.get_count_of_options_program_dropdown()
        if len(result) != 0:
            self.logger.error("*********** Implementation Program Dropdown not having Options **********")
        else:
            self.logger.error("*********** Implementation Program Dropdown not having Options **********")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_012 is Ended... *************** ")

    '''Function to check each options in dropdown are selectable or not'''

    def test_selection_each_options_from_program_dropdown(self):
        self.logger.info("**************** Tc_cQube_Nishtha_013 is Started ... *************** ")
        self.nishtha.click_on_implementation_tab()
        result = self.nishtha.check_selection_of_dropdown_options()
        if result == 0:
            self.logger.info("**********  Implementation Program Options are Selectable ******************")
            assert True
        else:
            print(result)
            self.logger.error("***************** Implementation Program Options are not Selected ...**************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_013 is Ended ... *************** ")

    '''Test Script to Validation of Map tooltip information and color code '''

    def test_validation_of_implementation_map_with_programs(self):
        self.logger.info("**************** Tc_cQube_Nishtha_014 is Started ... *************** ")
        self.nishtha.click_on_implementation_tab()
        result = self.nishtha.get_map_tooltip_info_validation()
        print(result)
        if result == 0:
            self.logger.info("********** Map Tooltip is Displayed across Program Levels ******************")
            assert True
        else:
            print(result)
            self.logger.error("***************** Map Tooltip is not Displayed ...**************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_014 is Ended ... *************** ")

    '''Courses and Mediums Status - check whether Dropdown Options present or not  '''

    def test_course_medium_program_dropdown(self):
        self.logger.info("**************** Tc_cQube_Nishtha_015 is Started ... *************** ")
        self.nishtha.click_on_course_and_medium_tab()
        result = self.nishtha.get_count_of_options_program_dropdown()
        if len(result) != 0:
            self.logger.error("*********** Program Dropdown not having Options **********")
        else:
            self.logger.error("*********** Program Dropdown not having Options **********")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_015 is Ended... *************** ")

    '''Test Scripts to check selection of each program options'''

    def test_course_medium_selection_each_options_from_program_dropdown(self):
        self.logger.info("**************** Tc_cQube_Nishtha_016 is Started ... *************** ")
        self.nishtha.click_on_course_and_medium_tab()
        result = self.nishtha.check_course_selection_of_dropdown_options()
        if result == 0:
            self.logger.info("********** Program Options are Selectable ******************")
            assert True
        else:
            self.logger.error("***************** Program Options are not Selected ...**************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_016 is Ended ... *************** ")

    '''Test Scripts to check_table_values_across_program_level '''

    def test_check_table_values_across_program_level(self):
        self.logger.info("**************** Tc_cQube_Nishtha_017 is Started ... *************** ")
        self.nishtha.click_on_course_and_medium_tab()
        result = self.nishtha.check_course_selection_of_options_with_table_validation()
        if result == 0:
            self.logger.info("********** Program Options are Selectable ******************")
            assert True
        else:
            self.logger.error("***************** Program Options are not Selected ...**************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_017 is Ended ... *************** ")

    '''Test Scripts to Click on the State Header and validate sorting functionality'''

    def test_click_the_table_headers_validate_sorting(self):
        self.logger.info("**************** Tc_cQube_Nishtha_018 is Started ... *************** ")
        self.nishtha.click_on_course_and_medium_tab()
        result = self.nishtha.check_table_state_headers_clickable()
        if result == 0:
            self.logger.info("********** State Header sorting functionality is working ******************")
            assert True
        else:
            self.logger.error("***************** State Header sorting functionality is not working  ...**************")
            assert False
        result = self.nishtha.test_check_table_courses_headers_clickable()
        if result == 0:
            self.logger.info("********** Course Header sorting functionality is working ******************")
            assert True
        else:
            self.logger.error("***************** Course Header sorting functionality is not working  ...**************")
            assert False
        result = self.nishtha.test_check_table_mediums_headers_clickable()
        if result == 0:
            self.logger.info("********** Medium Header sorting functionality is working ******************")
            assert True
        else:
            self.logger.error("***************** Medium Header sorting functionality is not working  ...**************")
            assert False

        self.logger.info("**************** Tc_cQube_Nishtha_018 is Ended ... *************** ")

    '''Test Scripts to validate the table values is present or not '''

    def test_validate_the_values_in_the_table(self):
        self.logger.info("**************** Tc_cQube_Nishtha_019 is Started ... *************** ")
        self.nishtha.click_on_course_and_medium_tab()
        result = self.nishtha.test_check_state_table_values()
        if result == 0:
            self.logger.info("********** State Values Showing Correctly ******************")
            assert True
        else:
            self.logger.error("***************** State Values Showing wrong! **************")
            assert False
        result = self.nishtha.test_check_course_table_values()
        if result == 0:
            self.logger.info("********** Course Values Showing Correctly ******************")
            assert True
        else:
            self.logger.error("***************** Course Values Showing wrong! **************")
            assert False
        result = self.nishtha.test_check_medium_table_values()
        if result == 0:
            self.logger.info("********** Medium Values Showing Correctly ******************")
            assert True
        else:
            self.logger.error("***************** State Values Showing wrong! **************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_019 is Ended ... *************** ")

    '''District Wise Tab - check whether program metrics dropdown options '''

    def test_district_selection_each_options_from_program_dropdown(self):
        self.logger.info("**************** Tc_cQube_Nishtha_020 is Started ... *************** ")
        self.nishtha.click_on_district_status_tab()
        result = self.nishtha.get_count_of_options_program_dropdown()
        if len(result) != 0:
            self.logger.error("*********** District WIse Program Dropdown not having Options **********")
        else:
            self.logger.error("*********** District WIse Program Dropdown not having Options **********")
            assert False
        result = self.nishtha.check_selection_of_dropdown_options()
        if result == 0:
            self.logger.info("**********  District Wise Program Options are Selectable ******************")
            assert True
        else:
            print(result)
            self.logger.error("*****************  District Wise Program Options are not Selected ...**************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_020 is Ended ... *************** ")

    '''Test Script to validate the selection of state with chart'''

    def test_district_selection_each_options_from_state_dropdown(self):
        self.logger.info("**************** Tc_cQube_Nishtha_021 is Started ... *************** ")
        self.nishtha.click_on_district_status_tab()
        result = self.nishtha.get_count_of_options_state_dropdown()
        if len(result) != 0:
            self.logger.error("*********** District WIse State Dropdown not having Options **********")
        else:
            self.logger.error("*********** District WIse State Dropdown not having Options **********")
            assert False
        result = self.nishtha.check_selection_of_dropdown_state_options()
        if result == 0:
            self.logger.info("**********  District Wise State Options are Selectable ******************")
            assert True
        else:
            print(result)
            self.logger.error("*****************  District Wise State Options are not Selected ...**************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_021 is Ended ... ***************")

    '''Test script to validate the chart across program level'''

    def test_program_wise_stacked_bar_chart_validations(self):
        self.logger.info("**************** Tc_cQube_Nishtha_022 is Started ... *************** ")
        self.nishtha.click_on_district_status_tab()
        result = self.nishtha.check_program_wise_bar_chart()
        if result == 0:
            self.logger.info("********** Checked with Program wise Stacked Bar ******************")
            assert True
        else:
            self.logger.error("***************** Program Wise Stacked Bar is not showing in Report **************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_022 is Ended ... ***************")

    '''Test Script to validate chart across state level'''

    def test_state_wise_stacked_bar_chart_validations(self):
        self.logger.info("**************** Tc_cQube_Nishtha_023 is Started ... *************** ")
        self.nishtha.click_on_district_status_tab()
        result = self.nishtha.get_stacked_bar_tooltip_validation()
        if result == 0:
            self.logger.info("********** Checked with Program wise Stacked Bar ******************")
            assert True
        else:
            self.logger.error("***************** Program Wise Stacked Bar is not showing in Report **************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_023 is Ended ... ***************")

    '''Course Wise Tab  selection of program options '''

    def test_course_district_selection_each_options_from_program_dropdown(self):
        self.logger.info("**************** Tc_cQube_Nishtha_024 is Started ... *************** ")
        self.nishtha.click_on_course_status_tab()
        result = self.nishtha.get_count_of_options_program_dropdown()
        if len(result) != 0:
            self.logger.error("*********** Course WIse Program Dropdown not having Options **********")
        else:
            self.logger.error("*********** Course WIse Program Dropdown not having Options **********")
            assert False
        result = self.nishtha.check_selection_of_dropdown_options()
        if result == 0:
            self.logger.info("**********  Course Wise Program Options are Selectable ******************")
            assert True
        else:
            print(result)
            self.logger.error("*****************  Course Wise Program Options are not Selected ...**************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_024 is Ended ... *************** ")

    '''Test Script to validate the selection of state with chart'''

    def test_course_district_selection_each_options_from_state_dropdown(self):
        self.logger.info("**************** Tc_cQube_Nishtha_025 is Started ... *************** ")
        self.nishtha.click_on_course_status_tab()
        result = self.nishtha.get_count_of_options_state_dropdown()
        if len(result) != 0:
            self.logger.error("*********** Course Wise State Dropdown not having Options **********")
        else:
            self.logger.error("*********** Course Wise State Dropdown not having Options **********")
            assert False
        result = self.nishtha.check_selection_of_dropdown_state_options()
        if result == 0:
            self.logger.info("**********  Course Wise State Options are Selectable ******************")
            assert True
        else:
            print(result)
            self.logger.error("*****************  Course Wise State Options are not Selected ...**************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_025 is Ended ... ***************")

    '''Test script to validate the chart across program level'''

    def test_course_program_wise_stacked_bar_chart_validations(self):
        self.logger.info("**************** Tc_cQube_Nishtha_026 is Started ... *************** ")
        self.nishtha.click_on_course_status_tab()
        result = self.nishtha.get_course_wise_stacked_bar_tooltip_validation()
        print(result)
        if result == 0:
            self.logger.info("********** Checked Program wise Stacked Bar ******************")
            assert True
        else:
            self.logger.error("***************** Program Wise Stacked Bar is not showing chart **************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_026 is Ended ... ***************")

    '''Test Script to validate chart across state level'''

    def test_course_state_wise_stacked_bar_chart_validations(self):
        self.logger.info("**************** Tc_cQube_Nishtha_027 is Started ... *************** ")
        self.nishtha.click_on_course_status_tab()
        result = self.nishtha.get_course_wise_stacked_bar_tooltip_validation()
        if result == 0:
            self.logger.info("********** Checked Program wise Stacked Bar ******************")
            assert True
        else:
            self.logger.error("***************** Program Wise Stacked Bar is not showing chart **************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_027 is Ended ... ***************")

    def test_click_the_a_minus_button(self):
        self.logger.info("*************** Tc_cQube_Nishtha_028 Testing started *****************")
        res = self.nishtha.test_click_on_a_minus_button()
        if res == 0:
            self.logger.info("*********** A- button is Clicked ****************")
            assert True
        else:
            self.logger.error("*********** A- button is not Clicked *********")
            assert False
        self.logger.info("*************** Tc_cQube_Nishtha_028 Testing ended *****************")

    '''This Test script checking the A Plus Button '''

    def test_click_the_a_plus_button(self):
        self.logger.info("*************** Tc_cQube_Nishtha_029 Testing started *****************")
        res = self.nishtha.test_click_on_a_plus_button()
        if res == 0:
            self.logger.info("*********** A+ button is Clicked ****************")
            assert True
        else:
            self.logger.error("*********** A+ button is not Clicked *********")
            assert False
        self.logger.info("*************** Tc_cQube_Nishtha_029 Testing ended *****************")

    '''This Test script checking Default A  '''

    def test_click_the_default_a_button(self):
        self.logger.info("*************** Tc_cQube_Nishtha_030 Testing started *****************")
        res = self.nishtha.test_click_on_a_plus_button()
        if res == 0:
            self.logger.info("*********** A button is Clicked ****************")
            assert True
        else:
            self.logger.error("*********** A button is not Clicked *********")
            assert False
        self.logger.info("*************** Tc_cQube_Dashboard_030 Testing ended *****************")

    ''' % Against Potential Tab - Check whether Select Program Dropdown '''

    def test_check_whether_program_selection_from_dropdown(self):
        self.logger.info("**************** Tc_cQube_Nishtha_031 is Started ... *************** ")
        self.nishtha.click_on_potential_tab()
        time.sleep(3)
        result = self.nishtha.get_count_of_options_program_dropdown()
        if len(result) != 0:
            self.logger.info("*********** Potential Tab Program Dropdown having Options **********")
        else:
            self.logger.error("*********** Potential Tab Program Dropdown not having Options **********")
            assert False
        result = self.nishtha.check_selection_of_program_dropdown_options()
        if result == 0:
            self.logger.info("**********  Potential Tab Program Options are Selectable ******************")
            assert True
        else:
            self.logger.error("*****************  Potential Tab Program Options are not Selected ...**************")
            assert False
        self.logger.info("**************** Tc_cQube_Nishtha_031 is Ended ... *************** ")

    @classmethod
    def teardown(cls):
        cls.driver.close()
