import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../../account/model/profile';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();

  constructor(private http: HttpClient) { }

  setValue(test: any) {
    this.value$.next(test);
  }


  getAdmin(adminId: number): Observable<Profile> {
    return this.http.get<Profile>(environment.apiHost + 'admin/' + adminId);
  }


  updateReactive(adminId:number, profile: any): Observable<any> {
    const options: any = {
      responseType: 'text',
    };
    return this.http.put<string>(environment.apiHost + 'admin/' + adminId, profile, options);
  }

  update(adminId:number, profile: any): Observable<any> {
    const options: any = {
      responseType: 'text',
    };

    return this.http.put<string>(
      environment.apiHost + 'admin/' + adminId,
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
