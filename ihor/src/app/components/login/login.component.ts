import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
    email: new FormControl(),
    password: new FormControl(),
    keepLogin: new FormControl(),
    region: new FormControl('', [Validators.required]),
  });

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    if (this.loginForm.valid) {
          this.router.navigate(['/signup']);
    }
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
