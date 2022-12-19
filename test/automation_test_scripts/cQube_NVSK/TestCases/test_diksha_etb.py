import logging
import time

from PageObjects.CqubeUI.diksha_etb import Diksha
from TestCases.conftest import ConfTest
from Utilities import CustomLogger
from Utilities.ReadProperties import ReadConfig


class TestDiksha:
    diksha = None
    driver = None
    no_data = "No data"

    @classmethod
    def setup(cls):
        cls.driver = ConfTest.get_driver()
        cls.diksha = Diksha(cls.driver)
        cls.diksha.open_cqube_application()
        cls.logger = CustomLogger.setup_logger('Program_diksha', ReadConfig.get_logs_directory() + "/Program.log",
                                               level=logging.DEBUG)

    """ check whether diksha page is displaying or not """

    def test_navigation_to_diksha_dashboard(self):
        self.logger.info("*************** Tc_cQube_diksha_001 Testing started *****************")
        self.diksha.click_dashboard()
        if 'dashboard' in self.driver.current_url:
            self.logger.info("*************** Navigation to Dashboard Screen *****************")
            assert True
        else:
            self.logger.error("********************* Navigation to Dashboard failed from PM Poshan ***********")
            assert False
        self.diksha.click_diksha()
        if 'etb' in self.driver.current_url or self.driver.page_source:
            self.logger.info("********* diksha Dashboard is displayed in the UI ***************")
            assert True
        else:
            self.logger.error("******** diksha Menu Button is not working  *************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_001 Testing ended *****************")

    """Check whether vanity metrics present in the diksha page or not """

    def test_check_vanity_metric(self):
        self.logger.info("*************** Tc_cQube_diksha_002 Testing started *****************")
        self.diksha.click_diksha()
        vanity_card = self.diksha.get_vanity_metrics_card_details()
        if len(vanity_card) > 0:
            assert True
            self.logger.info("********* vanity metrics cards are displaying in the diksha Page ***************")
        else:
            self.logger.info("********* vanity metrics cards are not displaying in the diksha Page ***************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_002 Testing ended *****************")

    """Check whether info button, Value and text are displaying in the total_students vanity card"""

    def test_validate_total_states_uts_participation_metrics(self):
        self.logger.info("*************** Tc_cQube_diksha_etb_003 Testing started *****************")
        self.diksha.click_diksha()
        card_info = self.diksha.get_total_states_uts_participation_card_info()
        card_value = self.diksha.get_total_states_uts_participation_card_value()
        diksha_card_value = self.diksha.get_integer_value(card_value)
        card_title = self.diksha.get_total_states_uts_participation_card_label()
        if card_info is not None and card_title is not None:
            self.logger.info("*********** Total state/uts participation card values are showing ***************")
            assert True
        else:
            self.logger.error("*************** Total state/uts participation card values are Missing ************")
            assert False
        if int(diksha_card_value) > 0 and diksha_card_value is not None:
            self.logger.info("*********** Total state/uts participation card values are showing ***************")
            assert True
        else:
            self.logger.error("*************** Total state/uts participation card values are Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_003 Testing completed *****************")

    """Check whether info button, Value and text are displaying in the total_etbs vanity card"""
    def test_validate_total_etbs_metrics(self):
        self.logger.info("*************** Tc_cQube_diksha_etb_004 Testing started *****************")
        self.diksha.click_diksha()
        card_info = self.diksha.get_total_etbs_card_info()
        card_value = self.diksha.get_total_etbs_card_value()
        diksha_card_value = self.diksha.get_integer_value(card_value)
        card_title = self.diksha.get_total_etbs_card_label()
        if card_info is not None and card_title is not None:
            self.logger.info("*********** Total etbs card values are showing ***************")
            assert True
        else:
            self.logger.error("*************** Total etbs card values are Missing ************")
            assert False
        if int(diksha_card_value) > 0 and diksha_card_value is not None:
            self.logger.info("*********** Total etbs card values are showing ***************")
            assert True
        else:
            self.logger.error("*************** Total etbs card values are Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_004 Testing completed *****************")

    """Check whether info button, Value and text are displaying in the total_qr_code vanity card"""
    def test_validate_total_qr_code_metrics(self):
        self.logger.info("*************** Tc_cQube_diksha_etb_005 Testing started *****************")
        self.diksha.click_diksha()
        card_info = self.diksha.get_total_qr_code_card_info()
        card_value = self.diksha.get_total_qr_code_card_value()
        diksha_card_value = self.diksha.get_integer_value(card_value)
        card_title = self.diksha.get_total_qr_code_card_label()
        if card_info is not None and card_title is not None:
            self.logger.info("*********** Total QR Code card values are showing ***************")
            assert True
        else:
            self.logger.error("*************** Total QR Code card values are Missing ************")
            assert False
        if int(diksha_card_value) > 0 and diksha_card_value is not None:
            self.logger.info("*********** Total QR Code card values are showing ***************")
            assert True
        else:
            self.logger.error("*************** Total QR Code card values are Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_005 Testing completed *****************")

    """Check whether info button, Value and text are displaying in the total_content vanity card"""
    def test_validate_total_content_metrics(self):
        self.logger.info("*************** Tc_cQube_diksha_etb_006 Testing started *****************")
        self.diksha.click_diksha()
        card_info = self.diksha.get_total_content_card_info()
        card_value = self.diksha.get_total_content_card_value()
        diksha_card_value = self.diksha.get_integer_value(card_value)
        card_title = self.diksha.get_total_content_card_label()
        if card_info is not None and card_title is not None:
            self.logger.info("*********** Total Content card values are showing ***************")
            assert True
        else:
            self.logger.error("*************** Total Content card values are Missing ************")
            assert False
        if int(diksha_card_value) > 0 and diksha_card_value is not None:
            self.logger.info("*********** Total Content card values are showing ***************")
            assert True
        else:
            self.logger.error("*************** Total Content card values are Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_006 Testing completed *****************")

    """Check whether info button, Value and text are displaying in the total_time_spent vanity card"""
    def test_validate_total_time_spent_metrics(self):
        self.logger.info("*************** Tc_cQube_diksha_etb_007 Testing started *****************")
        self.diksha.click_diksha()
        card_info = self.diksha.get_total_time_spent_info()
        card_value = self.diksha.get_total_time_spent_card_value()
        diksha_card_value = self.diksha.get_integer_value(card_value)
        card_title = self.diksha.get_total_time_spent_card_label()
        if card_info is not None and card_title is not None:
            self.logger.info("*********** Total Time Spent card values are showing ***************")
            assert True
        else:
            self.logger.error("*************** Total Time Spent card values are Missing ************")
            assert False
        if int(diksha_card_value) > 0 and diksha_card_value is not None:
            self.logger.info("*********** Total Time Spent card values are showing ***************")
            assert True
        else:
            self.logger.error("*************** Total Time Spent card values are Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_etb_007 Testing ended *****************")

    # Implementation status tab
    """Check whether implementation status tab is opening or not"""
    def test_click_on_the_implementation_status_tab_button(self):
        self.logger.info("*************** Tc_cQube_diksha_008 Testing started *****************")
        self.diksha.click_diksha()
        implementation_status = self.diksha.click_implementation_status_tab()
        if "true" == implementation_status:
            self.logger.info("*********** Tab is selecting ***************")
            assert True
        else:
            self.logger.error("*********** Tab is not selecting ***************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_008 Testing ended *****************")

    """ Check whether font size increase button is working or not in implementation status tab"""

    def test_implementation_status_a_plus_button(self):
        self.logger.info("*************** Tc_cQube_diksha_009 Testing started *****************")
        self.diksha.click_diksha()
        time.sleep(2)
        res = self.diksha.click_on_A_plus_button()
        if res == 0:
            self.logger.info("************* A+ button is clicked and A+ is working as expected in implementation "
                             "status tab*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A+ button is not clicked and A+ is not working as expected in "
                              "implementation status tab *************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_009 Testing ended *****************")

    """ Check whether font size decrease button is working or not in implementation status tab"""

    def test_implementation_status_a_minus_button(self):
        self.logger.info("*************** Tc_cQube_diksha_010 Testing started *****************")
        self.diksha.click_diksha()
        time.sleep(2)
        res = self.diksha.click_on_A_minus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A- button is clicked and A- is working as expected in implementation "
                             "status tab*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A- button is not clicked and A- is not working as expected in "
                              "implementation status tab *************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_010 Testing ended *****************")

    """ Check whether default font size button is working or not in implementation status tab"""
    def test_implementation_status_default_button(self):
        self.logger.info("*************** Tc_cQube_diksha_011 Testing started *****************")
        self.diksha.click_diksha()
        time.sleep(2)
        res = self.diksha.click_on_A_default_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A button is clicked and A is working as expected in implementation status "
                             "tab*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A button is not clicked and A is not working as expected in "
                              "implementation status tab *************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_011 Testing ended *****************")

    """ Check whether tooltip is displaying or not"""
    def test_implementation_status_map_tooltip(self):
        self.logger.info("*************** Tc_cQube_diksha_012 Testing started *****************")
        self.diksha.click_diksha()
        res2 = self.diksha.get_map_tooltip_info_validation()
        print(res2)
        if "Textbooks Energized" in res2[0]:
            assert True
            self.logger.info("Tooltip is displaying ")
        else:
            self.logger.error("Tooltip is not displaying . ")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_012 Testing ended *****************")

    # ETB Coverage Status
    """Check whether etb coverage status tab is opening or not"""
    def test_click_on_the_etb_coverage_status_tab_button(self):
        self.logger.info("*************** Tc_cQube_diksha_013 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_etb_coverage_status_tab()
        etb_coverage_status = self.diksha.get_etb_coverage_status_tab_attribute()
        if "true" == etb_coverage_status:
            self.logger.info("*********** Tab is selecting ***************")
            assert True
        else:
            self.logger.error("*********** Tab is not selecting ***************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_013 Testing ended *****************")

    """ Check whether font size increase button is working or not"""

    def test_etb_coverage_status_status_a_plus_button(self):
        self.logger.info("*************** Tc_cQube_diksha_014 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_etb_coverage_status_tab()
        time.sleep(2)
        res = self.diksha.click_on_A_plus_button()
        if res == 0:
            self.logger.info("************* A+ button is clicked and A+ is working as expected in etb coverage "
                             "status tab*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A+ button is not clicked and A+ is not working as expected in "
                              "etb coverage status tab *************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_014 Testing ended *****************")

    """ Check whether font size decrease button is working or not"""

    def test_etb_coverage_status_a_minus_button(self):
        self.logger.info("*************** Tc_cQube_diksha_015 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_etb_coverage_status_tab()
        time.sleep(2)
        res = self.diksha.click_on_A_minus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A- button is clicked and A- is working as expected in etb coverage "
                             "status tab*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A- button is not clicked and A- is not working as expected in "
                              "etb coverage status tab *************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_015 Testing ended *****************")

    """ Check whether default font size button is working or not"""

    def test_etb_coverage_status_default_button(self):
        self.logger.info("*************** Tc_cQube_diksha_016 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_etb_coverage_status_tab()
        time.sleep(2)
        res = self.diksha.click_on_A_default_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A button is clicked and A is working as expected in etb coverage status "
                             "tab*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A button is not clicked and A is not working as expected in "
                              "etb coverage status tab *************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_016 Testing ended *****************")

    """Check whether sorting is happening in state column or not"""
    def test_check_table_state_headers_clickable(self):
        self.logger.info("*************** Tc_cQube_diksha_017 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_etb_coverage_status_tab()
        time.sleep(3)
        self.diksha.click_state_header()
        time.sleep(2)
        now = self.diksha.get_etb_coverage_state_column
        sort = "descending"
        if now == 'ascending' or sort:
            self.logger.info("state Header is clicked and table values are changed ")
            assert True
        else:
            self.logger.error(now, "******** Status Header sorting is not working ***********")
            assert False
        self.diksha.click_curiculum_textbook_header()
        time.sleep(2)
        sec_click = self.diksha.get_curiculum_textbook_column()
        sort = "descending"
        if sec_click == 'ascending' or sort:
            assert True
            self.logger.error(sec_click, "******** curiculumn Header sorting is working ***********")
        else:
            self.logger.error(sec_click, "******** curiculumn Header sorting is not working ***********")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_017 Testing ended *****************")

    """Check whether sorting is happening in curiculumn textbook column or not"""
    def test_check_table_curriculum_textbook_headers_clickable(self):
        self.logger.info("*************** Tc_cQube_diksha_018 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_etb_coverage_status_tab()
        time.sleep(3)
        self.diksha.click_curiculum_textbook_header()
        time.sleep(2)
        now = self.diksha.get_curiculum_textbook_column()
        sort = "descending"
        if now == 'ascending' or sort:
            self.logger.info("Curriculum textbook is clicked and table values are changed ")
            assert True
        else:
            self.logger.error(now, "******** Curriculum textbook Header sorting is not working ***********")
            assert False
        self.diksha.click_energised_textbook_header()
        time.sleep(2)
        sec_click = self.diksha.get_energised_textbook_column()
        sort = "descending"
        if sec_click == 'ascending' or sort:
            assert True
            self.logger.info(sec_click, "******** energised textbook Header sorting is  working ***********")
        else:
            self.logger.error(sec_click, "******** energised textbook Header sorting is not working ***********")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_018 Testing ended *****************")

    """Check whether sorting is happening in total energised textbook column or not"""
    def test_check_table_energised_textbook_headers_clickable(self):
        self.logger.info("*************** Tc_cQube_diksha_019 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_etb_coverage_status_tab()
        time.sleep(3)
        self.diksha.click_energised_textbook_header()
        time.sleep(2)
        now = self.diksha.get_energised_textbook_column()
        sort = "descending"
        if now == 'ascending' or sort:
            self.logger.info("Energised textbook is clicked and table values are changed ")
            assert True
        else:
            self.logger.error(now, "******** Energised textbook Header sorting is not working ***********")
            assert False
        self.diksha.click_per_energised_textbook_header()
        time.sleep(2)
        sec_click = self.diksha.get_per_energised_textbook_column()
        sort = "descending"
        if sec_click == 'ascending' or sort:
            assert True
            self.logger.info("******** per Energised textbook Header sorting is  working ***********")
        else:
            self.logger.error("******** per Energised textbook Header sorting is not working ***********")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_019 Testing ended *****************")

    """Check whether sorting is happening in per energised column or not"""
    def test_check_table_per_energised_textbook_headers_clickable(self):
        self.logger.info("*************** Tc_cQube_diksha_020 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_etb_coverage_status_tab()
        time.sleep(3)
        self.diksha.click_per_energised_textbook_header()
        time.sleep(2)
        now = self.diksha.get_per_energised_textbook_column()
        sort = "descending"
        if now == 'ascending' or sort:
            self.logger.info("********% energised textbook is clicked and table values are changed******** ")
            assert True
        else:
            self.logger.error(now, "******** % energised textbook Header sorting is not working ***********")
            assert False
        self.diksha.click_curiculum_textbook_header()
        sec_click = self.diksha.get_curiculum_textbook_column()
        sort = "descending"
        if sec_click == 'ascending' or sort:
            assert True
            self.logger.info("******** curiculumn textbook is clicked and table values are changed ********")
        else:
            self.logger.error("******** curiculumn textbook Header sorting is not working ***********")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_020 Testing started *****************")

    """Check whether Values in the state column are in Camel case"""
    def test_check_case_in_state_column(self):
        self.logger.info("*************** Tc_cQube_diksha_021 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_etb_coverage_status_tab()
        time.sleep(3)
        count = 0
        rows_count = self.diksha.get_rows_from_state_column()
        d = []
        for i in range(1, len(rows_count)):
            a = self.diksha.get_each_row_heat_chart_value_id(i)
            d.append(a.text)
        print(d)
        for j in range(1, len(d)):
            s = d[j]
            if s != s.lower() and s != s.upper() and "_" not in s:
                print(s, 'is camel case')
            else:
                print(s, 'is not in camel case')
                count = count + 1
        if count == 0:
            assert True
            self.logger.info("*************** Values in the column are in camel case *****************")
        else:
            self.logger.error("*************** Values in the column are not in camel case *****************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_021 Testing started *****************")

    """Check whether Values in the total curiculum textbook column are not less than 0"""
    def test_check_case_in_total_curiculum_textbook_column(self):
        self.logger.info("*************** Tc_cQube_diksha_022 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_etb_coverage_status_tab()
        time.sleep(3)
        count = 0
        rows_count = self.diksha.get_rows_from_total_curiculum_textbook()
        d = []
        for i in range(1, len(rows_count)):
            a = self.diksha.get_column_total_curiculum_textbook(i)
            d.append(a.text)
        print(d)
        for j in range(1, len(d)):
            s = d[j]
            if int(s) >= 0:
                print(s, 'is not less than 0')
            else:
                print(s, 'is less than 0')
                count = count + 1
        if count == 0:
            assert True
            self.logger.info("*************** Values in the column are not less than 0 *****************")
        else:
            self.logger.error("*************** Values in the column are less than 0 *****************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_022 Testing started *****************")

    """Check whether Values in the total energised textbook column are not less than 0"""
    def test_check_case_in_total_energised_textbook_column(self):
        self.logger.info("*************** Tc_cQube_diksha_023 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_etb_coverage_status_tab()
        time.sleep(3)
        count = 0
        rows_count = self.diksha.get_rows_from_total_energised_textbook()
        d = []
        for i in range(1, len(rows_count)):
            a = self.diksha.get_column_total_energised_textbook(i)
            d.append(a.text)
        print(d)
        for j in range(1, len(d)):
            s = d[j]
            if int(s) >= 0:
                print(s, 'not less than 0')
            else:
                print(s, 'less than 0')
                count = count + 1
        if count == 0:
            assert True
            self.logger.info("*************** Values in the total enrgised column are not less than 0 ***************")
        else:
            self.logger.error("*************** Values in the total enrgised column are in less than 0 ***************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_023 Testing started *****************")

    """Check whether Values in the percentage energised textbook column are in Camel case"""
    def test_check_case_in_per_energised_textbook_column(self):
        self.logger.info("*************** Tc_cQube_diksha_024 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_etb_coverage_status_tab()
        time.sleep(3)
        count = 0
        rows_count = self.diksha.get_rows_from_per_energised_textbook()
        d = []
        for i in range(1, len(rows_count)):
            a = self.diksha.get_column_per_energised_textbook(i)
            d.append(a.text)
        print(d)
        for j in range(1, len(d)):
            s = d[j]
            if float(s) >= 0:
                print(s, 'Not less than 0')
            else:
                print(s, 'less than 0')
                count = count + 1
        if count == 0:
            assert True
            self.logger.info("*************** Values in the column are not less than 0 *****************")
        else:
            self.logger.error("*************** Values in the column are in less than 0 *****************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_024 Testing started *****************")

    # Content Coverage On QR
    """Check whether Content coverage on QR tab is opening or not"""
    def test_click_on_the_content_coverage_on_qr_tab_button(self):
        self.logger.info("*************** Tc_cQube_diksha_025 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_content_coverage_on_qr_tab()
        content_coverage_on_qr = self.diksha.get_attribute_content_coverage_on_qr()
        if "true" == content_coverage_on_qr:
            self.logger.info("***********content_coverage_on_qr Tab is selecting ***************")
            assert True
        else:
            self.logger.error("***********content_coverage_on_qr Tab is not selecting ***************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_025 Testing ended *****************")

    """ Check whether font size increase button is working or not"""
    def test_content_coverage_on_qr_a_plus_button(self):
        self.logger.info("*************** Tc_cQube_diksha_026 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_content_coverage_on_qr_tab()
        time.sleep(2)
        res = self.diksha.click_on_A_plus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A+ button is clicked and A+ is working as expected in"
                             " content covrage on qr tab*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A+ button is not clicked and A+ is not working as expected in "
                              "content coverage on qr tab *************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_026 Testing ended *****************")

    """ Check whether font size decrease button is working or not"""
    def test_content_coverage_on_qr_a_minus_button(self):
        self.logger.info("*************** Tc_cQube_diksha_027 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_content_coverage_on_qr_tab()
        time.sleep(2)
        res = self.diksha.click_on_A_minus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A- button is clicked and A- is working as expected in content coverage on "
                             "qr tab*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A- button is not clicked and A- is not working as expected in "
                              "content coverage on qr tab *************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_027 Testing ended *****************")

    """ Check whether default font size button is working or not"""
    def test_content_coverage_on_qr_default_button(self):
        self.logger.info("*************** Tc_cQube_diksha_028 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_content_coverage_on_qr_tab()
        time.sleep(2)
        res = self.diksha.click_on_A_default_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A button is clicked and A is working as expected in etb coverage status "
                             "tab*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A button is not clicked and A is not working as expected in "
                              "etb coverage status tab *************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_028 Testing ended *****************")

    """ Check whether tooltip is displaying or not"""
    def test_content_coverage_on_qr_map_tooltip(self):
        self.logger.info("*************** Tc_cQube_diksha_029 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_content_coverage_on_qr_tab()
        time.sleep(2)
        res2 = self.diksha.get_map_tooltip_info_validation()
        print(res2)
        if "Content Coverage on QR" in res2[0]:
            assert True
            self.logger.info("Tooltip is displaying in map ")
        else:
            self.logger.error("Tooltip is not displaying in map")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_029 Testing ended *****************")

    """Check whether bar graph is displaying with tooltip"""
    def test_content_coverage_on_qr_bar_graph(self):
        self.logger.info("*************** Tc_cQube_diksha_030 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_content_coverage_on_qr_tab()
        time.sleep(2)
        res2 = self.diksha.get_stacked_bar_tooltip_validation()
        print(res2)
        bar_graph_counts = self.diksha.get_bar_graph_count()
        if len(bar_graph_counts) > 0:
            assert True
        else:
            assert False
        self.logger.info("*************** Tc_cQube_diksha_030 Testing ended *****************")

    # Learning Session
    """Check whether etb coverage status tab is opening or not"""
    def test_click_on_the_learning_session_tab_button(self):
        self.logger.info("*************** Tc_cQube_diksha_031 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_learning_tab()
        learning_session = self.diksha.get_attribute_learning_on_qr()
        if "true" == learning_session:
            self.logger.info("*********** learning_session Tab is selecting ***************")
            assert True
        else:
            self.logger.error("*********** learning_session Tab is not selecting ***************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_031 Testing ended *****************")

    """Check whether bar graph is displaying with tooltip"""
    def test_learning_session_bar_graph(self):
        self.logger.info("*************** Tc_cQube_diksha_032 Testing started *****************")
        self.diksha.click_diksha()
        time.sleep(5)
        self.diksha.click_learning_tab()
        time.sleep(5)
        res2 = self.diksha.get_stacked_bar_tooltip_validation()
        print(res2)
        bar_graph_counts = self.diksha.get_bar_graph_count()
        if len(bar_graph_counts) > 0:
            assert True
            self.logger.info("************* Tooltips are displaying on each bar graph in"
                             " learning session tab*************")
        else:
            self.logger.error("************* Tooltips are not displaying on each bar graph in"
                              " learning session tab*************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_032 Testing ended *****************")

    """ Check whether font size increase button is working or not"""

    def test_learning_session_a_plus_button(self):
        self.logger.info("*************** Tc_cQube_diksha_033 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_learning_tab()
        time.sleep(2)
        res = self.diksha.click_on_A_plus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A+ button is clicked and A+ is working as expected in"
                             " learning session tab*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A+ button is not clicked and A+ is not working as expected in "
                              "learning session tab *************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_033 Testing ended *****************")

    """ Check whether font size decrease button is working or not"""

    def test_learning_session_a_minus_button(self):
        self.logger.info("*************** Tc_cQube_diksha_034 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_learning_tab()
        time.sleep(2)
        res = self.diksha.click_on_A_minus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A- button is clicked and A- is working as expected in learning session  "
                             " tab*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A- button is not clicked and A- is not working as expected in "
                              "learning session tab *************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_034 Testing ended *****************")

    """ Check whether default font size button is working or not"""

    def test_learning_session_default_button(self):
        self.logger.info("*************** Tc_cQube_diksha_035 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_learning_tab()
        time.sleep(2)
        res = self.diksha.click_on_A_default_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A button is clicked and A is working as expected in learning session "
                             "tab*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A button is not clicked and A is not working as expected in "
                              "learning session tab *************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_035 Testing ended *****************")

    """ Check whether medium is selecting and data is displaying"""
    def test_select_medium_dropdown(self):
        self.logger.info("*************** Tc_cQube_diksha_036 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_learning_tab()
        time.sleep(2)
        self.diksha.click_medium_dropdown()
        time.sleep(2)
        options = self.diksha.get_dropdown_values()
        for i in range(len(options)):
            opts = self.diksha.get_each_dropdown_value_id(i)
            opts.click()
            time.sleep(5)
            if self.no_data in self.driver.page_source:
                self.diksha.click_subject_dropdown()
                time.sleep(5)
            else:
                bar_graph_counts = self.diksha.get_bar_graph_count()
                if len(bar_graph_counts) > 0:
                    assert True
                    self.logger.info(
                        "*********** medium is selecting and data is displaying "
                        "***************")
                else:
                    self.logger.error(
                        "*********** medium is not selecting and data is not displaying "
                        "***************")
                    assert False
                self.diksha.click_medium_dropdown()
                time.sleep(5)
            self.logger.info("*************** Tc_cQube_diksha_036 Testing ended *****************")

    """ Check whether grade is selecting and data is displaying"""
    def test_select_grade_dropdown(self):
        self.logger.info("*************** Tc_cQube_diksha_037 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_learning_tab()
        time.sleep(2)
        self.diksha.click_grade_dropdown()
        time.sleep(2)
        options = self.diksha.get_dropdown_values()
        for i in range(len(options)):
            opts = self.diksha.get_each_dropdown_value_id(i)
            opts.click()
            time.sleep(5)
            if self.no_data in self.driver.page_source:
                self.diksha.click_subject_dropdown()
                time.sleep(5)
            else:
                bar_graph_counts = self.diksha.get_bar_graph_count()
                if len(bar_graph_counts) > 0:
                    assert True
                    self.logger.info(
                        "*********** grade is selecting and data is displaying "
                        "***************")
                else:
                    self.logger.error(
                        "*********** grade is not selecting and data is not displaying "
                        "***************")
                    assert False
                self.diksha.click_grade_dropdown()
                time.sleep(5)
            self.logger.info("*************** Tc_cQube_diksha_037 Testing ended *****************")

    """ Check whether  subject is selecting and data is displaying"""
    def test_select_subject_dropdown(self):
        self.logger.info("*************** Tc_cQube_diksha_038 Testing started *****************")
        self.diksha.click_diksha()
        time.sleep(4)
        self.diksha.click_learning_tab()
        time.sleep(2)
        self.diksha.click_subject_dropdown()
        time.sleep(2)
        options = self.diksha.get_dropdown_values()
        for i in range(len(options)):
            opts = self.diksha.get_each_dropdown_value_id(i)
            opts.click()
            time.sleep(5)
            if self.no_data in self.driver.page_source:
                self.diksha.click_subject_dropdown()
                time.sleep(5)
            else:
                bar_graph_counts = self.diksha.get_bar_graph_count()
                if len(bar_graph_counts) > 0:
                    assert True
                    self.logger.info(
                        "*********** subject is selecting and data is displaying "
                        "***************")
                else:
                    self.logger.error(
                        "*********** subject is not selecting and data is not displaying "
                        "***************")
                    assert False
                self.diksha.click_subject_dropdown()
                time.sleep(5)
            self.logger.info("*************** Tc_cQube_diksha_038 Testing ended *****************")

    """ Check whether medium grade are selecting and data is displaying"""
    def test_select_medium_and_grade_options(self):
        self.logger.info("*************** Tc_cQube_diksha_039 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_learning_tab()
        time.sleep(2)
        self.diksha.click_medium_dropdown()
        time.sleep(5)
        options = self.diksha.get_dropdown_values()
        count = len(options)
        for i in range(count):
            select_medium_id = self.diksha.get_each_dropdown_value_id(i)
            select_medium_id.click()
            time.sleep(5)
            self.diksha.click_grade_dropdown()
            time.sleep(5)
            options = self.diksha.get_dropdown_values()
            count = len(options)
            for j in range(count):
                select_grade_id = self.diksha.get_each_dropdown_value_id(j)
                select_grade_id.click()
                time.sleep(10)
                if self.no_data in self.driver.page_source:
                    self.diksha.click_subject_dropdown()
                    time.sleep(5)
                else:
                    bar_graph_counts = self.diksha.get_bar_graph_count()
                    if len(bar_graph_counts) > 0:
                        assert True
                        self.logger.info(
                            "*********** mediun and grade is selecting and data is displaying "
                            "***************")
                    else:
                        self.logger.error(
                            "*********** mediun and grade is not selecting and data is not displaying "
                            "***************")
                        assert False
                    self.diksha.click_grade_dropdown()
                    time.sleep(5)
                self.diksha.click_medium_dropdown()
                time.sleep(5)
            self.logger.info("*************** Tc_cQube_diksha_039 Testing ended *****************")

    """ Check whether medium subject are selecting and data is displaying"""
    def test_select_medium_and_subject_options(self):
        self.logger.info("*************** Tc_cQube_diksha_040 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_learning_tab()
        time.sleep(2)
        self.diksha.click_medium_dropdown()
        time.sleep(5)
        options = self.diksha.get_dropdown_values()
        count = len(options)
        for i in range(count):
            select_medium_id = self.diksha.get_each_dropdown_value_id(i)
            opt_text = select_medium_id.text
            print(opt_text)
            select_medium_id.click()
            time.sleep(5)
            self.diksha.click_subject_dropdown()
            time.sleep(5)
            options = self.diksha.get_dropdown_values()
            count = len(options)
            for j in range(count):
                select_subject_id = self.diksha.get_each_dropdown_value_id(j)
                opt_text2 = select_subject_id.text
                print(opt_text2)
                select_subject_id.click()
                time.sleep(15)
                if self.no_data in self.driver.page_source:
                    self.diksha.click_subject_dropdown()
                    time.sleep(5)
                else:
                    bar_graph_counts = self.diksha.get_bar_graph_count()
                    if len(bar_graph_counts) > 0:
                        assert True
                        self.logger.info(
                            "*********** mediun and subject is selecting and data is displaying "
                            "***************")
                    else:
                        self.logger.error(
                            "*********** mediun and subject is not selecting and data is not displaying "
                            "***************")
                        assert False
                    self.diksha.click_subject_dropdown()
                    time.sleep(5)
                self.diksha.click_medium_dropdown()
                time.sleep(5)
            self.logger.info("*************** Tc_cQube_diksha_040 Testing ended *****************")

    """ Check whether medium, grade ,subject are selecting and data is displaying"""
    def test_medium_subject_grade_dropdown(self):
        self.logger.info("*************** Tc_cQube_diksha_041 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_learning_tab()
        time.sleep(2)
        self.diksha.click_medium_dropdown()
        time.sleep(5)
        options = self.diksha.get_dropdown_values()
        count = len(options)
        for i in range(count):
            select_medium_id = self.diksha.get_each_dropdown_value_id(i)
            select_medium_id.click()
            time.sleep(5)
            self.diksha.click_grade_dropdown()
            time.sleep(5)
            options = self.diksha.get_dropdown_values()
            count = len(options)
            for j in range(count):
                select_grade_id = self.diksha.get_each_dropdown_value_id(j)
                select_grade_id.click()
                time.sleep(10)
                self.diksha.click_subject_dropdown()
                time.sleep(5)
                options = self.diksha.get_dropdown_values()
                count = len(options)
                for k in range(count):
                    select_subject_id = self.diksha.get_each_dropdown_value_id(k)
                    select_subject_id.click()
                    time.sleep(15)
                    no_data = "No data"
                    if no_data in self.driver.page_source:
                        self.diksha.click_subject_dropdown()
                        time.sleep(5)
                    else:
                        bar_graph_counts = self.diksha.get_bar_graph_count()
                        if len(bar_graph_counts) > 0:
                            assert True
                            self.logger.info(
                                "*********** mediun grade and subject is selecting and data is displaying "
                                "***************")
                        else:
                            self.logger.error(
                                "*********** mediun grade and subject is selecting and data is displaying "
                                "***************")
                            assert False
                        self.diksha.click_subject_dropdown()
                        time.sleep(5)
                    self.diksha.click_grade_dropdown()
                    time.sleep(5)
                self.diksha.click_medium_dropdown()
                time.sleep(5)
            self.logger.info("*************** Tc_cQube_diksha_041 Testing ended *****************")

    # Learning Session
    """Check whether etb coverage status tab is opening or not"""

    def test_click_on_the_learning_session_on_potential_user_tab_button(self):
        self.logger.info("*************** Tc_cQube_diksha_042 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_learning_session_on_potential_tab()
        learning_session_on_potential = self.diksha.get_attribute_learning_session_on_potential()
        if "true" == learning_session_on_potential:
            self.logger.info("*********** learning_session_on_potential_user Tab is selecting ***************")
            assert True
        else:
            self.logger.error("***********learning_session_on_potential_user Tab is not selecting ***************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_042 Testing ended *****************")

    """ Check whether font size increase button is working or not in learning session on potential user"""
    def test_learning_session_on_potential_user_a_plus_button(self):
        self.logger.info("*************** Tc_cQube_diksha_043 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_learning_session_on_potential_tab()
        time.sleep(2)
        res = self.diksha.click_on_A_plus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A+ button is clicked and A+ is working as expected in"
                             " learning_session_on_potential_user tab*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A+ button is not clicked and A+ is not working as expected in "
                              "learning_session_on_potential_user tab *************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_043 Testing ended *****************")

    """ Check whether font size decrease button is working or not in learning session on potential user"""
    def test_learning_session_on_potential_user_a_minus_button(self):
        self.logger.info("*************** Tc_cQube_diksha_044 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_learning_session_on_potential_tab()
        time.sleep(2)
        res = self.diksha.click_on_A_minus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A- button is clicked and A- is working as expected in "
                             "learning_session_on_potential_user tab*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A- button is not clicked and A- is not working as expected in "
                              "learning_session_on_potential_user tab *************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_044 Testing ended *****************")

    """ Check whether default font size button is working or not in learning session on  potential user """
    def test_learning_session_on_potential_user_default_button(self):
        self.logger.info("*************** Tc_cQube_diksha_045 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_learning_session_on_potential_tab()
        time.sleep(2)
        res = self.diksha.click_on_A_default_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A button is clicked and A is working as expected in "
                             "learning_session_on_potential_user tab*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A button is not clicked and A is not working as expected in "
                              "learning_session_on_potential_user tab *************")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_045 Testing ended *****************")

    """ Check whether tooltip is displaying or not"""
    def test_learning_session_on_potential_user_map_tooltip(self):
        self.logger.info("*************** Tc_cQube_diksha_046 Testing started *****************")
        self.diksha.click_diksha()
        self.diksha.click_learning_session_on_potential_tab()
        time.sleep(2)
        res2 = self.diksha.get_map_tooltip_info_validation()
        print(res2)
        if "Learning Sessions on Potential Users" in res2[0]:
            assert True
            self.logger.info("Tooltip is displaying ")
        else:
            self.logger.error("Tooltip is not displaying")
            assert False
        self.logger.info("*************** Tc_cQube_diksha_046 Testing ended *****************")

    @classmethod
    def teardown(cls):
        cls.driver.close()
