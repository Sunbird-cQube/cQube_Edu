import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppServiceComponent } from 'src/app/app.service';


@Injectable({
    providedIn: 'root'
})
export class CrcReportService {
    public map;
    public baseUrl;

    constructor(public http: HttpClient, public service: AppServiceComponent) {
        this.baseUrl = service.baseUrl;
    }

    // crc new apis
    crcDistWiseData(data) {
        
        return this.http.post(`${this.baseUrl}/crc/districtWise`, data);
    }
    crcBlockWiseData(distId, data) {
       
        return this.http.post(`${this.baseUrl}/crc/blockWise/${distId}`, data);
    }
    crcClusterWiseData(distId, blockId, data) {
       
        return this.http.post(`${this.baseUrl}/crc/clusterWise/${distId}/${blockId}`, data);
    }

    crcSchoolWiseData(distId, blockId, clusterId, data) {
      
        return this.http.post(`${this.baseUrl}/crc/schoolWise/${distId}/${blockId}/${clusterId}`, data);
    }

    crcAllBlockWiseData(data) {
       
        return this.http.post(`${this.baseUrl}/crc/allBlockWise`, data);
    }

    crcAllClusterWiseData(data) {
      
        return this.http.post(`${this.baseUrl}/crc/allClusterWise`, data);
    }

    crcAllSchoolWiseData(data) {
      
        return this.http.post(`${this.baseUrl}/crc/allSchoolWise`, data);
    }

    getMonthYear() {
     
        return this.http.get(`${this.baseUrl}/crc/getDateRange`);
    }

}