import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { DriverCardComponent } from './components/driver-card/driver-card.component';
import { AdministratorHomeComponent } from './components/administrator-home/administrator-home.component';



@NgModule({
  declarations: [
    DriverCardComponent,
    AdministratorHomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class AdministratorModule { }
