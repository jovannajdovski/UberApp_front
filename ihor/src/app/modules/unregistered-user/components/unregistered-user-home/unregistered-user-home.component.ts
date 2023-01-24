import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/modules/map/services/route/route.service';

@Component({
  selector: 'app-unregistered-user-home',
  templateUrl: './unregistered-user-home.component.html',
  styleUrls: ['./unregistered-user-home.component.css']
})
export class UnregisteredUserHomeComponent implements OnInit{
  constructor(private routeService: RouteService) {
    this.routeService.selectedRoute$.subscribe((value) => {
      this.selectedRoute = value;
    });
  }
  
  selectedRoute=0;
  ngOnInit(): void {}
}
