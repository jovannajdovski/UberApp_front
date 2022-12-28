import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { DriverHomeComponent } from './components/driver-home/driver-home.component';
import { MapModule } from '../map/map.module';



@NgModule({
  declarations: [
    DriverHomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MapModule
  ]
})
export class DriverModule { }
