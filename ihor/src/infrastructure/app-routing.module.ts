import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import {NavbarComponent} from 'src/app/components/navbar/navbar.component'

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
  