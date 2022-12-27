import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { FavoriteRoutesComponent } from './components/favorite-routes/favorite-routes.component';
import { PassengerProfileComponent } from './components/passenger-profile/passenger-profile.component';
import { AccountModule } from '../account/account.module';


@NgModule({
  declarations: [
    FavoriteRoutesComponent,
    PassengerProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AccountModule
  ]
})
export class PassengerModule { }
