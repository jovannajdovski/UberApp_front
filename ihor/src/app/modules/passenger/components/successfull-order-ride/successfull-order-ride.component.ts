import { Component } from '@angular/core';
import { OrderRideService } from '../../services/order-ride/order-ride.service';

@Component({
  selector: 'app-successfull-order-ride',
  templateUrl: './successfull-order-ride.component.html',
  styleUrls: ['./successfull-order-ride.component.css']
})
export class SuccessfullOrderRideComponent {
  constructor(private orderRideService:OrderRideService)
  {
    orderRideService.rideOrderedObs$.subscribe((value)=>
    {
      this.rideOrdered=value;
    });
  }
  rideOrdered=0;
  toHomePage()
  {
    window.location.reload();
  }
}
