import { Component } from '@angular/core';
import { RouteService } from 'src/app/services/route/route.service';

@Component({
  selector: 'app-unregistered-user-home',
  templateUrl: './unregistered-user-home.component.html',
  styleUrls: ['./unregistered-user-home.component.css']
})
export class UnregisteredUserHomeComponent {
  constructor(private routeService: RouteService) {
    this.routeService.selectedRoute$.subscribe((value) => {
      this.selectedRoute = value;
    });
  }
  
  selectedRoute=null;
  ngOnInit(): void {}
}
