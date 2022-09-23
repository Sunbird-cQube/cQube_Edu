import logging
import time

from selenium.common import NoSuchElementException
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By

from PageObjects.CqubeUI.nas import Nas
from TestCases.conftest import ConfTest
from Utilities import CustomLogger
from Utilities.ReadProperties import ReadConfig


class TestNas:
    nas = None
    driver = None

    @classmethod
    def setup(cls):
        cls.driver = ConfTest.get_driver()
        cls.nas = Nas(cls.driver)
        cls.nas.open_cqube_application()
        cls.logger = CustomLogger.setup_logger('Program_nas', ReadConfig.get_logs_directory() + "/Program.log",
                                               level=logging.DEBUG)

    """ check whether ncert quiz page is displaying or not """

    def test_navigation_to_nas_dashboard(self):
        self.logger.info("*************** Tc_cQube_nas_001 Testing started *****************")
        self.nas.click_dashboard()
        if 'dashboard' in self.driver.current_url:
            self.logger.info("*************** Navigation to Dashboard Screen *****************")
            assert True
        else:
            self.logger.error(
                "********************* Navigation to Dashboard failed from micro_improvements ***********")
            assert False
        self.nas.click_nas()
        if 'nas' in self.driver.current_url or self.driver.page_source:
            self.logger.info("********* nas Dashboard is displayed in the UI ***************")
            assert True
        else:
            self.logger.error("******** nas Menu Button is not working  *************")
            assert False
        self.logger.info("*************** Tc_cQube_nas_001 Testing ended *****************")

    """Check whether vanity metrics present in the nas page or not """

    def test_validate_nas_state_card_metrics(self):
        self.logger.info("*************** Tc_cQube_nas_card_metrics_002 Testing started *****************")
        self.nas.click_nas()
        ongoing_info = self.nas.get_vanity_card_info()
        ongoing_value = self.nas.get_vanity_card_value()
        ongoing_value = self.nas.get_integer_value(ongoing_value)
        status_title = self.nas.get_vanity_card_label()
        if ongoing_info is not None and status_title is not None:
            self.logger.info("*********** nas state Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** nas state Values is Missing ************")
            assert False
        if int(ongoing_value) > 0 and ongoing_value is not None:
            self.logger.info("*********** nas state Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** nas state Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_nas_card_metrics_002 Testing ended *****************")

    """Check whether info button, Value and text are displaying in the total lo card vanity card"""

    def test_validate_nas_total_lo_card_metrics(self):
        self.logger.info("*************** Tc_cQube_nas003 Testing started *****************")
        self.nas.click_nas()
        total_lo_info = self.nas.get_vanity_card_info()
        total_lo_value = self.nas.get_vanity_card_value()
        total_lo_value = self.nas.get_integer_value(total_lo_value)
        status_title = self.nas.get_vanity_card_label()
        if total_lo_info is not None and status_title is not None:
            self.logger.info("*********** nas card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** nas card Values is Missing ************")
            assert False
        if int(total_lo_value) > 0 and total_lo_value is not None:
            self.logger.info("*********** nas card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** nas card Values is Missing ************")
            assert False
        self.logger.info("*************** cQube_nas_003 Testing ended *****************")

    """Check whether info button, Value and text are displaying in the teachers  vanity card"""

    def test_validate_nas_teachers_card_metrics(self):
        self.logger.info("*************** Tc_cQube_nas_004 Testing started *****************")
        self.nas.click_nas()
        teachers_info = self.nas.get_vanity_card_info()
        teachers_value = self.nas.get_vanity_card_value()
        teachers_value = self.nas.get_integer_value(teachers_value)
        status_title = self.nas.get_vanity_card_label()
        if teachers_info is not None and status_title is not None:
            self.logger.info("*********** nas Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** nas Values is Missing ************")
            assert False
        if int(teachers_value) > 0 and teachers_value is not None:
            self.logger.info("*********** nas Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** nas Values is Missing ************")
            assert False
        self.logger.info("*************** cQube_nas_004 Testing ended *****************")

    """ Check whether implementation status tab is displaying when we click on implementation status tab"""

    def test_click_on_the_implementation_status_tab_button(self):
        self.logger.info("*************** Tc_cQube_implementation_status_005 Testing started *****************")
        self.nas.click_nas()
        self.nas.click_implementation_status_tab()
        time.sleep(2)
        implementation_status = self.nas.get_implementation_status_tab_attribute()
        time.sleep(3)
        if "true" == implementation_status:
            self.logger.info("***********implementation_status Tab is selecting ***************")
            assert True
        else:
            self.logger.info("***********implementation_status Tab is not selecting ***************")
            assert False
        self.logger.info("*************** Tc_cQube_implementation_status_tab_005 Testing ended *****************")

    """ Check whether tooltip is displaying when we mouse hover on map"""

    def test_implementation_status_tooltip(self):
        self.logger.info("*************** Tc_cQube_implementation_status_006 Testing started *****************")
        self.nas.click_nas()
        time.sleep(3)
        res2 = self.nas.get_map_tooltip_info_validation()
        if "Implemented NAS" in res2[0]:
            self.logger.info("Selected Option is showing in the map tooltip")
            assert True
        else:
            self.logger.error("Selected Option is not showing in the map tooltip")
            assert False
        self.logger.info("*************** Tc_cQube_implementation_status_006 Testing started *****************")

    """ Check whether font size increase button is working or not when we click on the A+ button """

    def test_implementation_status_a_plus_button(self):
        self.logger.info("*************** Tc_cQube_implementation_status_007 Testing started *****************")
        self.nas.click_nas()
        time.sleep(2)
        res = self.nas.click_on_A_plus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A+ button is clicked  A+ is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.info("************* A+ button is not clicked A+ is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_implementation_status_007 Testing ended *****************")

    """ Check whether font size decrease button is working or not when we click on the A- button """

    def test_implementation_status_a_minus_button(self):
        self.logger.info("*************** Tc_cQube_implementation_008 Testing started *****************")
        self.nas.click_nas()
        time.sleep(2)
        res = self.nas.test_click_on_A_minus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A- button is clicked A- is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.info("************* A- button is not clicked A- is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_implementation_008 Testing ended *****************")

    """ Check whether font size default button is working or not when we click on the A button """

    def test_implementation_status_default_button(self):
        self.logger.info("*************** Tc_cQube_implementation_009 Testing started *****************")
        self.nas.click_nas()
        time.sleep(2)
        res = self.nas.click_on_A_default_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A button is clicked A is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.info("************* A button is not clicked A is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_implementation_009 Testing ended *****************")

    """ Check whether state wise performance tab is displaying when we click on state wise performance tab"""

    def test_click_on_the_state_wise_performance_tab_button(self):
        self.logger.info("*************** Tc_cQube_state_wise_performance_010 Testing started *****************")
        self.nas.click_nas()
        self.nas.click_state_wise_performance_tab()
        time.sleep(2)
        state_wise_performance = self.nas.get_state_wise_performance_tab_attribute()
        time.sleep(3)
        if "true" == state_wise_performance:
            self.logger.info("*********** Tab is selecting ***************")
            assert True
        else:
            self.logger.info("*********** Tab is not selecting ***************")
            assert False
        self.logger.info("*************** Tc_cQube_state_wise_performance_tab_010 Testing ended *****************")

    """" check whether dropdown options is selecting or not"""

    def test_dropdowns_options_grade(self):
        self.logger.info("*************** Tc_cQube_dropdown_011 Testing started *****************")
        self.nas.click_nas()
        time.sleep(3)
        self.nas.click_state_wise_performance_tab()
        time.sleep(4)
        self.nas.click_on_grade()
        time.sleep(2)
        options = self.nas.get_grade_values()
        grade_count = len(options)
        for grade_dropdown in range(grade_count):
            grade = self.nas.get_each_dropdown_value_id(grade_dropdown)
            grade.click()
            time.sleep(4)
            self.nas.click_on_subject()
            time.sleep(2)
            options = self.nas.get_subject_values()
            subject_count = len(options)
            for subject_dropdown in range(subject_count):
                subject = self.nas.get_each_dropdown_value_id(subject_dropdown)
                subject.click()
                time.sleep(2)
                self.nas.click_on_learning_outcome()
                time.sleep(2)
                options = self.nas.get_learning_outcome_values()
                learning_outcome_count = len(options)
                for dropdown in range(1, learning_outcome_count):
                    learning_outcome_id = self.nas.get_each_dropdown_value_id(dropdown)
                    time.sleep(2)
                    learning_outcome_id.click()
                    time.sleep(2)
                    res2 = self.nas.get_map_tooltip_info_validation()
                    if "Learning Outcome" in res2[0]:
                        assert True
                        self.logger.info("Selected Option is showing in the map tooltip")
                    else:
                        self.logger.error("Selected Option is not showing in the map tooltip")
                        assert False
                    self.nas.click_on_learning_outcome()
                    time.sleep(3)
                self.nas.click_on_subject()
                time.sleep(3)
            self.nas.click_on_grade()
            time.sleep(3)
        self.logger.info("*************** Tc_cQube_nas_011 Testing started *****************")

    """ Check whether font size increase button is working or not when we click on the A+ button """

    def test_state_wise_performance_a_plus_button(self):
        self.logger.info("*************** Tc_cQube_nas_012 Testing started *****************")
        self.nas.click_nas()
        self.nas.click_state_wise_performance_tab()
        time.sleep(2)
        res = self.nas.click_on_A_plus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A+ button is clicked and A+ is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.info("************* A+ button is not clicked and A+ is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_nas_012 Testing ended *****************")

    """ Check whether font size decrease button is working or not when we click on the A- button """

    def test_state_wise_performance_a_minus_button(self):
        self.logger.info("*************** Tc_cQube_nas_013 Testing started *****************")
        self.nas.click_nas()
        time.sleep(2)
        self.nas.click_state_wise_performance_tab()
        time.sleep(2)
        res = self.nas.test_click_on_A_minus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A- button is clicked and A- is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.info("************* A- button is not clicked and A- is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_nas_013 Testing ended *****************")

    """ Check whether font size default button is working or not when we click on the A button """

    def test_state_wise_performance_default_button(self):
        self.logger.info("*************** Tc_cQube_nas_014 Testing started *****************")
        self.nas.click_nas()
        time.sleep(2)
        self.nas.click_state_wise_performance_tab()
        time.sleep(2)
        res = self.nas.click_on_A_default_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A button is clicked and A is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.info("************* A button is not clicked and A is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_nas_014 Testing ended *****************")

    """" check whether dropdown options is selecting or not"""

    def test_dropdown_options(self):
        result = []
        self.logger.info("*************** Tc_cQube_nas_dropdown_015 Testing started *****************")
        self.nas.click_nas()
        self.nas.click_state_wise_performance_tab()
        time.sleep(4)
        self.nas.click_district_button()
        time.sleep(5)
        self.nas.click_on_grade()
        time.sleep(2)
        options = self.nas.get_grade_values()
        grade_count = len(options)
        for grade_dropdown in range(grade_count):
            grade = self.nas.get_each_dropdown_value_id(grade_dropdown)
            grade.click()
            time.sleep(4)
            self.nas.click_on_subject()
            time.sleep(2)
            options = self.nas.get_subject_values()
            subject_count = len(options)
            for subject_dropdown in range(subject_count):
                subject = self.nas.get_each_dropdown_value_id(subject_dropdown)
                subject.click()
                time.sleep(2)
                self.nas.click_on_learning_outcome()
                time.sleep(2)
                options = self.nas.get_learning_outcome_values()
                learning_outcome_count = len(options)
                for learning_outcome_dropdown in range(1, learning_outcome_count):
                    state = self.nas.get_each_dropdown_value_id(learning_outcome_dropdown)
                    state.click()
                    time.sleep(2)
                    self.nas.click_on_state()
                    time.sleep(2)
                    options = self.nas.get_state_values()
                    state_count = len(options)
                    for dropdown in range(state_count):
                        state_id = self.nas.get_each_dropdown_value_id(dropdown)
                        state_name = state_id.text
                        state_id.click()
                        time.sleep(5)
                        state_code = []
                        if state_name == "Andaman & Nicobar Islands":
                            state_code.append("AN")
                        elif state_name == "Andhra Pradesh":
                            state_code.append("AP")
                        elif state_name == "Arunachal Pradesh":
                            state_code.append("AR")
                        elif state_name == "Assam":
                            state_code.append("AS")
                        elif state_name == "Bihar":
                            state_code.append("BR")
                        elif state_name == "Chandigarh":
                            state_code.append("CH")
                        elif state_name == "Chhattisgarh":
                            state_code.append("CT")
                        elif state_name == "Dadra & Nagar Haveli":
                            state_code.append("DN")
                        elif state_name == "Daman & Diu":
                            state_code.append("DD")
                        elif state_name == "Delhi":
                            state_code.append("DL")
                        elif state_name == "Goa":
                            state_code.append("GA")
                        elif state_name == "Gujarat":
                            state_code.append("GJ")
                        elif state_name == "Haryana":
                            state_code.append("HR")
                        elif state_name == "Himachal Pradesh":
                            state_code.append("HP")
                        elif state_name == "Jammu & Kashmir":
                            state_code.append("JK")
                        elif state_name == "Jharkhand":
                            state_code.append("JH")
                        elif state_name == "Karnataka":
                            state_code.append("KA")
                        elif state_name == "Kerala":
                            state_code.append("KL")
                        elif state_name == "Lakshadweep":
                            state_code.append("LD")
                        elif state_name == "Madhya Pradesh":
                            state_code.append("MP")
                        elif state_name == "Maharashtra":
                            state_code.append("MH")
                        elif state_name == "Manipur":
                            state_code.append("MN")
                        elif state_name == "Meghalaya":
                            state_code.append("Ml")
                        elif state_name == "Mizoram":
                            state_code.append("MZ")
                        elif state_name == "Nagaland":
                            state_code.append("NL")
                        elif state_name == "Odisha":
                            state_code.append("OR")
                        elif state_name == "Puducherry":
                            state_code.append("PY")
                        elif state_name == "Punjab":
                            state_code.append("PB")
                        elif state_name == "Rajasthan":
                            state_code.append("RJ")
                        elif state_name == "Sikkim":
                            state_code.append("SK")
                        elif state_name == "Tamil Nadu'":
                            state_code.append("TN")
                        elif state_name == "Telangana":
                            state_code.append("TG")
                        elif state_name == "Tripura":
                            state_code.append("TR")
                        elif state_name == "Uttar Pradesh'":
                            state_code.append("UP")
                        elif state_name == "Uttarakhand":
                            state_code.append("UT")
                        elif state_name == "West Bengal":
                            state_code.append("WB")
                        time.sleep(3)
                        state = self.driver.find_elements(By.ID, state_code[0])
                        state_code.clear()
                        for x in state:
                            act = ActionChains(self.driver)
                            act.move_to_element(x).perform()
                            act.pause(2)
                            try:
                                tooltip_state_name = self.nas.get_tooltip_state_name()
                                tooltip_state_name = tooltip_state_name.text
                                tooltip_state_name = tooltip_state_name.split(" ")
                                if tooltip_state_name[0] in state_name:
                                    result.append("true")
                                else:
                                    result.append("false")
                            except NoSuchElementException:
                                pass
                        self.nas.click_on_state()
                        time.sleep(3)
                    self.nas.click_on_learning_outcome()
                    time.sleep(2)
                self.nas.click_on_subject()
                time.sleep(2)
            self.nas.click_on_grade()
            time.sleep(3)
        if "false" not in result:
            self.logger.info("*************** dropdowns option is displaying*****************")
            assert True

        else:
            self.logger.error("*************** dropdown option is displaying*****************")
            assert False
        self.logger.info("*************** Tc_cQube_nas_dropdown_015 Testing ended *****************")

    """Check whether grade and subject performance tab is displaying when we click on grade and subject performance 
    tab """

    def test_click_on_the_grade_and_subject_tab_button(self):
        self.logger.info("*************** Tc_cQube_grade_and_subjects_016 Testing started *****************")
        self.nas.click_nas()
        self.nas.click_on_grade_and_subject_performance_tab()
        time.sleep(2)
        grade_and_subject_performance = self.nas.get_grade_and_subject_performance_tab_attribute()
        time.sleep(3)
        if "true" == grade_and_subject_performance:
            self.logger.info("*********** Tab is selecting ***************")
            assert True
        else:
            self.logger.info("*********** Tab is not selecting ***************")
            assert False
        self.logger.info("*************** Tc_cQube_grade_and_subject_016 Testing ended *****************")

    """check whether dropdown options is selecting or not"""

    """ Check whether font size increase button is working or not when we click on the A+ button """

    def test_grade_and_subject_a_plus_button(self):
        self.logger.info("*************** Tc_cQube_nas_017 Testing started *****************")
        self.nas.click_nas()
        time.sleep(2)
        self.nas.click_on_grade_and_subject_performance_tab()
        time.sleep(3)
        res = self.nas.click_on_A_plus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A+ button is clicked and A+ is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.info("************* A+ button is not clicked and A+ is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_nas017 Testing ended *****************")

    """ Check whether font size decrease button is working or not when we click on the A- button """

    def test_grade_and_subject_a_minus_button(self):
        self.logger.info("*************** Tc_cQube_nas_018 Testing started *****************")
        self.nas.click_nas()
        time.sleep(2)
        self.nas.click_on_grade_and_subject_performance_tab()
        time.sleep(2)
        res = self.nas.test_click_on_A_minus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A- button is clicked and A- is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.info("************* A- button is not clicked and A- is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_nas_018 Testing ended *****************")

    """ Check whether font size default button is working or not when we click on the A button """

    def test_grade_and_subject_default_button(self):
        self.logger.info("*************** Tc_cQube_nas_019 Testing started *****************")
        self.nas.click_nas()
        time.sleep(2)
        self.nas.click_on_grade_and_subject_performance_tab()
        time.sleep(2)
        res = self.nas.click_on_A_default_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A button is clicked and A is working as expected*************")
            self.driver.refresh()
            assert True
            self.logger.info("************* A button is clicked and A is not working as expected *************")
        else:
            self.logger.info("************* A button is not clicked and A is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_nas_019 Testing ended *****************")

    def test_nas_dropdowns_options(self):
        self.logger.info("*************** Tc_cQube_nas_020 Testing started *****************")
        self.nas.click_nas()
        time.sleep(3)
        self.nas.click_on_grade_and_subject_performance_tab()
        time.sleep(4)
        self.nas.click_on_grade()
        time.sleep(2)
        options = self.nas.get_grade_values()
        grade_count = len(options)
        for grade_dropdown in range(grade_count):
            grade = self.nas.get_each_dropdown_value_id(grade_dropdown)
            grade.click()
            time.sleep(4)
            self.nas.click_on_subject()
            time.sleep(2)
            options = self.nas.get_subject_values()
            subject_count = len(options)
            for subject_dropdown in range(subject_count):
                subject = self.nas.get_each_dropdown_value_id(subject_dropdown)
                subject.click()
                time.sleep(2)
                self.nas.click_on_state()
                time.sleep(2)
                options = self.nas.get_state_values()
                state_count = len(options)
                for dropdown in range(1, state_count):
                    state_id = self.nas.get_each_dropdown_value_id(dropdown)
                    state_id.click()
                    time.sleep(2)
                    data = self.nas.get_data()
                    print(len(data))
                    if len(data) > 0:
                        self.logger.info("*************** dropdown option is displaying*****************")
                        assert True
                    else:
                        self.logger.info("***************  dropdown option is not displaying *****************")
                        assert False
                    self.nas.click_on_state()
                    time.sleep(3)
                self.nas.click_on_subject()
                time.sleep(3)
            self.nas.click_on_grade()
            time.sleep(3)
        self.logger.info("*************** Tc_cQube_nas_020 Testing ended *****************")

    @classmethod
    def teardown(cls):
        cls.driver.close()
