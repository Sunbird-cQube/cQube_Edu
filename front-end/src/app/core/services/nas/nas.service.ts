import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseType } from 'src/app/core/models/IResponseType';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NasService {

  constructor(private readonly _http: HttpClient) { }
  getNASMetrics(): Observable<ResponseType<any[]>> {
    return this._http.get<ResponseType<any[]>>(`${environment.apiURL}/nas/getNasMetrics`);
  }
  getNasStateData(): Observable<ResponseType<any[]>> {
    return this._http.get<ResponseType<any[]>>(`${environment.apiURL}/nas/getNasState`);
  }
}