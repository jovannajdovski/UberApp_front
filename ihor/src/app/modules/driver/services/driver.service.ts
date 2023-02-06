import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Profile, ProfileWPassword} from '../../account/model/profile';
import {Vehicle} from '../model/vehicle';


@Injectable({
  providedIn: 'root'
})
export class DriverService {
  constructor(private http: HttpClient) {
  }

  getDriver(driverId: number): Observable<Profile> {
    return this.http.get<Profile>(environment.apiHost + 'driver/' + driverId);
  }

  add(profile: ProfileWPassword): Observable<string> {
    return this.http.post(
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
      {
        responseType: 'text',
      }
    );
  }

  update(driverId: number, profile: ProfileWPassword): Observable<string> {
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

  updateVehicle(driverId: number, vehicle: Vehicle): Observable<string> {
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
