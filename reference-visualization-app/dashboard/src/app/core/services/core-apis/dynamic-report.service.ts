import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppServiceComponent } from 'src/app/app.service';


@Injectable({
    providedIn: 'root'
})
export class dynamicReportService {
    public map;
    public baseUrl;

    constructor(public http: HttpClient, public service: AppServiceComponent) {
        this.baseUrl = service.baseUrl;
    }

    // dynamic new apis
    dynamicDistData(data) {
        
        return this.http.post(`${this.baseUrl}/common/distWise`, data);
    }

    dynamicBlockData(data) {
        
        return this.http.post(`${this.baseUrl}/common/blockWise`, data);
    }
    dynamicAllBlockData(data) {
        
        return this.http.post(`${this.baseUrl}/common/AllBlockWise`, data);
    }

    dynamicAllClusterData(data) {
        
        return this.http.post(`${this.baseUrl}/common/AllClusterWise`, data);
    }

    dynamicAllSchoolData(data) {
        
        return this.http.post(`${this.baseUrl}/common/AllSchoolWise`, data);
    }

    dynamicClusterData(data) {
        
        return this.http.post(`${this.baseUrl}/common/clusterWise`, data);
    }

    dynamicSchoolData(data) {
        
        return this.http.post(`${this.baseUrl}/common/schoolWise`, data);
    }

    configurableProperty() {
        
        return this.http.post(`${this.baseUrl}/configProperties`, {});
    }
    configurableCardProperty() {
        
        return this.http.post(`${this.baseUrl}/configCardProperties`, {});
    }

    configurableMetaData(data) {
        
        return this.http.post(`${this.baseUrl}/meta`, data);
    }
    configurableTimePeriodMeta(data) {
        
        return this.http.post(`${this.baseUrl}/timePeriod`, data);
    }
    configurableMetricMeta(data) {
        
        return this.http.post(`${this.baseUrl}/metricname`, data);
    }
}


