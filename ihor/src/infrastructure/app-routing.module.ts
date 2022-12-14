import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';
import { RouteFormComponent } from 'src/app/components/route-form/route-form.component';
import { EstimatedRoutesComponent } from 'src/app/components/estimated-routes/estimated-routes.component';
import { DriverHomeComponent } from 'src/app/components/driver-home/driver-home.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'', component: RouteFormComponent},
  { path: '', redirectTo: '', pathMatch: 'full' },
  {path:'routes', canActivate:[], component:EstimatedRoutesComponent},
  {path: 'driver', canActivate:[], component:DriverHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
