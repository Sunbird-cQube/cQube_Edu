import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  error: boolean= false;
  LoginForm = new FormGroup({
    userId: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private router:Router, private readonly _authenticationService: AuthenticationService) {
    if (this._authenticationService.isUserLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  } 

  ngOnInit(): void {
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
