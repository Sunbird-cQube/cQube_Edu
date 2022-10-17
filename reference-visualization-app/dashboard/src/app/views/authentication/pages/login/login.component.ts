import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { stateNames } from 'src/app/core/config/StateCodes';
import * as CryptoJS from 'crypto-js';
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginObj: any = environment.loginObj;
  national: boolean = true;


  otpForm!: FormGroup;
  passwordForm!: FormGroup
  stateName: any

  wrongOtp: boolean = false;
  public passwordMatch: boolean = false;
  tempSecret: string = '';
  error: boolean = false;
  roletype

  userStatus = ''
  qrcode
  adminUserId = '';
  otpUrl

  userName = ''
  errorMsg
  LoginForm = new FormGroup({
    userId: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  tempUserId: any = '';

  constructor(private router: Router, private formBuilder: FormBuilder, private readonly _authenticationService: AuthenticationService) {
    if (this._authenticationService.isUserLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    if (environment.config === 'state') {
      this.national = false


      let names: any = stateNames;
      names.every((state: any) => {
        if (state.stateCode == environment.stateCode) {
          this.stateName = state.stateName;
          return false;
        }
        return true;
      });

      this.otpForm = this.formBuilder.group({
        otp: ['', Validators.required],
        secret: ['', Validators.required]
      })


      this.passwordForm = this.formBuilder.group({
        username: ['', Validators.required],
        newPassword: ['', Validators.required],
        cnfpass: ['', Validators.required]
      })

    }
    else {
      this.stateName = 'India'
    }

  }


  onChange(el) {
    if (el.target.value.length > 0) {
      document.getElementById("togglePassword").style.display = 'block';
    } else {
      document.getElementById("togglePassword").style.display = 'none';
    }
  }


  myFun(el) {
    if (this.LoginForm.valid) {
      document.getElementById("login").style.backgroundColor = "#31D08C";
      document.getElementById("login").style.color = "white";
      document.getElementById("signinSymbol").style.display = "none";
      document.getElementById("signinSymbolWithInput").style.display = "block";
    } else {
      document.getElementById("login").style.color = "#899BFF";
      document.getElementById("login").style.backgroundColor = "transparent";
      document.getElementById("signinSymbol").style.display = "block";
      document.getElementById("signinSymbolWithInput").style.display = "none";
    }
  }

  encrypt(value: string): string {

    return '';
  }

  onSubmit() {

    this._authenticationService.login(this.LoginForm.controls.userId.value, this.LoginForm.controls.password.value).subscribe((res: any) => {
      const token = res.token
      this.error = false
      // this.userStatus = res['status']
      this.userStatus = 'false';
      this.roletype = res['role']
      this.userName = res['username']
      this.adminUserId = res['userId']

      if (this.userName !== environment.keycloak_adm_user) {
        if (this.userStatus === 'true') {
          this.tempSecret = ''
          this._authenticationService.addUser(this.userName).subscribe(res => {

          })

          // ++++ custom qr code for 2FA
          this._authenticationService.getQRcode(this.LoginForm.value).subscribe(res => {
            this.otpUrl = res
            this.qrcode = res['dataURL']
            this.tempSecret = res['tempSecret'];
          })

        }

      }

      if (this.roletype === "admin" && this.userName !== environment.keycloak_adm_user) {
        document.getElementById("otp-container").style.display = "block";
        document.getElementById("kc-form-login1").style.display = "none";
        localStorage.setItem('token', token)
        localStorage.setItem('userName', res.username)
        localStorage.setItem('roleName', res.role)
        localStorage.setItem('user_id', res.userId)
        this.tempUserId = res.userId;

      }


      if (this.roletype === "admin" && this.userName === environment.keycloak_adm_user) {
        if (this.userStatus === "true") {
          document.getElementById("otp-container").style.display = "none";
          document.getElementById("kc-form-login1").style.display = "none";
          document.getElementById("updatePassword").style.display = "block";
          localStorage.setItem('token', token)
          localStorage.setItem('userName', res.username)
          localStorage.setItem('roleName', res.role)
          localStorage.setItem('user_id', res.userId)
          // this.router.navigate(['/home']);
        } else {
          localStorage.setItem('token', token)
          localStorage.setItem('userName', res.username)
          localStorage.setItem('roleName', res.role)
          localStorage.setItem('user_id', res.userId)
          this.router.navigate(['/home']);
        }

      }
      if (this.roletype === "report_viewer" && environment.report_viewer_config_otp === true) {
        document.getElementById("otp-container").style.display = "block";
        document.getElementById("kc-form-login1").style.display = "none";
        localStorage.setItem('token', token)
        localStorage.setItem('userName', res.username)
        localStorage.setItem('roleName', res.role)
        this.tempUserId = res.userId;
        // localStorage.setItem('user_id', res.userId)

      }
      if (this.roletype === "report_viewer" && environment.report_viewer_config_otp === false) {

        localStorage.setItem('token', token)
        localStorage.setItem('userName', res.username)
        localStorage.setItem('roleName', res.role)
        localStorage.setItem('user_id', res.userId)
        this.router.navigate(['/dashboard']);
      }
    },
      err => {
        this.error = true;
      })

  }

  public otpStatus: any

  verifyQRCOde() {

    if (this.userStatus === 'true') {

      try {
        this._authenticationService.getQRverify(this.otpForm.value).subscribe(res => {
          this.otpStatus = res

          if (res['status'] === 200) {
            this.wrongOtp = false;
            document.getElementById("otp-container").style.display = "none";
            document.getElementById("qr-code").style.display = "none"

            document.getElementById("kc-form-login1").style.display = "none";
            if ((this.roletype === "admin" && this.userName !== environment.keycloak_adm_user) || (this.roletype === "report_viewer" && environment.report_viewer_config_otp === true)) {
              localStorage.setItem('user_id', this.tempUserId);
            }
            if (this.roletype === "admin") {
              this.router.navigate(['home'])
            } else {
              this.router.navigate(['/dashboard'])
            }
          } else {
            this.wrongOtp = true;
            this.errorMsg = res['message'];
          }

        })
      } catch (error) {

      }


    } else if (this.userStatus === 'false') {
      try {
        this._authenticationService.getSecret(this.userName).subscribe(res => {

          if (res['status'] === 200) {
            let otpSecret = res['secret']
            let data = {
              secret: otpSecret,
              otp: this.otpForm.value.otp

            }
            this._authenticationService.getQRverify(data).subscribe(res => {
              this.otpStatus = res
              if (res['status'] === 200) {
                this.wrongOtp = false;
                if (this.roletype === "admin") {
                  this.router.navigate(['home'])
                } else {
                  this.router.navigate(['/dashboard'])
                }
              } else {
                this.wrongOtp = true;
                this.errorMsg = res['message'];
              }

            })

          }
        })
      } catch (error) {

      }

    } else if (this.userStatus === undefined) {
      try {
        this._authenticationService.getSecret(this.userName).subscribe(res => {

          if (res['status'] === 200) {
            let otpSecret = res['secret']
            let data = {
              secret: otpSecret,
              otp: this.otpForm.value.otp

            }
            this._authenticationService.getQRverify(data).subscribe(res => {
              this.otpStatus = res
              if (res['status'] === 200) {
                this.wrongOtp = false;
                if (this.roletype === "admin") {
                  this.router.navigate(['home'])
                } else {
                  this.router.navigate(['/dashboard'])
                }
              } else {
                this.wrongOtp = true;

              }

            })

          }
        })
      } catch (error) {

      }

    }

  }


  changePasswordStatus: any
  err: any

  changePassword() {
    let data = {
      cnfpass: this.passwordForm.value.cnfpass,
      username: this.passwordForm.value.username,
      token: localStorage.getItem('token')
    }
    if (this.passwordForm.value.newPassword != this.passwordForm.value.cnfpass) {
      this.passwordMatch = true
      this.errorMsg = "Password not matched"
    } else {
      this._authenticationService.changePassword(data, this.adminUserId).subscribe(res => {
        this.passwordMatch = false;
        this.changePasswordStatus = res

        this.router.navigate(['home'])
      })
    }

  }

}
