import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {Observable} from "rxjs";
import {RideCountStatistics} from "../model/RideCountStatistics";
import {environment} from "../../../../environments/environment";
import {RideDistanceStatistics} from "../model/RideDistanceStatistics";
import {MoneySpentStatistics} from "../model/MoneySpentStatistics";

@Injectable({
  providedIn: 'root'
})
export class PassengerStatisticsService {
  constructor(private http: HttpClient, private datePipe: DatePipe) {
  }


  getRideCountStatistics(id: number, from: Date, to: Date): Observable<RideCountStatistics> {
    let fromString = this.datePipe.transform(from, 'yyyy-MM-dd') ?? new Date().toString();
    let toString = this.datePipe.transform(to, 'yyyy-MM-dd') ?? new Date().toString();
    fromString = fromString + "T00:00:00"
    toString = toString + "T23:59:59"

    return this.http.get<RideCountStatistics>(environment.apiHost + "passenger/" + id.toString() + "/ride-count",
      {
        params: {
          from: fromString,
          to: toString
        }
      })
  }

  getRideDistanceStatistics(id: number, from: Date, to: Date): Observable<RideDistanceStatistics> {
    let fromString = this.datePipe.transform(from, 'yyyy-MM-dd') ?? new Date().toString();
    let toString = this.datePipe.transform(to, 'yyyy-MM-dd') ?? new Date().toString();
    fromString = fromString + "T00:00:00"
    toString = toString + "T23:59:59"

    return this.http.get<RideDistanceStatistics>(environment.apiHost + "passenger/" + id.toString() + "/distance",
      {
        params: {
          from: fromString,
          to: toString
        }
      })
  }

  getMoneySpentStatistics(id: number, from: Date, to: Date): Observable<MoneySpentStatistics> {
    let fromString = this.datePipe.transform(from, 'yyyy-MM-dd') ?? new Date().toString();
    let toString = this.datePipe.transform(to, 'yyyy-MM-dd') ?? new Date().toString();
    fromString = fromString + "T00:00:00"
    toString = toString + "T23:59:59"

    return this.http.get<MoneySpentStatistics>(environment.apiHost + "passenger/" + id.toString() + "/money-spent",
      {
        params: {
          from: fromString,
          to: toString
        }
      })
  }
}
