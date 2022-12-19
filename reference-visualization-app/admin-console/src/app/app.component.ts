import { Component, OnInit } from '@angular/core';
import { KeycloakSecurityService } from './keycloak-security.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from '../app/services/users.service'
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "";
  public baseUrl = environment.apiEndpoint;


  constructor(public keycloakService: KeycloakSecurityService, public router: Router, public cookieService: CookieService, public userService: UsersService, public activatedRoute: ActivatedRoute, public http: HttpClient) {
   
    this.activatedRoute.queryParams.subscribe(async params => {

      if (params['userid']) {
        console.log('params', params)
        let userifoResponse = await this.http.get(`${this.baseUrl}/getUserdetails/${params['userid']}`).toPromise();
        console.log('usss', userifoResponse)
        console.log('userResp', userifoResponse)
        if (userifoResponse['status'] === 200 && userifoResponse['userObj']) {
          localStorage.setItem('user_id', userifoResponse['userObj'].userid);
          localStorage.setItem('roleName', userifoResponse['userObj'].roleName);
          localStorage.setItem('userName', userifoResponse['userObj'].userName);
          localStorage.setItem('token', userifoResponse['userObj'].token);

        }
      }
    })
  }

  ngOnInit() {

  }
}