import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });
  
  user$ = new BehaviorSubject("UNREGISTERED_USER");
  userState$ = this.user$.asObservable();

  constructor(private http: HttpClient) {}
  
  login(auth: Login): Observable<Token> {
    return this.http.post<Token>(environment.apiHost + "user/login",
    {
      email: auth.email, 
      password: auth.password
    },{"headers": this.headers})
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
      console.log(helper.decodeToken(accessToken));
      const role = helper.decodeToken(accessToken).role;
      return String(role).substring(5);
    }
    
    return null;
  }

  getId(): any {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      const id = helper.decodeToken(accessToken).jti;
      return id;
    }
    
    return null;
  }
  getEmail(): any{
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      const email = helper.decodeToken(accessToken).sub;
      return email;
    }
    
    return null;
  }
  isLoggedIn(): boolean {
    if (localStorage.getItem('user') != null)
      return true;

    return false;
  }
}

interface Token{
  accessToken: string;
  refreshToken: string;
}