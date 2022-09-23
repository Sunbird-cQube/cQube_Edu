import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppServiceComponent } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class PerCapitaMapReport {
  public map;
  public baseUrl;
  public token;

  constructor(public http: HttpClient, public service: AppServiceComponent) {
    this.baseUrl = service.baseUrl;
  }

  perCapitaState() {
    return this.http.post(`${this.baseUrl}/perCapita/allDistData`, null);
  }
}