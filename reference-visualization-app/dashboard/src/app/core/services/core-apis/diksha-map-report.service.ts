import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppServiceComponent } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class DikshaMapReportsService {
  public map;
  public baseUrl;
  public token;

  constructor(public http: HttpClient, public service: AppServiceComponent) {
    this.baseUrl = service.baseUrl;
  }

  
  tpdDistWise() {
    return this.http.post(`${this.baseUrl}/tpdMap/allDistData`, null);
  }

  etbDistWise() {
    return this.http.post(`${this.baseUrl}/etbMap/allDistData`, null);
  }
}