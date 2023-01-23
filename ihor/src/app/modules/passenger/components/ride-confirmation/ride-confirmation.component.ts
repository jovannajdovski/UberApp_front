import { Component } from '@angular/core';
import { OrderRideService } from '../../services/order-ride/order-ride.service';

@Component({
  selector: 'app-ride-confirmation',
  templateUrl: './ride-confirmation.component.html',
  styleUrls: ['./ride-confirmation.component.css']
})
export class RideConfirmationComponent {
  constructor(private orderRideService: OrderRideService)
  {
    
  }
}
