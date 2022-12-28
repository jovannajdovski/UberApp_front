import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../../account/model/profile';
import { Vehicle } from '../model/vehicle';


@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();

  constructor(private http: HttpClient) { }

  setValue(test: any) {
    this.value$.next(test);
  }

  getAll(): Observable<Profile[]> {
    return this.http.get<Profile[]>(environment.apiHost + 'driver');
  }

  getDriver(driverId: number): Observable<Profile> {
    return this.http.get<Profile>(environment.apiHost + 'driver/' + driverId);
  }

  addReactive(profile: any): Observable<any> {
    const options: any = {
      responseType: 'text',
    };
    return this.http.post<string>(environment.apiHost + 'driver', profile, options);
  }

  add(profile: any): Observable<any> {
    const options: any = {
      responseType: 'text',
    };

    return this.http.post<string>(
      environment.apiHost + 'driver',
      {
        name: profile.name,
        surname: profile.surname,
        profilePicture: profile.profilePicture,
        telephoneNumber: profile.telephoneNumber,
        email: profile.email,
        address: profile.address,
        password: profile.password
      },
      options
    );
  }

  updateReactive(driverId: number, profile: any): Observable<any> {
    return this.http.put<string>(environment.apiHost + 'driver/' + driverId, profile);
  }

  update(driverId: number, profile: any): Observable<any> {

    return this.http.put<string>(
      environment.apiHost + 'driver/' + driverId,
      {
        name: profile.name,
        surname: profile.surname,
        profilePicture: profile.profilePicture,
        telephoneNumber: profile.telephoneNumber,
        email: profile.email,
        address: profile.address,
        password: profile.password
      }
    );
  }

  getVehicle(driverId: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(environment.apiHost + 'driver/' + driverId + '/vehicle');
  }

  updateVehicle(driverId: number, vehicle: any): Observable<any> {

    return this.http.put<string>(
      environment.apiHost + 'driver/' + driverId + '/vehicle',
      {
        model: vehicle.model,
        vehicleType: vehicle.vehicleType,
        licenseNumber: vehicle.licenseNumber,
        passengerSeats: vehicle.passengerSeats,
        babyTransport: vehicle.babyTransport,
        petTransport: vehicle.petTransport,
        currentLocation: {
          address: "Bulevar oslobodjenja 46",
          latitude: 45.267136,
          longitude: 19.833549
        },
      }
    );
  }
}