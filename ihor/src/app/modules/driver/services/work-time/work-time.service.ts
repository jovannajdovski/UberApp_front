import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Ride } from 'src/app/modules/passenger/model/ride';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkTimeService {
  private remainedWorktime$=new BehaviorSubject<any>(null);
  remainedWorktimeGot$=this.remainedWorktime$.asObservable();
  constructor(private http:HttpClient, private authService: AuthService) { }


  public getRemainedWorktime()
  {
    this.getRemainedWorktimeBack().subscribe({
      next: (result) => {
        this.remainedWorktime$.next(result.value);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.remainedWorktime$.next(0);
        }
      },
    });
  }
  public getRemainedWorktimeBack():Observable<{"value":number}>
  {
    const id=Number(this.authService.getId());
    return this.http.get<{"value":number}>(environment.apiHost + 'driver/'+ id+"/work-time-remained");
  
  }
}
