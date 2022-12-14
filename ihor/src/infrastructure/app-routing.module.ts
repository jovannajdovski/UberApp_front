import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';
import { UnregisteredUserHomeComponent } from 'src/app/components/unregistered-user-home/unregistered-user-home/unregistered-user-home.component';
import { ForgotPasswordComponent } from 'src/app/components/forgot-password/forgot-password.component';
import { PasswordChangedComponent } from 'src/app/components/password-changed/password-changed.component';
import { ResetPasswordComponent } from 'src/app/components/reset-password/reset-password.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'home', component: UnregisteredUserHomeComponent},
  {path:'forgot-password', component: ForgotPasswordComponent},
  {path:'password-changed', component: PasswordChangedComponent},
  {path:'reset-password', component: ResetPasswordComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
