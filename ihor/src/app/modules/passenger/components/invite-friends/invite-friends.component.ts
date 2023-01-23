import { Component } from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import { Profile, ProfileWId } from 'src/app/modules/account/model/profile';
import { PassengerService } from '../../services/passenger.service';
import {FormsModule} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderRideService } from '../../services/order-ride/order-ride.service';
@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.component.html',
  styleUrls: ['./invite-friends.component.scss']
})
export class InviteFriendsComponent {
  
  constructor(private passengerService: PassengerService, private orderRideService: OrderRideService)
  {}
  passengers:ProfileWId[]=[];
  currentEmail='';
  // friends=null;
  // add(email:string): void {
    
  // }

  // remove(fruit: string): void {
  //   const index = this.friends.indexOf(fruit);

  //   if (index >= 0) {
  //     this.friends.splice(index, 1);
  //   }
  // }

  addFriend()
  {
      this.passengerService.getPassengerByEmail(this.currentEmail).subscribe({
        next: (result) => {
          this.passengers.push(result);
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            console.log("pera");
          }
        },
       });
  }
  nextStep()
  {
    this.orderRideService.setPassengers(this.passengers);
  }
}
