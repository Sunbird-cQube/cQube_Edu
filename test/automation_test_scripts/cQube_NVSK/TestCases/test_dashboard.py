import logging
import re
import time
from PageObjects.Cqube_UI.dashboard import Dashboard
from TestCases.conftest import ConfTest
from Utilities import CustomLogger
from Utilities.ReadProperties import ReadConfig


class TestDashboard:
    dashboard = None
    driver = None

    @classmethod
    def setup(cls):
        cls.driver = ConfTest.get_driver()
        cls.driver.implicitly_wait(30)
        cls.dashboard = Dashboard(cls.driver)
        cls.dashboard.open_cqube_application()
        cls.logger = CustomLogger.setup_logger('Dashboard', ReadConfig.get_logs_directory() + "/Dashboard.log",
                                               level=logging.DEBUG)

    '''This Test Script validation of Nishtha card Metrics'''

    def test_validate_nishtha_card_metrics(self):
        self.logger.info("*************** Tc_cQube_Dashboard_001 Testing Started *****************")
        nishtha_info = self.dashboard.get_nishtha_card_info()
        teacher = self.dashboard.get_nishtha_card_teacher_value()
        teacher_value = re.sub(self.dashboard.L, "", teacher)
        course = self.dashboard.get_nishtha_card_course_value()
        course_value = re.sub(self.dashboard.K, "", course)
        teacher_text = self.dashboard.get_nishtha_card_teacher_text()
        course_text = self.dashboard.get_nishtha_card_course_text()
        if nishtha_info is not None and teacher_text is not None and course_text is not None:
            self.logger.info("*********** Nishtha Card Value is showing ***************")
            assert True
        else:
            self.logger.error("*************** Nishtha Card Value is Missing ************")
            assert False
        if float(teacher_value) > 0 and teacher_value is not None:
            self.logger.info("*********** Nishtha Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** Nishtha Card Values is Missing ************")
            assert False
        if float(course_value) > 0 and course_value is not None:
            self.logger.info("*********** Nishtha Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** Nishtha Card Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_Dashboard_001 Testing Ended. *****************")

    ''' This TestScript - Clicking the Access Dashboard of Nishtha Card'''

    def test_check_navigation_to_nishtha_dashboard(self):
        self.logger.info("*************** Tc_cQube_Dashboard_002 Testing Started *****************")
        self.dashboard.click_on_access_nishtha_dashboard()
        time.sleep(2)
        if 'nishtha' in self.driver.current_url and 'NISHTHA' in self.driver.page_source:
            self.logger.info("******************* Nishtha Dashboard is Displayed ********************")
            assert True
        else:
            self.logger.error("*************** Nishtha Dashboard Button is not Working ******************")
            assert False
        self.dashboard.click_dashboard()
        self.logger.info("*************** Tc_cQube_Dashboard_002 Testing Ended *****************")

    '''This TestScript - Validation of Diksha Card Metrics on Dashboard '''

    def test_validate_diksha_card_metrics(self):
        self.logger.info("*************** Tc_cQube_Dashboard_003 Testing Started *****************")
        diksha_info = self.dashboard.get_diksha_card_info()
        total_content = self.dashboard.get_diksha_card_content_value()
        content_value = re.sub(self.dashboard.L, "", total_content)
        total_etb = self.dashboard.get_diksha_card_etb_value()
        etb_value = re.sub(self.dashboard.K, "", total_etb)
        content_text = self.dashboard.get_diksha_card_content_text()
        etb_text = self.dashboard.get_diksha_card_etb_text()
        if diksha_info is not None and content_text is not None and etb_text is not None:
            self.logger.info("*********** Diksha Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** Diksha Card Values is Missing ************")
            assert False
        if float(content_value) > 0 and content_value is not None:
            self.logger.info("*********** DIKSHA-ETB Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** DIKSHA-ETB Card Values is Missing ************")
            assert False
        if float(etb_value) > 0 and etb_value is not None:
            self.logger.info("*********** DIKSHA-ETB Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** DIKSHA-ETB Card Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_Dashboard_003 Testing Ended *****************")

    '''This Test Script for check navigation to Diksha Dashboard from Dashboard'''

    def test_check_navigation_to_diksha_dashboard(self):
        self.logger.info("*************** Tc_cQube_Dashboard_004 Testing Started *****************")
        self.dashboard.click_on_access_diksha_dashboard()
        time.sleep(2)
        if 'etb' in self.driver.current_url and 'DIKSHA- ETB and eContent' in self.driver.page_source:

            self.logger.info("******************* DIKSHA-ETB Dashboard is Displayed ********************")
            assert True
        else:
            print(self.driver.current_url)
            self.logger.error("*************** DIKSHA-ETB Dashboard Button is not Working ******************")
            assert False
        self.dashboard.click_dashboard()
        self.logger.info("*************** Tc_cQube_Dashboard_004 Testing Ended *****************")

    '''This TestScript - Validation of Micro Card Metrics on Dashboard '''

    def test_validate_micro_improvements_card_metrics(self):
        self.logger.info("*************** Tc_cQube_Dashboard_005 Testing Started *****************")
        micro_info = self.dashboard.get_micro_card_info()
        total_states = self.dashboard.get_micro_card_state_value()
        tot_value = int(self.dashboard.get_integer_digit(total_states))
        total_micro = self.dashboard.get_micro_card_micro_value()
        micro_value = re.sub(self.dashboard.K, "", total_micro)
        micro_text = self.dashboard.get_micro_card_micro_text()
        states_text = self.dashboard.get_micro_card_state_text()
        if micro_info is not None and micro_text is not None and states_text is not None:
            self.logger.info("*********** Micro Improvement Card information is showing ***************")
            assert True
        else:
            self.logger.error("*************** Micro Improvement Card information is Missing ************")
            assert False
        if int(tot_value) > 0 and tot_value is not None:
            self.logger.info("*********** Micro Improvement Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** Micro Improvement Card Values is Missing ************")
            assert False
        if float(micro_value) > 0 and micro_value is not None:
            self.logger.info("*********** Micro Improvement Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** Micro Improvement Card Values is Missing ************")
            assert False
        self.dashboard.click_dashboard()
        self.logger.info("*************** Tc_cQube_Dashboard_005 Testing Ended *****************")

    '''This Test Script checking navigation to Micro Dashboard from Dashboard'''

    def test_check_navigation_to_micro_dashboard(self):
        self.logger.info("*************** Tc_cQube_Dashboard_006 Testing Started *****************")
        self.dashboard.click_on_access_micro_dashboard()
        time.sleep(2)
        if 'microimprovement' in self.driver.current_url and 'Micro-Improvements' in self.driver.page_source:
            self.logger.info("******************* Micro Improvement Dashboard is Displayed ********************")
            assert True
        else:
            self.logger.error("*************** Micro Improvement Dashboard Button is not Working ******************")
            assert False
        self.dashboard.click_dashboard()
        self.logger.info("*************** Tc_cQube_Dashboard_006 Testing Ended *****************")

    '''This TestScript - Validation of PM Poshan Card Metrics on Dashboard '''

    def test_validate_pm_poshan_improvements_card_metrics(self):
        self.logger.info("*************** Tc_cQube_Dashboard_007 Testing Started *****************")
        pm_info = self.dashboard.get_pm_card_info()
        total_schools = self.dashboard.get_pm_card_school_value()
        school_value = re.sub(self.dashboard.L, "", total_schools)
        total_state = self.dashboard.get_pm_card_state_value()
        state_value = self.dashboard.get_integer_digit(total_state)
        schools_text = self.dashboard.get_pm_card_school_text()
        pm_state_text = self.dashboard.get_pm_card_state_text()
        if pm_info is not None and schools_text is not None and pm_state_text is not None:
            self.logger.info("*********** PM POSHAN Card information is showing ***************")
            assert True
        else:
            self.logger.error("*************** PM POSHAN Card information is Missing ************")
            assert False
        if float(school_value) > 0 and school_value is not None:
            self.logger.info("*********** PM POSHAN Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** PM POSHAN Card Values is Missing ************")
            assert False
        if int(state_value) > 0 and state_value is not None:
            self.logger.info("*********** PM POSHAN Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** PM POSHAN Card Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_Dashboard_007 Testing Ended *****************")

    '''This Test Scripts for checking navigation to PM Poshan Dashboard from Dashboard'''

    def test_check_navigation_to_pm_poshan_dashboard(self):
        self.logger.info("*************** Tc_cQube_Dashboard_008 Testing Started *****************")
        self.dashboard.click_on_access_pm_poshan_dashboard()
        time.sleep(2)
        if 'poshan' in self.driver.current_url and 'PM POSHAN' in self.driver.page_source:
            self.logger.info("******************* PM-POSHAN Dashboard is Displayed ********************")
            assert True
        else:
            self.logger.error("*************** PM-POSHAN Dashboard Button is not Working ******************")
            assert False
        self.dashboard.click_dashboard()
        self.logger.info("*************** Tc_cQube_Dashboard_008 Testing Ended *****************")

    '''This TestScript Validate the NAS Metrics Card from Dashboard'''

    def test_validate_nas_card_metrics(self):
        self.logger.info("*************** Tc_cQube_Dashboard_009 Testing Started *****************")
        nas_info = self.dashboard.get_nas_card_info()
        total_std_surveyed = self.dashboard.get_nas_card_student_value()
        std_value = re.sub(self.dashboard.L, "", total_std_surveyed)
        total_scs_surveyed = self.dashboard.get_nas_card_school_value()
        scs_value = re.sub(self.dashboard.L, "", total_scs_surveyed)
        school_survey_text = self.dashboard.get_nas_card_school_text()
        student_survey_text = self.dashboard.get_nas_card_student_text()
        if nas_info is not None and school_survey_text is not None and student_survey_text is not None:
            self.logger.info("*********** NAS Card Information is showing ***************")
            assert True
        else:
            self.logger.error("*************** NAS Card Information is Missing ************")
            assert False
        if float(std_value) > 0 and std_value is not None:
            self.logger.info("*********** NAS Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** NAS Card Values is Missing ************")
            assert False
        if float(scs_value) > 0 and scs_value is not None:
            self.logger.info("*********** NAS Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** NAS Card Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_Dashboard_009 Testing Ended *****************")

    '''This Test Script for Navigation to NAS Dashboard from Dashboard'''

    def test_check_navigation_to_nas_dashboard(self):
        self.logger.info("*************** Tc_cQube_Dashboard_010 Testing Started *****************")
        self.dashboard.click_on_access_nas_dashboard()
        time.sleep(2)
        if 'nas' in self.driver.current_url and 'National Achievement Survey' in self.driver.page_source:
            self.logger.info("******************* NAS Dashboard is Displayed ********************")
            assert True
        else:
            self.logger.error("*************** NAS Dashboard Button is not Working ******************")
            assert False
        self.dashboard.click_dashboard()
        self.logger.info("*************** Tc_cQube_Dashboard_010 Testing Ended *****************")

    '''This Test Script for Validation of UDISE Metrics Card From Dashboard'''

    def test_validate_udise_card_metrics(self):
        self.logger.info("*************** Tc_cQube_Dashboard_011 Testing Started *****************")
        udise_info = self.dashboard.get_udise_card_info()
        ts_surveyed = self.dashboard.get_udise_card_schools_value()
        ts_value = re.sub(self.dashboard.L, "", ts_surveyed)
        total_teacher = self.dashboard.get_udise_card_teachers_value()
        teacher_value = re.sub(self.dashboard.L, "", total_teacher)
        ts_text = self.dashboard.get_udise_card_school_text()
        teachers_text = self.dashboard.get_udise_card_teacher_text()
        if udise_info is not None and ts_text is not None and teachers_text is not None:
            self.logger.info("*********** UDISE+ Card Information is showing ***************")
            assert True
        else:
            self.logger.error("*************** UDISE+ Card Information is Missing ************")
            assert False
        if float(ts_value) > 0 and ts_value is not None:
            self.logger.info("*********** UDISE+ Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** UDISE+ Card Values is Missing ************")
            assert False
        if float(teacher_value) > 0 and teacher_value is not None:
            self.logger.info("*********** UDISE+ Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** UDISE+ Card Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_Dashboard_011 Testing Ended *****************")

    '''This Test Scripts For Checking navigation to UDISE Dashboard from Dashboard'''

    def test_check_navigation_to_udise_dashboard(self):
        self.logger.info("*************** Tc_cQube_Dashboard_012 Testing Started *****************")
        self.dashboard.click_on_access_udise_dashboard()
        time.sleep(2)
        if 'udise' in self.driver.current_url and 'UDISE+' in self.driver.page_source:
            self.logger.info("******************* UDISE+ Dashboard is Displayed ********************")
            assert True
        else:
            self.logger.error("*************** UDISE+ Dashboard Button is not Working ******************")
            assert False
        self.dashboard.click_dashboard()
        self.logger.info("*************** Tc_cQube_Dashboard_012 Testing Ended *****************")

    '''This Test Script Validation of PGI Metric Card '''

    def test_validate_pgi_card_metrics(self):
        self.logger.info("*************** Tc_cQube_Dashboard_013 Testing Started *****************")
        pgi_info = self.dashboard.get_pgi_card_info()
        pg_states = self.dashboard.get_pgi_card_states_value()
        state_value = int(self.dashboard.get_integer_digit(pg_states))
        pg_parameters = self.dashboard.get_pgi_card_parameters_value()
        parameter_value = int(self.dashboard.get_integer_digit(pg_parameters))
        pg_state_text = self.dashboard.get_pgi_card_states_text()
        pg_parameters_text = self.dashboard.get_pgi_card_parameter_text()
        if pgi_info is not None and pg_state_text is not None and pg_parameters_text is not None:
            self.logger.info("*********** PGI Card Information is showing ***************")
            assert True
        else:
            self.logger.error("*************** PGI Card Information is Missing ************")
            assert False
        if int(state_value) > 0 and state_value is not None:
            self.logger.info("*********** PGI Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** PGI Card Values is Missing ************")
            assert False
        if int(parameter_value) > 0 and parameter_value is not None:
            self.logger.info("*********** PGI Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** PGI Card Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_Dashboard_013 Testing Ended *****************")

    '''This Script - Checking the navigation to PGI Dashboard from Dashboard'''

    def test_check_navigation_to_pgi_dashboard(self):
        self.logger.info("*************** Tc_cQube_Dashboard_014 Testing Started *****************")
        self.dashboard.click_on_access_pgi_dashboard()
        time.sleep(10)
        if 'pgi' in self.driver.current_url and 'Performance Grading Index' in self.driver.page_source:
            self.logger.info("******************* PGI Dashboard is Displayed ********************")
            assert True
        else:
            print(self.driver.title, self.driver.current_url)
            self.logger.error("*************** PGI Dashboard Button is not Working ******************")
            assert False
        self.dashboard.click_dashboard()
        self.logger.info("*************** Tc_cQube_Dashboard_014 Testing Ended *****************")

    '''This Scripts - Validating the NIPUN Bharat Metric Card '''

    def test_validate_nipun_card_metrics(self):
        self.logger.info("*************** Tc_cQube_Dashboard_015 Testing Started *****************")
        nipun_info = self.dashboard.get_nipun_card_info()
        total_learnings = self.dashboard.get_nipun_card_learning_value()
        learnings_value = re.sub(self.dashboard.L, "", total_learnings)
        total_contents = self.dashboard.get_nipun_card_contents_value()
        contents_value = re.sub(self.dashboard.K, "", total_contents)
        learning_text = self.dashboard.get_nipun_card_learning_text()
        contents_text = self.dashboard.get_nipun_card_content_text()
        if nipun_info is not None and learning_text is not None and contents_text is not None:
            self.logger.info("*********** NIPUN Bharath Card Information is showing ***************")
            assert True
        else:
            self.logger.error("*************** NIPUN Bharath Card Information is Missing ************")
            assert False
        if float(learnings_value) > 0 and learnings_value is not None:
            self.logger.info("*********** NIPUN Bharath Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** NIPUN Bharath Card Values is Missing ************")
            assert False
        if float(contents_value) > 0 and contents_value is not None:
            self.logger.info("*********** NIPUN Bharath Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** NIPUN Bharath Card Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_Dashboard_015 Testing Ended *****************")

    '''This Test Script checking navigation to NIPUN Bharat Dashboard from Dashboard'''

    def test_check_navigation_to_nipun_bharath_dashboard(self):
        self.logger.info("*************** Tc_cQube_Dashboard_016 Testing Started *****************")
        self.dashboard.click_on_access_nipun_dashboard()
        time.sleep(2)
        if 'nipunbharath' in self.driver.current_url and 'NIPUN Bharat' in self.driver.page_source:
            self.logger.info("******************* NIPUN Bharath Dashboard is Displayed ********************")
            assert True
        else:
            self.logger.error("*************** NIPUN Bharath Dashboard Button is not Working ******************")
            assert False
        self.dashboard.click_dashboard()
        self.logger.info("*************** Tc_cQube_Dashboard_016 Testing Ended *****************")

    '''This Test Script - validating the NCERT Metrics on the Card '''

    def test_validate_ncert_card_metrics(self):
        self.logger.info("*************** Tc_cQube_Dashboard_017 Testing Started *****************")
        ncert_info = self.dashboard.get_ncert_card_info()
        total_enrolment = self.dashboard.get_ncert_card_enrolment_value()
        enrolment_value = re.sub(self.dashboard.L, "", total_enrolment)
        total_certification = self.dashboard.get_ncert_card_certification_value()
        cer_value = re.sub(self.dashboard.K, "", total_certification)
        enrolment_text = self.dashboard.get_ncert_card_enrolment_text()
        certification_text = self.dashboard.get_ncert_card_certificate_text()
        if ncert_info is not None and enrolment_text is not None and certification_text is not None:
            self.logger.info("*********** NCERT Card Information is showing ***************")
            assert True
        else:
            self.logger.error("*************** NCERT Card Information is Missing ************")
            assert False
        if float(enrolment_value) > 0 and enrolment_value is not None:
            self.logger.info("*********** NCERT Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** NCERT Card Values is Missing ************")
            assert False
        if float(cer_value) > 0 and cer_value is not None:
            self.logger.info("*********** NCERT Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** NCERT Card Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_Dashboard_017 Testing Ended *****************")

    '''This TestScript - checking the navigation to NCERT Dashboard from Dashboard'''

    def test_check_navigation_to_ncert_dashboard(self):
        self.logger.info("*************** Tc_cQube_Dashboard_018 Testing Started *****************")
        self.dashboard.click_on_access_ncert_dashboard()
        time.sleep(2)
        if 'quizzes' in self.driver.current_url and 'NCERT Quiz' in self.driver.page_source:
            self.logger.info("******************* NCERT Dashboard is Displayed ********************")
            assert True
        else:
            self.logger.error("*************** NCERT Dashboard Button is not Working ******************")
            assert False
        self.dashboard.click_dashboard()
        self.logger.info("*************** Tc_cQube_Dashboard_018 Testing Ended *****************")

    '''This Test Script Validation of NCF Metric Card From Dashboard '''

    def test_validate_ncf_card_metrics(self):
        self.logger.info("*************** Tc_cQube_Dashboard_019 Testing Started *****************")
        time.sleep(10)
        ncf_info = self.dashboard.get_ncf_card_info()
        print(ncf_info)
        total_participating = self.dashboard.get_ncf_card_participating_value()
        participating_value = self.dashboard.get_integer_digit(total_participating)
        total_paper = self.dashboard.get_ncf_card_paper_value()
        paper_value = self.dashboard.get_integer_digit(total_paper)
        participating_text = self.dashboard.get_ncf_card_participant_text()
        paper_text = self.dashboard.get_ncf_card_paper_text()
        if ncf_info is not None and participating_text is not None and paper_text is not None:
            self.logger.info("*********** NCF Card Information is showing ***************")
            assert True
        else:
            self.logger.error("*************** NCF Card Information is Missing ************")
            assert False
        if int(participating_value) > 0 and participating_value is not None:
            self.logger.info("*********** NCF Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** NCF Card Values is Missing ************")
            assert False
        if int(paper_value) > 0 and paper_value is not None:
            self.logger.info("*********** NCF Card Values is showing ***************")
            assert True
        else:
            self.logger.error("*************** NCF Card Values is Missing ************")
            assert False
        self.logger.info("*************** Tc_cQube_Dashboard_019 Testing Ended *****************")

    ''' This Test Scripts - checking navigation NCF Dashboard from Dashboard'''

    def test_check_navigation_to_ncf_dashboard(self):
        self.logger.info("*************** Tc_cQube_Dashboard_020 Testing Started *****************")
        self.dashboard.click_on_access_ncf_dashboard()
        time.sleep(2)
        if 'ncf' in self.driver.current_url and 'National Curriculum Framework' in self.driver.page_source:
            self.logger.info("******************* NCF Dashboard is Displayed ********************")
            assert True
        else:
            self.logger.error("*************** NCF Dashboard Button is not Working ******************")
            assert False
        self.dashboard.click_dashboard()
        self.logger.info("*************** Tc_cQube_Dashboard_020 Testing Ended *****************")

    '''This Test script checking the A Minus Button '''

    def test_click_the_a_minus_button(self):
        self.logger.info("*************** Tc_cQube_Dashboard_021 Testing started *****************")
        res = self.dashboard.test_click_on_a_minus_button()
        if res == 0:
            self.logger.info("*********** A- button is Clicked ****************")
            assert True
        else:
            self.logger.error("*********** A- button is not Clicked *********")
            assert False
        self.logger.info("*************** Tc_cQube_Dashboard_021 Testing Ended *****************")

    '''This Test script checking the A Plus Button '''

    def test_click_the_a_plus_button(self):
        self.logger.info("*************** Tc_cQube_Dashboard_022 Testing started *****************")
        res = self.dashboard.test_click_on_a_plus_button()
        if res == 0:
            self.logger.info("*********** A+ button is Clicked ****************")
            assert True
        else:
            self.logger.error("*********** A+ button is not Clicked *********")
            assert False
        self.logger.info("*************** Tc_cQube_Dashboard_022 Testing Ended *****************")

    '''This Test script checking Default A  '''

    def test_click_the_default_a_button(self):
        self.logger.info("*************** Tc_cQube_Dashboard_023 Testing started *****************")
        res = self.dashboard.test_click_on_a_plus_button()
        if res == 0:
            self.logger.info("*********** A button is Clicked ****************")
            assert True
        else:
            self.logger.error("*********** A button is not Clicked *********")
            assert False
        self.logger.info("*************** Tc_cQube_Dashboard_023 Testing Ended *****************")