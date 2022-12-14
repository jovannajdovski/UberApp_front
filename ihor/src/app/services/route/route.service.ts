import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private route: {start: string, final: string}={start:'', final:''};
  public driverNavbar= false;
  public unregisteredUserNavbar=true;
  constructor(private http: HttpClient) { }

  public getRoute(): {start: string, final: string}{
    return this.route;
  }
  public setRoute(start: string, final: string){
    this.route.start=start;
    this.route.final=final;
  }
}
