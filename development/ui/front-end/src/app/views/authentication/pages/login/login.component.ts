import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { stateNames } from 'src/app/core/config/StateCodes';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  NVSK: boolean = true;
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
      this.NVSK = false
      // // this.stateName = false;
      // this.stateName=environment.stateCode

      let names: any = stateNames;
        names.every((state:any) => {
          if(state.stateCode == environment.stateCode){
            this.stateName = state.stateName;
            return false;
          }
          return true;
        });

    }
    else{
      this.stateName = 'India'
    }
    
  }


  encrypt(value : string) : string{
    return CryptoJS.AES.encrypt(value, environment.secretKey.trim()).toString();
  }

  onSubmit(){
    //let password = this.encrypt(this.LoginForm.controls.password.value as string);
    this._authenticationService.login(this.LoginForm.controls.userId.value, this.LoginForm.controls.password.value).subscribe((res:any) => {
      localStorage.setItem('userId', JSON.stringify(res));
      this.router.navigate(['/dashboard']);
    },
    err => {
      this.error = true;
    })
    // if(this.LoginForm.controls.userId.value === 'admin' && this.LoginForm.controls.password.value === 'admin') {
    //   localStorage.setItem('userId', this.LoginForm.controls.userId.value);
    //   this.router.navigate(['/dashboard']);
    // } else {
    //   this.error = true;
    // }
  }

 
  
}
