import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RidePageListDTO } from 'src/app/modules/history/model/RidePageListDTO';
import { environment } from 'src/environments/environment';
import { ReasonDTO, Ride } from '../../model/ride';

@Injectable({
  providedIn: 'root'
})
export class AcceptedRidesService {

  constructor(private http: HttpClient) { }

  getAcceptedRidesForDriver(driverId: number, ): Observable<RidePageListDTO>{
    return this.http.get<RidePageListDTO>(environment.apiHost+'ride/driver/'+driverId+"/accepted");
  }

  startRide(rideId: number): Observable<Ride>{
    return this.http.put<Ride>(environment.apiHost+'ride/'+rideId+"/start", null);
  }

  rejectdRide(rideId: number,reason: ReasonDTO): Observable<Ride>{
    return this.http.put<Ride>(environment.apiHost+'ride/'+rideId+"/cancel", reason);
  }

}
