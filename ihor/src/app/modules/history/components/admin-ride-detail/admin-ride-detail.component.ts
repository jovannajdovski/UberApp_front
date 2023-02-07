import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Profile} from 'src/app/modules/account/model/profile';
import {DriverService} from 'src/app/modules/driver/services/driver.service';
import {PassengerService} from 'src/app/modules/passenger/services/passenger.service';
import {ReviewsForRideDTO, RideNoStatusDTO} from '../../model/RidePageListDTO';
import {RideHistoryService} from '../../services/ride-history/ride-history.service';

@Component({
  selector: 'app-admin-ride-detail',
  templateUrl: './admin-ride-detail.component.html',
  styleUrls: ['./admin-ride-detail.component.scss']
})
export class AdminRideDetailComponent implements OnInit {
  public ride!: RideNoStatusDTO;
  public reviews!: ReviewsForRideDTO;
  public hasError: boolean;
  public driver!: Profile;
  public passengers: Profile[] = [];

  public distance = '';
  public driverLoaded = false;
  public passengersLoaded = false;

  constructor(private rideHistoryService: RideHistoryService,
              private router: Router,
              private driverService: DriverService,
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

    this.driverService.getDriver(this.ride.driver.id).subscribe({
      next: (result) => {
        this.driver = result;
        this.driverLoaded = true;
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.hasError = true;
        }
      },
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

  toKM(disInMeters: number) {
    const distance = Math.floor(disInMeters / 100);
    return distance / 10 + " km";
  }

  getDistance() {
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
    return datePoints[2] + "." + datePoints[1] + "." + datePoints[0] + ".";

  }

  getStartTime(ride: RideNoStatusDTO): string {
    const startDateTime = ride.startTime.split("T");
    const timePoints = startDateTime[1].split(":");
    return timePoints[0] + ":" + timePoints[1];
  }

  getEndTime(ride: RideNoStatusDTO): string {
    const endDateTime = ride.endTime.split("T");
    const timePoints = endDateTime[1].split(":");
    return timePoints[0] + ":" + timePoints[1];
  }

  getStartPlace(ride: RideNoStatusDTO): string {
    const path = ride.locations[0];
    return path.departure.address;
  }

  getEndPlace(ride: RideNoStatusDTO): string {
    const path = ride.locations[0];
    return path.destination.address;
  }

  getCost(ride: RideNoStatusDTO): string {
    return ride.totalCost + " RSD";
  }

  getDriverName(driver: Profile): string {
    return driver.name + " " + driver.surname;
  }

  getDriverPicture(driver: Profile): string {
    if (!driver.profilePicture) {
      return "assets/images/user.png"
    }
    return driver.profilePicture;
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
