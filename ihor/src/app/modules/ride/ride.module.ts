import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentRideComponent } from './components/current-ride/current-ride.component';
import { NoCurrentRideComponent } from './components/no-current-ride/no-current-ride.component';
import { MapModule } from "../map/map.module";
import { CurrentRideDetailsComponent } from "./components/current-ride-details/current-ride-details.component";
import { PanicReasonDialogComponent } from './components/panic-reason-dialog/panic-reason-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/infrastructure/material.module';
import { CurrentRideMapComponent } from './components/current-ride-map/current-ride-map.component';
import { CurrentRideFinishedComponent } from './components/current-ride-finished/current-ride-finished.component';



@NgModule({
    declarations: [
        CurrentRideComponent,
        NoCurrentRideComponent,
        CurrentRideDetailsComponent,
        PanicReasonDialogComponent,
        CurrentRideMapComponent,
        CurrentRideFinishedComponent
    ],
    imports: [
        CommonModule,
        MapModule,
        ReactiveFormsModule,
        MaterialModule
    ]
})
export class RideModule { }
