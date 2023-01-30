import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Driver } from '../../model/Driver';
import { DriverService } from '../../services/driver.service';

@Component({
  selector: 'app-edit-driver-dialog',
  templateUrl: './edit-driver-dialog.component.html',
  styleUrls: ['./edit-driver-dialog.component.scss']
})
export class EditDriverDialogComponent implements OnInit {
  hidePassword=true;
  hideConfirmPassword=true;
  hasError = false;

  allTextPattern = "[a-zA-Z][a-zA-Z]*";
  phoneNumberPattern = "[0-9]*";
  streetAddressPattern = "^[a-zA-Z0-9,'-]*$"

  driverInfoForm = new FormGroup({
    name: new FormControl('', [Validators.pattern(this.allTextPattern), Validators.required]),
    surname: new FormControl('', [Validators.pattern(this.allTextPattern), Validators.required]),
    phoneNumber: new FormControl('', [Validators.pattern(this.phoneNumberPattern), Validators.minLength(10), Validators.maxLength(10), Validators.required]),
    streetAddress: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required])
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Driver,
    private dialogRef: MatDialogRef<EditDriverDialogComponent>,
    private driverService: DriverService
    ){}

  ngOnInit(): void {
    this.driverInfoForm.patchValue({
      name: this.data.name,
      surname: this.data.surname,
      phoneNumber: this.data.telephoneNumber,
      streetAddress: this.data.surname,
      email: this.data.email
   });
  }

  editDriver() {
    const driver : Driver = {
      id: this.data.id,
      name: this.driverInfoForm.value.name!,
      surname: this.driverInfoForm.value.surname!,
      telephoneNumber: this.driverInfoForm.value.phoneNumber!,
      address: this.driverInfoForm.value.streetAddress!,
      email: this.driverInfoForm.value.email!,
      password: this.driverInfoForm.value.password!,
      profilePicture: '',
      blocked: this.data.blocked,
      active: this.data.active
    }

    if (this.driverInfoForm.valid) {
      this.driverService.updateDriver(driver).subscribe({
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
