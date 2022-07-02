import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(
    private router:Router
  ) { 
  }
  

  ngOnInit(): void {

  }




  onSubmit(){
    if(this.LoginForm.controls.userId.value == 'admin' && this.LoginForm.controls.password.value == 'admin'){
      
      this.router.navigate(['/layout'])
    }
    else{
      this.error = true;
    }
  }
}
