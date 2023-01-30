import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  block(id: number): Observable<string> {
    return this.http.put<string>(environment.apiHost + 'user/' + id.toString() + "/block", {responseType: 'text'});
  }

  unblock(id: number): Observable<string> {
    return this.http.put<string>(environment.apiHost + 'user/' + id.toString() + "/unblock", {responseType: 'text'});
  }
}
