import { Component, OnInit } from '@angular/core';
import { OrderRideService } from '../../services/order-ride/order-ride.service';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-successfull-order-ride',
  templateUrl: './successfull-order-ride.component.html',
  styleUrls: ['./successfull-order-ride.component.css']
})
export class SuccessfullOrderRideComponent implements OnInit {
  rideOrdered=0;
  rideId!:number;
  stompClient:any;
  constructor(private orderRideService:OrderRideService, private authService:AuthService)
  {
    
  }
  ngOnInit(){
    this.orderRideService.rideOrderedObs$.subscribe((value)=>
    {
      this.rideOrdered=value;
      if(this.rideOrdered===1)
      {
        this.rideId=this.orderRideService.ride.id;
        this.initializeWebSocketConnection();
      } 
    });
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
    this.stompClient.send("api/socket-subscriber/"+userId+"/new-ride/"+this.rideId);
  }


  
  toHomePage()
  {
    window.location.reload();
  }
}
