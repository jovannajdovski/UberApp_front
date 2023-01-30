import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { MapModule } from '../map/map.module';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountModule } from '../account/account.module';
import { DriverHistoryComponent } from './components/driver-history/driver-history.component';
import { PassengerHistoryComponent } from './components/passenger-history/passenger-history.component';
import { DriverRideDetailComponent } from './components/driver-ride-detail/driver-ride-detail.component';
import { PassengerRideDetailComponent } from './components/passenger-ride-detail/passenger-ride-detail.component';
import { RideDetailComponent } from './components/ride-detail/ride-detail.component';
import { DrawRouteMapComponent } from './components/draw-route-map/draw-route-map.component';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { LeaveReviewComponent } from './components/leave-review/leave-review.component';
import { BarRatingModule } from "ngx-bar-rating";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from "../shared/shared.module";
import { AdminHistoryComponent } from './components/admin-history/admin-history.component';
import { AdminRideDetailComponent } from './components/admin-ride-detail/admin-ride-detail.component';
import { RouteRechoiceComponent } from './components/route-rechoice/route-rechoice.component';


@NgModule({
  declarations: [
    DriverHistoryComponent,
    PassengerHistoryComponent,
    DriverRideDetailComponent,
    PassengerRideDetailComponent,
    RideDetailComponent,
    DrawRouteMapComponent,
    ReviewListComponent,
    LeaveReviewComponent,
    AdminHistoryComponent,
    AdminRideDetailComponent,
    RouteRechoiceComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MapModule,
    ReactiveFormsModule,
    AccountModule,
    BarRatingModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class HistoryModule { }