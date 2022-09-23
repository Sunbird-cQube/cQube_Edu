import logging
import re
from PageObjects.CqubeUI.nipun_bharat import NipunBharat
from TestCases.conftest import ConfTest
from Utilities import CustomLogger
from Utilities.ReadProperties import ReadConfig


class TestNipunBharat:
    nipun = None
    driver = None

    @classmethod
    def setup(cls):
        cls.driver = ConfTest.get_driver()
        cls.nipun = NipunBharat(cls.driver)
        cls.nipun.open_cqube_application()
        cls.nipun.click_nipun_bharat()
        cls.logger = CustomLogger.setup_logger('Nipun_Bharat', ReadConfig.get_logs_directory() + "/Program.log",
                                               level=logging.DEBUG)

    '''This TestScripts to Navigation to Nipun Bharat Dashboard'''

    def test_navigation_to_nipun_bharat_dashboard(self):
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_001 Testing Started *****************")
        self.nipun.click_dashboard()
        if 'dashboard' in self.driver.current_url:
            self.logger.info("*************** Navigation to Dashboard Screen *****************")
            assert True
        else:
            self.logger.error("********************* Navigation to Dashboard failed from PM Poshan ***********")
            assert False
        self.nipun.click_nipun_bharat()
        if 'nipunbharath' in self.driver.current_url or self.driver.page_source:
            print(self.driver.title)
            self.logger.info("********* Nipun Bharat Dashboard is displayed in the UI ***************")
            assert True
        else:
            self.logger.error("******** Nipun Bharat Menu Button is not working  *************")
            assert False
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_001 Testing Ended *****************")

    '''Test Script to learning outcome metric card Validation'''

    def test_validate_nipun_los_card_metrics(self):
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_002 Testing Started *****************")
        state_info = self.nipun.get_learning_card_info()
        state_value = self.nipun.get_learning_card_value()
        pm_state_value = self.nipun.get_integer_value(state_value)
        status_title = self.nipun.get_learning_card_title()
        if state_info is not None and status_title is not None:
            self.logger.info("*********** Nipun Bharat LOS Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** Nipun LOS Bharat Card Values is Missing ************")
            assert False
        if int(pm_state_value) > 0 and pm_state_value is not None:
            self.logger.info("*********** Nipun Bharat LOS Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** Nipun Bharat LOS Card Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_002 Testing Ended *****************")

    '''TestScripts to Validate the Digital Book Metric Card '''

    def test_validate_nipun_digital_books_card_metrics(self):
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_003 Testing Started *****************")
        state_info = self.nipun.get_digital_books_card_info()
        state_value = self.nipun.get_digital_books_card_value()
        pm_state_value = self.nipun.get_integer_value(state_value)
        status_title = self.nipun.get_digital_books_card_title()
        if state_info is not None and status_title is not None:
            self.logger.info("*********** Nipun Bharat Digital Books Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** Nipun Bharat Digital Books Card Values is Missing ************")
            assert False
        if int(pm_state_value) > 0 and pm_state_value is not None:
            self.logger.info("*********** Nipun Bharat Digital Books Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** Nipun Bharat Digital Books Card Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_003 Testing Ended. *****************")

    '''TestScript to Validation of Content Card metrics '''

    def test_validate_nipun_content_card_metrics(self):
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_004 Testing Started *****************")
        state_info = self.nipun.get_total_content_card_info()
        state_value = self.nipun.get_total_content_card_value()
        pm_state_value = re.sub(self.nipun.K_value, "", state_value)
        status_title = self.nipun.get_total_content_card_title()
        if state_info is not None and status_title is not None:
            self.logger.info("*********** Nipun Bharat Content Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** Nipun Bharat Content Card Values is Missing ************")
            assert False
        if float(pm_state_value) > 0 and pm_state_value is not None:
            self.logger.info("*********** Nipun Bharat Content Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** Nipun Bharat Content Card Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_004 Testing Ended. *****************")

    '''TestScripts to validate Session Metrics in the Card'''

    def test_validate_nipun_session_card_metrics(self):
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_005 Testing Started *****************")
        state_info = self.nipun.get_learning_session_card_info()
        state_value = self.nipun.get_learning_session_card_value()
        pm_state_value = re.sub(self.nipun.L, "", state_value)
        status_title = self.nipun.get_learning_session_card_title()
        if state_info is not None and status_title is not None:
            self.logger.info("*********** Nipun Bharat Session Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** Nipun Bharat Session Card Values is Missing ************")
            assert False
        if float(pm_state_value) > 0 and pm_state_value is not None:
            self.logger.info("*********** Nipun Bharat Session Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** Nipun Bharat Session Card Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_005 Testing Ended. *****************")

    ''' Scripts for the click the tabs on Nipun Bharat Dashboard'''

    def test_click_on_textbook_status_tab(self):
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_006 Testing Started *****************")
        result = self.nipun.get_textbook_status_tab()
        if 'true' == result:
            self.logger.info("*************** TextBook Status Tab is Clicked ****************")
            assert True
        else:
            self.logger.error("*************** TextBook Status Tab is not Working ***************** ")
            assert False
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_006 Testing Ended. *****************")

    def test_click_on_learning_session_tab(self):
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_007 Testing Started *****************")
        result = self.nipun.get_session_status_tab()
        if 'true' == result:
            self.logger.info("*************** Learning Sessions Tab is Clicked ****************")
            assert True
        else:
            self.logger.error("*************** Learning Sessions Tab is not Working ***************** ")
            assert False
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_007 Testing Ended. *****************")

    ''' TextBook Status Tab Map Validations'''

    def test_check_the_textbook_bars_graph_report(self):
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_008 Testing Started *****************")
        self.nipun.click_textbook_status()
        result = self.nipun.get_count_of_stacked_bar_chart()
        if result == 0:
            self.logger.info("************ TextBook Status Having Bar Chart **************")
            assert True
        else:
            self.logger.error("*************** TextBook Status Tab Bar Chart is not Displayed ************")
            assert False
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_008 Testing Ended. *****************")

    def test_check_the_textbook_bars_tooltip_info(self):
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_008 Testing Started *****************")
        self.nipun.click_textbook_status()
        res = self.nipun.get_stacked_bar_tooltip_validation()
        print(res)
        if res == 0:
            self.logger.info("******************* TextBook Status Stacked Bar Having Tooltip information ************ ")
            assert True
        else:
            self.logger.error("************** TextBook Bar Chart not having Tooltip information ***********")
            assert False
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_008 Testing Ended. *****************")

    ''' Learning Session's Tab'''

    def test_check_subject_dropdowns(self):
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_009 Testing Started *****************")
        self.nipun.click_learning_session()
        res = self.nipun.get_count_of_dropdown_options()
        if res == 0:
            self.logger.info("*********** Subject Dropdown having Options ****************")
            assert True
        else:
            self.logger.error("*********** Subject Dropdown not having Options *********")
            assert False
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_0010 Testing Ended *****************")

    def test_each_subject_options_and_tolltips(self):
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_0011 Testing Started *****************")
        self.nipun.click_learning_session()
        res = self.nipun.get_subjection_options_validate_tooltips()
        if res == 0:
            self.logger.info("*********** Subjects are Selected ****************")
            assert True
        else:
            self.logger.error("*********** Subject Dropdown not having Options *********")
            assert False
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_0011 Testing Ended *****************")

    def test_click_the_a_minus_button(self):
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_0012 Testing Started *****************")
        res = self.nipun.test_click_on_a_minus_button()
        if res == 0:
            self.logger.info("*********** A- button is Clicked ****************")
            assert True
        else:
            self.logger.error("*********** A- button is not Clicked *********")
            assert False
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_0012 Testing Ended *****************")

    def test_click_the_a_plus_button(self):
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_0013 Testing Started *****************")
        res = self.nipun.test_click_on_a_plus_button()
        if res == 0:
            self.logger.info("*********** A+ button is Clicked ****************")
            assert True
        else:
            self.logger.error("*********** A+ button is not Clicked *********")
            assert False
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_0013 Testing Ended *****************")

    def test_click_the_default_a_button(self):
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_0014 Testing Started *****************")
        res = self.nipun.test_click_on_a_plus_button()
        if res == 0:
            self.logger.info("*********** A button is Clicked ****************")
            assert True
        else:
            self.logger.error("*********** A button is not Clicked *********")
            assert False
        self.logger.info("*************** Tc_cQube_Nipun_Bharat_0014 Testing Ended *****************")

    @classmethod
    def teardown(cls):
        cls.driver.close()
