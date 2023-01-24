import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { DriverHomeComponent } from './components/driver-home/driver-home.component';
import { MapModule } from '../map/map.module';
import { VehicleDataComponent } from './components/vehicle-data/vehicle-data.component';
import { EditVehicleComponent } from './components/edit-vehicle/edit-vehicle.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { DriverProfileComponent } from './components/driver-profile/driver-profile.component';
import { AccountModule } from '../account/account.module';
import { DriverWorktimeComponent } from './components/driver-worktime/driver-worktime.component';
import { DriverNextRideComponent } from './components/driver-next-ride/driver-next-ride.component';



@NgModule({
  declarations: [
    DriverHomeComponent,
    VehicleDataComponent,
    EditVehicleComponent,
    DriverProfileComponent,
    DriverWorktimeComponent,
    DriverNextRideComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MapModule,
    ReactiveFormsModule,
    AccountModule
  ]
})
export class DriverModule { }
