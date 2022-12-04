import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  hidePassword=true;
  hideConfirmPassword=true;

  signupForm = new FormGroup({
    name: new FormControl(),
    surname: new FormControl(),
    phoneNumber: new FormControl(),
    streetAddress: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    region: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['/options']);
  }

  signup() {
    if (this.signupForm.valid) {
          this.router.navigate(['/signup']);
    }
  }

  toLogin() {
    this.router.navigate(['/login']);
  }
}
