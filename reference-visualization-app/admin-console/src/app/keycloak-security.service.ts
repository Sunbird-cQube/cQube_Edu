import { Injectable } from '@angular/core';
import { KeycloakInstance } from 'keycloak-js';
import { ActivatedRoute, Router } from '@angular/router'
import { environment } from '../../src/environments/environment';
import { UsersService } from '../app/services/users.service'
import { HttpClient } from '@angular/common/http';
declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakSecurityService {
  public kc: KeycloakInstance;
  public baseUrl = environment.apiEndpoint;
  constructor(public router: Router, public activtedRoute: ActivatedRoute, public http: HttpClient) { }

  async init() {
    if (environment.auth_api === 'cqube') {
      this.kc = new Keycloak({
        url: environment.keycloakUrl,
        realm: environment.realm,
        clientId: environment.clientId,
        // credentials: environment.credentials
      });
      await this.kc.init({
        onLoad: 'login-required',
        checkLoginIframe: false
      });
    } else {
    
    }
  }

}
