import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDashboardMenu } from 'src/app/core/models/IDashboardCard';
import { IMenuItem } from 'src/app/core/models/IMenuItem';
import { ResponseType } from 'src/app/core/models/IResponseType';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private readonly _http: HttpClient) { }

  getMenu(): Observable<ResponseType<IMenuItem[]>> {
    
    return this._http.get<ResponseType<IMenuItem[]>>(`${environment.apiURL}/config/getMenu`);
    console.log(this.getMenu())
  }

  getDashboardMenu(): Observable<ResponseType<IDashboardMenu[]>> {
    return this._http.get<ResponseType<IDashboardMenu[]>>(`${environment.apiURL}/config/getDashboardMenu`);
  }
}
