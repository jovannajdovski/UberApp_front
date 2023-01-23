import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderRideService {
  private additionals$ = new BehaviorSubject<any>({});
  additionalsChoosed$ = this.additionals$.asObservable();
  constructor() {
    this.additionals$.next(false);
   }

  public setAdditionals(vehicleType: number, babiesAllowed: boolean, petsAllowed: boolean){
    console.log("setovao");
    console.log(vehicleType);
    this.additionals$.next(true);
  }
}
