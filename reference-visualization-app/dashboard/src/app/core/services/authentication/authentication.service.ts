import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private readonly _router: Router, private readonly _http: HttpClient) { }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('userId') !== null;
  }

  logout(): void {
    localStorage.clear();
    this._router.navigate(['/login']);
  }

  login(email: any, password: any): Observable<any> {
    return this._http.post(`${environment.loginUrl}/login`, { email, password })
  }

  postUserDetails(data) {
    return this._http.post(`${environment.adminUrl2}/userdetails`, data)
  }
}
