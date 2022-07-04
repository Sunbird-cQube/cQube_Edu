import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  config: string = environment.config

  faBars = faBars;

  constructor(private router:Router, private readonly _authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  logout() {
    this._authenticationService.logout();
  }

}
