import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { DriverCardComponent } from './components/driver-card/driver-card.component';
import { AdministratorHomeComponent } from './components/administrator-home/administrator-home.component';
import { AddDriverDialogComponent } from './components/add-driver-dialog/add-driver-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EditDriverDialogComponent } from './components/edit-driver-dialog/edit-driver-dialog.component';
import { SharedService } from '../shared/services/shared/shared.service';



@NgModule({
  declarations: [
    DriverCardComponent,
    AdministratorHomeComponent,
    AddDriverDialogComponent,
    EditDriverDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdministratorModule { }
