import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { FavoriteRoutesComponent } from './components/favorite-routes/favorite-routes.component';



@NgModule({
  declarations: [
    FavoriteRoutesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class PassengerModule { }
