import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import {Router} from '@angular/router';
import {RegistrationService} from 'src/app/modules/unregistered-user/services/registration/registration.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  hidePassword = true;
  hideConfirmPassword = true;
  hasError = false;
  submitted = false;

  allTextPattern = "[a-zA-Z][a-zA-Z]*";
  phoneNumberPattern = "[0-9 +]?[0-9]+[0-9 \\-]+";
  streetAddressPattern = "^[a-zA-Z0-9,'-]*$"

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.pattern(this.allTextPattern), Validators.required]),
    surname: new FormControl('', [Validators.pattern(this.allTextPattern), Validators.required]),
    phoneNumber: new FormControl('', [Validators.pattern(this.phoneNumberPattern), Validators.minLength(6), Validators.maxLength(20), Validators.required]),
    streetAddress: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  }, {validators: [match('password', 'confirmPassword')]});

  constructor(private router: Router,
              private registrationService: RegistrationService) {
  }

  ngOnInit(): void {
    this.registrationService.hasErrorObs.subscribe((value)=>{
      this.hasError=value;
    })
  }

  signup() {
    this.submitted = true;
    const registration: Registration = {
      name: this.signupForm.value.name,
      surname: this.signupForm.value.surname,
      telephoneNumber: this.signupForm.value.phoneNumber,
      streetAddress: this.signupForm.value.streetAddress,
      email: this.signupForm.value.email,
      address: this.signupForm.value.streetAddress,
      password: this.signupForm.value.password
    }

    if (this.signupForm.valid) {

      this.registrationService.registerPassengerObs(registration);
    }
  }

  toLogin() {
    this.router.navigate(['/login']);
  }
}

export function match(controlName: string, checkControlName: string): ValidatorFn {
  return (controls: AbstractControl) => {
    const control = controls.get(controlName);
    const checkControl = controls.get(checkControlName);

    if (checkControl?.errors && !checkControl.errors['matching']) {
      return null;
    }

    if (control?.value !== checkControl?.value) {
      controls.get(checkControlName)?.setErrors({matching: true});
      return {matching: true};
    } else {
      return null;
    }
  };
}

export interface Registration {
  name?: string | null,
  surname?: string | null,
  telephoneNumber?: string | null,
  streetAddress?: string | null,
  email?: string | null,
  address?: string | null,
  password?: string | null
}
