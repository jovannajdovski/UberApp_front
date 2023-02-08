import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { LoginComponent } from './components/login/login.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptor/auth-interceptor.interceptor';



@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
