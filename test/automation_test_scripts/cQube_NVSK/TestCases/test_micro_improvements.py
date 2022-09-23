import logging
import time

from PageObjects.CqubeUI.micro_improvements import MicroImprovements
from TestCases.conftest import ConfTest
from Utilities import CustomLogger
from Utilities.ReadProperties import ReadConfig


class TestMicroImprovements:
    micro_improvements = None
    driver = None

    @classmethod
    def setup(cls):
        cls.driver = ConfTest.get_driver()
        cls.micro_improvements = MicroImprovements(cls.driver)
        cls.micro_improvements.open_cqube_application()
        cls.logger = CustomLogger.setup_logger('Program_micro_improvements', ReadConfig.get_logs_directory() +
                                               "/Program.log", level=logging.DEBUG)

    """ check whether micro improvements page is displaying or not """

    def test_navigation_to_micro_improvements_dashboard(self):
        self.logger.info("*************** Tc_cQube_micro_improvements_001 Testing started *****************")
        self.micro_improvements.click_dashboard()
        if 'dashboard' in self.driver.current_url:
            self.logger.info("*************** Navigation to Dashboard Screen *****************")
            assert True
        else:
            self.logger.error(
                "********************* Navigation to Dashboard failed from micro_improvements ***********")
            assert False
        self.micro_improvements.click_micro_improvements()
        if 'micro_improvements' in self.driver.current_url or self.driver.page_source:
            self.logger.info("********* micro_improvements Dashboard is displayed in the UI ***************")
            assert True
        else:
            self.logger.error("******** micro_improvements Menu Button is not working  *************")
            assert False
        self.logger.info("*************** Tc_cQube_micro_improvements_001 Testing ended *****************")

    """Check whether vanity metrics present in the micro improvements page or not """

    def test_validate_micro_improvements_ongoing_card_metrics(self):
        self.logger.info("*************** Tc_cQube_micro_improvements_002 Testing started *****************")
        self.micro_improvements.click_micro_improvements()
        ongoing_info = self.micro_improvements.get_vanity_card_info()
        ongoing_value = self.micro_improvements.get_vanity_card_value()
        ongoing_value = self.micro_improvements.get_integer_value(ongoing_value)
        status_title = self.micro_improvements.get_vanity_card_label()
        if ongoing_info is not None and status_title is not None:
            self.logger.info("*********** micro_improvements Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** micro_improvements Values is Missing ************")
            assert False
        if int(ongoing_value) > 0 and ongoing_value is not None:
            self.logger.info("*********** micro_improvements Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** micro_improvements Values is Missing ************")
            assert False
        self.logger.info("*************** cQube_micro_improvements_002 Testing ended *****************")

    """Check whether info button, Value and text are displaying in the microimprovement started vanity card"""

    def test_validate_micro_improvements_started_card_metrics(self):
        self.logger.info("*************** Tc_cQube_micro_improvements_003 Testing started *****************")
        self.micro_improvements.click_micro_improvements()
        started_info = self.micro_improvements.get_vanity_card_info()
        started_value = self.micro_improvements.get_vanity_card_value()
        started_value = self.micro_improvements.get_integer_value(started_value)
        status_title = self.micro_improvements.get_vanity_card_label()
        if started_info is not None and status_title is not None:
            self.logger.info("*********** micro_improvements Card Value is showing ***************")
            assert True
        else:
            self.logger.error("*************** micro_improvements Card Value is Missing ************")
            assert False
        if int(started_value) > 0 and started_value is not None:
            self.logger.info("*********** micro_improvements_003 Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** micro_improvements_003 Card Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_micro_improvements_003 Testing ended *****************")

    """Check whether info button, Value and text are displaying in the microimprovement progress card vanity card"""

    def test_validate_micro_improvements_in_progress_card_metrics(self):
        self.logger.info("*************** Tc_cQube_micro_improvements_004 Testing started *****************")
        self.micro_improvements.click_micro_improvements()
        progress_info = self.micro_improvements.get_vanity_card_info()
        progress_value = self.micro_improvements.get_vanity_card_value()
        progress_value = self.micro_improvements.get_integer_value(progress_value)
        status_title = self.micro_improvements.get_vanity_card_label()
        if progress_info is not None and status_title is not None:
            self.logger.info("*********** micro_improvements_004 Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** micro improvements Card Values is Missing ************")
            assert False
        if int(progress_value) > 0 and progress_value is not None:
            self.logger.info("*********** micro_improvements_004 Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** micro_improvements_004 Card Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_micro_improvements_004 Testing ended *****************")

    """Check whether info button, Value and text are displaying in the microimprovement submitted vanity card"""

    def test_validate_micro_improvements_submitted_card_metrics(self):
        self.logger.info("*************** Tc_cQube_micro_improvements_005 Testing started *****************")
        self.micro_improvements.click_micro_improvements()
        submitted_info = self.micro_improvements.get_vanity_card_info()
        submitted_value = self.micro_improvements.get_vanity_card_value()
        submitted_value = self.micro_improvements.get_integer_value(submitted_value)
        status_title = self.micro_improvements.get_vanity_card_label()
        if submitted_info is not None and status_title is not None:
            self.logger.info("*********** micro_improvements Card_005 Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** micro_improvements Card_005  Card Values is Missing ************")
            assert False
        if int(submitted_value) > 0 and submitted_value is not None:
            self.logger.info("*********** micro_improvements_005 Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** micro_improvement_005 Card Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_micro_improvements_005 Testing ended *****************")

    """Check whether info button, Value and text are displaying in the microimprovement submitted with evidence 
    vanity card """

    def test_validate_micro_improvements_submitted_with_evidence_card_metrics(self):
        self.logger.info("*************** Tc_cQube_micro_improvements_006 Testing started *****************")
        self.micro_improvements.click_micro_improvements()
        evidence_info = self.micro_improvements.get_vanity_card_info()
        evidence_value = self.micro_improvements.get_vanity_card_value()
        evidence_value = self.micro_improvements.get_integer_value(evidence_value)
        status_title = self.micro_improvements.get_vanity_card_label()
        if evidence_info is not None and status_title is not None:
            self.logger.info("*********** micro_improvements Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** micro_improvements Card Values is Missing ************")
            assert False
        if int(evidence_value) > 0 and evidence_value is not None:
            self.logger.info("*********** micro_improvements Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** micro_improvements Card Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_micro_improvements_006 Testing ended *****************")

    # implementation status
    """ Check whether implementation status tab is displaying when we click on implementation status tab"""

    def test_click_on_the_implementation_status_tab_button(self):
        self.logger.info("*************** Tc_cQube_implementation_status_007 Testing started *****************")
        self.micro_improvements.click_micro_improvements()
        self.micro_improvements.click_implementation_status_tab()
        time.sleep(2)
        implementation_status = self.micro_improvements.get_implementation_status_tab_attribute()
        time.sleep(3)
        if "true" == implementation_status:
            self.logger.info("*********** Tab is selecting ***************")
            assert True
        else:
            self.logger.info("*********** Tab is not selecting ***************")
            assert False
        self.logger.info("*************** Tc_cQube_implementation_status_tab_007 Testing ended *****************")

    """ Check whether tooltip is displaying when we mouse hover on map"""

    def test_implementation_status_tooltip(self):
        self.logger.info("*************** Tc_cQube_implementation_status_008 Testing started *****************")
        self.micro_improvements.click_micro_improvements()
        time.sleep(3)
        res2 = self.micro_improvements.get_map_tooltip_info_validation()
        if "Participating in Micro-Improvement Program" in res2[0]:
            assert True
        else:
            self.logger.info("Selected Option is not showing in the map tooltip")
            assert False
        self.logger.info("*************** Tc_cQube_implementation_status_008 Testing started *****************")

    """ Check whether font size increase button is working or not when we click on the A+ button """

    def test_implementation_status_a_plus_button(self):
        self.logger.info("*************** Tc_cQube_implementation status_009 Testing started *****************")
        self.micro_improvements.click_micro_improvements()
        time.sleep(2)
        res = self.micro_improvements.click_on_A_plus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A+ button is clicked and A+ is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.info("************* A+ button is not clicked and A+ is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_implementation_status_009 Testing ended *****************")

    """ Check whether font size decrease button is working or not when we click on the A- button """

    def test_implementation_status_a_minus_button(self):
        self.logger.info("*************** Tc_cQube_implementation_status_010 Testing started *****************")
        self.micro_improvements.click_micro_improvements()
        time.sleep(2)
        res = self.micro_improvements.test_click_on_A_minus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A- button is clicked and A- is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.info("************* A- button is not clicked and A- is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_implementation_status_010 Testing ended *****************")

    """ Check whether font size default button is working or not when we click on the A button """

    def test_implementation_status_default_button(self):
        self.logger.info("*************** Tc_cQube_implementation_status_011 Testing started *****************")
        self.micro_improvements.click_micro_improvements()
        time.sleep(2)
        res = self.micro_improvements.click_on_A_default_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A button is clicked and A is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A button is not clicked and A is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_implementation_status_011 Testing ended *****************")

    """ Check whether improvements status tab is displaying when we click on improvements status tab"""

    def test_click_on_the_improvements_status_tab_button(self):
        self.logger.info("*************** Tc_cQube_improvements_status_012 Testing started *****************")
        self.micro_improvements.click_micro_improvements()
        self.micro_improvements.click_improvements_status_tab()
        time.sleep(2)
        improvements_status = self.micro_improvements.get_improvements_status_tab_attribute()
        time.sleep(3)
        if "true" == improvements_status:
            self.logger.info("*********** Tab is selecting ***************")
            assert True
        else:
            self.logger.error("*********** Tab is not selecting ***************")
            assert False
        self.logger.info("*************** Tc_cQube_improvements_status_tab_012 Testing ended *****************")

    """ Check whether font size increase button is working or not when we click on the A+ button """

    def test_improvements_status_a_plus_button(self):
        self.logger.info("*************** Tc_cQube_micro_improvements_013 Testing started *****************")
        self.micro_improvements.click_micro_improvements()
        time.sleep(2)
        res = self.micro_improvements.click_on_A_plus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A+ button is clicked and A+ is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A+ button is not clicked and A+ is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_micro_improvements_013 Testing ended *****************")

    """ Check whether font size decrease button is working or not when we click on the A- button """

    def test_improvement_status_a_minus_button(self):
        self.logger.info("*************** Tc_cQube_micro_improvements_014 Testing started *****************")
        self.micro_improvements.click_micro_improvements()
        time.sleep(2)
        res = self.micro_improvements.test_click_on_A_minus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A- button is clicked and A- is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A- button is not clicked and A- is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_micro_improvements_014 Testing ended *****************")

    """ Check whether font size default button is working or not when we click on the A button """

    def test_improvements_status_default_button(self):
        self.logger.info("*************** Tc_cQube_micro_improvements_015 Testing started *****************")
        self.micro_improvements.click_micro_improvements()
        time.sleep(2)
        res = self.micro_improvements.click_on_A_default_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A button is clicked and A is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A button is not clicked and A is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_micro_improvements_015 Testing ended *****************")

    """" check whether each metrics is displayed or not"""

    def test_selection_of_each_metric(self):
        self.logger.info("*************** Tc_cQube_micro_improvements_016 Testing started *****************")
        self.micro_improvements.click_micro_improvements()
        self.micro_improvements.click_improvements_status_tab()
        self.micro_improvements.click_dropdown()
        time.sleep(2)
        options = self.micro_improvements.get_metrics_dropdown_values()
        for dropdown in range(len(options)):
            opts = self.micro_improvements.get_each_dropdown_value_id(dropdown)
            opt_text = opts.text
            opts.click()
            time.sleep(2)
            result = self.micro_improvements.get_map_tooltip_info_validation()
            print(opt_text, result)
            if opt_text in result[0]:
                self.logger.info("*************** quiz name Options having tooltip information "
                                 "********************")
                assert True
            else:
                self.logger.error("*********** Metrics dropdown wise not showing Map Result **************")
                assert False
            self.micro_improvements.click_dropdown()
            time.sleep(5)
        self.logger.info("*************** Tc_cQube_micro_improvements_016 Testing ended *****************")

    """Check the metric with legend"""

    def test_legend(self):
        self.logger.info("*************** Tc_cQube_micro_improvements_017 Testing started *****************")
        self.micro_improvements.click_micro_improvements()
        self.micro_improvements.click_improvements_status_tab()
        self.micro_improvements.click_dropdown()
        time.sleep(2)
        options = self.micro_improvements.get_metrics_dropdown_values()
        for dropdown in range(len(options)):
            opts = self.micro_improvements.get_each_dropdown_value_id(dropdown)
            opt_text = opts.text
            opts.click()
            time.sleep(3)
            legend = self.micro_improvements.get_legend_text()
            if opt_text in legend:
                assert True
                self.logger.info("*********** Metric in  dropdown and legend is same **************")
            else:
                self.logger.error("*********** Metric in  dropdown and legend is not same **************")
                assert False
            self.micro_improvements.click_dropdown()
            time.sleep(2)
        self.logger.info("*************** Tc_cQube_micro_improvements_017 Testing started *****************")

    @classmethod
    def teardown(cls):
        cls.driver.close()
