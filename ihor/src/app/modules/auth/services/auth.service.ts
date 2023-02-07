import {HttpClient, HttpHeaders} from '@angular/common/http';
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
  defaultRole = "UNREGISTERED_USER";
  user$ = new BehaviorSubject(this.defaultRole);
  userState$ = this.user$.asObservable();

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  constructor(private http: HttpClient) {}

  login(auth: Credentials): Observable<Token> {
    return this.http.post<Token>(environment.apiHost + "user/login",
      {
        email: auth.email,
        password: auth.password
      }, {"headers": this.headers})
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

  getRole(): string {
    if (this.isLoggedIn()) {
      const accessToken: string | null = localStorage.getItem('user');
      if (!accessToken)
        return "UNREGISTERED_USER";
      const helper = new JwtHelperService();
      const role = helper.decodeToken(accessToken).role;
      return role.split("_")[1];
    }

    return "UNREGISTERED_USER";
  }

  getId(): number {
    if (this.isLoggedIn()) {
      const accessToken: string | null = localStorage.getItem('user');
      if (!accessToken)
        return 0;
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken).jti;
    }
    return 0;
  }

  getEmail(): string {
    if (this.isLoggedIn()) {
      const accessToken: string | null = localStorage.getItem('user');
      if (!accessToken)
        return "";
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken).sub;
    }

    return "";
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }
}
