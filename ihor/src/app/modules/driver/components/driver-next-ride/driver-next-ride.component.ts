import {Component} from '@angular/core';
import {NextRideService} from '../../services/next-ride/next-ride.service';

@Component({
  selector: 'app-driver-next-ride',
  templateUrl: './driver-next-ride.component.html',
  styleUrls: ['./driver-next-ride.component.css']
})
export class DriverNextRideComponent {
  constructor(private nextRideService: NextRideService) {
    this.nextRideService.getNextRide();
    this.nextRideService.nextRideGot$.subscribe((value) => {
      if (value != null) {
        this.rideFound = true;
        this.price = value.totalCost;
        this.time = value.startTime.substring(11, 16);
        this.departure = value.locations[0].departure.address;
        this.destination = value.locations[0].destination.address;
      }
    })


  }

  price = 0;
  time = "00:00";
  departure = "";
  destination = ""
  rideFound = false;
}
