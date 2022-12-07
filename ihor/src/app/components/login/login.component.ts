import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, EmailValidator } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  hide=true;

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.email,Validators.required]),
    password: new FormControl('',[Validators.minLength(6), Validators.required]),
    keepLogin: new FormControl(),
  });


  constructor(private loginService: LoginService, private router: Router) {}



  login() {
    if (this.loginForm.valid) {
          this.router.navigate(['signup']);
    }
  }


  getErrorMessage() {
    if (this.loginForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }   

    return this.loginForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword() {
    if (this.loginForm.controls['password'].hasError('required')) {
      return 'You must enter a value';
    }   

    return this.loginForm.controls['password'].hasError('minlength') ? 'Not a valid password' : '';
  }

  toFacebook() {
    window.location.href="https://www.facebook.com/";
  }

  toGoogle() {
    window.location.href="https://accounts.google.com";
  }

  toSignup() {
    this.router.navigate(['/signup']);
  }
}
