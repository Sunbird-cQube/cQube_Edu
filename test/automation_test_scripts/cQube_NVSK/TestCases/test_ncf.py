import logging

import time

from PageObjects.CqubeUI.ncf import Ncf
from TestCases.conftest import ConfTest
from Utilities import CustomLogger
from Utilities.ReadProperties import ReadConfig


class TestNcf:
    ncf = None
    driver = None

    @classmethod
    def setup(cls):
        cls.driver = ConfTest.get_driver()
        cls.ncf = Ncf(cls.driver)
        cls.ncf.open_cqube_application()
        cls.logger = CustomLogger.setup_logger('Program_NCF', ReadConfig.get_logs_directory() + "/Program.log",
                                               level=logging.DEBUG)

    """Check whether ncf page is displaying or not"""

    def test_navigation_to_ncf_dashboard(self):
        self.logger.info("*************** Tc_cQube_NCF_001 Testing started *****************")
        self.ncf.click_dashboard()
        if 'dashboard' in self.driver.current_url:
            self.logger.info("*************** Navigation to Dashboard Screen *****************")
            assert True
        else:
            self.logger.error("********************* Navigation to Dashboard failed from PM Poshan ***********")
            assert False
        self.ncf.click_ncf()
        if 'ncf' in self.driver.current_url or self.driver.page_source:
            self.logger.info("********* NCF Dashboard is displayed in the UI ***************")
            assert True
        else:
            self.logger.error("******** NCF Menu Button is not working  *************")
            assert False
        self.logger.info("*************** Tc_cQube_NCF Testing ended *****************")

    """Check whether vanity metrics present in the NCF page or not """

    def test_check_vanity_metric(self):
        self.logger.info("*************** Tc_cQube_NCF_002 Testing started *****************")
        self.ncf.click_ncf()
        vanity_card = self.ncf.get_vanity_metrics_card_details()
        if len(vanity_card) > 0:
            assert True
            self.logger.info("********* vanity metrics cards are displaying in the NCF Page ***************")
        else:
            self.logger.error("********* vanity metrics cards are not displaying in the NCF Page ***************")
            assert False
        self.logger.info("*************** Tc_cQube_Udise_002 Testing ended *****************")

    """ Check whether info button, Value and text are displaying in the total_dcr_completed vanity card"""

    def test_validate_ncf_total_dcr_completed_card_metrics(self):
        self.logger.info("*************** Tc_cQube_NCF_003 Testing started *****************")
        self.ncf.click_ncf()
        card_info = self.ncf.get_total_dcr_completed_card_info()
        card_value = self.ncf.get_total_dcr_completed_card_value()
        ncf_card_value = self.ncf.get_integer_value(card_value)
        card_title = self.ncf.get_total_dcr_completed_card_label()
        if card_info is not None and card_title is not None:
            self.logger.info("*********** Total_dcr_completed Card Values are showing ***************")
            assert True
        else:
            self.logger.error("*************** Total_dcr_completed Card Values are Missing ************")
            assert False
        if int(ncf_card_value) > 0 and ncf_card_value is not None:
            self.logger.info("*********** total_dcr_completed Card Values are showing ***************")
            assert True
        else:
            self.logger.error("*************** total_dcr_completed Card Values are Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_NCF_003 Testing ended *****************")

    """ Check whether info button, Value and text are displaying in the total_mobile_surveyed vanity card"""

    def test_validate_ncf_total_mobile_surveyed_card_metrics(self):
        self.logger.info("*************** Tc_cQube_NCF_004 Testing started *****************")
        self.ncf.click_ncf()
        card_info = self.ncf.get_total_mobile_survey_card_info()
        card_value = self.ncf.get_total_mobile_survey_card_value()
        ncf_card_value = self.ncf.get_integer_value(card_value)
        card_title = self.ncf.get_total_mobile_survey_card_label()
        if card_info is not None and card_title is not None:
            self.logger.info("*********** total_mobile_surveyed Card Values are showing ***************")
            assert True
        else:
            self.logger.error("*************** total_mobile_surveyed Card Values are Missing ************")
            assert False
        if int(ncf_card_value) > 0 and ncf_card_value is not None:
            self.logger.info("*********** total_mobile_surveyed Card Values are showing ***************")
            assert True
        else:
            self.logger.error("*************** total_mobile_surveyed Card Values are Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_NCF_004 Testing ended *****************")

    """ Check whether info button, Value and text are displaying in the total_ndgs_created vanity card"""

    def test_validate_ncf_total_ndgs_created_card_metrics(self):
        self.logger.info("*************** Tc_cQube_NCF_005 Testing started *****************")
        self.ncf.click_ncf()
        card_info = self.ncf.get_total_ndgs_created_card_info()
        card_value = self.ncf.get_total_ndgs_created_card_value()
        ncf_card_value = self.ncf.get_integer_value(card_value)
        card_title = self.ncf.get_total_ndgs_created_card_label()
        if card_info is not None and card_title is not None:
            self.logger.info("*********** total_ndgs_created Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** total_ndgs_created Card Values is Missing ************")
            assert False
        if int(ncf_card_value) > 0 and ncf_card_value is not None:
            self.logger.info("*********** total_ndgs_created Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** total_ndgs_created Card Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_NCF_005 Testing ended *****************")

    # Progress Status

    """ Check whether progress status tab is displaying when we click on progress status tab"""

    def test_click_on_the_progress_status_tab_button(self):
        self.logger.info("*************** Tc_cQube_NCF_006 Testing started *****************")
        self.ncf.click_ncf()
        progress_status = self.ncf.click_progress_status_tab()
        if "true" == progress_status:
            self.logger.info("*********** Tab is selecting ***************")
            assert True
        else:
            self.logger.error("*********** Tab is not selecting ***************")
            assert False
        self.logger.info("*************** Tc_cQube_NCF_006 Testing ended *****************")

    """ Check  whether map is present  on the NCF page """

    def test_check_map_on_page(self):
        self.logger.info("*************** Tc_cQube_NCF_007 Testing started *****************")
        self.ncf.click_ncf()
        map_info = self.ncf.get_map_information()
        if len(map_info) > 0:
            assert True
            self.logger.info("*********** Map is present on the NCF page ***************")
        else:
            self.logger.error("*********** Map is not present on the NCF page ***************")
            assert False
        self.logger.info("*************** Tc_cQube_NCF_007 Testing ended *****************")

    """ Check whether font size increase button is working or not when we click on the A+ button """

    def test_progess_status_a_plus_button(self):
        self.logger.info("*************** Tc_cQube_NCF_008 Testing started *****************")
        self.ncf.click_ncf()
        time.sleep(5)
        res = self.ncf.click_on_A_plus_button()
        if res == 0:
            self.logger.info("*********** A+ button is Clicked ****************")
            assert True
        else:
            self.logger.error("*********** A+ button is not Clicked *********")
            assert False
        self.logger.info("*************** Tc_cQube_NCF_008 Testing ended *****************")

    """ Check whether font size decrease button is working or not when we click on the A- button """

    def test_progress_status_a_minus_button(self):
        self.logger.info("*************** Tc_cQube_NCF_009 Testing started *****************")
        self.ncf.click_ncf()
        time.sleep(2)
        res = self.ncf.click_on_A_minus_button()
        if res == 0:
            self.logger.info("************* A- button is clicked and A- is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A- button is not clicked and A- is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_NCF_009 Testing ended *****************")

    """ Check whether font size default button is working or not when we click on the A button """

    def test_progress_status_default_button(self):
        self.logger.info("*************** Tc_cQube_NCF_010 Testing started *****************")
        self.ncf.click_ncf()
        time.sleep(2)
        res = self.ncf.click_on_A_default_button()
        if res == 0:
            self.logger.info("************* A button is clicked and A is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A button is not clicked and A is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_NCF_010 Testing ended *****************")

    """ Check whether each dropdown is selecting and selected metric is displaying is tooltip"""

    def test_selection_of_each_metric(self):
        self.logger.info("*************** Tc_cQube_NCF_011 Testing started *****************")
        self.ncf.click_ncf()
        self.ncf.click_dropdown()
        time.sleep(2)
        options = self.ncf.get_metrics_dropdown_values()
        for dropdown in range(len(options)):
            opts = self.ncf.get_each_dropdown_value_id(dropdown)
            opt_text = opts.text
            opts.click()
            time.sleep(2)
            result = self.ncf.get_map_tooltip_info_validation()
            print(opt_text, result)
            if opt_text in result[0]:
                self.logger.info("*************** State Wise Options having tooltip information "
                                 "********************")
                assert True
            else:
                self.logger.error("*********** Metrics dropdown wise not showing Map Result **************")
                assert False
            self.ncf.click_dropdown()
            time.sleep(2)
        self.logger.info("*************** Tc_cQube_NCF_011 Testing ended *****************")

    """ Check whether selected metric and metric in the legend is same"""

    def test_legend(self):
        self.logger.info("*************** Tc_cQube_NCF_012 Testing started *****************")
        self.ncf.click_ncf()
        self.ncf.click_dropdown()
        time.sleep(2)
        options = self.ncf.get_metrics_dropdown_values()
        for dropdown in range(len(options)):
            opts = self.ncf.get_each_dropdown_value_id(dropdown)
            opt_text = opts.text
            opts.click()
            time.sleep(3)
            legend = self.ncf.get_legend_text()
            if opt_text in legend:
                assert True
                self.logger.info("*********** Metric in  dropdown and legend is same **************")
            else:
                self.logger.error("*********** Metric in  dropdown and legend is not same **************")
                assert False
            self.ncf.click_dropdown()
            time.sleep(2)
        self.logger.info("*************** Tc_cQube_NCF_012 Testing started *****************")

    @classmethod
    def teardown(cls):
        cls.driver.close()
