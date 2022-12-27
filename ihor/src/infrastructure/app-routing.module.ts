import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPasswordComponent } from 'src/app/modules/account/components/edit-password/edit-password.component';
import { EditProfileComponent } from 'src/app/modules/account/components/edit-profile/edit-profile.component';
import { PasswordChangedComponent } from 'src/app/modules/account/components/password-changed/password-changed.component';
import { ProfileComponent } from 'src/app/modules/account/components/profile/profile.component';
import { AdminProfileComponent } from 'src/app/modules/administrator/components/admin-profile/admin-profile.component';
import { LoginComponent } from 'src/app/modules/auth/components/login/login.component';
import { InboxComponent } from 'src/app/modules/communication/components/inbox/inbox.component';
import { DriverHomeComponent } from 'src/app/modules/driver/components/driver-home/driver-home.component';
import { DriverProfileComponent } from 'src/app/modules/driver/components/driver-profile/driver-profile.component';
import { EditVehicleComponent } from 'src/app/modules/driver/components/edit-vehicle/edit-vehicle.component';
import { VehicleDataComponent } from 'src/app/modules/driver/components/vehicle-data/vehicle-data.component';
import { FavoriteRoutesComponent } from 'src/app/modules/passenger/components/favorite-routes/favorite-routes.component';
import { PassengerProfileComponent } from 'src/app/modules/passenger/components/passenger-profile/passenger-profile.component';
import { ForgotPasswordComponent } from 'src/app/modules/unregistered-user/components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'src/app/modules/unregistered-user/components/reset-password/reset-password.component';
import { SignupComponent } from 'src/app/modules/unregistered-user/components/signup/signup.component';
import { UnregisteredUserHomeComponent } from 'src/app/modules/unregistered-user/components/unregistered-user-home/unregistered-user-home.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'driver', canActivate:[], component:DriverHomeComponent},
  {path: 'inbox', canActivate:[], component: InboxComponent},
  {path:'home', component: UnregisteredUserHomeComponent},
  {path:'forgot-password', component: ForgotPasswordComponent},
  {path:'password-changed', component: PasswordChangedComponent},
  {path:'reset-password', component: ResetPasswordComponent},
  {path:'edit-profile', component: EditProfileComponent},
  {path:'edit-password', component: EditPasswordComponent},
  {path:'edit-vehicle', component: EditVehicleComponent},
  {path:'admin-profile', component: AdminProfileComponent},
  {path:'driver-profile', component: DriverProfileComponent},
  {path:'passenger-profile', component: PassengerProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
