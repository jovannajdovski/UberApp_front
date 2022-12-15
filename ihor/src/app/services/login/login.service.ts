import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private user$ = new BehaviorSubject<any>({});
  selectedUser$ = this.user$.asObservable();
  constructor(private http: HttpClient) { }
  
  getUser(email: string, password: string): Observable<Tokens> {
    console.log("2");
    this.user$.next('driver');
    return this.http.post<Tokens>(environment.apiHost+"user/login",{email: email, password: password})
  }
}

interface Tokens{
  accessToken: string;
  refreshToken: string;
}

