import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Ride } from 'src/app/modules/passenger/model/ride';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NextRideService {
  private nextRide$=new BehaviorSubject<any>(null);
  nextRideGot$=this.nextRide$.asObservable();
  constructor(private http:HttpClient, private authService: AuthService) { }


  public getNextRide()
  {
    this.getNextRideBack().subscribe({
      next: (result) => {
        this.nextRide$.next(result);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.nextRide$.next(null);
        }
      },
    });
  }
  public getNextRideBack():Observable<Ride>
  {
    const id=Number(this.authService.getId());
    return this.http.get<Ride>(environment.apiHost + 'driver/'+ id+"/next-ride");
  
  }
}
