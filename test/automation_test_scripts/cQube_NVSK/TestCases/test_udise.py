import logging
import time

from selenium.common import NoSuchElementException
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By

from PageObjects.CqubeUI.udise import Udise
from TestCases.conftest import ConfTest
from Utilities import CustomLogger
from Utilities.ReadProperties import ReadConfig


class Testudise:
    udise = None
    driver = None

    @classmethod
    def setup(cls):
        cls.driver = ConfTest.get_driver()
        cls.udise = Udise(cls.driver)
        cls.udise.open_cqube_application()
        cls.logger = CustomLogger.setup_logger('Program_Udise', ReadConfig.get_logs_directory() + "/Program.log",
                                               level=logging.DEBUG)

    """ check whether udise page is displaying or not """

    def test_navigation_to_udise_dashboard(self):
        self.logger.info("*************** Tc_cQube_udise_001 Testing started *****************")
        self.udise.click_dashboard()
        if 'dashboard' in self.driver.current_url:
            self.logger.info("*************** Navigation to Dashboard Screen *****************")
            assert True
        else:
            self.logger.error("********************* Navigation to Dashboard failed from PM Poshan ***********")
            assert False
        self.udise.click_udise()
        if 'udise' in self.driver.current_url or self.driver.page_source:
            self.logger.info("********* udise Dashboard is displayed in the UI ***************")
            assert True
        else:
            self.logger.error("******** udise Menu Button is not working  *************")
            assert False
        self.logger.info("*************** Tc_cQube_udise_001 Testing ended *****************")

    """Check whether vanity metrics present in the Udise page or not """

    def test_check_vanity_metric(self):
        self.logger.info("*************** Tc_cQube_Udise_002 Testing started *****************")
        self.udise.click_udise()
        vanity_card = self.udise.get_vanity_metrics_card_details()
        if len(vanity_card) > 0:
            assert True
            self.logger.info("********* vanity metrics cards are displaying in the Udise Page ***************")
        else:
            self.logger.info("********* vanity metrics cards are not displaying in the Udise Page ***************")
            assert False
        self.logger.info("*************** Tc_cQube_Udise_002 Testing ended *****************")

    """Check whether info button, Value and text are displaying in the total_students vanity card"""

    def test_validate_total_students_metrics(self):
        self.logger.info("*************** Tc_cQube_udise_003 Testing started *****************")
        self.udise.click_udise()
        card_info = self.udise.get_total_students_card_info()
        card_value = self.udise.get_total_students_card_value()
        udise_card_value = self.udise.get_integer_value(card_value)
        card_title = self.udise.get_total_students_card_label()
        if card_info is not None and card_title is not None:
            self.logger.info("*********** Total students Card Values are showing ***************")
            assert True
        else:
            self.logger.error("*************** Total students Card Card Values are Missing ************")
            assert False
        if int(udise_card_value) > 0 and udise_card_value is not None:
            self.logger.info("*********** Udise Card Values are showing ***************")
            assert True
        else:
            self.logger.error("*************** Udise Card Values are Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_Udise_003 Testing completed *****************")

    """Check whether info button, Value and text are displaying in the ptr vanity card"""

    def test_validate_ptr_metrics(self):
        self.logger.info("*************** Tc_cQube_udise_004 Testing started *****************")
        self.udise.click_udise()
        card_info = self.udise.get_ptr_card_info()
        card_value = self.udise.get_ptr_card_value()
        udise_card_value = self.udise.get_integer_value(card_value)
        card_title = self.udise.get_ptr_card_label()
        if card_info is not None and card_title is not None:
            self.logger.info("*********** Udise Card Values are showing ***************")
            assert True
        else:
            self.logger.error("*************** Udise Card Values are Missing ************")
            assert False
        if int(udise_card_value) > 0 and udise_card_value is not None:
            self.logger.info("*********** PTR Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** PTR Card Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_Udise_004 Testing ended *****************")

    """Check whether info button, Value and text are displaying in the per_schools_with_electric_connection vanity 
    card """

    def test_validate_per_schools_with_electric_connection_metrics(self):
        self.logger.info("*************** Tc_cQube_udise_005 Testing started *****************")
        self.udise.click_udise()
        card_info = self.udise.get_per_shools_with_electric_connection_card_info()
        card_value = self.udise.get_per_shools_with_electric_connection_card_value()
        udise_card_value = self.udise.get_integer_value(card_value)
        card_title = self.udise.get_per_shools_with_electric_connection_card_label()
        if card_info is not None and card_title is not None:
            self.logger.info("*********** per_schools_with_electric_connection Card Values is showing ***************")
            assert True
        else:
            self.logger.error(
                "*************** per_schools_with_electric_connection Card Values is Missing ************")
            assert False
        if int(udise_card_value) > 0 and udise_card_value is not None:
            self.logger.info("*********** per_schools_with_electric_connection Card Values is showing ***************")
            assert True
        else:
            self.logger.error(
                "*************** per_schools_with_electric_connection Card Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_Udise_005 Testing ended *****************")

    """Check whether info button, Value and text are displaying in the per_schools_with_library vanity 
    card """

    def test_validate_per_schools_with_library_metrics(self):
        self.logger.info("*************** Tc_cQube_udise_006 Testing started *****************")
        self.udise.click_udise()
        card_info = self.udise.get_per_shools_with_library_card_info()
        card_value = self.udise.get_per_shools_with_library_card_value()
        udise_card_value = self.udise.get_integer_value(card_value)
        card_title = self.udise.get_per_shools_with_library_card_label()
        if card_info is not None and card_title is not None:
            self.logger.info("*********** per_schools_with_library Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** per_schools_with_library Card Values is Missing ************")
            assert False
        if int(udise_card_value) > 0 and udise_card_value is not None:
            self.logger.info("*********** per_schools_with_library Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** per_schools_with_library Card Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_Udise_006 Testing ended *****************")

    """Check whether info button, Value and text are displaying in the per_schools_with_computer vanity 
    card """

    def test_validate_per_schools_with_computer_metrics(self):
        self.logger.info("*************** Tc_cQube_udise_007 Testing started *****************")
        self.udise.click_udise()
        card_info = self.udise.get_per_shools_with_computer_card_info()
        card_value = self.udise.get_per_shools_with_computer_card_value()
        udise_card_value = self.udise.get_integer_value(card_value)
        card_title = self.udise.get_per_shools_with_computer_card_label()
        if card_info is not None and card_title is not None:
            self.logger.info("*********** per_schools_with_computer Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** per_schools_with_computer Card Values is Missing ************")
            assert False
        if int(udise_card_value) > 0 and udise_card_value is not None:
            self.logger.info("*********** per_schools_with_computer Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** per_schools_with_computer Card Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_Udise_007 Testing ended *****************")

    # Implementation status tab
    """Check whether implementation status tab is opening or not"""

    def test_click_on_the_implementation_status_tab_button(self):
        self.logger.info("*************** Tc_cQube_Udise_008 Testing started *****************")
        self.udise.click_udise()
        implementation_status = self.udise.click_implementation_status_tab()
        if "true" == implementation_status:
            self.logger.info("*********** Tab is selecting ***************")
            assert True
        else:
            self.logger.error("*********** Tab is not selecting ***************")
            assert False
        self.logger.info("*************** Tc_cQube_Udise_008 Testing ended *****************")

    """ Check whether font size increase button is working or not"""

    def test_implementation_status_a_plus_button(self):
        self.logger.info("*************** Tc_cQube_Udise_009 Testing started *****************")
        self.udise.click_udise()
        res = self.udise.click_on_A_plus_button()
        if res == 0:
            self.logger.info("*********** A+ button is Clicked ****************")
            assert True
        else:
            self.logger.error("************* A+ button is not clicked and A+ is not working as expected in "
                              "implementation status tab *************")
            assert False
        self.logger.info("*************** Tc_cQube_Udise_009 Testing ended *****************")

    """ Check whether font size decrease button is working or not"""

    def test_implementation_status_a_minus_button(self):
        self.logger.info("*************** Tc_cQube_udise_010 Testing started *****************")
        self.udise.click_udise()
        time.sleep(2)
        res = self.udise.click_on_A_minus_button()
        if res == 0:
            self.logger.info("************* A- button is clicked and A- is working as expected in implementation "
                             "status tab*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A- button is not clicked and A- is not working as expected in "
                              "implementation status tab *************")
            assert False
        self.logger.info("*************** Tc_cQube_udise_010 Testing ended *****************")

    """ Check whether default font size button is working or not"""

    def test_implementation_status_default_button(self):
        self.logger.info("*************** Tc_cQube_udise_011 Testing started *****************")
        self.udise.click_udise()
        time.sleep(2)
        res = self.udise.click_on_A_default_button()
        if res == 0:
            self.logger.info("************* A button is clicked and A is working as expected in implementation status "
                             "tab*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A button is not clicked and A is not working as expected in "
                              "implementation status tab *************")
            assert False
        self.logger.info("*************** Tc_cQube_udise_011 Testing ended *****************")

    """ Check whether tooltip is displaying or not"""

    def test_implementation_status_map_tooltip(self):
        self.logger.info("*************** Tc_cQube_udise_012 Testing started *****************")
        self.udise.click_udise()
        res2 = self.udise.get_map_tooltip_info_validation()
        if "Implemented UDISE+" in res2[0]:
            assert True
            self.logger.info("Selected Option is showing in the map tooltip. ")
        else:
            self.logger.error("Selected Option is not showing in the map tooltip. ")
            assert False
        self.logger.info("*************** Tc_cQube_udise_012 Testing ended *****************")

    # State wise performance
    """ Check whether state wise performance page is displaying or not"""

    def test_click_on_the_state_wise_performance_tab_button(self):
        self.logger.info("*************** Tc_cQube_udise_013 Testing started *****************")
        self.udise.click_udise()
        self.udise.click_on_state_wise_performance()
        state_wise_performance = self.udise.get_state_wise_performance_attribute()
        if "true" == state_wise_performance:
            self.logger.info("************* State_wise_performance Tab is Clicked *************")
            assert True
        else:
            self.logger.error("**************** State_wise_performance Tab is not clicked *********************")
            assert False
        self.logger.info("*************** Tc_cQube_udise_013 Testing started *****************")

    """Check whether font size increase button is working or not"""

    def test_state_wise_performance_a_plus_button(self):
        self.logger.info("*************** Tc_cQube_Udise_014 Testing started *****************")
        self.udise.click_udise()
        res = self.udise.click_on_A_plus_button()
        if res == 0:
            self.logger.info("*********** A+ button is Clicked ****************")
            assert True
        else:
            self.logger.error("************* A+ button is not clicked and A+ is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_Udise_014 Testing ended *****************")

    """Check whether font size decrease button is working or not"""

    def test_state_wise_performance_a_minus_button(self):
        self.logger.info("*************** Tc_cQube_udise_015 Testing started *****************")
        self.udise.click_udise()
        self.udise.click_on_state_wise_performance()
        time.sleep(2)
        res = self.udise.click_on_A_minus_button()
        if res == 0:
            self.logger.info("************* A- button is clicked and A- is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A- button is not clicked and A- is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_udise_015 Testing ended *****************")

    """Check whether default font size button is working or not"""

    def test_state_wise_performance_default_button(self):
        self.logger.info("*************** Tc_cQube_udise_016 Testing started *****************")
        self.udise.click_udise()
        self.udise.click_on_state_wise_performance()
        time.sleep(2)
        res = self.udise.click_on_A_default_button()
        if res == 0:
            self.logger.info("************* A button is clicked and A is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A button is not clicked and A is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_udise_016 Testing ended *****************")

    """Check whether each metric selecting and tooltip is displaying"""

    def test_metric_with_tooltip(self):
        self.logger.info("*************** Tc_cQube_Udise_017 Testing started *****************")
        self.udise.click_udise()
        self.udise.click_on_state_wise_performance()
        self.udise.click_metric_dropdown()
        time.sleep(2)
        options = self.udise.get_metrics_dropdown_values()
        for dropdown in range(len(options)):
            opts = self.udise.get_each_dropdown_value_id(dropdown)
            opt_text = opts.text
            opts.click()
            time.sleep(2)
            result = self.udise.get_map_tooltip_info_validation()
            print(opt_text, result)
            if opt_text in result[0]:
                self.logger.info("*************** State Wise Options having tooltip information "
                                 "********************")
                assert True
            else:
                self.logger.error("*********** Metrics dropdown wise not showing Map Result **************")
                assert False
            self.udise.click_metric_dropdown()
            time.sleep(2)
        self.logger.info("*************** Tc_cQube_Udise_017 Testing ended *****************")

    """Check whether each metric selecting in dropdown or not"""

    def test_each_metric_selecting_in_dropdowm(self):
        self.logger.info("*************** Tc_cQube_Udise_018 Testing started *****************")
        self.udise.click_udise()
        self.udise.click_on_state_wise_performance()
        self.udise.click_metric_dropdown()
        time.sleep(2)
        options = self.udise.get_metrics_dropdown_values()
        for dropdown in range(len(options)):
            opts = self.udise.get_each_dropdown_value_id(dropdown)
            opt_text = opts.text
            opts.click()
            if opt_text in self.driver.page_source:
                assert True
                self.logger.info("*********** Metric in dropdown is selecting  **************")
            else:
                self.logger.error("********* Metric in dropdown is not selecting ***********")
                assert False
            self.udise.click_metric_dropdown()
            time.sleep(3)
        self.logger.info("*************** Tc_cQube_Udise_018 Testing started *****************")

    """ Check whether metric in dropdown is selecting or not"""

    def test_legend(self):
        self.logger.info("*************** Tc_cQube_Udise_019 Testing started *****************")
        self.udise.click_udise()
        self.udise.click_on_state_wise_performance()
        self.udise.click_metric_dropdown()
        time.sleep(2)
        options = self.udise.get_metrics_dropdown_values()
        for dropdown in range(len(options)):
            opts = self.udise.get_each_dropdown_value_id(dropdown)
            opt_text = opts.text
            opts.click()
            time.sleep(3)
            legend = self.udise.get_legend_text()
            if opt_text in legend:
                assert True
                self.logger.info("*********** Metric in  dropdown and legend is same **************")
            else:
                self.logger.error("*********** Metric in  dropdown and legend is not same **************")
                assert False
            self.udise.click_metric_dropdown()
            time.sleep(2)
        self.logger.info("*************** Tc_cQube_Udise_019 Testing started *****************")

    """Check whether dropdown is selecting and values are displaying"""

    def test_metrics_selecting_in_dropdown_and_value_displaying(self):
        self.logger.info("*************** Tc_cQube_Udise_020 Testing started *****************")
        self.udise.click_udise()
        self.udise.click_on_state_wise_performance()
        self.udise.click_on_district_button()
        self.udise.click_metric_dropdown()
        time.sleep(2)
        options = self.udise.get_metrics_dropdown_values()
        for dropdown in range(len(options)):
            opts = self.udise.get_each_dropdown_value_id(dropdown)
            opt_text = opts.text
            opts.click()
            if opt_text in self.driver.page_source:
                assert True
                self.logger.info("*********** Metrics are selecting in the dropdown **************")
            else:
                self.logger.error("*********** Metrics are selecting in the dropdown **************")
                assert False
            self.udise.click_metric_dropdown()
            time.sleep(3)
        self.logger.info("*************** Tc_cQube_Udise_020 Testing ended *****************")

    """Check whether tooltip is displaying or not"""

    def test_metric_value_in_tooltip(self):
        self.logger.info("*************** Tc_cQube_Udise_021 Testing started *****************")
        self.udise.click_udise()
        self.udise.click_on_state_wise_performance()
        self.udise.click_on_district_button()
        self.udise.click_metric_dropdown()
        time.sleep(2)
        options = self.udise.get_metrics_dropdown_values()
        for dropdown in range(len(options)):
            opts = self.udise.get_each_dropdown_value_id(dropdown)
            opt_text = opts.text
            opts.click()
            time.sleep(2)
            result = self.udise.get_map_tooltip_info_validation()
            print(opt_text, result)
            if opt_text in result[0]:
                self.logger.info("*************** State Wise Options having tooltip information "
                                 "********************")
                assert True
            else:
                self.logger.error("*************** State Wise Options not having tooltip information "
                                  "********************")
                assert False
            self.udise.click_metric_dropdown()
            time.sleep(2)
        self.logger.info("*************** Tc_cQube_Udise_021 Testing ended *****************")

    """Check whether legend and metric in dropdown is same"""

    def test_district_page_legend(self):
        self.logger.info("*************** Tc_cQube_Udise_022 Testing started *****************")
        self.udise.click_udise()
        self.udise.click_on_state_wise_performance()
        self.udise.click_on_district_button()
        self.udise.click_metric_dropdown()
        time.sleep(2)
        options = self.udise.get_metrics_dropdown_values()
        for metric_dropdown in range(len(options)):
            opts = self.udise.get_each_dropdown_value_id(metric_dropdown)
            opt_text = opts.text
            opts.click()
            time.sleep(3)
            legend = self.udise.get_legend_text()
            if opt_text in legend:
                assert True
                self.logger.info("*********** Metric in  dropdown and legend is same **************")
            else:
                self.logger.error("*********** Metric in  dropdown and legend is not same **************")
                assert False
            self.udise.click_metric_dropdown()
            time.sleep(2)
        self.logger.info("*************** Tc_cQube_Udise_022 Testing ended *****************")

    def test_district_selection_of_each_metrics_state_options(self):
        self.logger.info("*************** Tc_cQube_Udise_023 Testing started *****************")
        result = []
        self.udise.click_udise()
        self.udise.click_on_state_wise_performance()
        self.udise.click_on_district_button()
        time.sleep(2)
        self.udise.click_metric_dropdown()
        time.sleep(2)
        options = self.udise.get_metrics_dropdown_values()
        count = len(options)
        print(count, "metric dropdown options count")
        for dropdown in range(count):
            metric_ids = self.udise.get_each_dropdown_value_id(dropdown)
            metric_ids.click()
            time.sleep(4)
            self.udise.click_state_dropdown()
            time.sleep(2)
            options = self.udise.get_metrics_dropdown_values()
            count = len(options)
            print(count, "State dropdown options count")
            for state_dropdown in range(count):
                opts = self.udise.get_each_dropdown_value_id(state_dropdown)
                state_name = opts.text
                print(state_name)
                # state_list.append(state_name.text)
                opts.click()
                time.sleep(2)
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
                elif state_name == "Ladakh":
                    state_code.append("LH")
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
                        tooltip_state_name = self.udise.get_tooltip_state_name()
                        tooltip_state_name = tooltip_state_name.text
                        tooltip_state_name = tooltip_state_name.split(" ")
                        if tooltip_state_name[0] in state_name:
                            result.append("true")
                        else:
                            result.append("false")
                    except NoSuchElementException:
                        pass
                self.udise.click_state_dropdown()
                time.sleep(5)
            self.udise.click_metric_dropdown()
            time.sleep(3)
        if "false" not in result:
            assert True
            self.logger.info("*************** dropdowns are selecting and values are displaying *****************")
        else:
            self.logger.error("*************** dropdowns are not selecting and values are not displaying "
                              "*****************")
            assert False
        self.logger.info("*************** Tc_cQube_Udise_023 Testing ended *****************")

    # Correlation
    """Check whether correlation page is displaying or not"""

    def test_click_on_correlation_tab(self):
        self.logger.info("*************** Tc_cQube_udise_024 Testing started *****************")
        self.udise.click_udise()
        self.udise.click_on_correlation_tab()
        correlation = self.udise.get_correlation_attribute()
        if "true" == correlation:
            self.logger.info("************* correlation Tab is Clicked *************")
            assert True
        else:
            self.logger.error("**************** correlation Tab is not clicked *********************")
            assert False
        self.logger.info("*************** Tc_cQube_udise_024 Testing started *****************")

    """Check whether font size increase button is working or not"""

    def test_correlation_a_plus_button(self):
        self.logger.info("*************** Tc_cQube_Udise_025 Testing started *****************")
        self.udise.click_udise()
        res = self.udise.click_on_A_plus_button()
        if res == 0:
            self.logger.info("*********** A+ button is clicked and A+ is working as expected ****************")
            assert True
        else:
            self.logger.error("************* A+ button is not clicked and A+ is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_Udise_025 Testing ended *****************")

    """Check whether font size decrease button is working or not"""

    def test_correlation_a_minus_button(self):
        self.logger.info("*************** Tc_cQube_udise_026 Testing started *****************")
        self.udise.click_udise()
        self.udise.click_on_correlation_tab()
        time.sleep(2)
        res = self.udise.click_on_A_minus_button()
        if res == 0:
            self.driver.refresh()
            assert True
            self.logger.info("************* A- button is clicked and A- is working as expected*************")
        else:
            self.logger.error("************* A- button is not clicked and A- is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_udise_026 Testing ended *****************")

    """Check whether default font size button is working or not"""

    def test_correlation_default_button(self):
        self.logger.info("*************** Tc_cQube_udise_027 Testing started *****************")
        self.udise.click_udise()
        self.udise.click_on_correlation_tab()
        time.sleep(2)
        res = self.udise.click_on_A_default_button()
        if res == 0:
            self.driver.refresh()
            assert True
            self.logger.info("************* A button is clicked and A is working as expected*************")
        else:
            self.logger.error("************* A button is not clicked and A is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_udise_027 Testing ended *****************")

    """Check values in x axis y axis are selecting and tooltip is displaying"""

    def test_x_axis_y_axis_dropdown(self):
        self.logger.info("*************** Tc_cQube_udise_028 Testing started *****************")
        self.udise.click_udise()
        self.udise.click_on_correlation_tab()
        self.udise.click_on_x_axis()
        time.sleep(2)
        options = self.udise.get_x_axis_values()
        count = len(options)
        for dropdown in range(count):
            x_axis_id = self.udise.get_each_dropdown_value_id(dropdown)
            x_axis_id.click()
            time.sleep(4)
            self.udise.click_on_y_axis()
            time.sleep(2)
            options = self.udise.get_y_axis_values()
            count = len(options)
            for y_axis_dropdown in range(count):
                y_axis_id = self.udise.get_each_dropdown_value_id(y_axis_dropdown)
                y_axis_id.click()
                time.sleep(2)
                scatter_plot = self.udise.get_scatter_plot_count()
                if len(scatter_plot) > 0:
                    assert True
                    self.logger.info("************* values in x axis and y axis dropdown are selecting and values are "
                                     "displaying*************")
                else:
                    self.logger.error("************* values in x axis and y axis dropdown are not selecting and "
                                      "values are not displaying*************")
                    assert False
                self.udise.click_on_y_axis()
                time.sleep(2)
            self.udise.click_on_x_axis()
            time.sleep(3)
        self.logger.info("*************** Tc_cQube_udise_028 Testing started *****************")

    """Check values in x axis y axis and state are selecting and tooltip is displaying"""

    def test_x_axis_y_axis_state_options(self):
        self.logger.info("*************** Tc_cQube_udise_029 Testing started *****************")
        self.udise.click_udise()
        self.udise.click_on_correlation_tab()
        self.udise.click_on_district_button()
        self.udise.click_on_x_axis()
        time.sleep(2)
        options = self.udise.get_x_axis_values()
        count = len(options)
        for x_axis_dropdown in range(count):
            x_axis_id = self.udise.get_each_dropdown_value_id(x_axis_dropdown)
            x_axis_id.click()
            time.sleep(4)
            self.udise.click_on_y_axis()
            time.sleep(2)
            options = self.udise.get_y_axis_values()
            count = len(options)
            for y_axis_dropdown in range(count):
                y_axis_id = self.udise.get_each_dropdown_value_id(y_axis_dropdown)
                y_axis_id.click()
                time.sleep(2)
                self.udise.click_state_dropdown()
                time.sleep(2)
                options = self.udise.get_metrics_dropdown_values()
                count = len(options)
                for dropdown in range(count):
                    state_id = self.udise.get_each_dropdown_value_id(dropdown)
                    state_id.click()
                    time.sleep(2)
                    scatter_plot = self.udise.get_scatter_plot_count()
                    if len(scatter_plot) > 0:
                        assert True
                        self.logger.info(
                            "************* values in x axis, y axis and states dropdown are selecting and values are "
                            "displaying*************")
                    else:
                        self.logger.error(
                            "************* values in x axis, y axis and states dropdown are not selecting and values "
                            "are not displaying*************")
                        assert False
                    self.udise.click_state_dropdown()
                    time.sleep(2)
                self.udise.click_on_y_axis()
                time.sleep(2)
            self.udise.click_on_x_axis()
            time.sleep(3)
        self.logger.info("*************** Tc_cQube_udise_029 Testing started *****************")

    """Check values in x axis y axis are selecting in district page and tooltip is displaying"""

    def test_x_axis_y_axis_dropdown_district_page(self):
        self.logger.info("*************** Tc_cQube_udise_030 Testing started *****************")
        self.udise.click_udise()
        self.udise.click_on_correlation_tab()
        self.udise.click_on_district_button()
        self.udise.click_on_x_axis()
        time.sleep(2)
        options = self.udise.get_x_axis_values()
        count = len(options)
        for x_axis_dropdown in range(count):
            x_axis_id = self.udise.get_each_dropdown_value_id(x_axis_dropdown)
            x_axis_id.click()
            time.sleep(4)
            self.udise.click_on_y_axis()
            time.sleep(2)
            options = self.udise.get_y_axis_values()
            count = len(options)
            for y_axis_dropdown in range(count):
                y_axis_id = self.udise.get_each_dropdown_value_id(y_axis_dropdown)
                y_axis_id.click()
                time.sleep(2)
                scatter_plot = self.udise.get_scatter_plot_count()
                if len(scatter_plot) > 0:
                    assert True
                    self.logger.info("************* values in x axis and y axis dropdown are selecting and values are "
                                     "displaying in district page *************")
                else:
                    self.logger.error("************* values in x axis and y axis dropdown are not selecting and "
                                      "values are not displaying in district page *************")
                    assert False
                self.udise.click_on_y_axis()
                time.sleep(2)
            self.udise.click_on_x_axis()
            time.sleep(3)
        self.logger.info("*************** Tc_cQube_udise_030 Testing started *****************")

    """Check values in x axis state are selecting and tooltip is displaying"""

    def test_x_axis_state_dropdown(self):
        self.logger.info("*************** Tc_cQube_udise_031 Testing started *****************")
        self.udise.click_udise()
        self.udise.click_on_correlation_tab()
        self.udise.click_on_district_button()
        self.udise.click_on_x_axis()
        time.sleep(2)
        options = self.udise.get_x_axis_values()
        count = len(options)
        for x_axis_dropdown in range(count):
            x_axis_id = self.udise.get_each_dropdown_value_id(x_axis_dropdown)
            x_axis_id.click()
            time.sleep(4)
            self.udise.click_state_dropdown()
            time.sleep(2)
            options = self.udise.get_metrics_dropdown_values()
            count = len(options)
            for dropdown in range(count):
                state_id = self.udise.get_each_dropdown_value_id(dropdown)
                state_id.click()
                time.sleep(2)
                scatter_plot = self.udise.get_scatter_plot_count()
                if len(scatter_plot) > 0:
                    assert True
                    self.logger.info("************* values in x axis and state dropdown are selecting and values are "
                                     "displaying in district page *************")
                else:
                    self.logger.error("************* values in x axis and state dropdown are not selecting and values "
                                      "are not displaying in district page *************")
                    assert False
                self.udise.click_state_dropdown()
                time.sleep(2)
            self.udise.click_on_x_axis()
            time.sleep(3)
        self.logger.info("*************** Tc_cQube_udise_031 Testing started *****************")

    """Check values in y axis state are selecting and tooltip is displaying"""

    def test_y_axis_state_dropdown(self):
        self.logger.info("*************** Tc_cQube_udise_032 Testing started *****************")
        self.udise.click_udise()
        self.udise.click_on_correlation_tab()
        self.udise.click_on_district_button()
        self.udise.click_on_y_axis()
        time.sleep(2)
        options = self.udise.get_y_axis_values()
        count = len(options)
        for y_axis_dropdown in range(count):
            y_axis_id = self.udise.get_each_dropdown_value_id(y_axis_dropdown)
            y_axis_id.click()
            time.sleep(4)
            self.udise.click_state_dropdown()
            time.sleep(2)
            options = self.udise.get_metrics_dropdown_values()
            count = len(options)
            for dropdown in range(count):
                state_id = self.udise.get_each_dropdown_value_id(dropdown)
                state_id.click()
                time.sleep(2)
                scatter_plot = self.udise.get_scatter_plot_count()
                if len(scatter_plot) > 0:
                    assert True
                    self.logger.info("************* values in y axis and state dropdown are selecting and values are "
                                     "displaying in district page *************")
                else:
                    self.logger.info("************* values in y axis and state dropdown are selecting and values are "
                                     "displaying in district page *************")
                    assert False
                self.udise.click_state_dropdown()
                time.sleep(2)
            self.udise.click_on_y_axis()
            time.sleep(3)
        self.logger.info("*************** Tc_cQube_udise_032 Testing ended *****************")

    @classmethod
    def teardown(cls):
        cls.driver.close()
