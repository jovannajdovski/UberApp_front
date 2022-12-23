import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  hidePassword=true;
  hideConfirmPassword=true;

  reset = new FormGroup({
    password: new FormControl('',[Validators.minLength(6), Validators.required]),
    confirmPassword: new FormControl('',[Validators.minLength(6), Validators.required]),
  });


  constructor(private router: Router) {}

  toChange() {
    if (this.reset.valid) {
          this.router.navigate(['/password-changed']);
    }
  }

  toLogin() {
    this.router.navigate(['/login']);
  }
}
