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
import { AcceptedRidesComponent } from './components/accepted-rides/accepted-rides.component';
import { SharedModule } from "../shared/shared.module";
import { DialogReasonComponent } from './components/accepted-rides/accepted-rides.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DriverHomeComponent,
    VehicleDataComponent,
    EditVehicleComponent,
    DriverProfileComponent,
    AcceptedRidesComponent,
    DialogReasonComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MapModule,
    ReactiveFormsModule,
    AccountModule,
    SharedModule,
    FormsModule
  ]
})
export class DriverModule { }
