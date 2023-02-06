import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Profile, ProfileWPassword} from '../../account/model/profile';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {
  }

  getAdmin(adminId: number): Observable<Profile> {
    return this.http.get<Profile>(environment.apiHost + 'admin/' + adminId);
  }

  update(adminId: number, profile: ProfileWPassword): Observable<string> {
    return this.http.put(
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
      {
        responseType: 'text',
      }
    );
  }
}
