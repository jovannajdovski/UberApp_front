import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { DriverHomeComponent } from './components/driver-home/driver-home.component';
import { VehicleDataComponent } from './components/vehicle-data/vehicle-data.component';



@NgModule({
  declarations: [
    DriverHomeComponent,
    VehicleDataComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class DriverModule { }
