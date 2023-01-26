import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private offers = false;
  private startFromOffers = "";
  private finalFromOffers = "";

  public getOffers(){
    return this.offers;
  }

  public getStartFromOffers(){
    return this.startFromOffers;
  }

  public getFinalFromOffers(){
    return this.finalFromOffers;
  }

  public setOffers(offer:boolean){
    this.offers = offer;
  }

  public setStartFromOffers(start:string){
    this.startFromOffers = start;
  }

  public setFinalFromOffers(final:string){
    this.finalFromOffers = final;
  }

  private start$ = new BehaviorSubject<any>({});
  selectedStart$ = this.start$.asObservable();

  private final$ = new BehaviorSubject<any>({});
  selectedFinal$ = this.final$.asObservable();

  private startPoint$ = new BehaviorSubject<any>({});
  selectedStartPoint$ = this.startPoint$.asObservable();

  private finalPoint$ = new BehaviorSubject<any>({});
  selectedFinalPoint$ = this.finalPoint$.asObservable();

  private route$ = new BehaviorSubject<any>({});
  selectedRoute$ = this.route$.asObservable();

  private estimatedRoutes$ = new BehaviorSubject<any>({});
  selectedEstimatedRoutes$ = this.estimatedRoutes$.asObservable();

  private routeSelect$ = new BehaviorSubject<any>({});
  selectedRouteSelect$ = this.routeSelect$.asObservable();

  setStart(start: any) {
    this.start$.next(start);
  }
  setFinal(final: any) {
    this.final$.next(final);
  }

  setStartPoint(start: any) {
    console.log("set start");
    this.startPoint$.next(start);
  }
  setFinalPoint(final: any) {
    console.log("set final");
    this.finalPoint$.next(final);
  }

  setEstimatedRoutes(routes: any) {
    this.estimatedRoutes$.next(routes);
  }

  setRouteSelect(route: any) {
    this.routeSelect$.next(route);
  }
  
  constructor(private http: HttpClient) {this.route$.next(0);}

  public setRoute(start: string, final: string){
    this.setStart(start);
    this.setFinal(final);
    this.route$.next(1);
  }
  public setRoutePassenger(start: string, final: string){
    this.setStart(start);
    this.setFinal(final);
    this.route$.next(2);
  }
  public resetRoute(){
    this.start$ = new BehaviorSubject<any>({});
    this.selectedStart$ = this.start$.asObservable();

  this.final$ = new BehaviorSubject<any>({});
  this.selectedFinal$ = this.final$.asObservable();

  this.startPoint$ = new BehaviorSubject<any>({});
  this.selectedStartPoint$ = this.startPoint$.asObservable();

  this. finalPoint$ = new BehaviorSubject<any>({});
  this.selectedFinalPoint$ = this.finalPoint$.asObservable();

  }
}
