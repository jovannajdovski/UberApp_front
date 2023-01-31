import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { DriverCardComponent } from './components/driver-card/driver-card.component';
import { AdministratorHomeComponent } from './components/administrator-home/administrator-home.component';
import { AddDriverDialogComponent } from './components/add-driver-dialog/add-driver-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EditDriverDialogComponent } from './components/edit-driver-dialog/edit-driver-dialog.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { AppRoutingModule } from 'src/infrastructure/app-routing.module';

import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AccountModule } from '../account/account.module';
import {MatDatepickerModule} from "@angular/material/datepicker";
import { PassengersComponent } from './components/passengers/passengers.component';
import { PassengerCardComponent } from './components/passenger-card/passenger-card.component';
import {MatStepperModule} from "@angular/material/stepper";

@NgModule({
  declarations: [
    DriverCardComponent,
    AdministratorHomeComponent,
    AddDriverDialogComponent,
    EditDriverDialogComponent,
    DriversComponent,
    AdminProfileComponent,
    PassengersComponent,
    PassengerCardComponent
  ],
    imports: [
        CommonModule,
        AppRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        SharedModule,
        AccountModule,
        MatDatepickerModule,
        MatStepperModule,
        FormsModule
    ],
  exports: [
    DriversComponent,
    AdminProfileComponent
  ]
})
export class AdministratorModule { }
