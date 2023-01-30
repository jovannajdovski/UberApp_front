import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Token} from "../model/token";
import {Credentials} from "../model/credentials";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  defaultRole = "UNREGISTERED";
  user$ = new BehaviorSubject(this.defaultRole);
  userState$ = this.user$.asObservable();

  constructor(private http: HttpClient) {}

  login(auth: Credentials): Observable<Token> {
    return this.http.post<Token>(environment.apiHost + "user/login",
      {
        email: auth.email,
        password: auth.password
      })
  }

  logout(): Observable<string> {
    return this.http.get(environment.apiHost + "user/logout", {responseType: 'text'});
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }

  setDefaultRole(): void {
    this.user$.next(this.defaultRole);
  }

  getRole(): any {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      const role = helper.decodeToken(accessToken).role;
      return role.split("_")[1];
    }

    return null;
  }

  getId(): any {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken).jti;
    }

    return null;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }
}
