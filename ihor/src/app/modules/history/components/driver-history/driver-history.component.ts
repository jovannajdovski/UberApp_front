import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ReviewsForRideDTO, RideNoStatusDTO, RidePageListDTO } from '../../model/RidePageListDTO';
import { RideHistoryService } from '../../services/ride-history/ride-history.service';

@Component({
  selector: 'app-driver-history',
  templateUrl: './driver-history.component.html',
  styleUrls: ['./driver-history.component.scss']
})
export class DriverHistoryComponent implements OnInit {

  public rideList: RidePageListDTO | undefined;
  public reviewsList: ReviewsForRideDTO[] = [];
  public reviewAvg: string[] = [];
  public idRides: number[] = [];
  hasError: boolean;

  constructor(private router: Router,
    private rideHistoryService: RideHistoryService,
    private authService: AuthService) {
    this.hasError = false;
  }

  ngOnInit(): void {
    const driverId = this.authService.getId();
    let d = new Date();
    d = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    const to = d.toISOString().slice(0, -1);
    d.setFullYear(d.getFullYear() - 1);
    const from = d.toISOString().slice(0, -1);

    this.rideHistoryService.getDriverRides(driverId, 0, 100, "startTime,asc", from, to).subscribe({
      next: (result) => {
        this.rideList = result;
        if (result.totalCount != 0) {
          for (const ride of result.results) {
            this.idRides.push(ride.id);
          }

          this.rideHistoryService.getReviewsForMultipleRide(this.idRides).subscribe({
            next: (result) => {
              this.reviewsList = result;
              for (const review of this.reviewsList) {
                this.reviewAvg.push(this.getAverage(review));
              }
            },
            error: (error) => {
              if (error instanceof HttpErrorResponse) {
                this.hasError = true;
              }
            },
          });
        }
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.hasError = true;
        }
      },
    });
  }

  getAverage(reviewsList: ReviewsForRideDTO): string {
    if (!reviewsList.reviews.length) {
      return "Not rated";
    }
    let s = 0.0;
    let reviewsNum = 0;
    reviewsList.reviews.forEach(review => {
      if (review.driverReview.rating != null) {
        s += review.driverReview.rating;
        reviewsNum++;
      }
      if (review.vehicleReview.rating != null) {
        s += review.vehicleReview.rating;
        reviewsNum++;
      }
    });

    return (s / (reviewsNum)) + "";
  }

  getStartDate(ride: RideNoStatusDTO): string {
    const startDateTime = ride.startTime.split("T");
    const datePoints = startDateTime[0].split("-");
    const startDate = datePoints[2] + "." + datePoints[1] + "." + datePoints[0] + ".";

    return startDate;
    
  }

  getStartTime(ride: RideNoStatusDTO): string {
    const startDateTime = ride.startTime.split("T");
    const timePoints = startDateTime[1].split(":");
    const startTime = timePoints[0] + ":" + timePoints[1];

    return startTime;
  }

  getStartPlace(ride: RideNoStatusDTO): string {
    const path = ride.locations[0];
    const startPlace = path.departure.address;
    return startPlace;
  }

  getEndPlace(ride: RideNoStatusDTO): string {
    const path = ride.locations[0];
    const endPlace = path.destination.address;
    return endPlace;
  }

  getCost(ride: RideNoStatusDTO): string {
    return ride.totalCost+" RSD";
  }

  toRideDetail(ride: RideNoStatusDTO, reviewsForRide: ReviewsForRideDTO) {
    this.rideHistoryService.setDriver(1);

    this.rideHistoryService.setSettedRide(ride);
    this.rideHistoryService.setSettedReview(reviewsForRide);
    this.router.navigate(['/ride-detail']);
  }
}
