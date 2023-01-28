import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/modules/account/model/profile';
import { DriverService } from 'src/app/modules/driver/services/driver.service';
import { RouteService } from 'src/app/modules/map/services/route/route.service';
import { PassengerService } from 'src/app/modules/passenger/services/passenger.service';
import { CreateFavoriteDTO } from '../../model/FavoriteDTO';
import { ReviewsForRideDTO, RideNoStatusDTO } from '../../model/RidePageListDTO';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { RideHistoryService } from '../../services/ride-history/ride-history.service';

@Component({
  selector: 'app-passenger-ride-detail',
  templateUrl: './passenger-ride-detail.component.html',
  styleUrls: ['./passenger-ride-detail.component.scss']
})
export class PassengerRideDetailComponent implements OnInit {
  public ride!: RideNoStatusDTO;
  public reviews!: ReviewsForRideDTO;
  public hasError: boolean;
  public isFavorite: boolean;
  public favoriteId: number;
  public driver!: Profile;
  public passengers: Profile[] = [];

  public distance = '';
  public driverLoaded = false;
  public passengersLoaded = false;

  constructor(private rideHistoryService: RideHistoryService,
    private router: Router,
    private favoritesService: FavoritesService,
    private driverService: DriverService,
    private passengerService: PassengerService,
    private routeService: RouteService) {

    this.ride = rideHistoryService.getSettedRide();
    this.reviews = rideHistoryService.getSettedReview();
    this.hasError = false;
    this.isFavorite = false;
    this.favoriteId = -1;
  }

  ngOnInit(): void {

    this.rideHistoryService.selectedEstimatedRoutes$.subscribe((value) => {
      console.log(value.length);
      value.forEach((element: any) => {
        console.log(element);
        this.distance = this.toKM(element.summary.totalDistance)
        
      });
    });


    this.favoritesService.isRideFavorite(this.ride.locations[0].departure.address,
      this.ride.locations[0].destination.address).subscribe({
        next: (result) => {
          this.favoriteId = result.favoriteId;
          if (this.favoriteId!=0) {
            this.isFavorite = true;
            const favv = document.getElementById("favvv");
            if (favv != null)
              favv.setAttribute("data-icon", "material-symbols:favorite-rounded");
          }
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this.hasError = true;
          }
        },
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

  clickFavorite() {
    if (this.isFavorite) {
      this.favoritesService.deleteFavorite(this.favoriteId).subscribe({
        next: () => {
          this.isFavorite = false;
          this.favoriteId = -1;
          const favv = document.getElementById("favvv");
          if (favv != null)
            favv.setAttribute("data-icon", "material-symbols:favorite-outline-rounded");
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this.hasError = true;
          }
        },
      });
    } else {
      const createFavoriteDTO: CreateFavoriteDTO = {
        favoriteName: this.ride.locations[0].departure.address + " - " + this.ride.locations[0].destination.address,
        locations: this.ride.locations,
        passengers: this.ride.passengers,
        vehicleType: this.ride.vehicleType,
        babyTransport: this.ride.babyTransport,
        petTransport: this.ride.petTransport
      }
      this.favoritesService.createFavorite(createFavoriteDTO).subscribe({
        next: (result) => {
          this.isFavorite = true;
          this.favoriteId = result.id;
          const favv = document.getElementById("favvv");
          if (favv != null)
            favv.setAttribute("data-icon", "material-symbols:favorite-rounded");
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this.hasError = true;
          }
        },
      });
    }
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

  seeOffers(): void {
    const start = this.ride.locations[0].departure.address;
    const end = this.ride.locations[0].destination.address;
    this.routeService.setOffers(true);
    this.routeService.setStartFromOffers(start);
    this.routeService.setFinalFromOffers(end);
    this.router.navigate(['/passenger']);
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
