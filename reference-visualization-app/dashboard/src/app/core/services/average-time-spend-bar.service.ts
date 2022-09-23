import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppServiceComponent } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class AverageTimeSpendBarService {
  public baseUrl;
  
  constructor(public http: HttpClient, public service: AppServiceComponent) {
    this.baseUrl = service.baseUrl;
  }

  getavgTimeSpendState() {
    //this.service.logoutOnTokenExpire();
    return this.http.get(`${this.baseUrl}/diksha/averageTimeSpend/stateData`);
  }
  
  getAvgTimespendDist() {
    //this.service.logoutOnTokenExpire();
    return this.http.get(`${this.baseUrl}/diksha/averageTimeSpend/distWise`);
  }

}
