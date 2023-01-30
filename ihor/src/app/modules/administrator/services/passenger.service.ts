import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PageRequest} from "../model/PageRequest";
import {Observable} from "rxjs";
import {PassengersPageResponse} from "../model/PassengersPageResponse";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  constructor(private http: HttpClient) {}

  getAll(request: PageRequest): Observable<PassengersPageResponse> {
    return this.http.get<PassengersPageResponse>(environment.apiHost + 'passenger', {
      params: {
        page: request.page,
        size: request.size
      }
    });
  }
}
