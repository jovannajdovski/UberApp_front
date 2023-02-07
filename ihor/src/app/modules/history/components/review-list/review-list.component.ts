import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Profile} from 'src/app/modules/account/model/profile';
import {AuthService} from 'src/app/modules/auth/services/auth.service';
import {PassengerService} from 'src/app/modules/passenger/services/passenger.service';
import {ReviewsForRideDTO, RideNoStatusDTO} from '../../model/RidePageListDTO';
import {RideHistoryService} from '../../services/ride-history/ride-history.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {
  public ride: RideNoStatusDTO;
  public reviews: ReviewsForRideDTO;
  public passengers: Profile[] = [];
  passengersLoaded = 0;
  hasError: boolean;
  canReview = false;
  isDriver = 0;

  public driverRate = 0;
  public vehicleRate = 0;

  constructor(private router: Router,
              private passengerService: PassengerService,
              private rideHistoryService: RideHistoryService,
              private authService: AuthService) {
    this.isDriver = rideHistoryService.getIsDriver();
    this.ride = rideHistoryService.getSettedRide();
    this.reviews = rideHistoryService.getSettedReview();
    this.hasError = false;
  }

  ngOnInit(): void {

    for (const review of this.reviews.reviews) {
      this.passengerService.getPassenger(review.driverReview.passenger.id).subscribe({
        next: (result) => {
          this.passengers.push(result);
          this.passengersLoaded++;
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this.hasError = true;
          }
        },
      });
    }

    if (this.authService.getRole() === "PASSENGER") {
      const passengerId = this.authService.getId();
      console.log(passengerId);
      let alreadyRate = false;
      for (const review of this.reviews.reviews) {
        console.log(review.driverReview.passenger.id);
        console.log(passengerId);
        if (review.driverReview.passenger.id == passengerId) {
          alreadyRate = true;
        }
      }

      const d = new Date();
      d.setDate(d.getDate() - 3);
      const rideDate = new Date(this.ride.startTime);
      if (!alreadyRate && rideDate > d) {
        this.canReview = true;
      }
    }


  }

  toLeaveReview() {
    this.router.navigate(['/leave-review']);
  }

  getPassengerName(passenger: Profile): string {
    return passenger.name + " " + passenger.surname;
  }

  getPassengerPicture(passenger: Profile): string {
    if (!passenger.profilePicture) {
      return "assets/images/user.png"
    }
    return passenger.profilePicture;
  }

}
