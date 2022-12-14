import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';
import { RouteFormComponent } from 'src/app/components/route-form/route-form/route-form.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'', component: RouteFormComponent},
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
