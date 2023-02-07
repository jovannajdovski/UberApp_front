import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {FavoriteRoute} from "../model/FavoriteRoute";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FavoriteRouteService {

  constructor(private http: HttpClient) {
  }


  getFavoriteRoutes(id: number): Observable<FavoriteRoute[]> {
    return this.http.get<FavoriteRoute[]>(environment.apiHost + 'ride/favorites/' + id.toString());
  }

  deleteFavoriteRoute(id: number): Observable<string> {
    return this.http.delete<string>(environment.apiHost + 'ride/favorites/' + id.toString());
  }
}
