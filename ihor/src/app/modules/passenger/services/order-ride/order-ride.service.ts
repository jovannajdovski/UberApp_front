import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profile, ProfileWId } from 'src/app/modules/account/model/profile';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CreateRide, UserForRide, VehicleCategory } from '../../model/ride';

@Injectable({
  providedIn: 'root'
})
export class OrderRideService {
  
  private additionals$ = new BehaviorSubject<any>({});
  additionalsChoosed$ = this.additionals$.asObservable();

  private friends$ = new BehaviorSubject<any>({});
  friendsChoosed$ = this.friends$.asObservable();
  
  constructor(private authService:AuthService) {
    this.additionals$.next(false);
    this.friends$.next(false);
   }
  newRide:CreateRide={"locations":[{"departure": {"address":"","latitude":0,"longitude":0},
                                   "destination":{"address":"","latitude":0,"longitude":0}}],
  "passengers": [],
  "vehicleType": VehicleCategory.null,
  "babyTransport":false,
  "petTransport":false,
  "scheduledTime": "2023-01-16T01:30:06.134"};

   public setCoordinates(lat1:number, long1:number,lat2:number, long2:number){
      console.log("setovao koordinate");
      this.newRide.locations[0].departure.latitude=lat1;
      this.newRide.locations[0].departure.longitude=long1;
      this.newRide.locations[0].destination.latitude=lat2;
      this.newRide.locations[0].departure.longitude=long2;
   }
   public setAddresses(start: string, final: string) {
    console.log("setovao adrese");
    this.newRide.locations[0].departure.address=start;
    this.newRide.locations[0].destination.address=final;
  }

  public setAdditionals(vehicleType: number, babiesAllowed: boolean, petsAllowed: boolean, scheduledTime: Date){
    console.log("setovao dodatno");
    this.newRide.babyTransport=babiesAllowed;
    this.newRide.petTransport=petsAllowed;
    this.newRide.vehicleType=vehicleType;
    
    const datepipe: DatePipe = new DatePipe('en-US');
    this.newRide.scheduledTime = datepipe.transform(scheduledTime, 'YYYY-MM-ddTHH:mm:ss.SSS')||"";
    console.log(this.newRide.scheduledTime);
    this.additionals$.next(true);
  }

  public setPassengers(passengers:ProfileWId[]){
    const id=this.authService.getId();
    const email=this.authService.getEmail();
    this.newRide.passengers.push({"id":id, "email": email});
    passengers.forEach((value) =>{
      this.newRide.passengers.push({"id":value.id, "email": value.email});
    })
    console.log("---------------------");
    console.log(this.newRide);
    console.log("---------------------");
    this.friends$.next(true);
  }
}
