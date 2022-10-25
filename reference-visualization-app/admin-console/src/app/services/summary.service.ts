import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../src/environments/environment';
import { KeycloakSecurityService } from './../keycloak-security.service';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  public baseUrl = environment.apiEndpoint;
  constructor(public http: HttpClient, public keyCloakService: KeycloakSecurityService, private service: AppService) { }

  //summary statistics
  getAttendanceSummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/stdAttendance`, {});
  }
  getSemSummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/sem`, {});
  }

  getCrcSummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/crc`, {});
  }

  getInfraSummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/infra`, {});
  }
  getInspecSummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/inspec`, {});
  }

  getstDistSummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/stDist`, {});
  }

  getstBlockSummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/stBlock`, {});
  }
  getstClusterSummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/stCluster`, {});
  }
  getstSchoolSummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/stSchool`, {});
  }

  getDikshaSummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/summaryDiksha`, {});
  }

  getUdiseSummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/summaryUDISE`, {});
  }

  getPATSummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/summaryPAT`, {});
  }
  getDiskhaTPDummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/summaryDikshaTPD`, {});
  }

  getTeacherAttendanceSummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/teacherAttedndance`, {});
  }

  getSATSummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/summarySAT`, {});
  }


  getDikshaProgramSummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/dikshaProgramDetails`, {});
  }

  getDikshaProgramCourseSummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/dikshaProgramCourseDetails`, {});
  }

  getDikshaCourseSummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/dikshaCourseDetails`, {});
  }

  getDikshaEnrollSummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/dikshaCourseEnrolment`, {});
  }

  getDikshaEtbSummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/dikshaEtbEnrolment`, {});
  }
  getGradeDetailsSummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/gradeDetails`, {});
  }
  getSubjectDetailsSummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/subjectDetails`, {});
  }
  getSchoolDetailsSummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/schoolDetails`, {});
  }

  getTextBookDistDetailsSummary() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/textBookDetails`, {});
  }
  getDikshaLearningSessions() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/dikshaLearningSessions`, {});
  }
  getMainMetrics() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/mainMetrics`, {});
  }

  getDikshaEtbCoverage() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/dikshaEtbCoverage`, {});
  }

  getdikshaEtbLearningSession() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/dikshaEtbLearningSession`, {});
  }

  getdikshaEtbPlaysPercapita() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/dikshaEtbPlaysPercapita`, {});
  }

  getdikshaEtbProgramStarted() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/dikshaEtbProgramStarted`, {});
  }

  getdikshaEtbQrCoverage() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/dikshaEtbQrCoverage`, {});
  }

  getdikshaNishthaCourseConsumed() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/dikshaNishthaCourseConsumed`, {});
  }

  getdikshaNishthaConsumeDistrict() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/dikshaNishthaConsumeDistrict`, {});
  }

  getdiskshaNishthaEnrolCert() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/dikshaNishthaEnrolCert`, {});
  }

  getdikshaNishthaProgramStarted() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/dikshaNishthaProgramStarted`, {});
  }
  
  getdikshaNishthaCourseMedium() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/dikshaNishthaCourseMedium`, {});
  }

  getdikshaQuizStarted() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/dikshaQuizStarted`, {});
  }

  getdikshaQuizProgramStarted() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/dikshaQuizProgramStarted`, {});
  }

  getdikshaQuizStatePart() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/dikshaQuizStatePart`, {});
  }

  getmicroImprovDashboard() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/microImprovDashboard`, {});
  }
  
  getmicroImprovDistrict() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/microImprovDistrict`, {});
  }

  getnasAllDashboard() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/nasAllDashboard`, {});
  }

  getnasProgramStarted() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/nasProgramStarted`, {});
  }

  getncfAllDashboard() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/ncfAllDashboard`, {});
  }

  getnipunContentConsumed() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/nipunContentConsumed`, {});
  }

  getnipunCoveredByLoText() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/nipunCoveredByLoText`, {});
  }

  getpgiAllDashboard() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/pgiAllDashboard`, {});
  }

  getpgiProgramStarted() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/pgiProgramStarted`, {});
  }

  getpgiStatePerformace() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/pgiStatePerformace`, {});
  }

  getpmPoshanAccessIndia() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/pmPoshanAccessIndia`, {});
  }

  getpmPoshanStateOnboard() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/pmPoshanStateOnboard`, {});
  }

  getudiseAllDashboard() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/udiseAllDashboard`, {});
  }

  getudiseProgramStarted() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/udiseProgramStarted`, {});
  }

  getsummaryUsers() {
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/summaryUsers`, {});
  }

  getDikshaEtbEtbCoverage(){
    this.service.logoutOnTokenExpire();
    return this.http.post(`${this.baseUrl}/summary/dikshaetbetbcoverage`, {});
  }
  
  
}
