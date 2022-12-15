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
  selectedFinal$ = this.start$.asObservable();

  setStart(start: any) {
    this.start$.next(start);
  }
  setFinal(final: any) {
    this.final$.next(final);
  }

  public driverNavbar= false;
  public unregisteredUserNavbar=true;
  constructor(private http: HttpClient) { }

  public setRoute(start: string, final: string){
    this.setStart(start);
    this.setFinal(final);
  }
}
