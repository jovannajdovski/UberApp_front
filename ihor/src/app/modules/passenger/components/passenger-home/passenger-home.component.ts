import {Component} from '@angular/core';
import {RouteService} from 'src/app/modules/map/services/route/route.service';
import {OrderRideService} from '../../services/order-ride/order-ride.service';

@Component({
  selector: 'app-passenger-home',
  templateUrl: './passenger-home.component.html',
  styleUrls: ['./passenger-home.component.css']
})
export class PassengerHomeComponent {
  constructor(private routeService: RouteService, private orderRideService: OrderRideService) {
    this.selectedRoute = 0;
    this.additionalChoosed = false;
    this.friendsChoosed = false;
    this.routeService.selectedRoute$.subscribe((value) => {
      this.selectedRoute = value;
    });
    this.orderRideService.additionalsChoosed$.subscribe((value) => {
      if (!value)
        return;

      this.additionalChoosed = value;
    })
    this.orderRideService.friendsChoosed$.subscribe((value) => {
      if (!value)
        return;

      this.friendsChoosed = value;
    })
    this.orderRideService.rideOrderedObs$.subscribe((value) => {
      if (!value)
        return;

      this.rideOrdered = value;
    })
  }

  rideOrdered = 0
  selectedRoute = 0;

  additionalChoosed = false;
  friendsChoosed = false;
}
