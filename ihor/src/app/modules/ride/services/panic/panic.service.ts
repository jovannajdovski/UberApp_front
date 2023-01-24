import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatePanic, Ride } from 'src/app/modules/passenger/model/ride';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PanicService {
  private panic$=new BehaviorSubject<any>(null);
  panicGot$=this.panic$.asObservable();
  constructor(private http:HttpClient) { }

  public activatePanicBack(rideId:number, reason:string){
    const panic:ActivatePanic={"reason":reason};
    console.log("zove bek");
    return this.http.put<Ride>(environment.apiHost +"ride/"+ rideId+"/panic", panic);
  }
  public sendPanicToParent(reason:string)
  {
    this.panic$.next(reason);
  }
}
