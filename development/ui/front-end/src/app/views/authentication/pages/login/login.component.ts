import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { stateNames } from 'src/app/core/config/StateCodes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  stateName:any
  error: boolean= false;
  LoginForm = new FormGroup({
    userId: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private router:Router, private readonly _authenticationService: AuthenticationService) {
    // if (this._authenticationService.isUserLoggedIn()) {
    //   this.router.navigate(['/dashboard']);
    // }
  } 

  ngOnInit(): void {
    if(environment.config === 'VSK'){
      // // this.stateName = false;
      // this.stateName=environment.stateCode

      let names: any = stateNames;
        // this.stateName = names.filter((key:any) => {
        //   return key.stateCode == environment.stateCode
        //   // return key.name
        // })
        names.every((state:any) => {
          if(state.stateCode == environment.stateCode){
            this.stateName = state.stateName;
            return false;
          }
          return true;
        });
        console.log(this.stateName)

    }
    
  }

  onSubmit(){
    if(this.LoginForm.controls.userId.value === 'admin' && this.LoginForm.controls.password.value === 'admin') {
      localStorage.setItem('userId', this.LoginForm.controls.userId.value);
      this.router.navigate(['/dashboard']);
    } else {
      this.error = true;
    }
  }

 
  
}
