import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private readonly _router: Router) { }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('userId') !== null;
  }

  logout(): void {
    localStorage.removeItem('userId');
    this._router.navigate(['/login']);
  }
}
