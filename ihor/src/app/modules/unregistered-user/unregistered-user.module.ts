import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './components/signup/signup.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { SignupOptionsComponent } from './components/signup-options/signup-options.component';
import { UnregisteredUserHomeComponent } from './components/unregistered-user-home/unregistered-user-home.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MapModule } from '../map/map.module';



@NgModule({
  declarations: [
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SignupComponent,
    SignupFormComponent,
    SignupOptionsComponent,
    UnregisteredUserHomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MapModule
  ]
})
export class UnregisteredUserModule { }
