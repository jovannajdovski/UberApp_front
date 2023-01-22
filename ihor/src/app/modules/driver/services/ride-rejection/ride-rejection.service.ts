import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class RideRejectionService {

  constructor(private http: HttpClient) { }

  reject(request: any, rideId: number): Observable<RideRejectionResponse>{
    return this.http.put<RideRejectionResponse>(environment.apiHost+'ride/'+rideId+'/cancel',request);
  }
}
 

enum VehicleCategory {
  STANDARD, LUXURY, VAN
}
export interface RideRejectionResponse
{
  "id": number,
  "startTime": Date,
  "endTime": Date,
  "totalCost": number,
  "driver": {
    "id": number,
    "email": string
  },
  "passengers": [
    {
      "id": number,
      "email": string
    }
  ],
  "estimatedTimeInMinutes": number,
  "vehicleType": VehicleCategory,
  "babyTransport": boolean,
  "petTransport": boolean,
  "rejection": {
    "reason": string,
    "timeOfRejection": Date
  },
  "locations": [
    {
      "departure": {
        "address": string,
        "latitude": number,
        "longitude": number
      },
      "destination": {
        "address": string,
        "latitude": number,
        "longitude": number
      }
    }
  ],
  "status": "REJECTED"
}