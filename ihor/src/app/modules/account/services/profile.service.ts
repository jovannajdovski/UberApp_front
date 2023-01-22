import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile } from '../model/profile';
import { PassengerService } from '../../passenger/services/passenger.service';
import { DriverService } from '../../driver/services/driver.service';
import { AdminService } from '../../administrator/services/admin.service';
import { AuthService } from '../../auth/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();

  constructor(private http: HttpClient,
    private passengerService: PassengerService,
    private driverService: DriverService,
    private adminService: AdminService,
    private authService: AuthService
  ) { }

  getAll(): Observable<Profile[]>{
    const role: string = this.authService.getRole()
    if (role === 'PASSENGER') {
      return this.passengerService.getAll();
    }
    if (role === 'DRIVER') {
      return this.driverService.getAll();
    }
    return new Observable<Profile[]>();
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

  addReactive(profile: any): Observable<any> {
    const role: string = this.authService.getRole()
    if (role === 'PASSENGER') {
      return this.passengerService.addReactive(profile);
    }
    if (role === 'DRIVER') {
      return this.driverService.addReactive(profile);
    }
    return new Observable<any>();
  }

  add(profile: any): Observable<any>{
    const role: string = this.authService.getRole()
    if (role === 'PASSENGER') {
      return this.passengerService.add(profile);
    }
    if (role === 'DRIVER') {
      return this.driverService.add(profile);
    }
    return new Observable<any>();
  }

  updateReactive(id: number, profile: any): Observable<any>{
    const role: string = this.authService.getRole()
    if (role === 'PASSENGER') {
      return this.passengerService.updateReactive(id, profile);
    }
    if (role === 'ADMIN') {
      return this.adminService.updateReactive(id, profile);
    }
    if (role === 'DRIVER') {
      return this.driverService.updateReactive(id, profile);
    }
    return new Observable<any>();
  }

  update(id: number, profile: any): Observable<any> {
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
    return new Observable<any>();
  }
  

  updatePassword(userId:number, currPassword: string, newPassword: string): Observable<any> {
    const options: any = {
      responseType: 'text',
    };

    return this.http.put<string>(
      environment.apiHost + 'user/' + userId+'/changePassword',
      {
        currentPassword: currPassword,
        newPassword: newPassword
      },
      options
    );
  }
}

