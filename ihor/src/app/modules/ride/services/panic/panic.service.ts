import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Panic } from 'src/app/modules/communication/model/panic';
import { RideNoStatusDTO } from 'src/app/modules/history/model/RidePageListDTO';
import { ActivatePanic, Ride, UserForRide } from 'src/app/modules/passenger/model/ride';
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
  public getPanicForAdmin():Observable<{"totalCount": number, "results":Panic[]}>{
    return this.http.get<{"totalCount": number, "results":Panic[]}>(environment.apiHost+"panic");
  }
  getWithStatus(rideNoStatus:RideNoStatusDTO):Ride{
    let vehicleType=0;
    const passengerList:UserForRide[]=[];
    console.log(rideNoStatus.passengers);
    rideNoStatus.passengers.forEach(function(item,index){
      passengerList.push({"id":item.id, "email":item.email})
    })
    if(rideNoStatus.vehicleType=="LUXURY") vehicleType=1;
    if(rideNoStatus.vehicleType=="VAN") vehicleType=2;
    const ride:Ride={babyTransport:rideNoStatus.babyTransport,driver:rideNoStatus.driver, endTime:rideNoStatus.endTime,
                estimatedTimeInMinutes:rideNoStatus.estimatedTimeInMinutes, id:rideNoStatus.id,
                locations:[{departure:rideNoStatus.locations[0].departure,destination:rideNoStatus.locations[0].destination}],
                passengers:passengerList, petTransport:rideNoStatus.petTransport,rejection:rideNoStatus.rejection,
                scheduledTime:rideNoStatus.scheduledTime, startTime:rideNoStatus.startTime,status:"FINISHED",totalCost:rideNoStatus.totalCost,
                vehicleType:vehicleType};
    return ride;
  }
}
