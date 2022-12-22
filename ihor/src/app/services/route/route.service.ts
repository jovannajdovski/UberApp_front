import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
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
  constructor(private http: HttpClient) {this.route$.next(false);}

  public setRoute(start: string, final: string){
    this.setStart(start);
    this.setFinal(final);
    this.route$.next(true);
  }
}
