import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppComponent } from 'src/app/app.component';
import { AppRoutingModule } from 'src/infrastructure/app-routing.module';
import { DriverNavbarComponent } from './components/driver-navbar/driver-navbar.component';
import { PassengerNavbarComponent } from './components/passenger-navbar/passenger-navbar.component';
import { AdministratorNavbarComponent } from './components/administrator-navbar/administrator-navbar.component';
import { UnregisteredUserNavbarComponent } from './components/unregistered-user-navbar/unregistered-user-navbar.component';



@NgModule({
  declarations: [
    NavbarComponent,
    DriverNavbarComponent,
    PassengerNavbarComponent,
    AdministratorNavbarComponent,
    UnregisteredUserNavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class LayoutModule { }
