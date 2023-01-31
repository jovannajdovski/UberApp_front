import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { DriverHomeComponent } from './components/driver-home/driver-home.component';
import { MapModule } from '../map/map.module';
import { VehicleDataComponent } from './components/vehicle-data/vehicle-data.component';
import { EditVehicleComponent } from './components/edit-vehicle/edit-vehicle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DriverProfileComponent } from './components/driver-profile/driver-profile.component';
import { AccountModule } from '../account/account.module';
import { DriverWorktimeComponent } from './components/driver-worktime/driver-worktime.component';
import { DriverNextRideComponent } from './components/driver-next-ride/driver-next-ride.component';


import { AcceptedRidesComponent } from './components/accepted-rides/accepted-rides.component';
import { SharedModule } from "../shared/shared.module";
import { DialogReasonComponent } from './components/accepted-rides/accepted-rides.component';
import { FormsModule } from '@angular/forms';
import { DriverMapComponent } from './components/driver-map/driver-map.component';

@NgModule({
  declarations: [
    DriverHomeComponent,
    VehicleDataComponent,
    EditVehicleComponent,
    DriverProfileComponent,
    DriverWorktimeComponent,
    DriverNextRideComponent,
    AcceptedRidesComponent,
    DialogReasonComponent,
    DriverMapComponent
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
