import {HttpErrorResponse} from '@angular/common/http';
import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {match, Registration} from 'src/app/modules/unregistered-user/components/signup-form/signup-form.component';
import {RegistrationService} from 'src/app/modules/unregistered-user/services/registration/registration.service';
import {Vehicle} from "../../model/Vehicle";
import {Location} from "../../model/Location";

@Component({
  selector: 'app-add-driver-dialog',
  templateUrl: './add-driver-dialog.component.html',
  styleUrls: ['./add-driver-dialog.component.scss']
})
export class AddDriverDialogComponent {
  hidePassword = true;
  hideConfirmPassword = true;
  hasError = false;
  allTextPattern = "[a-zA-Z][a-zA-Z]*";
  phoneNumberPattern = "[0-9]*";

  addDriverForm = new FormGroup({
    name: new FormControl('', [Validators.pattern(this.allTextPattern), Validators.required]),
    surname: new FormControl('', [Validators.pattern(this.allTextPattern), Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    streetAddress: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  }, {validators: [match('password', 'confirmPassword')]});

  addVehicleForm = new FormGroup({
    vehicleType: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    licenceNumber: new FormControl('', [Validators.required]),
    numberOfSeats: new FormControl('', [Validators.min(1), Validators.max(5), Validators.required])
  });

  babyTransport = false;
  petTransport = false;
  emailError = false;
  vehicleError = false;

  constructor(
    private dialogRef: MatDialogRef<AddDriverDialogComponent>,
    private registrationService: RegistrationService
  ) {
  }

  toggleBabyTransport() {
    this.babyTransport = !this.babyTransport;
  }

  togglePetTransport() {
    this.petTransport = !this.petTransport;
  }

  signup() {
    const registration: Registration = {
      name: this.addDriverForm.value.name,
      surname: this.addDriverForm.value.surname,
      telephoneNumber: this.addDriverForm.value.phoneNumber,
      streetAddress: this.addDriverForm.value.streetAddress,
      email: this.addDriverForm.value.email,
      address: this.addDriverForm.value.streetAddress,
      password: this.addDriverForm.value.password
    }

    const location: Location = {
      address: "Bulevar Oslobodjenja 1",
      latitude: 10,
      longitude: 10
    }

    const vehicle: Vehicle = {
      vehicleType: this.addVehicleForm.value.vehicleType!,
      model: this.addVehicleForm.value.model!,
      licenseNumber: this.addVehicleForm.value.licenceNumber!,
      currentLocation: location,
      passengerSeats: this.addVehicleForm.value.numberOfSeats!,
      babyTransport: this.babyTransport,
      petTransport: this.petTransport
    }

    console.log(vehicle);

    if (this.addDriverForm.valid && this.addVehicleForm.valid) {
      this.registerDriver(registration, vehicle)
    }
  }

  registerDriver(registration: Registration, vehicle: Vehicle) {
    this.registrationService.registerDriver(registration).subscribe({
      next: (driver) => {
        this.addVehicle(driver.id, vehicle);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.emailError = true;
        }
      },
    });
  }

  addVehicle(id: number, vehicle: Vehicle) {
    this.registrationService.addVehicleToDriver(id, vehicle).subscribe({
      next: () => {
        this.dialogRef.close("success");
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
          this.vehicleError = true;
        }
      },
    });
  }
}
