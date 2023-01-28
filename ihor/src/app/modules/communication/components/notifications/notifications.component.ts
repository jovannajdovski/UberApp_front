import { HttpErrorResponse } from '@angular/common/http';
import { R3Identifiers } from '@angular/compiler';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { PendingRidesService } from 'src/app/modules/driver/services/pending-rides/pending-rides.service';
import { RideRejectionService } from 'src/app/modules/driver/services/ride-rejection/ride-rejection.service';
import { Ride } from 'src/app/modules/passenger/model/ride';
import { MessageRequest, MessageType } from '../../model/message';
import { MessageService } from '../../services/message/message.service';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent implements AfterViewChecked, OnInit {
  public reason='';
  notificationType=NotificationType;
  stompClient:any;
  
  constructor(private rideRejectionService: RideRejectionService, private pendingRidesService: PendingRidesService,
     private messageService: MessageService, private authService:AuthService){
    
  }

  notifications:Notification[]=[];
  ngAfterViewChecked()
  {
    const scrollableContainer = document.getElementById("messages_container");
      if(scrollableContainer!=null)
      {
        scrollableContainer.scrollTo(0,scrollableContainer.scrollHeight);
      }
  }
  ngOnInit(){
    this.pendingRidesService.getPendingRides().subscribe({
      next: (result) => {
        console.log(result);
        result.results.forEach( (value) => {
          const notification:Notification={ride:value,
            timestamp:new Date().getHours().toString().padStart(2, "0")+":"+new Date().getMinutes().toString().padStart(2, "0"),
          type:NotificationType.NEW_RIDE};
          this.notifications.push(notification);
        }); 
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log("pera");
        }
      },
    });
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const  ws = new SockJS('http://localhost:8080/api/socket');
    this.stompClient = Stomp.over(ws);
    
    this.stompClient.connect({},  () => {
      this.openGlobalSocket()
    });

  }
  openGlobalSocket() {
    const userId=this.authService.getId();
    this.stompClient.subscribe("api/socket-publisher/new-ride/"+userId, (message: {body: string }) => {
      this.handleResult(message);
    });
  }
  handleResult(message: { body: string }) {
    if (message.body) {
      const ride: Ride = JSON.parse(message.body);
      const notification:Notification={ride:ride,
        timestamp:new Date().getHours().toString().padStart(2, "0")+":"+new Date().getMinutes().toString().padStart(2, "0"),
      type:NotificationType.NEW_RIDE};
      this.notifications.push(notification);
    }
  }


  public acceptRide(notification: Notification)
  {
    this.rideRejectionService.accept(notification.ride.id).subscribe({
      next: (result) => {
        const index = this.notifications.indexOf(notification);
        this.notifications.splice(index, 1);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log("pera");
        }
      },
    });
    const passengerIds:number[]=[];
    notification.ride.passengers.forEach( (value) => {
      console.log(value.id);
      passengerIds.push(value.id);
    }); 
    const message:MessageRequest={"message":"Ride is accepted", "rideId": notification.ride.id, "type":MessageType.RIDE};
    this.messageService.sendMultipleMessageToBack(message,passengerIds).subscribe({
      next: (result) => {
        console.log(result)
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log("pera");
        }
      },
    });
  }
  public rejectRide(notification: Notification)
  {
    if(this.reason.length>0)
    {
      const rejectionReason: RejectionReason = {
        reason: this.reason
      };
      this.rideRejectionService.reject(rejectionReason, notification.ride.id).subscribe({
        next: (result) => {
          const index = this.notifications.indexOf(notification);
          this.notifications.splice(index, 1);
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            console.log("pera");
          }
        },
      });
    }
  }

}
interface RejectionReason{
  "reason": string
}
interface Notification{
  "ride":Ride
  "type":NotificationType
  "timestamp":string
}
enum NotificationType {
  NEW_RIDE, RIDE_REJECTION, REMINDER
}
