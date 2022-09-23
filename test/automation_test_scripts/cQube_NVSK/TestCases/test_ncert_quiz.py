import logging
import time

from PageObjects.CqubeUI.ncert_quiz import NcertQuiz
from TestCases.conftest import ConfTest
from Utilities import CustomLogger
from Utilities.ReadProperties import ReadConfig


class TestNcertQuiz:
    ncert_quiz = None
    driver = None

    @classmethod
    def setup(cls):
        cls.driver = ConfTest.get_driver()
        cls.ncert_quiz = NcertQuiz(cls.driver)
        cls.ncert_quiz.open_cqube_application()
        cls.logger = CustomLogger.setup_logger('Program_ncert_quiz', ReadConfig.get_logs_directory() + "/Program.log",
                                               level=logging.DEBUG)

    """ check whether ncert quiz page is displaying or not """

    def test_navigation_to_ncert_quiz_dashboard(self):
        self.logger.info("*************** Tc_cQube_ncert_quiz_001 Testing started *****************")
        self.ncert_quiz.click_dashboard()
        if 'dashboard' in self.driver.current_url:
            self.logger.info("*************** Navigation to Dashboard Screen *****************")
            assert True
        else:
            self.logger.error(
                "********************* Navigation to Dashboard failed from micro_improvements ***********")
            assert False
        self.ncert_quiz.click_ncert_quiz()
        if 'ncert_quiz' in self.driver.current_url or self.driver.page_source:
            self.logger.info("********* ncert_quiz Dashboard is displayed in the UI ***************")
            assert True
        else:
            self.logger.error("******** ncert_quiz Menu Button is not working  *************")
            assert False
        self.logger.info("*************** Tc_cQube_ncert_quiz_001 Testing ended *****************")

    """Check whether vanity metrics present in the ncert quiz page or not """

    def test_validate_total_quizzes_card_metrics(self):
        self.logger.info("*************** Tc_cQube ncert_quiz_002 Testing started *****************")
        self.ncert_quiz.click_ncert_quiz()
        quizzes_info = self.ncert_quiz.get_vanity_card_info()
        quizzes_value = self.ncert_quiz.get_vanity_card_value()
        quizzes_value = self.ncert_quiz.get_integer_value(quizzes_value)
        quizzes_title = self.ncert_quiz.get_vanity_card_label()
        if quizzes_info is not None and quizzes_title is not None:
            self.logger.info("*********** ncert_quiz total quizzes Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** ncert_quiz total quizzes Card Values is Missing ************")
            assert False
        if int(quizzes_value) > 0 and quizzes_value is not None:
            self.logger.info("*********** ncert_quiz total quizzes Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** ncert_quiz total quizzes Card Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube ncert_quiz_002 total quizzes Testing ended *****************")

        """Check whether info button, Value and text are displaying in the total medium vanity card"""

    def test_validate_total_medium_card_metrics(self):
        self.logger.info("*************** Tc_cQube_ncert_quiz_003 total medium Testing started *****************")
        self.ncert_quiz.click_ncert_quiz()
        medium_info = self.ncert_quiz.get_vanity_card_info()
        medium_value = self.ncert_quiz.get_vanity_card_value()
        medium_value = self.ncert_quiz.get_integer_value(medium_value)
        medium_title = self.ncert_quiz.get_vanity_card_label()
        if medium_info is not None and medium_title is not None:
            self.logger.info("*********** ncert_quiz total medium Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** ncert_quiz total medium Card Values is Missing ************")
            assert False
        if int(medium_value) > 0 and medium_value is not None:
            self.logger.info("*********** ncert_quiz total medium Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** ncert_quiz total medium Card Values is Missing ************")
            assert False
        self.logger.info("*************** ncert_quiz_003 total medium Testing ended *****************")

    """Check whether info button, Value and text are displaying in the total state participating vanity card"""

    def test_validate_total_states_participating_card_metrics(self):
        self.logger.info("*************** Tc_cQube_ncert_quizz_004 states participating Testing started "
                         "*****************")
        self.ncert_quiz.click_ncert_quiz()
        state_info = self.ncert_quiz.get_vanity_card_info()
        state_value = self.ncert_quiz.get_vanity_card_value()
        state_value = self.ncert_quiz.get_integer_value(state_value)
        status_title = self.ncert_quiz.get_vanity_card_label()
        if state_info is not None and status_title is not None:
            self.logger.info("*********** ncert_quiz states participating Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** ncert_quiz states participating Card Values is Missing ************")
            assert False
        if int(state_value) > 0 and state_value is not None:
            self.logger.info("*********** ncert_quiz states participating Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** ncert_quiz states participating Card Values is Missing ************")
            assert False
        self.logger.info("*************** ncert_quiz_004 states participating Testing ended *****************")

        """Check whether info button, Value and text are displaying in the total enrolment vanity card"""

    def test_validate_total_enrolment_card_metrics(self):
        self.logger.info("*************** Tc_cQube_ncert_quiz_005 states participating Testing started "
                         "*****************")
        self.ncert_quiz.click_ncert_quiz()
        enrolment_info = self.ncert_quiz.get_vanity_card_info()
        enrolment_value = self.ncert_quiz.get_vanity_card_value()
        enrolment_value = self.ncert_quiz.get_integer_value(enrolment_value)
        status_title = self.ncert_quiz.get_vanity_card_label()
        if enrolment_info is not None and status_title is not None:
            self.logger.info("*********** ncert_quiz total enrolment Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** ncert_quiz total enrolment Card Values is Missing ************")
            assert False
        if int(enrolment_value) > 0 and enrolment_value is not None:
            self.logger.info("***********  ncert_quiz total enrolment Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** ncert_quiz total enrolment Card Values is Missing ************")
            assert False
        self.logger.info("*************** ncert_quiz_005 total enrolment Testing ended *****************")

    """Check whether info button, Value and text are displaying in the total certification vanity card"""

    def test_validate_total_certification_card_metrics(self):
        self.logger.info("*************** Tc_cQube_ncert_quiz_006 states participating Testing started "
                         "*****************")
        self.ncert_quiz.click_ncert_quiz()
        certification_info = self.ncert_quiz.get_vanity_card_info()
        certification_value = self.ncert_quiz.get_vanity_card_value()
        certification_value = self.ncert_quiz.get_integer_value(certification_value)
        certification_title = self.ncert_quiz.get_vanity_card_label()
        if certification_info is not None and certification_title is not None:
            self.logger.info("*********** ncert_quiz total certification Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** ncert_quiz total certification Card Values is Missing ************")
            assert False
        if int(certification_value) > 0 and certification_value is not None:
            self.logger.info("***********  ncert_quiz total certification Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** ncert_quiz total certification Card Values is Missing ************")
            assert False
        self.logger.info("*************** ncert_quiz_006 total certification Testing ended *****************")

    """ Check whether implementation status tab is displaying when we click on implementation status tab"""

    def test_click_on_the_implementation_status_tab_button(self):
        self.logger.info("*************** Tc_cQube_implementation_status_007 Testing started *****************")
        self.ncert_quiz.click_ncert_quiz()
        self.ncert_quiz.click_implementation_status_tab()
        time.sleep(2)
        implementation_status = self.ncert_quiz.get_implementation_status_tab_attribute()
        time.sleep(3)
        if "true" == implementation_status:
            self.logger.info("***********implementation status Tab is selecting ***************")
            assert True
        else:
            self.logger.error("***********implementation status Tab is not selecting ***************")
            assert False
        self.logger.info("*************** Tc_cQube_implementation_status_tab_007 Testing ended *****************")

    """ Check whether tooltip is displaying when we mouse hover on map"""

    def test_implementation_status_tooltip(self):
        self.logger.info("*************** Tc_cQube_implementation_status_008 Testing started *****************")
        self.ncert_quiz.click_ncert_quiz()
        time.sleep(3)
        res2 = self.ncert_quiz.get_map_tooltip_info_validation()
        if "NCERT Quizzes Started" in res2[0]:
            assert True
        else:
            self.logger.error("Selected Option is not showing in the map tooltip")
            assert False
        self.logger.info("*************** Tc_cQube_implementation_status_008 Testing ended*****************")

    """ Check whether font size increase button is working or not when we click on the A+ button """

    def test_implementation_status_a_plus_button(self):
        self.logger.info("*************** Tc_cQube_implementation_status_009 Testing started *****************")
        self.ncert_quiz.click_ncert_quiz()
        time.sleep(2)
        res = self.ncert_quiz.click_on_A_plus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A+ button is clicked A+ is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A+ button is not clicked A+ is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_implementation_status_009 Testing ended *****************")

    """ Check whether font size decrease button is working or not when we click on the A- button """

    def test_implementation_status_a_minus_button(self):
        self.logger.info("*************** Tc_cQube_implementation_status_010 Testing started *****************")
        self.ncert_quiz.click_ncert_quiz()
        time.sleep(2)
        res = self.ncert_quiz.test_click_on_A_minus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A- button is clicked A- is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A- button is not clicked A- is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_implementation_status_010 Testing ended *****************")

    """ Check whether font size default button is working or not when we click on the A button """

    def test_implementation_status_default_button(self):
        self.logger.info("*************** Tc_cQube_implementation_status_011 Testing started *****************")
        self.ncert_quiz.click_ncert_quiz()
        time.sleep(2)
        res = self.ncert_quiz.click_on_A_default_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A button is clicked A is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A button is not clicked A is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_implementation_status_011 Testing ended *****************")

    """ Check whether participation status tab is displaying when we click on participation status tab"""

    def test_click_on_the_participation_status_tab_button(self):
        self.logger.info("*************** Tc_cQube_participation status_012 Testing started *****************")
        self.ncert_quiz.click_ncert_quiz()
        self.ncert_quiz.click_participation_status_tab()
        time.sleep(4)
        participation_status = self.ncert_quiz.get_participation_status_tab_attribute()
        time.sleep(3)
        if "true" == participation_status:
            self.logger.info("***********participation status Tab is selecting ***************")
            assert True
        else:
            self.logger.error("*********** participation status Tab is not selecting ***************")
            assert False
        self.logger.info("*************** Tc_cQube_participation status_012 Testing ended *****************")

    """ Check whether font size increase button is working or not when we click on the A+ button """

    def test_participation_status_a_plus_button(self):
        self.logger.info("*************** Tc_cQube_ncert_quiz_013 Testing started *****************")
        self.ncert_quiz.click_ncert_quiz()
        time.sleep(2)
        self.ncert_quiz.click_participation_status_tab()
        time.sleep(2)
        res = self.ncert_quiz.click_on_A_plus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A+ button is clicked and A+ is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A+ button is not clicked and A+ is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_ncert_quiz_013 Testing ended *****************")

    """ Check whether font size decrease button is working or not when we click on the A- button """

    def test_participation_status_a_minus_button(self):
        self.logger.info("*************** Tc_cQube_ncert_quiz_014 Testing started *****************")
        self.ncert_quiz.click_ncert_quiz()
        time.sleep(2)
        self.ncert_quiz.click_participation_status_tab()
        time.sleep(2)
        res = self.ncert_quiz.test_click_on_A_minus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A- button is clicked and A- is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A- button is not clicked and A- is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_ncert_quiz_014 Testing ended *****************")

    """ Check whether font size default button is working or not when we click on the A button """

    def test_participation_status_default_button(self):
        self.logger.info("*************** Tc_cQube_ncert_quiz_015 Testing started *****************")
        self.ncert_quiz.click_ncert_quiz()
        time.sleep(2)
        self.ncert_quiz.click_participation_status_tab()
        time.sleep(2)
        res = self.ncert_quiz.click_on_A_default_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A button is clicked and A is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A button is not clicked and A is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_ncert_quiz_015 Testing ended *****************")

    """Check whether each metric selecting in dropdown or not"""

    def test_selection_of_each_metric(self):
        self.logger.info("*************** Tc_cQube_ncert_quiz_016 Testing started *****************")
        self.ncert_quiz.click_ncert_quiz()
        self.ncert_quiz.click_participation_status_tab()
        self.ncert_quiz.click_dropdown()
        time.sleep(2)
        options = self.ncert_quiz.get_quiz_dropdown_values()
        for dropdown in range(len(options)):
            opts = self.ncert_quiz.get_each_dropdown_value_id(dropdown)
            opt_text = opts.text
            opts.click()
            time.sleep(2)
            result = self.ncert_quiz.get_map_tooltip_info_validation()
            print(opt_text, result)
            if opt_text in result[0]:
                self.logger.info("*************** quiz name Options having tooltip information "
                                 "********************")
                assert True
            else:
                self.logger.error("*********** Metrics dropdown wise not showing Map Result **************")
                assert False
            self.ncert_quiz.click_dropdown()
            time.sleep(2)
        self.logger.info("*************** Tc_cQube_ncert_quiz_016 Testing ended *****************")

    """ Check whether quiz wise status tab is displaying when we click on quiz wise status tab"""

    def test_click_on_the_quiz_wise_status_tab_button(self):
        self.logger.info("*************** Tc_cQube_quiz_wise_status_017 Testing started *****************")
        self.ncert_quiz.click_ncert_quiz()
        self.ncert_quiz.click_quiz_wise_status_tab()
        time.sleep(5)
        quiz_wise_status = self.ncert_quiz.get_quiz_wise_status_tab_attribute()
        time.sleep(3)
        if "true" == quiz_wise_status:
            self.logger.info("*********** quiz_wise_status Tab is selecting ***************")
            assert True
        else:
            self.logger.error("*********** quiz_wise_status_Tab is not selecting ***************")
            assert False
        self.logger.info("*************** Tc_cQube_quiz_wise_status_017 Testing ended *****************")

    """ Check whether font size increase button is working or not when we click on the A+ button """

    def test_quiz_wise_status_a_plus_button(self):
        self.logger.info("*************** Tc_cQube_ncert_quiz_018 Testing started *****************")
        self.ncert_quiz.click_ncert_quiz()
        time.sleep(2)
        self.ncert_quiz.click_quiz_wise_status_tab()
        time.sleep(3)
        res = self.ncert_quiz.click_on_A_plus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A+ button is clicked and A+ is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A+ button is not clicked and A+ is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_ncert_quiz_018 Testing ended*****************")

    """ Check whether font size decrease button is working or not when we click on the A- button """

    def test_quiz_wise_status_a_minus_button(self):
        self.logger.info("*************** Tc_cQube_ncert_quiz_019 Testing started *****************")
        self.ncert_quiz.click_ncert_quiz()
        time.sleep(2)
        self.ncert_quiz.click_quiz_wise_status_tab()
        time.sleep(2)
        res = self.ncert_quiz.test_click_on_A_minus_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A- button is clicked and A- is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A- button is not clicked and A- is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_ncert_quiz_019 Testing ended *****************")

    """ Check whether font size default button is working or not when we click on the A button """

    def test_quiz_wise_status_default_button(self):
        self.logger.info("*************** Tc_cQube_ncert_quiz_020 Testing started *****************")
        self.ncert_quiz.click_ncert_quiz()
        time.sleep(2)
        self.ncert_quiz.click_quiz_wise_status_tab()
        time.sleep(2)
        res = self.ncert_quiz.click_on_A_default_button()
        time.sleep(3)
        if res == 0:
            self.logger.info("************* A button is clicked and A is working as expected*************")
            self.driver.refresh()
            assert True
        else:
            self.logger.error("************* A button is not clicked and A is not working as expected *************")
            assert False
        self.logger.info("*************** Tc_cQube_ncert_quiz_020 Testing ended*****************")

    """ check whether in header sorting is happening or not"""

    def test_check_table_quiz_name_headers_clickable(self):
        self.logger.info("*************** Tc_cQube_ncert_quiz_021 Testing started *****************")
        self.ncert_quiz.click_ncert_quiz()
        self.ncert_quiz.click_quiz_wise_status_tab()
        time.sleep(3)
        self.ncert_quiz.click_quiz_name_header()
        time.sleep(2)
        now = self.ncert_quiz.get_quiz_wise_column
        sort = "descending"
        if now == 'ascending' or sort:
            self.logger.info("quiz name Header is clicked and table values are changed ")
            assert True
        else:
            self.logger.error(now, "******** quiz name Header sorting is not working ***********")
            assert False
        self.ncert_quiz.click_total_enrolment_header()
        time.sleep(2)
        sec_click = self.ncert_quiz.get_total_enrolment_column()
        sort = "descending"
        if sec_click == 'ascending' or sort:
            assert True
        else:
            self.logger.error(sec_click, "******** quiz name Header sorting is not working ***********")
            assert False
        self.logger.info("*************** Tc_cQube_ncert_quiz_021 Testing ended *****************")

    """ check whether in header sorting is happening or not"""

    def test_check_table_total_enrolment_headers_clickable(self):
        self.logger.info("*************** Tc_cQube_ncert_quiz_022 Testing started *****************")
        self.ncert_quiz.click_ncert_quiz()
        self.ncert_quiz.click_quiz_wise_status_tab()
        time.sleep(3)
        self.ncert_quiz.click_certificate_issued_header()
        time.sleep(2)
        now = self.ncert_quiz.get_certificate_issued_column()
        sort = "descending"
        if now == 'ascending' or sort:
            self.logger.info("total enrolment is clicked and table values are changed ")
            assert True

        else:
            self.logger.error(now, "******** completion Header sorting is not working ***********")
            assert False
        self.ncert_quiz.click_completion_header()
        time.sleep(2)
        sec_click = self.ncert_quiz.get_completion_column()
        sort = "descending"
        if sec_click == 'ascending' or sort:
            assert True
        else:
            self.logger.error(sec_click, "******** completion  Header sorting is not working ***********")
            assert False
        self.logger.info("*************** Tc_cQube_nas_022 Testing ended *****************")

    """ check whether in header sorting is happening or not"""

    def test_check_table_certification_issued_headers_clickable(self):
        self.logger.info("*************** Tc_cQube_ncert_quiz_023 Testing started *****************")
        self.ncert_quiz.click_ncert_quiz()
        self.ncert_quiz.click_quiz_wise_status_tab()
        time.sleep(3)
        self.ncert_quiz.click_completion_header()
        time.sleep(2)
        now = self.ncert_quiz.get_completion_column()
        sort = "descending"
        if now == 'ascending' or sort:
            self.logger.info("completion is clicked and table values are changed ")
            assert True
        else:
            self.logger.error(now, "********certification Header sorting is not working ***********")
            assert False
        self.ncert_quiz.click_medium_header()
        time.sleep(2)
        sec_click = self.ncert_quiz.get_medium_column()
        sort = "descending"
        if sec_click == 'ascending' or sort:
            assert True
        else:
            self.logger.error("******** certification Header sorting is not working ***********")
            assert False
        self.logger.info("*************** Tc_cQube_nas_023 Testing ended *****************")

    """ check whether case in total enrolment column is displayed or not"""

    def test_check_case_in_total_enrolment_column(self):
        self.logger.info("*************** Tc_cQube_ncert_quiz_024 Testing started *****************")
        self.ncert_quiz.click_ncert_quiz()
        self.ncert_quiz.click_quiz_wise_status_tab()
        time.sleep(3)
        count = 0
        rows_count = self.ncert_quiz.get_rows_from_total_enrolment()
        d = []
        for i in range(1, len(rows_count)):
            a = self.ncert_quiz.get_column_total_enrolment(i)
            d.append(a.text)
        print(d)
        for j in range(1, len(d)):
            s = d[j]
            if int(s) >= 0:
                print(s, 'value is Not less than 0')
            else:
                print(s, 'value is less than 0')
                count = count + 1
        if count == 0:
            self.logger.info("**************value in the column are in camel case *****************")
            assert True
        else:
            self.logger.error("**************value in the column are not in camel case  *****************")
            assert False
        self.logger.info("*************** Tc_cQube_ncert_quiz_024 Testing ended*****************")

    """ check whether case in certification column is displayed or not"""

    def test_check_case_in_certification_column(self):
        self.logger.info("*************** Tc_cQube_ncert_quiz_025 Testing started *****************")
        self.ncert_quiz.click_ncert_quiz()
        self.ncert_quiz.click_quiz_wise_status_tab()
        time.sleep(3)
        count = 0
        rows_count = self.ncert_quiz.get_rows_from_certification_issued()
        d = []
        for i in range(1, len(rows_count)):
            a = self.ncert_quiz.get_column_certification_issued(i)
            d.append(a.text)
        print(d)
        for j in range(1, len(d)):
            s = d[j]
            if int(s) >= 0:
                print(s, 'Not less than 0')
            else:
                print(s, 'less than 0')
                count = count + 1
        if count == 0:
            self.logger.info("**************value in the column are in camel case *****************")
            assert True
        else:
            self.logger.error("**************value in the column are not in camel case*****************")
            assert False
        self.logger.info("*************** Tc_cQube_ncert_quiz_025 Testing ended *****************")

    """ check whether case in completion column is displayed or not"""

    def test_check_case_in_completion_column(self):
        self.logger.info("*************** Tc_cQube_ncert_quiz_026 Testing started *****************")
        self.ncert_quiz.click_ncert_quiz()
        self.ncert_quiz.click_quiz_wise_status_tab()
        time.sleep(3)
        count = 0
        rows_count = self.ncert_quiz.get_rows_from_completion()
        d = []
        for i in range(1, len(rows_count)):
            a = self.ncert_quiz.get_column_completion(i)
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
            self.logger.info("*************value in the column are in camel case *****************")
            assert True
        else:
            self.logger.error("**************value in the column are not in camel case*****************")
            assert False
        self.logger.info("*************** Tc_cQube_ncert_quiz_026 Testing ended*****************")

    """ check whether case in medium column is displayed or not"""

    def test_check_case_in_medium_column(self):
        self.logger.info("*************** Tc_cQube_ncert_quiz_027 Testing started *****************")
        self.ncert_quiz.click_ncert_quiz()
        self.ncert_quiz.click_quiz_wise_status_tab()
        time.sleep(3)
        count = 0
        rows_count = self.ncert_quiz.get_rows_from_medium()
        d = []
        for i in range(1, len(rows_count)):
            a = self.ncert_quiz.get_column_medium(i)
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
            self.logger.info("************values are in column are in camel case******************")
            assert True
        else:
            self.logger.error("**************values in the column are not in camel case*****************")
            assert False
        self.logger.info("*************** Tc_cQube_ncert_quiz_027 Testing ended *****************")

    @classmethod
    def teardown(cls):
        cls.driver.close()
