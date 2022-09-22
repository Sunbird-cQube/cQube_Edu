import re
import time
from selenium.webdriver.common.by import By
from PageObjects.Cqube_UI.BasePage import Base
from Utilities.ReadProperties import ReadConfig


class Dashboard(Base):
    a_plus = "font-size-increase"
    a_minus = "font-size-decrease"
    a_default = "font-size-reset"
    L = r'L\.|[^\d.]'
    K = r'K\.|[^\d.]'

    ''' List of selenium locator of dashboard screen '''

    dashboard_btn = (By.ID, "menu-item-0")
    '''Nishtha Card '''
    nishtha_info = (By.XPATH, "//sb-cqube-program-card[1]/div/img")
    nishtha_total_teachers = (By.XPATH, "//sb-cqube-program-card[1]/div/div[2]/div[1]/span[1]")
    nishtha_total_course = (By.XPATH, "//sb-cqube-program-card[1]/div/div[2]/div[2]/span[1]")
    nishtha_teacher_text = (By.XPATH, "//sb-cqube-program-card[1]/div/div[2]/div[1]/span[2]")
    nishtha_course_text = (By.XPATH, "//sb-cqube-program-card[1]/div/div[2]/div[2]/span[2]")
    nishtha_dashboard = (By.XPATH, "//sb-cqube-program-card[1]/div/button")

    ''' Diksha ETB abd e-Content '''
    diksha_info = (By.XPATH, "//sb-cqube-program-card[2]/div/img")
    diksha_total_content = (By.XPATH, "//sb-cqube-program-card[2]/div/div[2]/div[1]/span[1]")
    diksha_total_etbs = (By.XPATH, "//sb-cqube-program-card[2]/div/div[2]/div[2]/span[1]")
    diksha_content_text = (By.XPATH, "//sb-cqube-program-card[2]/div/div[2]/div[1]/span[2]")
    diksha_etb_text = (By.XPATH, "//sb-cqube-program-card[2]/div/div[2]/div[2]/span[2]")
    diksha_dashboard = (By.XPATH, "//sb-cqube-program-card[2]/div/button")

    ''' Micro-Improvements '''
    micro_info = (By.XPATH, "//sb-cqube-program-card[3]/div/img")
    micro_total_states = (By.XPATH, "//sb-cqube-program-card[3]/div/div[2]/div[1]/span[1]")
    micro_total_micro = (By.XPATH, "//sb-cqube-program-card[3]/div/div[2]/div[2]/span[1]")
    micro_text = (By.XPATH, "//sb-cqube-program-card[3]/div/div[2]/div[2]/span[2]")
    micro_states_text = (By.XPATH, "//sb-cqube-program-card[3]/div/div[2]/div[2]/span[1]")
    micro_Dashboard = (By.XPATH, "//sb-cqube-program-card[3]/div/button")

    ''' PM POSHAN  '''
    pm_info = (By.XPATH, "//sb-cqube-program-card[4]/div/img")
    pm_total_schools = (By.XPATH, "//sb-cqube-program-card[4]/div/div[2]/div[1]/span[1]")
    pm_total_state = (By.XPATH, "//sb-cqube-program-card[4]/div/div[2]/div[2]/span[1]")
    pm_schools_text = (By.XPATH, "//sb-cqube-program-card[4]/div/div[2]/div[1]/span[2]")
    pm_state_text = (By.XPATH, "//sb-cqube-program-card[4]/div/div[2]/div[2]/span[2]")
    pm_dashboard = (By.XPATH, "//sb-cqube-program-card[4]/div/button")

    ''' NAS '''
    nas_info = (By.XPATH, "//sb-cqube-program-card[5]/div/img")
    nas_total_std_surveyed = (By.XPATH, "//sb-cqube-program-card[5]/div/div[2]/div[1]/span[1]")
    nas_total_scs_surveyed = (By.XPATH, "//sb-cqube-program-card[5]/div/div[2]/div[2]/span[1]")
    nas_school_survey_text = (By.XPATH, "//sb-cqube-program-card[5]/div/div[2]/div[1]/span[2]")
    nas_student_survey_text = (By.XPATH, "//sb-cqube-program-card[5]/div/div[2]/div[2]/span[2]")
    nas_dashboard = (By.XPATH, "//sb-cqube-program-card[5]/div/button")

    ''' UDISE '''
    udise_info = (By.XPATH, "//sb-cqube-program-card[6]/div/img")
    udise_ts_surveyed = (By.XPATH, "//sb-cqube-program-card[6]/div/div[2]/div[1]/span[1]")
    udise_total_teacher = (By.XPATH, "//sb-cqube-program-card[6]/div/div[2]/div[2]/span[1]")
    udise_ts_text = (By.XPATH, "//sb-cqube-program-card[6]/div/div[2]/div[1]/span[2]")
    udise_teachers_text = (By.XPATH, "//sb-cqube-program-card[6]/div/div[2]/div[2]/span[2]")
    udise_dashboard = (By.XPATH, "//sb-cqube-program-card[6]/div/button")

    ''' Performance Grade Index (PGI) '''
    pgi_info = (By.XPATH, "//sb-cqube-program-card[7]/div/img")
    pgi_states = (By.XPATH, "//sb-cqube-program-card[7]/div/div[2]/div[1]/span[1]")
    pgi_parameters = (By.XPATH, "//sb-cqube-program-card[7]/div/div[2]/div[2]/span[1]")
    pgi_state_text = (By.XPATH, "//sb-cqube-program-card[7]/div/div[2]/div[1]/span[2]")
    pgi_parameters_text = (By.XPATH, "//sb-cqube-program-card[7]/div/div[2]/div[2]/span[2]")
    pgi_dashboard = (By.XPATH, "//sb-cqube-program-card[7]/div/button")

    ''' NIPUN Bharath '''
    nipun_info = (By.XPATH, "//sb-cqube-program-card[8]/div/img")
    nipun_learnings = (By.XPATH, "//sb-cqube-program-card[8]/div/div[2]/div[1]/span[1]")
    nipun_contents = (By.XPATH, "//sb-cqube-program-card[8]/div/div[2]/div[2]/span[1]")
    nipun_learning_text = (By.XPATH, "//sb-cqube-program-card[8]/div/div[2]/div[1]/span[2]")
    nipun_contents_text = (By.XPATH, "//sb-cqube-program-card[8]/div/div[2]/div[2]/span[2]")
    nipun_dashboard = (By.XPATH, "//sb-cqube-program-card[8]/div/button")

    ''' NCERT Quiz '''
    ncert_info = (By.XPATH, "//sb-cqube-program-card[9]/div/img")
    ncert_enrolment = (By.XPATH, "//sb-cqube-program-card[9]/div/div[2]/div[1]/span[1]")
    ncert_certification = (By.XPATH, "//sb-cqube-program-card[9]/div/div[2]/div[2]/span[1]")
    ncert_enrolment_text = (By.XPATH, "//sb-cqube-program-card[9]/div/div[2]/div[1]/span[2]")
    ncert_certification_text = (By.XPATH, "//sb-cqube-program-card[9]/div/div[2]/div[2]/span[2]")
    ncert_dashboard = (By.XPATH, "//sb-cqube-program-card[9]/div/button")

    ''' NCF '''
    ncf_info = (By.XPATH, "//sb-cqube-program-card[10]/div/img")
    ncf_participating = (By.XPATH, "//sb-cqube-program-card[10]/div/div[2]/div[1]/span[1]")
    ncf_paper = (By.XPATH, "//sb-cqube-program-card[10]/div/div[2]/div[2]/span[1]")
    ncf_participating_text = (By.XPATH, "//sb-cqube-program-card[10]/div/div[2]/div[2]/span[2]")
    ncf_paper_text = (By.XPATH, "//sb-cqube-program-card[10]/div/div[2]/div[2]/span[2]")
    ncf_dashboard = (By.XPATH, "//sb-cqube-program-card[10]/div/button")

    def __init__(self, driver):
        super().__init__(driver)

    '''Function to get URL of the Application from Config File'''

    def open_cqube_application(self):
        self.get_url(ReadConfig.get_application_url())
        time.sleep(5)

    """This Function is used to click on the cQube dashboard"""

    def click_dashboard(self):
        self.click(self.dashboard_btn)

    ''' This Function is used to get the Nishtha Card Metrics'''

    def get_nishtha_card_info(self):
        return self.get_attribute_value('title', self.nishtha_info)

    def get_nishtha_card_teacher_value(self):
        return self.get_web_element_text(self.nishtha_total_teachers)

    def get_nishtha_card_course_value(self):
        return self.get_web_element_text(self.nishtha_total_course)

    def get_nishtha_card_teacher_text(self):
        return self.get_web_element_text(self.nishtha_teacher_text)

    def get_nishtha_card_course_text(self):
        return self.get_web_element_text(self.nishtha_course_text)

    def click_on_access_nishtha_dashboard(self):
        self.click(self.nishtha_dashboard)

    '''This Function is used to get the Diksha Card Metrics '''

    def get_diksha_card_info(self):
        return self.get_attribute_value('title', self.diksha_info)

    def get_diksha_card_content_value(self):
        return self.get_web_element_text(self.diksha_total_content)

    def get_diksha_card_etb_value(self):
        return self.get_web_element_text(self.diksha_total_etbs)

    def get_diksha_card_content_text(self):
        return self.get_web_element_text(self.diksha_content_text)

    def get_diksha_card_etb_text(self):
        return self.get_web_element_text(self.diksha_etb_text)

    def click_on_access_diksha_dashboard(self):
        self.click(self.diksha_dashboard)

    '''This Function is used to get the Micro Card Metrics '''

    def get_micro_card_info(self):
        return self.get_attribute_value('title', self.micro_info)

    def get_micro_card_state_value(self):
        return self.get_web_element_text(self.micro_total_states)

    def get_micro_card_micro_value(self):
        return self.get_web_element_text(self.micro_total_micro)

    def get_micro_card_state_text(self):
        return self.get_web_element_text(self.micro_states_text)

    def get_micro_card_micro_text(self):
        return self.get_web_element_text(self.micro_text)

    def click_on_access_micro_dashboard(self):
        self.click(self.micro_Dashboard)

    '''This Function is used to get the PM Poshan Card Metrics '''

    def get_pm_card_info(self):
        return self.get_attribute_value('title', self.pm_info)

    def get_pm_card_school_value(self):
        return self.get_web_element_text(self.pm_total_schools)

    def get_pm_card_state_value(self):
        return self.get_web_element_text(self.pm_total_state)

    def get_pm_card_state_text(self):
        return self.get_web_element_text(self.pm_state_text)

    def get_pm_card_school_text(self):
        return self.get_web_element_text(self.pm_schools_text)

    def click_on_access_pm_poshan_dashboard(self):
        self.click(self.pm_dashboard)

    '''This Function is used to get the NAS Card Metrics '''

    def get_nas_card_info(self):
        return self.get_attribute_value('title', self.nas_info)

    def get_nas_card_student_value(self):
        return self.get_web_element_text(self.nas_total_std_surveyed)

    def get_nas_card_school_value(self):
        return self.get_web_element_text(self.nas_total_scs_surveyed)

    def get_nas_card_student_text(self):
        return self.get_web_element_text(self.nas_student_survey_text)

    def get_nas_card_school_text(self):
        return self.get_web_element_text(self.nas_school_survey_text)

    def click_on_access_nas_dashboard(self):
        self.click(self.nas_dashboard)

    '''This Function is used to get the UDISE+ Card Metrics '''

    def get_udise_card_info(self):
        return self.get_attribute_value('title', self.udise_info)

    def get_udise_card_schools_value(self):
        return self.get_web_element_text(self.udise_ts_surveyed)

    def get_udise_card_teachers_value(self):
        return self.get_web_element_text(self.udise_total_teacher)

    def get_udise_card_school_text(self):
        return self.get_web_element_text(self.udise_ts_text)

    def get_udise_card_teacher_text(self):
        return self.get_web_element_text(self.udise_teachers_text)

    def click_on_access_udise_dashboard(self):
        self.click(self.udise_dashboard)

    '''This Function is used to get the PGI Card Metrics '''

    def get_pgi_card_info(self):
        return self.get_attribute_value('title', self.pgi_info)

    def get_pgi_card_states_value(self):
        return self.get_web_element_text(self.pgi_states)

    def get_pgi_card_parameters_value(self):
        return self.get_web_element_text(self.pgi_parameters)

    def get_pgi_card_states_text(self):
        return self.get_web_element_text(self.pgi_state_text)

    def get_pgi_card_parameter_text(self):
        return self.get_web_element_text(self.pgi_parameters_text)

    def click_on_access_pgi_dashboard(self):
        self.click(self.pgi_dashboard)

    '''This Function is used to get the NIPUN Bharat Card Metrics '''

    def get_nipun_card_info(self):
        return self.get_attribute_value('title', self.nishtha_info)

    def get_nipun_card_learning_value(self):
        return self.get_web_element_text(self.nipun_learnings)

    def get_nipun_card_contents_value(self):
        return self.get_web_element_text(self.nipun_contents)

    def get_nipun_card_learning_text(self):
        return self.get_web_element_text(self.nipun_learning_text)

    def get_nipun_card_content_text(self):
        return self.get_web_element_text(self.nipun_contents_text)

    def click_on_access_nipun_dashboard(self):
        self.click(self.nipun_dashboard)

    '''This Function is used to get the NCERT Card Metrics '''

    def get_ncert_card_info(self):
        return self.get_attribute_value('title', self.ncert_info)

    def get_ncert_card_enrolment_value(self):
        return self.get_web_element_text(self.ncert_enrolment)

    def get_ncert_card_certification_value(self):
        return self.get_web_element_text(self.ncert_certification)

    def get_ncert_card_enrolment_text(self):
        return self.get_web_element_text(self.ncert_enrolment_text)

    def get_ncert_card_certificate_text(self):
        return self.get_web_element_text(self.ncert_certification_text)

    def click_on_access_ncert_dashboard(self):
        self.click(self.ncert_dashboard)

    '''This Function is used to get the NCF Card Metrics '''

    def get_ncf_card_info(self):
        return self.get_attribute_value('title', self.ncf_info)

    def get_ncf_card_participating_value(self):
        return self.get_web_element_text(self.ncf_participating)

    def get_ncf_card_paper_value(self):
        return self.get_web_element_text(self.ncf_paper)

    def get_ncf_card_participant_text(self):
        return self.get_web_element_text(self.ncf_participating_text)

    def get_ncf_card_paper_text(self):
        return self.get_web_element_text(self.ncf_paper_text)

    def click_on_access_ncf_dashboard(self):
        self.click(self.ncf_dashboard)

    '''Functions to Click the Default A , A- and A+ Buttons '''

    def test_click_on_a_default_button(self):
        count = 0
        a_plus = self.driver.find_element(By.ID, self.a_default)
        a_plus.click()
        time.sleep(2)
        if 'style="font-size: 16px;"' in self.driver.page_source:
            self.driver.refresh()
            assert True
        else:
            count = count + 1
        return count

    ''' Function to Click the A+ button '''

    def test_click_on_a_plus_button(self):
        count = 0
        a_plus = self.driver.find_element(By.ID, self.a_plus)
        a_plus.click()
        time.sleep(2)
        if 'style="font-size: 18px;"' in self.driver.page_source:
            self.driver.refresh()
            assert True
        else:
            count = count + 1
        return count

    ''' Function to Click the A- button '''

    def test_click_on_a_minus_button(self):
        count = 0
        a_plus = self.driver.find_element(By.ID, self.a_minus)
        a_plus.click()
        time.sleep(2)
        if 'style="font-size: 14px;"' in self.driver.page_source:
            self.driver.refresh()
            assert True
        else:
            count = count + 1
        return count

    '''Function to get integer digits'''

    @staticmethod
    def get_integer_digit(value):
        return re.sub('\D', "", value)
