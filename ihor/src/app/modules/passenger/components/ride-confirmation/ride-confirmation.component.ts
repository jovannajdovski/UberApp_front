import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouteService } from 'src/app/modules/map/services/route/route.service';
import { CreateRide, VehicleCategory } from '../../model/ride';
import { OrderRideService } from '../../services/order-ride/order-ride.service';

@Component({
  selector: 'app-ride-confirmation',
  templateUrl: './ride-confirmation.component.html',
  styleUrls: ['./ride-confirmation.component.css']
})
export class RideConfirmationComponent {
  constructor(private orderRideService: OrderRideService, private routeService: RouteService)
  {
    this.ride=orderRideService.newRide;
    this.routeService.selectedEstimatedRoutes$.subscribe((value) => {
      console.log(value.length);
      value.forEach((element: any) => {
        console.log(element);
        this.distance = this.toKM(element.summary.totalDistance)
        this.estimatedTime = this.toMinutes(element.summary.totalDistance)
      });
    });
    this.scheduledTime = this.ride.scheduledTime.substring(11,16);
    if(this.ride.vehicleType!=3)
      this.vehicleType=VehicleCategory[this.ride.vehicleType||0];
    else
      this.vehicleType="Not specified";
  }
  
  toKM(disInMeters:number){
    const distance = Math.floor(disInMeters/100);
    return distance/10+" km";
  }

  toMinutes(timeInS:number){
    let time = Math.round(timeInS/600);
    if (time===0){
      time=1;
    }
    return time +" min";
  }
  ride: CreateRide;
  distance="- km";
  estimatedTime="- min";
  scheduledTime: string;
  vehicleType: string;

  nextStep()
  {
    this.orderRideService.orderRide();
  }
  cancelRide()
  {
    window.location.reload();
  }
}
