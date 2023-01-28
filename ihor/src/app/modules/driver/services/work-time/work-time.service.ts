import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Ride } from 'src/app/modules/passenger/model/ride';
import { environment } from 'src/environments/environment';
import { EndWorkHour, StartWorkHour, WorkHours } from '../../model/work-hours';

import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WorkTimeService {
  private remainedWorktime$=new BehaviorSubject<any>(null);
  remainedWorktimeGot$=this.remainedWorktime$.asObservable();
  private startShift$=new BehaviorSubject<any>(null);
  shiftStarted$=this.startShift$.asObservable();
  constructor(private http:HttpClient, private authService: AuthService) { }

  private currentShiftId=0;

  private stompClient: any;

  initializeWebSocketConnection() {
    const  ws = new SockJS('http://localhost:8080/api/socket');
    this.stompClient = Stomp.over(ws);
    
    this.stompClient.connect({},  () => {
      this.openGlobalSocket()
    });

  }
  openGlobalSocket() {
    const driverId=this.authService.getId();
    this.stompClient.subscribe("api/socket-publisher/"+driverId+"/work-hours", (message: {body: string }) => {
      this.handleResult(message);
    });

    this.stompClient.send("api/socket-subscriber/"+driverId+"/work-hours");
  }
  handleResult(message: { body: string }) {
    if (message.body) {
      const body: {"value":number} = JSON.parse(message.body);
      this.remainedWorktime$.next(body.value);
    }
  }

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
  public startShift()
  {
    console.log("start bek");
    this.startShiftBack().subscribe({
      next:(result)=>{
        this.startShift$.next(true);
        this.currentShiftId=result.id;
      },
      error:(error)=>{
        this.startShift$.next(false);
      }
    })
  }
  public endShift()
  {
    console.log("end bek");
    this.endShiftBack().subscribe({
      next:(result)=>{
        this.startShift$.next(false);
      },
      error:(error)=>{
        this.startShift$.next(true);
      }
    })
  }
  private getRemainedWorktimeBack():Observable<{"value":number}>
  {
    const id=Number(this.authService.getId());
    return this.http.get<{"value":number}>(environment.apiHost + 'driver/'+ id+"/work-time-remained");
  
  }
  private startShiftBack():Observable<WorkHours>
  {
    const id=Number(this.authService.getId());
    const datepipe: DatePipe = new DatePipe('en-US');
    const startWorkHour:StartWorkHour={"start":datepipe.transform(new Date(), 'YYYY-MM-ddTHH:mm:ss.SSS')||""};
    return this.http.post<WorkHours>(environment.apiHost + 'driver/'+ id+"/working-hour", startWorkHour);
  }
  private endShiftBack()
  {
    const datepipe: DatePipe = new DatePipe('en-US');
    const endWorkHour:EndWorkHour={"end":datepipe.transform(new Date(), 'YYYY-MM-ddTHH:mm:ss.SSS')||""};
    return this.http.put<WorkHours>(environment.apiHost + 'driver/working-hour/'+this.currentShiftId, endWorkHour);
  }

}
