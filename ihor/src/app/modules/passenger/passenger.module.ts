import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { PassengerHomeComponent } from './components/passenger-home/passenger-home.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MapModule } from '../map/map.module';



@NgModule({
  declarations: [
    PassengerHomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MapModule
  ]
})
export class PassengerModule { }
