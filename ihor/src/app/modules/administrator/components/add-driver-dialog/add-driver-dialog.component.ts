import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { match, Registration } from 'src/app/modules/unregistered-user/components/signup-form/signup-form.component';
import { RegistrationService } from 'src/app/modules/unregistered-user/services/registration/registration.service';

@Component({
  selector: 'app-add-driver-dialog',
  templateUrl: './add-driver-dialog.component.html',
  styleUrls: ['./add-driver-dialog.component.scss']
})
export class AddDriverDialogComponent {
  hidePassword=true;
  hideConfirmPassword=true;
  hasError = false;

  allTextPattern = "[a-zA-Z][a-zA-Z]*";
  phoneNumberPattern = "[0-9]*";
  streetAddressPattern = "^[a-zA-Z0-9,'-]*$"
  
  addDriverForm = new FormGroup({
    name: new FormControl('', [Validators.pattern(this.allTextPattern), Validators.required]),
    surname: new FormControl('', [Validators.pattern(this.allTextPattern), Validators.required]),
    phoneNumber: new FormControl('', [Validators.pattern(this.phoneNumberPattern), Validators.minLength(10), Validators.maxLength(10), Validators.required]),
    streetAddress: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: [match('password', 'confirmPassword')] });
  
  constructor(
    private dialogRef: MatDialogRef<AddDriverDialogComponent>,
    private registrationService: RegistrationService
    ){}

  signup() {
    const registration : Registration = {
      name: this.addDriverForm.value.name,
      surname: this.addDriverForm.value.surname,
      telephoneNumber: this.addDriverForm.value.phoneNumber,
      streetAddress: this.addDriverForm.value.streetAddress,
      email: this.addDriverForm.value.email,
      address: this.addDriverForm.value.streetAddress,
      password:this.addDriverForm.value.password
    }

    if (this.addDriverForm.valid) {
      this.registrationService.registerDriver(registration).subscribe({
        next: () => {
          this.dialogRef.close("success");
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this.hasError = true;
          }
        },
      });
    }
  }
}
