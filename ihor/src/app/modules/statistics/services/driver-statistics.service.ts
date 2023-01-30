import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {Observable} from "rxjs";
import {RideCountStatistics} from "../model/RideCountStatistics";
import {environment} from "../../../../environments/environment";
import {RideDistanceStatistics} from "../model/RideDistanceStatistics";

@Injectable({
  providedIn: 'root'
})
export class DriverStatisticsService {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}


  getRideCountStatistics(id: number, from: Date, to: Date): Observable<RideCountStatistics> {
    const fromString = this.datePipe.transform(from, 'yyyy-MM-ddThh:mm:ss');
    const toString = this.datePipe.transform(to, 'yyyy-MM-ddThh:mm:ss');
    return this.http.get<RideCountStatistics>(environment.apiHost + "driver/" + id.toString() +
      "/ride-count?from=" + fromString + "&to=" + toString)
  }

  getRideDistanceStatistics(id: number, from: Date, to: Date): Observable<RideDistanceStatistics> {
    const fromString = this.datePipe.transform(from, 'yyyy-MM-ddThh:mm:ss');
    const toString = this.datePipe.transform(to, 'yyyy-MM-ddThh:mm:ss');
    return this.http.get<RideDistanceStatistics>(environment.apiHost + "driver/" + id.toString() +
      "/distance?from=" + fromString + "&to=" + toString)
  }
}