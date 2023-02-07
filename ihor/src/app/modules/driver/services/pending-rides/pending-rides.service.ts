import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from 'src/app/modules/auth/services/auth.service';
import {Ride} from 'src/app/modules/passenger/model/ride';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PendingRidesService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getPendingRides(): Observable<{ "totalCount": number, "results": Ride[] }> {
    const driverId = Number(this.authService.getId());
    return this.http.get<{ "totalCount": number, "results": Ride[] }>(environment.apiHost + 'driver/' + driverId + '/ride/pending');
  }
}
