import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Ride} from 'src/app/modules/passenger/model/ride';
import {RejectionReason} from "../../../communication/components/notifications/notifications.component";


@Injectable({
  providedIn: 'root'
})
export class RideRejectionService {

  constructor(private http: HttpClient) {
  }

  reject(request: RejectionReason, rideId: number): Observable<Ride> {
    return this.http.put<Ride>(environment.apiHost + 'ride/' + rideId + '/cancel', request);
  }

  accept(rideId: number): Observable<Ride> {
    return this.http.put<Ride>(environment.apiHost + 'ride/' + rideId + '/accept', {});
  }
}


enum VehicleCategory {
  STANDARD, LUXURY, VAN
}

export interface RideRejectionResponse {
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
