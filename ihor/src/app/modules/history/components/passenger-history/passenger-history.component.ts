import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/modules/account/model/profile';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { DriverService } from 'src/app/modules/driver/services/driver.service';
import { ReviewsForRideDTO, RideNoStatusDTO, RidePageListDTO } from '../../model/RidePageListDTO';
import { RideHistoryService } from '../../services/ride-history/ride-history.service';

@Component({
  selector: 'app-passenger-history',
  templateUrl: './passenger-history.component.html',
  styleUrls: ['./passenger-history.component.scss']
})
export class PassengerHistoryComponent implements OnInit{

  public rideList: RidePageListDTO | undefined;
  public reviewsList: ReviewsForRideDTO[] = [];
  public reviewAvg: string[] = [];
  public idRides: number[] = [];
  public drivers: Profile[] = [];
  hasError: boolean;
  public driversLoaded = 0;
  public reviewsLoaded = false;

  constructor(private router: Router,
    private rideHistoryService: RideHistoryService,
    private authService: AuthService,
    private driverService: DriverService) {
    this.hasError = false;
  }

  ngOnInit(): void {
    const passengerId = this.authService.getId();
    let d = new Date();
    d = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    const to = d.toISOString().slice(0, -1);
    d.setFullYear(d.getFullYear() - 1);
    const from = d.toISOString().slice(0, -1);

    this.rideHistoryService.getPassengerRides(passengerId, 0, 100, "startTime,asc", from, to).subscribe({
      next: (result) => {
        this.rideList = result;
        if (result.totalCount != 0) {
          for (const ride of result.results) {
            this.idRides.push(ride.id);

            this.driverService.getDriver(ride.driver.id).subscribe({
              next: (result) => {
                this.drivers.push(result);
                this.driversLoaded++;
              },
              error: (error) => {
                if (error instanceof HttpErrorResponse) {
                  this.hasError = true;
                }
              },
            });

          }
          

          this.rideHistoryService.getReviewsForMultipleRide(this.idRides).subscribe({
            next: (result) => {
              this.reviewsList = result;
              for (const review of this.reviewsList) {
                this.reviewAvg.push(this.getAverage(review));
              }
              this.reviewsLoaded = true;
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

  getDriverName(driver: Profile): string {
    return driver.name+" "+driver.surname;
  }

  getDriverPicture(driver: Profile): string {
    if (!driver.profilePicture){
      return "assets/images/user.png"
    }
    return driver.profilePicture;
  }

  toRideDetail(ride: RideNoStatusDTO, reviewsForRide: ReviewsForRideDTO) {
    this.rideHistoryService.setDriver(0);

    this.rideHistoryService.setSettedRide(ride);
    this.rideHistoryService.setSettedReview(reviewsForRide);

    this.rideHistoryService.setDrawRoute(ride.locations[0].departure.longitude,
      ride.locations[0].destination.longitude,
      ride.locations[0].departure.latitude,
      ride.locations[0].destination.latitude);
      
    this.router.navigate(['/ride-detail']);
  }
}
