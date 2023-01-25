import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RideHistoryService } from '../../services/ride-history/ride-history.service';
import { BarRatingModule } from "ngx-bar-rating";

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalfAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ReviewRequestDTO, ReviewsForRideDTO, RideNoStatusDTO } from '../../model/RidePageListDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from 'src/app/modules/shared/services/shared.service';

@Component({
  selector: 'app-leave-review',
  templateUrl: './leave-review.component.html',
  styleUrls: ['./leave-review.component.scss']
})
export class LeaveReviewComponent {
  public ride: RideNoStatusDTO;
  public reviews: ReviewsForRideDTO;

  public driverRate = 0;
  public vehicleRate = 0;

  public dis = true;
  reviewForm = new FormGroup({
    rateDriver: new FormControl('', [Validators.required]),
    commentDriver: new FormControl('', [Validators.required]),
    rateVehicle: new FormControl('', [Validators.required]),
    commentVehicle: new FormControl('', [Validators.required]),
  });


  constructor(
    private router: Router,
    private rideHistoryService: RideHistoryService,
    private authService: AuthService,
    private sharedService: SharedService
  ) {
    this.ride = rideHistoryService.getSettedRide();
    this.reviews = rideHistoryService.getSettedReview();
  }

  navigate(){
    if (this.authService.getRole()==="PASSENGER"){
      this.router.navigate(['/passenger/history']);
    } else {
      this.router.navigate(['/driver/history']);
    }
  }


  toReview() {
    if (this.reviewForm.valid) {
      let commentDriverValue = '';
      if (this.reviewForm.value.commentDriver){
        commentDriverValue = this.reviewForm.value.commentDriver;
      } 

      let commentVehicleValue = '';
      if (this.reviewForm.value.commentVehicle){
        commentVehicleValue = this.reviewForm.value.commentVehicle;
      } 
      
      const driverReview: ReviewRequestDTO = {
        rating:this.driverRate,
        comment:commentDriverValue,
      }

      const vehicleReview: ReviewRequestDTO = {
        rating:this.vehicleRate,
        comment:commentVehicleValue,
      }

      this.rideHistoryService.leaveReviewForDriver(this.ride.id, driverReview).subscribe({
        next: () => {
          this.rideHistoryService.leaveReviewForVehicle(this.ride.id, vehicleReview).subscribe({
            next: () => {
              this.sharedService.openSnack('Thank you for your review');
              this.navigate();
            },
            error: (error: HttpErrorResponse) => {
              this.sharedService.openSnack('You cant leave this review, try again');
            }
          });
        },
        error: (error: HttpErrorResponse) => {
          this.sharedService.openSnack('You cant leave this review, try again');
        }
      });

      
    }
  }
}
