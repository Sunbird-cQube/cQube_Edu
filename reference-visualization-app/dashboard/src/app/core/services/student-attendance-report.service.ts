import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppServiceComponent } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceReportService {
  public baseUrl;
  public telemetryData = [];

  constructor(public http: HttpClient, public service: AppServiceComponent) {
    this.baseUrl = service.baseUrl;
  }

  //Attendance report
  dist_wise_data(data) {
    
    return this.http.post(`${this.baseUrl}/attendance/distWise`, data);
  }

  block_wise_data(data) {
    
    return this.http.post(`${this.baseUrl}/attendance/blockWise`, data);
  }

  cluster_wise_data(data) {
    
    return this.http.post(`${this.baseUrl}/attendance/clusterWise`, data);
  }

  school_wise_data(data) {
    
    return this.http.post(`${this.baseUrl}/attendance/schoolWise`, data);
  }


  blockPerDist(data) {
    
    return this.http.post(`${this.baseUrl}/attendance/blockPerDist`, data);
  }

  clusterPerBlock(data) {
    
    return this.http.post(`${this.baseUrl}/attendance/clusterPerBlock`, data);
  }

  schoolsPerCluster(data) {
    
    return this.http.post(`${this.baseUrl}/attendance/schoolPerCluster`, data);
  }

  getDateRange() {
    
    return this.http.get(`${this.baseUrl}/attendance/getDateRange`);
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


  //attendance line-chart
  getStateData(data){
    
    return this.http.post(`${this.baseUrl}/line-chart/stateWise`, data);
  }
  
  getDistrictData(data){
    
    return this.http.post(`${this.baseUrl}/line-chart/distWise`, data);
  }

  getBlockData(data){
    
    return this.http.post(`${this.baseUrl}/line-chart/blockWise`, data);
  }

  getClusterData(data){
    
    return this.http.post(`${this.baseUrl}/line-chart/clusterWise`, data);
  }
  getSchoolData(data){
    
    return this.http.post(`${this.baseUrl}/line-chart/schoolWise`, data);
  }

  getYears(){
    
    return this.http.get(`${this.baseUrl}/line-chart/getDateRange`);
  }
}