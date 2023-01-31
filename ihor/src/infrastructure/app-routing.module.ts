import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPasswordComponent } from 'src/app/modules/account/components/edit-password/edit-password.component';
import { EditProfileComponent } from 'src/app/modules/account/components/edit-profile/edit-profile.component';
import { PasswordChangedComponent } from 'src/app/modules/account/components/password-changed/password-changed.component';
import { AdministratorHomeComponent } from 'src/app/modules/administrator/components/administrator-home/administrator-home.component';
import { DriversComponent } from 'src/app/modules/administrator/components/drivers/drivers.component';
import { LoginComponent } from 'src/app/modules/auth/components/login/login.component';
import { InboxComponent } from 'src/app/modules/communication/components/inbox/inbox.component';
import { DriverHomeComponent } from 'src/app/modules/driver/components/driver-home/driver-home.component';
import { PassengerHomeComponent } from 'src/app/modules/passenger/components/passenger-home/passenger-home.component';
import { AdminProfileComponent } from 'src/app/modules/administrator/components/admin-profile/admin-profile.component';
import { DriverProfileComponent } from 'src/app/modules/driver/components/driver-profile/driver-profile.component';
import { EditVehicleComponent } from 'src/app/modules/driver/components/edit-vehicle/edit-vehicle.component';
import { PassengerProfileComponent } from 'src/app/modules/passenger/components/passenger-profile/passenger-profile.component';
import { ForgotPasswordComponent } from 'src/app/modules/unregistered-user/components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'src/app/modules/unregistered-user/components/reset-password/reset-password.component';
import { SignupComponent } from 'src/app/modules/unregistered-user/components/signup/signup.component';
import { UnregisteredUserHomeComponent } from 'src/app/modules/unregistered-user/components/unregistered-user-home/unregistered-user-home.component';
import {AuthGuard} from "../app/modules/auth/guards/auth.guard";
import {RoleGuard} from "../app/modules/auth/guards/role.guard";
import {GlobalStatisticsComponent} from "../app/modules/statistics/components/global-statistics/global-statistics.component";
import {DriverStatisticsComponent} from "../app/modules/statistics/components/driver-statistics/driver-statistics.component";
import {PassengersComponent} from "../app/modules/administrator/components/passengers/passengers.component";
import {PassengerStatisticsComponent} from "../app/modules/statistics/components/passenger-statistics/passenger-statistics.component";
import { CurrentRideComponent } from 'src/app/modules/ride/components/current-ride/current-ride.component';
import { VerifyAccountComponent } from 'src/app/modules/unregistered-user/components/verify-account/verify-account/verify-account.component';
import { AccountActivatedComponent } from 'src/app/modules/unregistered-user/components/account-activated/account-activated/account-activated.component';
import { EmailForForgotPasswordComponent } from 'src/app/modules/unregistered-user/components/email-for-forgot-password/email-for-forgot-password/email-for-forgot-password.component';
import { DriverHistoryComponent } from 'src/app/modules/history/components/driver-history/driver-history.component';
import { PassengerHistoryComponent } from 'src/app/modules/history/components/passenger-history/passenger-history.component';
import { RideDetailComponent } from 'src/app/modules/history/components/ride-detail/ride-detail.component';
import { LeaveReviewComponent } from 'src/app/modules/history/components/leave-review/leave-review.component';
import { ReviewListComponent } from 'src/app/modules/history/components/review-list/review-list.component';
import { AcceptedRidesComponent } from 'src/app/modules/driver/components/accepted-rides/accepted-rides.component';
import { AdminHistoryComponent } from 'src/app/modules/history/components/admin-history/admin-history.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'administrator',
    canActivate: [RoleGuard, AuthGuard],
    data: {expectedRoles: "ADMIN"},
    component: AdministratorHomeComponent,
    children: [
      {path: 'profile', component: AdminProfileComponent},
      {path: 'drivers', component: DriversComponent},
      {path: 'passengers', component: PassengersComponent},
      {path: 'statistics', component: GlobalStatisticsComponent},
      {path: 'statistics/driver/:id', component: DriverStatisticsComponent},
      {path: 'statistics/passenger/:id', component: PassengerStatisticsComponent},
      {path: '', redirectTo: 'drivers', pathMatch: 'full'}
    ]
  },
  {path:'driver', canActivate:[], component:DriverHomeComponent},
  {path:'inbox', canActivate:[], component: InboxComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'passenger', canActivate:[], component:PassengerHomeComponent},
  {path:'home', component: UnregisteredUserHomeComponent},
  {path:'forgot-password', component: ForgotPasswordComponent},
  {path:'password-changed', component: PasswordChangedComponent},
  {path:'reset-password', component: ResetPasswordComponent},
  {path:'edit-profile', component: EditProfileComponent},
  {path:'edit-password', component: EditPasswordComponent},
  {path:'edit-vehicle', component: EditVehicleComponent},
  {path:'driver/profile', component: DriverProfileComponent},
  {path:'passenger/profile', component: PassengerProfileComponent},
  {path:'current-ride', component: CurrentRideComponent},
  {path:'verify-account', component: VerifyAccountComponent},
  {path:'account-activated', component: AccountActivatedComponent},
  {path:'email-for-forgot-password', component: EmailForForgotPasswordComponent},
  {path:'driver/history', component: DriverHistoryComponent},
  {path:'passenger/history', component: PassengerHistoryComponent},
  {path:'admin/history', component: AdminHistoryComponent},
  {path:'ride-detail', component: RideDetailComponent},
  {path:'leave-review', component: LeaveReviewComponent},
  {path:'review-list', component: ReviewListComponent},
  {path:'accepted-rides', component: AcceptedRidesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
