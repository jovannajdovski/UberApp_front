import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordChangedComponent } from './components/password-changed/password-changed.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EditPasswordComponent } from './components/edit-password/edit-password.component';


@NgModule({
  declarations: [
    PasswordChangedComponent,
    ProfileComponent,
    EditProfileComponent,
    EditPasswordComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProfileComponent,
    EditPasswordComponent,
    EditProfileComponent,
    PasswordChangedComponent
  ]
})
export class AccountModule { }
