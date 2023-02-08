import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Credentials} from "../../model/credentials";
import {WorkTimeService} from "../../../driver/services/work-time/work-time.service";
import {RouteService} from "../../../map/services/route/route.service";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  submitted=false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
    keepLogin: new FormControl(),
  });
  hasError = false;

  constructor(private loginService: LoginService, private authService: AuthService, private routeService:RouteService,
           private router: Router, private workTimeService:WorkTimeService) {

    this.authService.setUser();
  }

  ngOnInit(): void {
    this.loginService.hasErrorObs.subscribe((value)=>{
      this.hasError=value;
    })
  }

  login() {
    this.submitted = true;
    const login: Credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    }

    if (this.loginForm.valid) {
        this.loginService.loginUserObs(login);
    }
  }

  toForgot() {
    this.router.navigate(['/forgot-password']);
  }

  toFacebook() {
    window.location.href = "https://www.facebook.com/";
  }

  toGoogle() {
    window.location.href = "https://accounts.google.com";
  }

  toSignup() {
    this.router.navigate(['/signup']);
  }
}
