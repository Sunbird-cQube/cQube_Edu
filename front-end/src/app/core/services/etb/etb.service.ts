import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseType } from 'src/app/core/models/IResponseType';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ETBService {

  constructor(private readonly _http: HttpClient) { }

  getStateWiseETBCoverageData(): Observable<ResponseType<any[]>> {
    return this._http.get<ResponseType<any[]>>(`${environment.apiURL}/etb/getStateWiseETBCoverageData`);
  }

  getStateWiseOverallETBCoverageData(version: string): Observable<ResponseType<any[]>> {
    return this._http.get<ResponseType<any[]>>(`${environment.apiURL}/etb/getStateWiseOverallETBCoverageData`);
  }
}
