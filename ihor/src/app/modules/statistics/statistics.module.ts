import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { GlobalStatisticsComponent } from './components/global-statistics/global-statistics.component';

import * as CanvasJSAngularChart from '../../../lib/canvasjs.angular.component';
import {AppRoutingModule} from "../../../infrastructure/app-routing.module";
import {MaterialModule} from "../../../infrastructure/material.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatChipsModule} from "@angular/material/chips";
import { DashboardRideCountComponent } from './components/dashboard-ride-count/dashboard-ride-count.component';
import { DashboardRideDistanceComponent } from './components/dashboard-ride-distance/dashboard-ride-distance.component';
import { DriverStatisticsComponent } from './components/driver-statistics/driver-statistics.component';

let CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;


@NgModule({
  declarations: [
    GlobalStatisticsComponent,
    CanvasJSChart,
    DashboardRideCountComponent,
    DashboardRideDistanceComponent,
    DriverStatisticsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    FormsModule,
    MatChipsModule
  ],
  exports: [
    GlobalStatisticsComponent
  ],
  providers: [
    DatePipe
  ]
})
export class StatisticsModule { }
