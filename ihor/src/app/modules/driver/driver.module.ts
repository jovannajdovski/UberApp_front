import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { DriverHomeComponent } from './components/driver-home/driver-home.component';



@NgModule({
  declarations: [
    DriverHomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class DriverModule { }
