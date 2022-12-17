import { R3Identifiers } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent {
  private adresa1="";
  private adresa2="";
  
  public notifications: { ride: Ride, timestamp: string, type: NotificationType }[]
  public notificationType=NotificationType;
  constructor(){
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
