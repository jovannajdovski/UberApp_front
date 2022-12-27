import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../../account/model/profile';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();

  constructor(private http: HttpClient) { }

  setValue(test: any) {
    this.value$.next(test);
  }

  getAll(): Observable<Profile[]> {
    return this.http.get<Profile[]>(environment.apiHost + 'passenger');
  }

  getPassenger(passengerId: number): Observable<Profile> {
    return this.http.get<Profile>(environment.apiHost + 'passenger/' + passengerId);
  }

  addReactive(profile: any): Observable<any> {
    const options: any = {
      responseType: 'text',
    };
    return this.http.post<string>(environment.apiHost + 'passenger', profile, options);
  }

  add(profile: any): Observable<any> {
    const options: any = {
      responseType: 'text',
    };

    return this.http.post<string>(
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
      options
    );
  }

  updateReactive(passengerId:number, profile: any): Observable<any> {
    const options: any = {
      responseType: 'text',
    };
    return this.http.put<string>(environment.apiHost + 'passenger/' + passengerId, profile, options);
  }

  update(passengerId:number, profile: any): Observable<any> {
    const options: any = {
      responseType: 'text',
    };

    return this.http.put<string>(
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
      options
    );
  }
}
