import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Registration } from '../../components/signup-form/signup-form.component';
import {Vehicle} from "../../../administrator/model/Vehicle";
import {Driver} from "../../../administrator/model/Driver";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  registerPassenger(registration: Registration): Observable<Registration> {
    return this.http.post<Registration>(environment.apiHost + "passenger",
    {
      name: registration.name,
      surname: registration.surname,
      telephoneNumber : registration.telephoneNumber,
      email: registration.email,
      address: registration.address,
      password: registration.password
    })
  }

  registerDriver(registration: Registration): Observable<Driver> {
    return this.http.post<Driver>(environment.apiHost + "driver",
    {
      name: registration.name,
      surname: registration.surname,
      telephoneNumber : registration.telephoneNumber,
      email: registration.email,
      address: registration.address,
      password: registration.password
    })
  }

  addVehicleToDriver(id: number, vehicle: Vehicle): Observable<any> {
    return this.http.post<Registration>(environment.apiHost + "driver/" + id.toString() + "/vehicle",
      {
        vehicleType: vehicle.vehicleType,
        model: vehicle.model,
        licenseNumber: vehicle.licenseNumber,
        currentLocation: vehicle.currentLocation,
        passengerSeats: vehicle.passengerSeats,
        babyTransport: vehicle.babyTransport,
        petTransport: vehicle.petTransport
      })
  }
}
