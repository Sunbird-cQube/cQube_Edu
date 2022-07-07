import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IDashboardMenu } from 'src/app/core/models/IDashboardCard';
import { IMenuItem } from 'src/app/core/models/IMenuItem';
import { ResponseType } from 'src/app/core/models/IResponseType';

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
}
