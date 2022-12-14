import { Component } from '@angular/core';
import { reduce } from 'rxjs';
import {ThemePalette} from '@angular/material/core';
import { RouteService } from 'src/app/services/route/route.service';

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css']
})
export class DriverHomeComponent {
  constructor(private routeService: RouteService ){
    routeService.driverNavbar=true;
    routeService.unregisteredUserNavbar=false;
  }
  color="#FFFFFF"
}
