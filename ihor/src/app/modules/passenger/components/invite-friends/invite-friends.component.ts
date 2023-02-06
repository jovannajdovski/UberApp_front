import {Component} from '@angular/core';
import {ProfileWId} from 'src/app/modules/account/model/profile';
import {PassengerService} from '../../services/passenger.service';
import {HttpErrorResponse} from '@angular/common/http';
import {OrderRideService} from '../../services/order-ride/order-ride.service';
import {AuthService} from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.component.html',
  styleUrls: ['./invite-friends.component.scss']
})
export class InviteFriendsComponent {

  constructor(private passengerService: PassengerService,
              private orderRideService: OrderRideService, private authService: AuthService) {
  }

  passengers: ProfileWId[] = [];
  currentEmail = '';
  // friends=null;
  // add(email:string): void {

  // }

  // remove(fruit: string): void {
  //   const index = this.friends.indexOf(fruit);

  //   if (index >= 0) {
  //     this.friends.splice(index, 1);
  //   }
  // }

  addFriend() {
    this.passengers.forEach((value) => {
      if (this.currentEmail == value.email) {
        this.currentEmail = "";
        return;
      }
    });
    if (this.currentEmail == this.authService.getEmail()) {
      this.currentEmail = "";
      return;
    }
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
    this.currentEmail = "";
  }

  remove(passenger: ProfileWId) {
    const index = this.passengers.indexOf(passenger);
    this.passengers.splice(index, 1);
  }

  nextStep() {
    this.orderRideService.setPassengers(this.passengers);
  }
}
