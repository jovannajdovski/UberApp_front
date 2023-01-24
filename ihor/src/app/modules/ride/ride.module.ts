import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentRideComponent } from './components/current-ride/current-ride.component';
import { NoCurrentRideComponent } from './components/no-current-ride/no-current-ride.component';
import { MapModule } from "../map/map.module";
import { CurrentRideDetailsComponent } from "./components/current-ride-details/current-ride-details.component";
import { PanicReasonDialogComponent } from './components/panic-reason-dialog/panic-reason-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/infrastructure/material.module';



@NgModule({
    declarations: [
        CurrentRideComponent,
        NoCurrentRideComponent,
        CurrentRideDetailsComponent,
        PanicReasonDialogComponent
    ],
    imports: [
        CommonModule,
        MapModule,
        ReactiveFormsModule,
        MaterialModule
    ]
})
export class RideModule { }
