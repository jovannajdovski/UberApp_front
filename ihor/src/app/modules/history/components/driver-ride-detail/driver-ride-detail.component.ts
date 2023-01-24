import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewsForRideDTO, RideNoStatusDTO } from '../../model/RidePageListDTO';
import { RideHistoryService } from '../../services/ride-history/ride-history.service';

@Component({
  selector: 'app-driver-ride-detail',
  templateUrl: './driver-ride-detail.component.html',
  styleUrls: ['./driver-ride-detail.component.scss']
})
export class DriverRideDetailComponent implements OnInit{

  public ride!: RideNoStatusDTO;
  public reviews!: ReviewsForRideDTO;
  public hasError: boolean;
  public isFavorite: boolean;

  constructor(private rideHistoryService: RideHistoryService, private router: Router) {

    this.ride = rideHistoryService.getSettedRide();
    this.reviews = rideHistoryService.getSettedReview();
    this.hasError= false;
    this.isFavorite= false;
  }

  ngOnInit(): void {
    
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

}
