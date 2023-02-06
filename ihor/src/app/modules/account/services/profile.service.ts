import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Profile, ProfileWPassword} from '../model/profile';
import {PassengerService} from '../../passenger/services/passenger.service';
import {DriverService} from '../../driver/services/driver.service';
import {AdminService} from '../../administrator/services/admin.service';
import {AuthService} from '../../auth/services/auth.service';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient,
              private passengerService: PassengerService,
              private driverService: DriverService,
              private adminService: AdminService,
              private authService: AuthService
  ) {
  }

  getProfile(id: number): Observable<Profile> {
    const role: string = this.authService.getRole()
    if (role === 'PASSENGER') {
      return this.passengerService.getPassenger(id);
    }
    if (role === 'ADMIN') {
      return this.adminService.getAdmin(id);
    }
    if (role === 'DRIVER') {
      return this.driverService.getDriver(id);
    }
    return new Observable<Profile>();
  }

  add(profile: ProfileWPassword): Observable<string> {
    const role: string = this.authService.getRole()
    if (role === 'PASSENGER') {
      return this.passengerService.add(profile);
    }
    if (role === 'DRIVER') {
      return this.driverService.add(profile);
    }
    return new Observable<string>();
  }

  update(id: number, profile: ProfileWPassword): Observable<string> {
    const role: string = this.authService.getRole()
    if (role === 'PASSENGER') {
      return this.passengerService.update(id, profile);
    }
    if (role === 'ADMIN') {
      return this.adminService.update(id, profile);
    }
    if (role === 'DRIVER') {
      return this.driverService.update(id, profile);
    }
    return new Observable<string>();
  }


  updatePassword(userId: number, currPassword: string, newPassword: string): Observable<string> {
    return this.http.put(
      environment.apiHost + 'user/' + userId + '/changePassword',
      {
        oldPassword: currPassword,
        newPassword: newPassword
      },
      {
        responseType: 'text',
      }
    );
  }
}

