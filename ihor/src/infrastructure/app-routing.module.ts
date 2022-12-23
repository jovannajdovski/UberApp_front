import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordChangedComponent } from 'src/app/modules/account/components/password-changed/password-changed.component';
import { LoginComponent } from 'src/app/modules/auth/components/login/login.component';
import { InboxComponent } from 'src/app/modules/communication/components/inbox/inbox.component';
import { DriverHomeComponent } from 'src/app/modules/driver/components/driver-home/driver-home.component';
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
  {path:'reset-password', component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
