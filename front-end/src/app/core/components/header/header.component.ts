import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  config: string = environment.config

  faBars = faBars;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  signOut(){
    this.router.navigate(['/authentication/login']);
  }

}
