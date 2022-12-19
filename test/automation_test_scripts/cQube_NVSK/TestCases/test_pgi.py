import logging
import time
from PageObjects.CqubeUI.pgi import Pgi
from TestCases.conftest import ConfTest
from Utilities import CustomLogger
from Utilities.ReadProperties import ReadConfig


class TestPgi:
    pgi = None
    driver = None

    @classmethod
    def setup(cls):
        cls.driver = ConfTest.get_driver()
        cls.driver.implicitly_wait(30)
        cls.pgi = Pgi(cls.driver)
        cls.pgi.open_cqube_application()
        cls.pgi.click_pgi_dashboard()
        cls.logger = CustomLogger.setup_logger('PGI_Dashboard', ReadConfig.get_logs_directory() + "/Program.log",
                                               level=logging.DEBUG)

    '''This Test method checking the Navigation to PGI Dashboard '''

    def test_click_on_the_pgi_button_from_menu(self):
        self.logger.info("*************** Tc_cQube_PGI_001 Testing started *****************")
        self.pgi.click_dashboard()
        if 'dashboard' in self.driver.current_url:
            self.logger.info("************* Dashboard Screen is Displayed ************ ")
            assert True
        else:
            self.logger.error("************* Dashboard button is not working ****************")
        self.pgi.click_pgi_dashboard()
        time.sleep(1)
        if 'pgi' in self.driver.current_url:
            self.logger.info("**************** PGI Dashboard Is Displayed ****************")
            assert True
        else:
            self.logger.error("****************** PGI Dashboard button is Not working ***************")
            assert False
        self.logger.info("*************** Tc_cQube_PGI_001 Testing ending *****************")

    '''This Test method checking the Learning Outcome Card Metrics'''

    def test_check_learning_outcome_card_details(self):
        self.logger.info("*************** Tc_cQube_PGI_002 Testing Started *****************")
        info_text = self.pgi.get_learning_card_info()
        learning_value = self.pgi.get_learning_card_value()
        value = self.pgi.get_integer_value(learning_value)
        learning_text = self.pgi.get_learning_card_title()
        if info_text is not None and info_text != info_text.upper() and info_text != info_text.lower():
            self.logger.info("******************* Learning Outcome Card showing INFO ********************")
            assert True
        else:
            self.logger.error("*************** Learning outcome card is not showing Info **********************")
            assert False
        if value is not None and int(value) > 0:
            self.logger.info("************* Learning Outcome Value is showing in Card *************")
            assert True
        else:
            self.logger.error("***************** Learning outcome Value is not showing in Card **********")
            assert False
        if learning_text is not None and learning_text != learning_text.upper() and learning_text != \
                learning_text.lower():
            self.logger.info("******************* Learning Outcome Card showing Learning Text ********************")
            assert True
        else:
            self.logger.error("*************** Learning outcome card is not showing Description *****************")
            assert False
        self.logger.info("*************** Tc_cQube_PGI_002 Testing ending *****************")

    '''This Test method checking the Access Card Metrics '''

    def test_check_access_card_details(self):
        self.logger.info("*************** Tc_cQube_PGI_003 Testing Started *****************")
        info_text = self.pgi.get_access_card_info()
        access_value = self.pgi.get_access_card_value()
        value = self.pgi.get_integer_value(access_value)
        access_text = self.pgi.get_access_card_title()
        if info_text is not None and info_text != info_text.upper() and info_text != info_text.lower():
            self.logger.info("******************* Access Card showing INFO ********************")
            assert True
        else:
            self.logger.error("*************** Access card is not showing Info ******************")
            assert False
        if value is not None and int(value) > 0:
            self.logger.info("************* Access Value is showing in Card *************")
            assert True
        else:
            self.logger.error("***************** Access Value is not showing in Card **********")
            assert False
        if access_text is not None and access_text != access_text.upper() and access_text != access_text.lower():
            self.logger.info("******************* Access Card showing Access Description ********************")
            assert True
        else:
            print(access_text)
            self.logger.error("*************** Access card is not showing Description *****************")
            assert False
        self.logger.info("*************** Tc_cQube_PGI_003 Testing ending *****************")

    '''This Test method checking the Infrastructure Card Metrics '''

    def test_check_infrastructure_card_details(self):
        self.logger.info("*************** Tc_cQube_PGI_004 Testing Started *****************")
        info_text = self.pgi.get_infrastructure_card_info()
        access_value = self.pgi.get_infrastructure_card_value()
        value = self.pgi.get_integer_value(access_value)
        access_text = self.pgi.get_infrastructure_card_title()
        if info_text is not None and info_text != info_text.upper() and info_text != info_text.lower():
            self.logger.info("******************* Infrastructure Card showing INFO ********************")
            assert True
        else:
            self.logger.error("*************** Infrastructure card is not showing Info ***************")
            assert False
        if value is not None and int(value) > 0:
            self.logger.info("************* Infrastructure Value is showing in Card *************")
            assert True
        else:
            self.logger.error("***************** Infrastructure Value is not showing in Card **********")
            assert False
        if access_text is not None and access_text != access_text.upper() and access_text != access_text.lower():
            self.logger.info("******************* Infrastructure Card showing Access Description ********************")
            assert True
        else:
            self.logger.error("*************** Infrastructure card is not showing Description ****************")
            assert False
        self.logger.info("*************** Tc_cQube_PGI_004 Testing Ended *****************")

    '''This Test method checking the Equity Card Metrics '''

    def test_check_equity_card_details(self):
        self.logger.info("*************** Tc_cQube_PGI_005 Testing Started *****************")
        info_text = self.pgi.get_equity_card_info()
        access_value = self.pgi.get_equity_card_value()
        value = self.pgi.get_integer_value(access_value)
        access_text = self.pgi.get_equity_card_title()
        if info_text is not None and info_text != info_text.upper() and info_text != info_text.lower():
            self.logger.info("******************* Equity Card showing INFO ********************")
            assert True
        else:
            self.logger.error("*************** Equity card is not showing Info **************")
            assert False
        if value is not None and int(value) > 0:
            self.logger.info("************* Equity Value is showing in Card *************")
            assert True
        else:
            self.logger.error("***************** Equity Value is not showing in Card **********")
            assert False
        if access_text is not None and access_text != access_text.upper() and access_text != access_text.lower():
            self.logger.info("******************* Equity Card showing Access Description ********************")
            assert True
        else:
            self.logger.error("*************** Equity card is not showing Description **************")
            assert False
        self.logger.info("*************** Tc_cQube_PGI_005 Testing Ended *****************")

    '''This Test method checks the Governance Card Metrics'''

    def test_check_governance_card_details(self):
        self.logger.info("*************** Tc_cQube_PGI_006 Testing Started *****************")
        info_text = self.pgi.get_governance_card_info()
        access_value = self.pgi.get_governance_card_value()
        value = self.pgi.get_integer_value(access_value)
        access_text = self.pgi.get_governance_card_title()
        if info_text is not None and info_text != info_text.upper() and info_text != info_text.lower():
            self.logger.info("******************* Governance Card showing INFO ********************")
            assert True
        else:
            self.logger.error("*************** Governance card is not showing Info **************")
            assert False
        if value is not None and int(value) > 0:
            self.logger.info("************* Governance Value is showing in Card *************")
            assert True
        else:
            self.logger.error("***************** Governance Value is not showing in Card **********")
            assert False
        if access_text is not None and access_text != access_text.upper() and access_text != access_text.lower():
            self.logger.info("******************* Governance Card showing Access Description ********************")
            assert True
        else:
            self.logger.error("*************** Governance card is not showing Description **************")
            assert False
        self.logger.info("*************** Tc_cQube_PGI_006 Testing Ended *****************")

    '''This Test Method validation of Implementation Tab Click Functionality'''

    def test_click_on_the_implementation_status_tab(self):
        self.logger.info("*************** Tc_cQube_PGI_007 Testing Started *****************")
        result = self.pgi.get_implementation_tab_status()
        print("Result is", result)
        if result == "true":
            self.logger.info("**************** Implementation Tab is Clicked ************")
            assert True
        else:
            self.logger.error("*************** Implementation Tab is not Clicked ***********")
            assert False
        self.logger.info("*************** Tc_cQube_PGI_007 Testing Ended *****************")

    '''This Test Method validation of State Performance Tab Click Functionality'''

    def test_click_on_the_state_wise_status_tab(self):
        self.logger.info("*************** Tc_cQube_PGI_008 Testing Started *****************")
        result = self.pgi.get_state_wise_tab_status()
        if result == "true":
            self.logger.info("**************** State Wise Performance Tab is Clicked ************")
            assert True
        else:
            self.logger.error("*************** State Wise Performance Tab is not Clicked ***********")
            assert False
        self.logger.info("*************** Tc_cQube_PGI_008 Testing Ended *****************")

    '''This Test Method validation of District Performance Tab Click Functionality'''

    def test_click_on_the_district_wise_status_tab(self):
        self.logger.info("*************** Tc_cQube_PGI_009 Testing Started *****************")
        result = self.pgi.get_district_wise_tab_status()
        if result == "true":
            self.logger.info("**************** District Wise Performance Tab is Clicked ************")
            assert True
        else:
            self.logger.error("*************** District Wise Performance Tab is not Clicked ***********")
            assert False
        self.logger.info("*************** Tc_cQube_PGI_009 Testing Ended *****************")

    '''This Test method for Implementation Tab - Validation of Map Report '''

    def test_check_map_is_displaying_or_not(self):
        self.logger.info("*************** Tc_cQube_PGI_010 Testing Started *****************")
        self.pgi.click_implementation_state_tab()
        result = self.pgi.get_count_of_map_tooltips()
        if len(result) != 0:
            self.logger.info("**************** PGI Implementation Status showing Map Report ****************")
            assert True
        else:
            self.logger.error("********** PGI Implementation status Map is not showing **************")
            assert False
        self.logger.info("*************** Tc_cQube_PGI_010 Testing Ended *****************")

    '''This Test method for Implementation Tab - Validation of Map Tooltip '''

    def test_check_pgi_map_tooltip_validations(self):
        self.logger.info("*************** Tc_cQube_PGI_011 Testing Started *****************")
        self.pgi.click_implementation_state_tab()
        result = self.pgi.get_map_tooltip_info_validation()
        if 'Implemented PGI:' in result[0]:
            self.logger.info("*************** Implementation status map report having tooltip information "
                             "********************")
            assert True
        else:
            self.logger.error("*********** MAP Report Not having tooltip **************")
            assert False
        self.logger.info("*************** Tc_cQube_PGI_011 Testing Ended *****************")

    ''' State Wise Performance - This test Method Checking the Options in the Metrics Dropdown '''

    def test_check_whether_metrics_dropdown_options(self):
        self.logger.info("*************** Tc_cQube_PGI_012 Testing Started *****************")
        self.pgi.click_state_performance_tab()
        options = self.pgi.get_count_metric_dropdown_options()
        if len(options) != 0:
            self.logger.info("*************** Metrics dropdown having options **************")
            assert True
        else:
            self.logger.error("*************** Choose Metrics dropdown not having Options *************")
            assert False
        self.logger.info("*************** Tc_cQube_PGI_012 Testing Ended *****************")

    ''' State Wise Performance - This test Method Checking the Selection of Metric Options '''

    def test_selection_of_each_metric_options(self):
        self.logger.info("*************** Tc_cQube_PGI_013 Testing Started *****************")
        self.pgi.click_state_performance_tab()
        result = self.pgi.get_selection_of_each_metric_options()
        if result == 0:
            self.logger.info("*********** Metrics Dropdowns are Selectable **************")
            assert True
        else:
            self.logger.error("************ Metrics Dropdown options are not Selected ***********")
            assert False
        self.logger.info("*************** Tc_cQube_PGI_012 Testing Ended *****************")

    ''' District wise Performance Tab - Checking Map Report and Tooltip Count '''

    def test_check_district_wise_performance_map(self):
        self.logger.info("*************** Tc_cQube_PGI_013 Testing Started *****************")
        self.pgi.click_district_performance_tab()
        result = self.pgi.get_count_of_map_tooltips()
        if len(result) != 0:
            self.logger.info("**************** PGI District Wise Performance showing Map Report ****************")
            assert True
        else:
            self.logger.error("********** PGI District Wise Performance Map is not showing **************")
            assert False
        self.logger.info("*************** Tc_cQube_PGI_013 Testing Ended *****************")

    ''' District wise Performance Tab - Checking Metric Dropdowns '''

    def test_check_whether_district_wise_metrics_dropdown_options(self):
        self.logger.info("*************** Tc_cQube_PGI_014 Testing started *****************")
        self.pgi.click_district_performance_tab()
        time.sleep(2)
        options = self.pgi.get_count_metric_dropdown_options()
        if len(options) != 0:
            self.logger.info("*************** Metrics dropdown having options **************")
            assert True
        else:
            self.logger.error("*************** Choose Metrics dropdown not having Options *************")
            assert False
        self.logger.info("*************** Tc_cQube_PGI_014 Testing Ended *****************")

    ''' District wise Performance - checking the State Dropdown options '''

    def test_check_state_ut_dropdown_options(self):
        self.logger.info("*************** Tc_cQube_PGI_015 Testing Started *****************")
        self.pgi.click_district_performance_tab()
        time.sleep(2)
        options = self.pgi.get_count_state_dropdown_options()
        if len(options) != 0:
            self.logger.info("*************** State/UT dropdown having options **************")
            assert True
        else:
            self.logger.error("*************** State/UT dropdown not having Options *************")
            assert False
        self.logger.info("*************** Tc_cQube_PGI_015 Testing Ended *****************")

    ''' District wise Performance - checking the State Dropdown Selection '''

    def test_select_each_metrics_options_in_district_wise_performance(self):
        self.logger.info("*************** Tc_cQube_PGI_016 Testing Started *****************")
        self.pgi.click_district_performance_tab()
        result = self.pgi.check_select_metrics_option_from_district_tab()
        if result == 0:
            self.logger.info("************ District wise Metric Options are Selected ******")
            assert True
        else:
            self.logger.error("*************** District wise Metric dropdown are not working *********")
        self.logger.info("*************** Tc_cQube_PGI_016 Testing Ended *****************")

    ''' District wise Performance - Selecting Each State Options  '''

    def test_select_each_state_options_in_district_wise_performance(self):
        self.logger.info("*************** Tc_cQube_PGI_017 Testing Started *****************")
        self.pgi.click_district_performance_tab()
        result = self.pgi.check_each_state_dropdown_options_from_district_tab()
        if result == 0:
            self.logger.info("******** State Dropdown Options are Selectable *************")
            assert True
        else:
            self.logger.error("*********************** Some state does not have markers in Map ***********")
            assert False
        self.logger.info("*************** Tc_cQube_PGI_017 Testing Ended *****************")

    ''' District wise Performance - Selecting Each Metric Options with State Options  '''

    def test_select_each_metrics_and_state_map_validation(self):
        self.logger.info("*************** Tc_cQube_PGI_018 Testing Started *****************")
        self.pgi.click_district_performance_tab()
        res = self.pgi.check_selection_of_metrics_state_dropdown_options()
        if res == 0:
            self.logger.info("********** Metric and State Option Selection and map validation is done ********")
        else:
            self.logger.error("************************ Drop Down options are not selected **********************")
            assert False
        self.logger.info("*************** Tc_cQube_PGI_018 Testing Ended *****************")

    '''This Test script checking the A Minus Button '''

    def test_click_the_a_minus_button(self):
        self.logger.info("*************** Tc_cQube_PGI_019 Testing started *****************")
        res = self.pgi.test_click_on_a_minus_button()
        if res == 0:
            self.logger.info("*********** A- button is Clicked ****************")
            assert True
        else:
            self.logger.error("*********** A- button is not Clicked *********")
            assert False
        self.logger.info("*************** Tc_cQube_PGI_019 Testing ended *****************")

    '''This Test script checking the A Plus Button '''

    def test_click_the_a_plus_button(self):
        self.logger.info("*************** Tc_cQube_PGI_020 Testing started *****************")
        res = self.pgi.test_click_on_a_plus_button()
        if res == 0:
            self.logger.info("*********** A+ button is Clicked ****************")
            assert True
        else:
            self.logger.error("*********** A+ button is not Clicked *********")
            assert False
        self.logger.info("*************** Tc_cQube_PGI_020 Testing ended *****************")

    '''This Test script checking Default A  '''

    def test_click_the_default_a_button(self):
        self.logger.info("*************** Tc_cQube_PGI_021 Testing started *****************")
        res = self.pgi.test_click_on_a_plus_button()
        if res == 0:
            self.logger.info("*********** A button is Clicked ****************")
            assert True
        else:
            self.logger.error("*********** A button is not Clicked *********")
            assert False
        self.logger.info("*************** Tc_cQube_PGI_021 Testing ended *****************")

    @classmethod
    def teardown(cls):
        cls.driver.close()
