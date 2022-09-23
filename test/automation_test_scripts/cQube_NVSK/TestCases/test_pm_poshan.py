import logging
import time

from PageObjects.CqubeUI.pm_poshan import PmPoshan
from TestCases.conftest import ConfTest
from Utilities import CustomLogger
from Utilities.ReadProperties import ReadConfig


class TestPmPoshan:
    pm_poshan = None
    driver = None

    @classmethod
    def setup(cls):
        cls.driver = ConfTest.get_driver()
        cls.pm_poshan = PmPoshan(cls.driver)
        cls.pm_poshan.open_cqube_application()
        cls.pm_poshan.click_pm_poshan()
        cls.logger = CustomLogger.setup_logger('PM_Poshan', ReadConfig.get_logs_directory() + "/Program.log",
                                               level=logging.DEBUG)

    '''This Test script checking the navigation to PM Poshan Dashboard'''
    def test_navigation_to_pm_poshan_dashboard(self):
        self.logger.info("*************** Tc_cQube_PM_Poshan_001 Testing started *****************")
        self.pm_poshan.click_dashboard()
        if 'dashboard' in self.driver.current_url:
            self.logger.info("*************** Navigation to Dashboard Screen *****************")
            assert True
        else:
            self.logger.error("********************* Navigation to Dashboard failed from PM Poshan ***********")
            assert False
        self.pm_poshan.click_pm_poshan()
        if 'poshan' in self.driver.current_url or self.driver.page_source:
            self.logger.info("********* PM Poshan Dashboard is displayed in the UI ***************")
            assert True
        else:
            self.logger.error("******** PM Poshan Menu Button is not working  *************")
            assert False
        self.logger.info("*************** Tc_cQube_PM_Poshan_001 Testing ended. *****************")

    '''This Test script checking the PM Poshan State Card Metrics '''
    def test_validate_poshan_state_card_metrics(self):
        self.logger.info("*************** Tc_cQube_PM_Poshan_002 Testing started *****************")
        state_info = self.pm_poshan.get_vanity_card_info()
        state_value = self.pm_poshan.get_vanity_card_value()
        pm_state_value = self.pm_poshan.get_integer_value(state_value)
        status_title = self.pm_poshan.get_vanity_card_label()
        if state_info is not None and status_title is not None:
            self.logger.info("*********** PM Poshan Card Info and title is showing ***************")
            assert True
        else:
            self.logger.error("*************** PM Poshan Card Info and title is Missing ************")
            assert False
        if int(pm_state_value) > 0 and pm_state_value is not None:
            self.logger.info("*********** PM Poshan Card Value is showing ***************")
            assert True
        else:
            self.logger.error("*************** PM Poshan Card Value is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_PM_Poshan_002 Testing ended. *****************")

    '''This Test script checking the PM Poshan School Card Metrics '''
    def test_validate_poshan_total_school_card_metrics(self):
        self.logger.info("*************** Tc_cQube_PM_Poshan_003 Testing started *****************")
        state_info = self.pm_poshan.get_total_school_card_info()
        state_value = self.pm_poshan.get_total_school_card_value()
        pm_state_value = self.pm_poshan.get_integer_value(state_value)
        status_title = self.pm_poshan.get_total_school_card_label()
        if state_info is not None and status_title is not None:
            self.logger.info("*********** PM Poshan Card Info and title is showing ***************")
            assert True
        else:
            self.logger.error("*************** PM Poshan Card Info and title is showing ************")
            assert False
        if int(pm_state_value) > 0 and pm_state_value is not None:
            self.logger.info("*********** PM Poshan Card Value is showing ***************")
            assert True
        else:
            self.logger.error("*************** PM Poshan Card Value is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_PM_Poshan_003 Testing ended. *****************")

    '''This Test script clicking Implementation Tab '''
    def test_click_on_implementation_status_tab(self):
        self.logger.info("*************** Tc_cQube_PM_Poshan_004 Testing started *****************")
        result = self.pm_poshan.get_implementation_tab_result()
        if "true" == result:
            self.logger.info("************* Implementation Tab is Clicked **************")
            assert True
        else:
            self.logger.error("************** Implementation Tab is not clicked ****************")
            assert False
        self.logger.info("*************** Tc_cQube_PM_Poshan_004 Testing ended. *****************")

    '''This Test script clicking the Progress Status Tab  '''
    def test_click_on_progress_status_tab(self):
        self.logger.info("*************** Tc_cQube_PM_Poshan_005 Testing started *****************")
        result = self.pm_poshan.get_progress_tab_result()
        if "true" == result:
            self.logger.info("************* Progress Status Tab is Clicked **************")
            assert True
        else:
            self.logger.error("************** Progress Status Tab is not clicked ****************")
            assert False
        self.logger.info("*************** Tc_cQube_PM_Poshan_005 Testing ended. *****************")

    '''This Test script check the Map Tooltip '''
    def test_check_map_tooltip_information(self):
        self.logger.info("*************** Tc_cQube_PM_Poshan_006 Testing started *****************")
        self.pm_poshan.click_implementation_tab()
        result = self.pm_poshan.get_map_tooltip_info_validation()
        if 'Onboarded on PM Poshan' in result[0]:
            self.logger.info("*************** Implementation status map report having tooltip information "
                             "********************")
            assert True
        else:
            self.logger.error("*********** MAP Report Not having tooltip **************")
            assert False
        self.logger.info("*************** Tc_cQube_PM_Poshan_006 Testing ended. *****************")

    '''This Test script checking the Metrics Dropdown Options '''
    def test_click_on_state_check_with_metrics_options(self):
        self.logger.info("*************** Tc_cQube_PM_Poshan_007 Testing started *****************")
        self.pm_poshan.click_progress_status_tab()
        self.pm_poshan.get_click_on_state_button()
        time.sleep(1)
        result = self.pm_poshan.get_map_tooltip_validation_in_progress_tab()
        if result == 0:
            self.logger.info("**************** State Wise Metrics Map tooltip is Displayed ********************")
            assert True
        else:
            self.logger.error("************** State Wise Metrics Map is not showing Information's ************")
            assert False
        self.logger.info("*************** Tc_cQube_PM_Poshan_007 Testing ended. *****************")

    '''This Test script checking the District with Metrics Dropdown Options '''
    def test_click_on_districts_check_with_metrics_options(self):
        self.logger.info("*************** Tc_cQube_PM_Poshan_008 Testing started *****************")
        self.pm_poshan.click_progress_status_tab()
        time.sleep(2)
        self.pm_poshan.get_click_on_district_button()
        time.sleep(1)
        result = self.pm_poshan.get_map_tooltip_validation_in_progress_tab()
        if result == 0:
            self.logger.info("**************** District Wise Metrics Map tooltip is Displayed ********************")
            assert True
        else:
            self.logger.error("************** State Wise Metrics Map is not showing Information's ************")
            assert False
        self.logger.info("*************** Tc_cQube_PM_Poshan_008 Testing ended. *****************")

    '''This Test script checking the State Dropdown Options '''
    def test_district_selection_of_each_state_options(self):
        self.logger.info("*************** Tc_cQube_PM_Poshan_009 Testing started *****************")
        self.pm_poshan.click_progress_status_tab()
        time.sleep(2)
        self.pm_poshan.get_click_on_district_button()
        time.sleep(1)
        res1, res2 = self.pm_poshan.get_district_with_state_selection()
        if res1 != 0 and len(res2) != 0:
            self.logger.info("*************** District with State Option Selection showing Data ******** ")
            assert True
        else:
            self.logger.info("*********** State Dropdown and Mam Markers are not showing **********")
            assert False
        self.logger.info("*************** Tc_cQube_PM_Poshan_009 Testing ended. *****************")

    '''This Test script checking the State Options and Metrics Dropdown Options '''
    def test_district_selection_of_each_metrics_state_options(self):
        self.logger.info("*************** Tc_cQube_PM_Poshan_010 Testing started *****************")
        self.pm_poshan.click_progress_status_tab()
        time.sleep(2)
        self.pm_poshan.get_click_on_district_button()
        time.sleep(2)
        res = self.pm_poshan.check_district_metric_and_state_dropdown()
        if res == 0:
            self.logger.info("********* District level - metrics and state dropdown working **********")
            assert True
        else:
            self.logger.error("********* District level - metrics and state dropdown are not Working **********")
            assert False
        self.logger.info("*************** Tc_cQube_PM_Poshan_010 Testing ended. *****************")

    '''This Test script checking the Metrics Dropdown Options '''
    def test_check_metrics_dropdown_options(self):
        self.logger.info("*************** Tc_cQube_PM_Poshan_011 Testing started *****************")
        self.pm_poshan.click_progress_status_tab()
        time.sleep(2)
        self.pm_poshan.get_click_on_state_button()
        time.sleep(1)
        res = self.pm_poshan.check_metric_dropdown_options()
        if res != 0:
            self.logger.info("************* State Wise Metrics Dropdown having Options *************")
            assert True
        else:
            self.logger.error("************ Metrics Dropdown not having Options ****************")
            assert False
        self.logger.info("*************** Tc_cQube_PM_Poshan_011 Testing ended. *****************")

    '''This Test script checking the District and Metrics Dropdown Options '''
    def test_check_district_metrics_dropdown_options(self):
        self.logger.info("*************** Tc_cQube_PM_Poshan_012 Testing Started *****************")
        self.pm_poshan.click_progress_status_tab()
        time.sleep(2)
        self.pm_poshan.get_click_on_district_button()
        time.sleep(1)
        res1, res2 = self.pm_poshan.check_district_metrics_state_dropdown_options()
        if res1 != 0:
            self.logger.info("************* State Wise Metrics Dropdown having Options *************")
            assert True
        else:
            self.logger.error("************ Metrics Dropdown not having Options ****************")
            assert False
        if res2 != 0:
            self.logger.info("************* District Wise Metrics Dropdown having Options *************")
            assert True
        else:
            self.logger.error("************ State Names Dropdown not having Options ****************")
            assert False
        self.logger.info("*************** Tc_cQube_PM_Poshan_012 Testing ended *****************")

    '''This Test script checking the A Minus Button '''
    def test_click_the_a_minus_button(self):
        self.logger.info("*************** Tc_cQube_PM_Poshan_013 Testing started *****************")
        res = self.pm_poshan.test_click_on_a_minus_button()
        if res == 0:
            self.logger.info("*********** A- button is Clicked ****************")
            assert True
        else:
            self.logger.error("*********** A- button is not Clicked *********")
            assert False
        self.logger.info("*************** Tc_cQube_PM_Poshan_013 Testing ended *****************")

    '''This Test script checking the A Plus Button '''
    def test_click_the_a_plus_button(self):
        self.logger.info("*************** Tc_cQube_PM_Poshan_014 Testing started *****************")
        res = self.pm_poshan.test_click_on_a_plus_button()
        if res == 0:
            self.logger.info("*********** A+ button is Clicked ****************")
            assert True
        else:
            self.logger.error("*********** A+ button is not Clicked *********")
            assert False
        self.logger.info("*************** Tc_cQube_PM_Poshan_014 Testing ended *****************")

    '''This Test script checking Default A  '''
    def test_click_the_default_a_button(self):
        self.logger.info("*************** Tc_cQube_PM_Poshan_015 Testing started *****************")
        res = self.pm_poshan.test_click_on_a_plus_button()
        if res == 0:
            self.logger.info("*********** A button is Clicked ****************")
            assert True
        else:
            self.logger.error("*********** A button is not Clicked *********")
            assert False
        self.logger.info("*************** Tc_cQube_PM_Poshan_015 Testing ended *****************")

    @classmethod
    def teardown(cls):
        cls.driver.close()
