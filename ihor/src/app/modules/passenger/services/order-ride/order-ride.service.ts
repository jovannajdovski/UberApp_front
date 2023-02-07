import {DatePipe} from '@angular/common';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProfileWId} from 'src/app/modules/account/model/profile';
import {AuthService} from 'src/app/modules/auth/services/auth.service';
import {environment} from 'src/environments/environment';
import {CreateRide, Ride, VehicleCategory} from '../../model/ride';

@Injectable({
  providedIn: 'root'
})
export class OrderRideService {

  private additionals$ = new BehaviorSubject<boolean | null>(null);
  additionalsChoosed$ = this.additionals$.asObservable();
  ride!: Ride;
  private friends$ = new BehaviorSubject<boolean | null>(null);
  friendsChoosed$ = this.friends$.asObservable();

  private rideOrdered$ = new BehaviorSubject<number | null>(0);
  rideOrderedObs$ = this.rideOrdered$.asObservable();

  constructor(private authService: AuthService, private http: HttpClient) {
    this.additionals$.next(false);
    this.friends$.next(false);
  }

  public newRide: CreateRide = {
    "locations": [{
      "departure": {"address": "", "latitude": 0, "longitude": 0},
      "destination": {"address": "", "latitude": 0, "longitude": 0}
    }],
    "passengers": [],
    "vehicleType": VehicleCategory.null,
    "babyTransport": false,
    "petTransport": false,
    "scheduledTime": "2023-01-16T01:30:06.134"
  };

  public setCoordinates(lat1: number, long1: number, lat2: number, long2: number) {
    this.newRide.locations[0].departure.latitude = lat1;
    this.newRide.locations[0].departure.longitude = long1;
    this.newRide.locations[0].destination.latitude = lat2;
    this.newRide.locations[0].destination.longitude = long2;
    console.log(long2);
    console.log(this.newRide.locations[0].departure.longitude);
  }

  public setAddresses(start: string, final: string) {
    this.newRide.locations[0].departure.address = start;
    this.newRide.locations[0].destination.address = final;
  }

  public setAdditionals(vehicleType: number, babiesAllowed: boolean, petsAllowed: boolean, scheduledTime: Date) {
    this.newRide.babyTransport = babiesAllowed;
    this.newRide.petTransport = petsAllowed;
    this.newRide.vehicleType = vehicleType;

    const datepipe: DatePipe = new DatePipe('en-US');
    this.newRide.scheduledTime = datepipe.transform(scheduledTime, 'YYYY-MM-ddTHH:mm:ss.SSS') || "";
    console.log(this.newRide.scheduledTime);
    this.additionals$.next(true);
  }

  public setPassengers(passengers: ProfileWId[]) {
    const id = Number(this.authService.getId());
    const email = this.authService.getEmail();
    this.newRide.passengers.push({"id": id, "email": email});
    passengers.forEach((value) => {
      this.newRide.passengers.push({"id": value.id, "email": value.email});
    })
    console.log("---------------------");
    console.log(this.newRide);
    console.log("---------------------");
    this.friends$.next(true);
  }

  public orderRide() {
    this.orderRideBack().subscribe({
      next: (result) => {
        this.rideOrdered$.next(1);
        this.ride = result;
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.rideOrdered$.next(2);
        }
      },
    });
  }

  public orderRideBack(): Observable<Ride> {
    if (this.newRide.vehicleType == 3)
      this.newRide.vehicleType = null;
    return this.http.post<Ride>(environment.apiHost + 'ride', this.newRide);

  }
}
