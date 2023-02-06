import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {
  FullReviewDTO,
  ReviewDTO,
  ReviewRequestDTO,
  ReviewsForRideDTO,
  RideNoStatusDTO,
  RidePageListDTO
} from '../../model/RidePageListDTO';

@Injectable({
  providedIn: 'root'
})
export class RideHistoryService {

  constructor(private http: HttpClient) {
  }

  private driver$ = new BehaviorSubject<number | null>(null);
  selectedDriver$ = this.driver$.asObservable();

  setDriver(driver: number) {
    this.driver$.next(driver);
  }

  private isDriver!: number;

  setIsDriver(value: number) {
    this.isDriver = value;
  }

  getIsDriver() {
    return this.isDriver;
  }

  private settedRide!: RideNoStatusDTO;
  private settedReviews!: ReviewsForRideDTO;

  public getSettedRide() {
    return this.settedRide;
  }

  public getSettedReview() {
    return this.settedReviews;
  }

  public setSettedRide(value: RideNoStatusDTO) {
    this.settedRide = value;
  }

  public setSettedReview(value: ReviewsForRideDTO) {
    this.settedReviews = value;
  }

  private estimatedRoutes$ = new BehaviorSubject<any>({});
  selectedEstimatedRoutes$ = this.estimatedRoutes$.asObservable();

  setEstimatedRoutes(routes: any) {
    this.estimatedRoutes$.next(routes);
  }


  private lon1!: number;
  private lat1!: number;
  private lon2!: number;
  private lat2!: number;

  setDrawRoute(lon1: number, lon2: number, lat1: number, lat2: number) {
    this.lon1 = lon1;
    this.lon2 = lon2;
    this.lat1 = lat1;
    this.lat2 = lat2;
  }

  getLon1() {
    return this.lon1;
  }

  getLon2() {
    return this.lon2;
  }

  getLat1() {
    return this.lat1;
  }

  getLat2() {
    return this.lat2;
  }

  getPassengerFinishedRides(id: number, page: number, size: number, sort: string): Observable<RidePageListDTO> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page", page);
    queryParams = queryParams.append("size", size);
    queryParams = queryParams.append("sort", sort);
    return this.http.get<RidePageListDTO>(environment.apiHost + 'passenger/' + id + "/ride/finished", {params: queryParams});
  }

  getDriverFinishedRides(id: number, page: number, size: number, sort: string): Observable<RidePageListDTO> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page", page);
    queryParams = queryParams.append("size", size);
    queryParams = queryParams.append("sort", sort);
    return this.http.get<RidePageListDTO>(environment.apiHost + 'driver/' + id + "/ride/finished", {params: queryParams});
  }

  getAdminFinishedRides(page: number, size: number, sort: string): Observable<RidePageListDTO> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page", page);
    queryParams = queryParams.append("size", size);
    queryParams = queryParams.append("sort", sort);
    return this.http.get<RidePageListDTO>(environment.apiHost + "admin/ride/finished", {params: queryParams});
  }

  getReviewsForMultipleRide(idRides: number[]): Observable<ReviewsForRideDTO[]> {
    return this.http.post<ReviewsForRideDTO[]>(environment.apiHost + "review/rides", idRides);
  }

  leaveReviewForVehicle(rideId: number, reviewRequestDTO: ReviewRequestDTO): Observable<ReviewDTO> {
    return this.http.post<ReviewDTO>(environment.apiHost + "review/" + rideId + "/vehicle", reviewRequestDTO);
  }

  leaveReviewForDriver(rideId: number, reviewRequestDTO: ReviewRequestDTO): Observable<ReviewDTO> {
    return this.http.post<ReviewDTO>(environment.apiHost + "review/" + rideId + "/driver", reviewRequestDTO);
  }
}
