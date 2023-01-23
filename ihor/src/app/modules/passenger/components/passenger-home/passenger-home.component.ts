import { Component } from '@angular/core';
import { RouteService } from 'src/app/modules/map/services/route/route.service';
import { OrderRideService } from '../../services/order-ride/order-ride.service';

@Component({
  selector: 'app-passenger-home',
  templateUrl: './passenger-home.component.html',
  styleUrls: ['./passenger-home.component.css']
})
export class PassengerHomeComponent {
  constructor(private routeService: RouteService, private orderRideService: OrderRideService) {
    this.routeService.selectedRoute$.subscribe((value) => {
      this.selectedRoute = value;
    });
    this.orderRideService.additionalsChoosed$.subscribe((value)=>{
      this.additionalChoosed=value;
    })
  }
  
  selectedRoute=null;
  ngOnInit(): void {}
  additionalChoosed=false;
}
