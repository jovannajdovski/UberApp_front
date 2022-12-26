import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../components/login/login.component';

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
      console.log(helper.decodeToken(accessToken));
      const role = helper.decodeToken(accessToken).role;
      return role;
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
  jwt: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}