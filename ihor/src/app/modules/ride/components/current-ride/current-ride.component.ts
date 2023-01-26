import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Location, Ride } from 'src/app/modules/passenger/model/ride';
import { CurrentRideService } from '../../services/current-ride/current-ride.service';
import { PanicService } from '../../services/panic/panic.service';
import { PanicReasonDialogComponent } from '../panic-reason-dialog/panic-reason-dialog.component';
// import * as Stomp from 'stompjs';
 import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
//import {SockJS} from 'sockjs-client';


@Component({
  selector: 'app-current-ride',
  templateUrl: './current-ride.component.html',
  styleUrls: ['./current-ride.component.css']
})
export class CurrentRideComponent implements OnInit {
  private stompClient: any;
  ride!:Ride;
  role="";
  rideFound=0;
  departure="?"
  destination="?"
  arrivalTime="??:??"
  dialogRef!: MatDialogRef<PanicReasonDialogComponent>
  
  
  constructor(private currentRideService:CurrentRideService, private authService:AuthService,
     private router:Router, private dialog:MatDialog, private panicService:PanicService)
  {
    this.currentRideService.getCurrentRide();
    this.currentRideService.currentRideGot$.subscribe((value)=>{
      if(value!=null)
      {
        this.rideFound=1;
        this.ride=value;
        this.departure=value.locations[0].departure.address;
        this.destination=value.locations[0].destination.address;
        const arrivalDateTime=new Date((new Date(value.startTime).getTime()+value.estimatedTimeInMinutes*60000))
        this.arrivalTime=arrivalDateTime.getHours().toString().padStart(2, "0")+":"+arrivalDateTime.getMinutes().toString().padStart(2, "0");
        
      }
      else
        this.rideFound=2;
    })
    this.role=authService.getRole();

    this.panicService.panicGot$.subscribe((value)=>{
      this.dialogRef.close("success");
      if(value!="")
        this.sendPanic(value);
    });
  }

  ngOnInit(){
    this.initializeWebSocketConnection();
    
    //this.stompClient.send("api/socket-subscriber/send/message");
  
  }

  initializeWebSocketConnection() {
    // serverUrl je vrednost koju smo definisali u registerStompEndpoints() metodi na serveru
    const  ws = new SockJS('http://localhost:8080/api/socket');
    this.stompClient = Stomp.over(ws);
    
    console.log("initialize web socket");
    this.stompClient.connect({},  () => {
      this.openGlobalSocket()
    });

  }
  openGlobalSocket() {
    console.log("open global socket");
    console.log("gvvvvv");
    console.log(localStorage.getItem("user")?.substring(1,localStorage.getItem("user")!.length-1));
    this.stompClient.send("api/socket-subscriber/vehicle/"+this.ride.id+ "/current-location/"+localStorage.getItem("user")?.substring(1,localStorage.getItem("user")!.length-1));
    this.stompClient.subscribe("api/socket-publisher/"+"vehicle/current-location/"+this.ride.id, (message: { body: string; }) => {
      this.handleResult(message);
    });
  }
  handleResult(message: { body: string; }) {
    console.log("Handle result");
    if (message.body) {
      const location: Location = JSON.parse(message.body);
      console.log(location.latitude+" - "+location.longitude);
    }
  }

  openPanicDialog()
  {
    this.dialogRef = this.dialog.open(PanicReasonDialogComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        // this.driverEdited();
      }
    });
    
  }
  sendPanic(reason:string)
  { 
    this.panicService.activatePanicBack(this.ride.id,reason).subscribe({
      next: (result) => {
        alert("Successful");
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {alert("Not possible"); }
      },
    });
    
  }
  finishRide(){
    this.currentRideService.finishRideBack(this.ride.id).subscribe({
      next: (result) => {
        this.router.navigate(['/driver']);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {alert("Not possible"); }
      },
    });
  }
}
