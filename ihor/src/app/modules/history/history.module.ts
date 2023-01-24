import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { MapModule } from '../map/map.module';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountModule } from '../account/account.module';
import { DriverHistoryComponent } from './components/driver-history/driver-history.component';
import { PassengerHistoryComponent } from './components/passenger-history/passenger-history.component';
import { DriverRideDetailComponent } from './components/driver-ride-detail/driver-ride-detail.component';
import { PassengerRideDetailComponent } from './components/passenger-ride-detail/passenger-ride-detail.component';
import { RideDetailComponent } from './components/ride-detail/ride-detail.component';
import { DrawRouteMapComponent } from './components/draw-route-map/draw-route-map.component';


@NgModule({
  declarations: [
    DriverHistoryComponent,
    PassengerHistoryComponent,
    DriverRideDetailComponent,
    PassengerRideDetailComponent,
    RideDetailComponent,
    DrawRouteMapComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MapModule,
    ReactiveFormsModule,
    AccountModule
  ]
})
export class HistoryModule { }