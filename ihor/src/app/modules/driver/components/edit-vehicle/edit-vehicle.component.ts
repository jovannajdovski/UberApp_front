import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Vehicle } from '../../model/vehicle';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { DriverService } from '../../services/driver.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss']
})
export class EditVehicleComponent implements OnInit {

  vehicle: Vehicle = {
    model: '',
    vehicleType: '',
    pricePerKM: 1000,
    licenseNumber: '',
    passengerSeats: 0,
    babyTransport: false,
    petTransport: false,
    currentLocation: {
      address: '',
      latitude: 0,
      longitude: 0
    },
  };

  private id: number;

  vehicleForm = new FormGroup({
    model: new FormControl('',[Validators.required]),
    type: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
    plate: new FormControl('',[Validators.required]),
    seat: new FormControl('',[Validators.required]),
    baby: new FormControl('',),
    pet: new FormControl('',),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private driverService: DriverService
  ) {
    this.id=0;
  }

  ngOnInit(): void {
    this.id = this.authService.getId();

    this.driverService.getVehicle(this.id).subscribe({
      next: (vehicle) => {
        console.log(vehicle);
          this.vehicle.model = vehicle.model;
          this.vehicle.vehicleType = vehicle.vehicleType;
          //this.vehicle.pricePerKM = vehicle.pricePerKM;
          this.vehicle.licenseNumber = vehicle.licenseNumber;
          this.vehicle.passengerSeats = vehicle.passengerSeats;
          this.vehicle.babyTransport = vehicle.babyTransport;
          this.vehicle.petTransport = vehicle.petTransport;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  edit(){
    if(this.vehicleForm.valid){
      this.driverService.getVehicle(this.id).subscribe({
        next: (vehicle) => {
            this.vehicle.currentLocation = vehicle.currentLocation;
            this.driverService.updateVehicle(this.id, this.vehicle).subscribe({
              next: () => {
                this.router.navigate(["/driver/profile"]);
              },
              error: (error) => {
                console.log(error);
              }
            })
        },
        error: (error) => {
          console.log(error);
        },
      });

    }
  }
}
