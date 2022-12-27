import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { DriverHomeComponent } from './components/driver-home/driver-home.component';
import { VehicleDataComponent } from './components/vehicle-data/vehicle-data.component';
import { EditVehicleComponent } from './components/edit-vehicle/edit-vehicle.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { DriverProfileComponent } from './components/driver-profile/driver-profile.component';
import { AccountModule } from '../account/account.module';



@NgModule({
  declarations: [
    DriverHomeComponent,
    VehicleDataComponent,
    EditVehicleComponent,
    DriverProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AccountModule
  ]
})
export class DriverModule { }
