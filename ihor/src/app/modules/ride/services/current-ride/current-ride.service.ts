import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ActivatePanic, Location, Ride } from 'src/app/modules/passenger/model/ride';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrentRideService {
  private currentRide$=new BehaviorSubject<any>(null);
  currentRideGot$=this.currentRide$.asObservable();
  public currentLocation$=new BehaviorSubject<any>(null);
  currentLocationChanged$=this.currentLocation$.asObservable();
  constructor(private http:HttpClient, private authService: AuthService) { }

  public setCurrentLocation(location:Location)
  {
    console.log("set current location");
    this.currentLocation$.next(location);
  }

  public getCurrentRide()
  {
    this.getCurrentRideBack().subscribe({
      next: (result) => {
        this.currentRide$.next(result);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.currentRide$.next(null);
        }
      },
    });
  }
  private getCurrentRideBack():Observable<Ride>
  {
    const id=Number(this.authService.getId());
    const role=this.authService.getRole();
    return this.http.get<Ride>(environment.apiHost +"ride/"+ role.toLowerCase()+'/'+ id+"/active");
  
  }
  
  public finishRideBack(rideId:number):Observable<Ride>{
    return this.http.put<Ride>(environment.apiHost +"ride/"+ rideId+"/end", null);
  }
}
