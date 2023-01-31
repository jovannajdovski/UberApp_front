import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { PassengerHomeComponent } from './components/passenger-home/passenger-home.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MapModule } from '../map/map.module';
import { FavoriteRoutesComponent } from './components/favorite-routes/favorite-routes.component';
import { PassengerProfileComponent } from './components/passenger-profile/passenger-profile.component';
import { AccountModule } from '../account/account.module';
import { FavoriteRouteComponent } from './components/favorite-route/favorite-route.component';
import {SharedModule} from "../shared/shared.module";
import { SuccessfullOrderRideComponent } from './components/successfull-order-ride/successfull-order-ride.component';
import { RideConfirmationComponent } from './components/ride-confirmation/ride-confirmation.component';
import { InviteFriendsComponent } from './components/invite-friends/invite-friends.component';
import { RideAdditionalOptionsComponent } from './components/ride-additional-options/ride-additional-options.component';


@NgModule({
  declarations: [
    PassengerHomeComponent,
    FavoriteRoutesComponent,
    PassengerProfileComponent,
    FavoriteRouteComponent,
    SuccessfullOrderRideComponent,
    RideConfirmationComponent,
    InviteFriendsComponent,
    RideAdditionalOptionsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MapModule,
    AccountModule,
    NgxMaterialTimepickerModule,
    MatChipsModule,
    FormsModule,
    SharedModule
  ]
})
export class PassengerModule { }
