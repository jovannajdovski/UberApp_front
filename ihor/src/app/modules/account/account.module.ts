import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordChangedComponent } from './components/password-changed/password-changed.component';
import { MaterialModule } from 'src/infrastructure/material.module';



@NgModule({
  declarations: [
    PasswordChangedComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class AccountModule { }
