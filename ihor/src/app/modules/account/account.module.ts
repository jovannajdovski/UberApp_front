import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordChangedComponent } from './components/password-changed/password-changed.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { ProfileComponent } from './components/profile/profile.component';



@NgModule({
  declarations: [
    PasswordChangedComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class AccountModule { }
