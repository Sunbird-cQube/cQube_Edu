

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { KeycloakSecurityService } from '../keycloak-security.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { AppServiceComponent } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomePageComponent implements OnInit {
  adminUrl;
  adminDashUrl;
  role;
  storage
  hideAdmin
  constructor(public router: Router, public service: AppServiceComponent, public logInservice: AuthenticationService) {

  }

  ngOnInit(): void {
    this.adminUrl = environment.adminUrl;
    this.storage = window.localStorage;
    this.hideAdmin = localStorage.getItem('roleName') === 'admin' ? true : false;
    if (localStorage.getItem('roleName') !== 'admin') {
      //this.router.navigate(['/dashboard']);
    }

  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/signin'])

  }


  submit() {

    let obj = {
      'userid': localStorage.getItem('user_id'),
      'roleName': localStorage.getItem('roleName'),
      'userName': localStorage.getItem('userName'),
      'token': localStorage.getItem('token')
    }



    this.logInservice.postUserDetails(obj).subscribe(res => {
      try {
        window.location.href = `${environment.adminUrl}/#/admin-dashboard?userid=${obj.userid}`;
      } catch (error) {
        console.log(error)
      }
    })

  }
}