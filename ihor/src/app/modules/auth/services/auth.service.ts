import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Login} from '../components/login/login.component';
import {Token} from "../model/token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ = new BehaviorSubject("UNREGISTERED_USER");
  userState$ = this.user$.asObservable();

  constructor(private http: HttpClient) {}

  login(auth: Login): Observable<Token> {
    return this.http.post<Token>(environment.apiHost + "user/login",
    {
      email: auth.email,
      password: auth.password
    })
  }

  logout(email: string, password: string): Observable<Token> {
    return this.http.post<Token>(environment.apiHost + "user/logout",
    {
      email: email,
      password: password
    })
  }

  setUser(): void {
    this.user$.next(this.getRole());
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
