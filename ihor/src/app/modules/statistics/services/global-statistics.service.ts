import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {RideCountStatistics} from "../model/RideCountStatistics";
import {DatePipe} from "@angular/common";
import {RideDistanceStatistics} from "../model/RideDistanceStatistics";

@Injectable({
  providedIn: 'root'
})
export class GlobalStatisticsService {

  constructor(private http: HttpClient, private datePipe: DatePipe) {}


  getRideCountStatistics(from: Date, to: Date): Observable<RideCountStatistics> {
    const fromString = this.datePipe.transform(from, 'yyyy-MM-ddThh:mm:ss');
    const toString = this.datePipe.transform(to, 'yyyy-MM-ddThh:mm:ss');
    return this.http.get<RideCountStatistics>(environment.apiHost + "admin/ride-count?from=" + fromString
      + "&to=" + toString)
  }

  getRideDistanceStatistics(from: Date, to: Date): Observable<RideDistanceStatistics> {
    const fromString = this.datePipe.transform(from, 'yyyy-MM-ddThh:mm:ss');
    const toString = this.datePipe.transform(to, 'yyyy-MM-ddThh:mm:ss');
    return this.http.get<RideDistanceStatistics>(environment.apiHost + "admin/distance?from=" + fromString
      + "&to=" + toString)
  }
}
