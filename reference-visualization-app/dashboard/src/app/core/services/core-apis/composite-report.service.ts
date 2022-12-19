import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppServiceComponent } from 'src/app/app.service';


@Injectable({
    providedIn: 'root'
})
export class CompositReportService {
    public baseUrl;
    public telemetryData = [];

    constructor(public http: HttpClient, public service: AppServiceComponent) {
        this.baseUrl = service.baseUrl;
    }

    //Composit report
    dist_wise_data(data) {

        return this.http.post(`${this.baseUrl}/composit/distWise`, data);
    }

    block_wise_data(data) {

        return this.http.post(`${this.baseUrl}/composit/blockWise`, data);
    }

    block_per_dist_data(distId, data) {

        return this.http.post(`${this.baseUrl}/composit/blockWise/${distId}`, data);
    }

    cluster_wise_data(data) {

        return this.http.post(`${this.baseUrl}/composit/clusterWise`, data);
    }

    cluster_per_block_data(distId, blockId, data) {

        return this.http.post(`${this.baseUrl}/composit/clusterWise/${distId}/${blockId}`, data);
    }

    school_wise_data(data) {

        return this.http.post(`${this.baseUrl}/composit/schoolWise`, data);
    }

    school_per_cluster_data(distId, blockId, clusterId, data) {

        return this.http.post(`${this.baseUrl}/composit/schoolWise/${distId}/${blockId}/${clusterId}`, data);
    }
}