import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Driver } from '../model/Driver';
import {DriversPageResponse} from "../model/DriversPageResponse";
import {PageRequest} from "../model/PageRequest";

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) {
  }

  getAll(request: PageRequest): Observable<DriversPageResponse> {
    return this.http.get<DriversPageResponse>(environment.apiHost + 'driver', {
      params: {
        page: request.page,
        size: request.size
      }
    });
  }

  updateDriver(driver: Driver): Observable<Driver> {
    return this.http.put<Driver>(environment.apiHost + "driver/" + driver.id,
      {
        name: driver.name,
        surname: driver.surname,
        telephoneNumber: driver.telephoneNumber,
        email: driver.email,
        address: driver.address,
        profilePicture: driver.profilePicture
      })
  }
}
