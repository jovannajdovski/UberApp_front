import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Vehicle } from '../../model/vehicle';
import { DriverService } from '../../services/driver.service';

@Component({
  selector: 'app-vehicle-data',
  templateUrl: './vehicle-data.component.html',
  styleUrls: ['./vehicle-data.component.css']
})
export class VehicleDataComponent implements OnInit {

  vehicle: Vehicle = {
    model: '',
    vehicleType: '',
    pricePerKM: 1000,
    licenseNumber: '',
    passengerSeats: 0,
    babyTransport: false,
    petTransport: false,
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private driverService: DriverService
  ) { }

  ngOnInit(): void {
    const id = this.authService.getId();

    this.driverService.getVehicle(id).subscribe({
      next: (vehicle) => {
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

  edit() {
    this.router.navigate(['/edit-vehicle']);
  }
}
