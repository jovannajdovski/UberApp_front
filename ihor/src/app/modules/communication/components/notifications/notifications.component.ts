import { HttpErrorResponse } from '@angular/common/http';
import { R3Identifiers } from '@angular/compiler';
import { Component } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { RideRejectionService } from 'src/app/modules/driver/services/ride-rejection/ride-rejection.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent {
  public reason='';
  //private rideRejectionResponse: Observable<RideRejectionResponse>;
  public notifications: { ride: Ride, timestamp: string, type: NotificationType }[]
  public notificationType=NotificationType;
  constructor(private rideRejectionService: RideRejectionService){
    const ride1: Ride={address1: 'Preradoviceva 40', address2: 'Futoska 50', time: '20:30', cash: 500, rejectionReason:'Umro mu pas'};
    const ride2: Ride={address1: 'Laze Teleckog 2', address2: 'Bulevar oslobodjenja 100', time: '22:30', cash: 1500, rejectionReason:''};
    this.notifications= [
      {
        ride: ride1,
        timestamp: '22:50',
        type: NotificationType.NEW_RIDE
      },
      {
        ride: ride1,
        timestamp: '18:10',
        type: NotificationType.RIDE_REJECTION
      },
      {
        ride: ride2,
        timestamp: '17:40',
        type: NotificationType.REMINDER
      },
    ];
  }
  public acceptRide()
  {
      //TODO
  }
  public rejectRide()
  {
    const rejectionReason: RejectionReason = {
      reason: this.reason
    };
    const rideRejectionResponse=this.rideRejectionService.reject(rejectionReason, 1).subscribe({
      next: (result) => {
        console.log(result.estimatedTimeInMinutes); //TODO
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log("pera");
        }
      },
    }); //TODO: pravi id umesto mokovanog

  }

}
interface RejectionReason{
  "reason": string
}

interface Ride {
	address1: string;
	address2: string;
	time: string;
	cash: number;
  rejectionReason: string;
}
enum NotificationType {
  NEW_RIDE, RIDE_REJECTION, REMINDER
}
