import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { PassengerHomeComponent } from './components/passenger-home/passenger-home.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MapModule } from '../map/map.module';

import { FavoriteRoutesComponent } from './components/favorite-routes/favorite-routes.component';
import { PassengerProfileComponent } from './components/passenger-profile/passenger-profile.component';
import { AccountModule } from '../account/account.module';


@NgModule({
  declarations: [
    PassengerHomeComponent,
    FavoriteRoutesComponent,
    PassengerProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MapModule,
    AccountModule
  ]
})
export class PassengerModule { }
