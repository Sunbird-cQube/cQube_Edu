import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppServiceComponent } from 'src/app/app.service';

@Injectable({
    providedIn: 'root'
})
export class TelemetryService {
    public baseUrl;

    constructor(public http: HttpClient, public service: AppServiceComponent) {
        this.baseUrl = service.baseUrl;
    }

    //telemetry data
    telemetryDist(data) {
        
        return this.http.post(`${this.baseUrl}/showDistTelemetry`, data);
    }

    telemetryBlock(data) {
        
        return this.http.post(`${this.baseUrl}/showBlockTelemetry/all_Block`, data);
    }

    telemetryCluster(data) {
        
        return this.http.post(`${this.baseUrl}/showClusterTelemetry/all_Cluster`, data);
    }

    telemetrySchool(data) {
        
        return this.http.post(`${this.baseUrl}/showSchoolTelemetry/all_school`, data);
    }
}