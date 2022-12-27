import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AccountModule } from '../account/account.module';


@NgModule({
  declarations: [
    AdminProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AccountModule
  ]
})
export class AdministratorModule { }
