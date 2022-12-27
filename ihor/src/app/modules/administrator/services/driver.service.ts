import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Driver } from '../model/driver';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }

  getAll(request: any): Observable<DriversPageResponse> {
    const params = request;
    return this.http.get<DriversPageResponse>(environment.apiHost + 'driver', {params});
  }

  updateDriver(driver: Driver): Observable<Driver> {
    return this.http.put<Driver>(environment.apiHost + "driver/" + driver.id, 
    {
      name: driver.name,
      surname: driver.surname,
      telephoneNumber : driver.telephoneNumber,
      email: driver.email,
      address: driver.address,
      password: driver.password
    })
  }
}

export interface DriversPageResponse {
  "totalCount": number,
  "results": Driver[]
}