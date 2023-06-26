import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  data: boolean;
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.data = (localStorage.getItem('token') == null);
    if (this.data) {
      window.location.href = `${environment.dashboardUrl}/#/signin`;
      return false;
    } else {
      return true;
    }
  

  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.data = (localStorage.getItem('token') == null);
    if (this.data) {
      window.location.href = `${environment.dashboardUrl}/#/signin`;
      return false;
    } else {
      return true;
    }

  }
}
