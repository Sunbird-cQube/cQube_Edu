import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { stateNames } from '../../config/StateCodes';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity:0}),
        animate(500, style({opacity:1})) 
      ]),
      transition(':leave', [
        animate(500, style({opacity:0}))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  stateName: any;
  config: string = environment.config
  national: boolean = true;

  faBars = faBars;

  drop: boolean = false;
  withinTime: boolean = false;
  dropdown: boolean = false;

  constructor(private router:Router, private readonly _authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if(environment.config === 'state'){
      this.national = false
      // // this.stateName = false;
      // this.stateName=environment.stateCode

      let names: any = stateNames;
        names.every((state:any) => {
          if(state.stateCode == environment.stateCode){
            this.stateName = state.stateName.toUpperCase();
            return false;
          }
          return true;
        });

    }
    else{
      this.stateName = 'India'
    }
  }

  logout() {
    this._authenticationService.logout();
  }

  onMouseOver(){
    this.withinTime=true;
    this.dropdown = true;
  }

  onMouseOut(){
    this.withinTime=false;
    setTimeout(() => {
      if(!this.withinTime){
        this.dropdown = false;
      }
    }, 3000)
  }

}
