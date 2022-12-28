import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';



@NgModule({
  declarations: [
    SnackBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    SnackBarComponent
  ]
})
export class SharedModule { }
