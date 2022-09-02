import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IDashboardMenu } from 'src/app/core/models/IDashboardCard';
import { IMenuItem } from 'src/app/core/models/IMenuItem';
import { ResponseType } from 'src/app/core/models/IResponseType';
import { formatNumberForKeyMetric } from 'src/app/utilities/NumberFomatter';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private readonly _http: HttpClient) { }

  getMenu(): Observable<ResponseType<IMenuItem[]>> {
    return this._http.get<ResponseType<IMenuItem[]>>(`${environment.apiURL}/config/getConfig/${environment.config.toLowerCase()}/menu`);
  }

  getDashboardMenu(): Observable<ResponseType<IDashboardMenu[]>> {
    return this._http.get<ResponseType<IDashboardMenu[]>>(`${environment.apiURL}/config/getConfig/${environment.config.toLowerCase()}/dashboardMenu`);
  }

  getDashboardMetrics(forMenu = false): Observable<ResponseType<IDashboardMenu[] | any[]>> {  
    return this._http.get<ResponseType<IDashboardMenu[]>>(`${environment.apiURL}/metrics/getDashboardMetrics/${environment.config.toLowerCase()}/${forMenu}`).pipe(
      tap((res: any) => {
        res.result.map((item: any) => {
          item.metrics.map((metric: any) => {
            if (typeof metric.value === 'number' || !isNaN(Number(metric.value))) {
              metric.value = Number(metric.value);
              metric.value = formatNumberForKeyMetric(metric.value);
            }
    
            return metric;
          });
    
          return item;
        });
      })
    );
  }

  getVanityMetrics(programId: string): Observable<ResponseType<any>> {
    return this._http.get<ResponseType<any>>(`${environment.apiURL}/metrics/getVanityMetrics/${environment.config.toLowerCase()}/${programId}`).pipe(
      tap((res: any) => {
        res.result.map((metric: any) => {
          if (typeof metric.value === 'number' || !isNaN(Number(metric.value))) {
            metric.value = Number(metric.value);
            metric.value = formatNumberForKeyMetric(metric.value);
          }
          
          return metric;
        });
      })
    );
  }

}
