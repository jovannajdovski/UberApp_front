import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Credentials} from "../../model/credentials";
import {WorkTimeService} from "../../../driver/services/work-time/work-time.service";
import {RouteService} from "../../../map/services/route/route.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
    keepLogin: new FormControl(),
  });
  hasError = false;

  constructor(private authService: AuthService, private routeService:RouteService,
           private router: Router, private workTimeService:WorkTimeService) {

    this.authService.setUser();
  }

  ngOnInit(): void {
  }

  login() {
    const login: Credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    }

    if (this.loginForm.valid) {
      this.authService.login(login).subscribe({
        next: (result) => {
          localStorage.setItem('user', JSON.stringify(result.accessToken));
          this.authService.setUser();

          if (this.authService.getRole() == "DRIVER") {
            this.workTimeService.startShift();
            this.router.navigate(['/driver']);
          } else if (this.authService.getRole() == "ADMINISTRATOR") {
            this.router.navigate(['/administrator']);
          } else if (this.authService.getRole() == "PASSENGER") {
            this.routeService.resetRoute();
            this.router.navigate(['/passenger']);
          }
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this.hasError = true;
          }
        },
      });
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
