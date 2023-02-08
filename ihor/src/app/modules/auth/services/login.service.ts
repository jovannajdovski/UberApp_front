import { Injectable } from '@angular/core';
import {Credentials} from "../model/credentials";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Token} from "../model/token";
import {environment} from "../../../../environments/environment";
import {WorkTimeService} from "../../driver/services/work-time/work-time.service";
import {Router} from "@angular/router";
import {RouteService} from "../../map/services/route/route.service";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });
  private hasError=new BehaviorSubject<boolean>(false);
  hasErrorObs=this.hasError.asObservable();
  constructor(private http: HttpClient,private authService: AuthService,private workTimeService:WorkTimeService, private router:Router, private  routeService:RouteService) { }

  loginUserObs(login:Credentials):any{
    this.login(login).subscribe({
      next: (result) => {
        localStorage.setItem('user', JSON.stringify(result.accessToken));
        this.authService.setUser();

        if (this.authService.getRole() == "DRIVER") {
          this.workTimeService.startShift();
          this.router.navigate(['/driver']);
        } else if (this.authService.getRole() == "ADMINISTRATOR") {
          this.router.navigate(['/administrator']);
        } else if (this.authService.getRole() == "PASSENGER") {
          this.routeService.resetRoute();
          this.router.navigate(['/passenger']);
        }
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.hasError.next(true);
        }
      },
    });
  }
  login(auth: Credentials): Observable<Token> {
    return this.http.post<Token>(environment.apiHost + "user/login",
      {
        email: auth.email,
        password: auth.password
      }, {"headers": this.headers})
  }
}
