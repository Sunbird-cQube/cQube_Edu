import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppServiceComponent } from 'src/app/app.service';


@Injectable({
  providedIn: 'root'
})
export class ExceptionReportService {
  public map;
  public baseUrl;
  public token;

  constructor(public http: HttpClient, public service: AppServiceComponent) {
    this.baseUrl = service.baseUrl;
  }

  //Semester Completion
  semCompletionDist(data) {
    
    return this.http.post(`${this.baseUrl}/semCompDist/allDistrictWise`, data);
  }

  semCompletionBlock(data) {
    
    return this.http.post(`${this.baseUrl}/semCompBlock/allBlockWise`, data);
  }
  semCompletionCluster(data) {
    
    return this.http.post(`${this.baseUrl}/semCompCluster/allClusterWise`, data);
  }
  semCompletionSchool(data) {
    
    return this.http.post(`${this.baseUrl}/semCompSchool/allSchoolWise`, data);
  }
  semCompletionBlockPerDist(distId, data) {
    
    return this.http.post(`${this.baseUrl}/semCompBlock/blockWise/${distId}`, data);
  }
  semCompletionClusterPerBlock(distId, blockId, data) {
    
    return this.http.post(`${this.baseUrl}/semCompCluster/clusterWise/${distId}/${blockId}`, data);
  }
  semCompletionSchoolPerClustter(distId, blockId, clusterId, data) {
    
    return this.http.post(`${this.baseUrl}/semCompSchool/schoolWise/${distId}/${blockId}/${clusterId}`, data);
  }

  //missing school data api
  school_invalid(data) {
    
    return this.http.post(`${this.baseUrl}/school_invalid/school_invalid_data`, data);
  }


  semExceptionMetaData(data) {
    
    return this.http.post(`${this.baseUrl}/patExcetpion/getSemesters`, data);
  }

  patExceptionDistWise(data) {
    
    return this.http.post(`${this.baseUrl}/patExcetpion/allDistrictWise`, data);
  }

  patExceptionBlock(data) {
    
    return this.http.post(`${this.baseUrl}/patExcetpion/allBlockWise`, data);
  }
  patExceptionCluster(data) {
    
    return this.http.post(`${this.baseUrl}/patExcetpion/allClusterWise`, data);
  }
  patExceptionSchool(data) {
    
    return this.http.post(`${this.baseUrl}/patExcetpion/allSchoolWise`, data);
  }

  patExceptionBlockPerDist(distId, data) {
    
    return this.http.post(`${this.baseUrl}/patExcetpion/blockWise/${distId}`, data);
  }
  patExceptionClusterPerBlock(distId, blockId, data) {
    
    return this.http.post(`${this.baseUrl}/patExcetpion/clusterWise/${distId}/${blockId}`, data);
  }
  patExceptionSchoolPerClustter(distId, blockId, clusterId, data) {
    
    return this.http.post(`${this.baseUrl}/patExcetpion/schoolWise/${distId}/${blockId}/${clusterId}`, data);
  }

  //sarException report
  dist_wise_data(data) {
    
    return this.http.post(`${this.baseUrl}/sarException/distWise`, data);
  }

  block_wise_data(data) {
    
    return this.http.post(`${this.baseUrl}/sarException/blockWise`, data);
  }

  cluster_wise_data(data) {
    
    return this.http.post(`${this.baseUrl}/sarException/clusterWise`, data);
  }

  school_wise_data(data) {
    
    return this.http.post(`${this.baseUrl}/sarException/schoolWise`, data);
  }


  blockPerDist(data) {
    
    return this.http.post(`${this.baseUrl}/sarException/blockPerDist`, data);
  }

  clusterPerBlock(data) {
    
    return this.http.post(`${this.baseUrl}/sarException/clusterPerBlock`, data);
  }

  schoolsPerCluster(data) {
    
    return this.http.post(`${this.baseUrl}/sarException/schoolPerCluster`, data);
  }

  getDateRange(data) {
    
    return this.http.post(`${this.baseUrl}/sarException/getDateRange`, data);
  }

  gradeMetaData(data) {
    
    return this.http.post(`${this.baseUrl}/patExcetpion/grades`, data);
  }


}