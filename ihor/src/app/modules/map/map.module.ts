import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { EstimatedRoutesComponent } from './components/estimated-routes/estimated-routes.component';
import { MapComponent } from './components/map/map/map.component';
import { RouteFormComponent } from './components/route-form/route-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EstimatedRoutesComponent,
    MapComponent,
    RouteFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    EstimatedRoutesComponent,
    MapComponent,
    RouteFormComponent
  ]
})
export class MapModule { }
