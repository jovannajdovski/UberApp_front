import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  forgot = new FormGroup({
    email: new FormControl('',[Validators.email,Validators.required])
  });


  constructor(private router: Router) {}

  toReset() {
    if (this.forgot.valid) {
          this.router.navigate(['/reset-password']);
    }
  }

  toLogin() {
    this.router.navigate(['/login']);
  }
}
