import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppServiceComponent } from 'src/app/app.service';
@Injectable({
  providedIn: 'root'
})
export class TeacherAttendanceReportService {
  public baseUrl;
  public telemetryData = [];

  constructor(public http: HttpClient, public service: AppServiceComponent) {
    this.baseUrl = service.baseUrl;
  }
  //Attendance report
  dist_wise_data(data) {
    
    return this.http.post(`${this.baseUrl}/teacher_attendance/distWise`, data);
  }

  block_wise_data(data) {
    
    return this.http.post(`${this.baseUrl}/teacher_attendance/blockWise`, data);
  }

  cluster_wise_data(data) {
    
    return this.http.post(`${this.baseUrl}/teacher_attendance/clusterWise`, data);
  }

  school_wise_data(data) {
    
    return this.http.post(`${this.baseUrl}/teacher_attendance/schoolWise`, data);
  }


  blockPerDist(data) {
    
    return this.http.post(`${this.baseUrl}/teacher_attendance/blockPerDist`, data);
  }

  clusterPerBlock(data) {
    
    return this.http.post(`${this.baseUrl}/teacher_attendance/clusterPerBlock`, data);
  }

  schoolsPerCluster(data) {
    
    return this.http.post(`${this.baseUrl}/teacher_attendance/schoolPerCluster`, data);
  }

  getDateRange() {
    
    return this.http.get(`${this.baseUrl}/teacher_attendance/getDateRange`);
  }

  getRawMeta(data) {
    
    return this.http.post(`${this.baseUrl}/attendance/rawMeta`, data);
  }

  // download raw data
  downloadFile(data) {
    
    return this.http.post(`${this.baseUrl}/getDownloadUrl`, data);
  }

  //capturing telemetry.....
  telemetrySar(date) {
    
    return this.http.post(`${this.baseUrl}/telemetry/sar`, { telemetryData: this.telemetryData, date: date });
  }
}