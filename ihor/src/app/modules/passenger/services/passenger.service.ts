import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Profile, ProfileWId, ProfileWPassword} from '../../account/model/profile';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  constructor(private http: HttpClient) {
  }

  getPassenger(passengerId: number): Observable<Profile> {
    return this.http.get<Profile>(environment.apiHost + 'passenger/' + passengerId);
  }

  getPassengerByEmail(passengerEmail: string): Observable<ProfileWId> {
    return this.http.get<ProfileWId>(environment.apiHost + 'passenger/email/' + passengerEmail);
  }

  add(profile: ProfileWPassword): Observable<string> {
    return this.http.post(
      environment.apiHost + 'passenger',
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

  update(passengerId: number, profile: ProfileWPassword): Observable<string> {
    return this.http.put(
      environment.apiHost + 'passenger/' + passengerId,
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
}
