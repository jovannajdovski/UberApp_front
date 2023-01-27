import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/modules/account/model/profile';
import { PassengerService } from 'src/app/modules/passenger/services/passenger.service';
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
  public passengers: Profile[] = [];
  public distance = '';

  public passengersLoaded = false;

  constructor(private rideHistoryService: RideHistoryService,
    private router: Router,
    private passengerService: PassengerService) {

    this.ride = rideHistoryService.getSettedRide();
    this.reviews = rideHistoryService.getSettedReview();
    this.hasError = false;
  }

  ngOnInit(): void {

    this.rideHistoryService.selectedEstimatedRoutes$.subscribe((value) => {
      console.log(value.length);
      value.forEach((element: any) => {
        console.log(element);
        this.distance = this.toKM(element.summary.totalDistance)
        
      });
    });

    for (const passenger of this.ride.passengers) {
      this.passengerService.getPassenger(passenger.id).subscribe({
        next: (result) => {
          this.passengers.push(result);
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this.hasError = true;
          }
        },
      });
    }
    this.passengersLoaded = true;
  }

  toKM(disInMeters:number){
    const distance = Math.floor(disInMeters/100);
    return distance/10+" km";
  }

  getDistance(){
    return this.distance;
  }

  toReviews(): void {
    this.router.navigate(['/review-list']);
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

  getEndTime(ride: RideNoStatusDTO): string {
    const endDateTime = ride.endTime.split("T");
    const timePoints = endDateTime[1].split(":");
    const endTime = timePoints[0] + ":" + timePoints[1];

    return endTime;
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
    return ride.totalCost + " RSD";
  }


  getPassengerName(driver: Profile): string {
    return driver.name + " " + driver.surname;
  }

  getPassengerPhone(driver: Profile): string {
    return driver.telephoneNumber;
  }

  getPassengerPicture(driver: Profile): string {
    if (!driver.profilePicture) {
      return "assets/images/user.png"
    }
    return driver.profilePicture;
  }
}
