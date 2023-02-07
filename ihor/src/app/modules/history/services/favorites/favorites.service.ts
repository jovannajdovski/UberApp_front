import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {CreateFavoriteDTO, FavoriteFullDTO, FavoriteRouteForPassengerDTO} from '../../model/FavoriteDTO';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http: HttpClient) {
  }


  isRideFavorite(from: string, to: string): Observable<FavoriteRouteForPassengerDTO> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("from", from);
    queryParams = queryParams.append("to", to);
    return this.http.get<FavoriteRouteForPassengerDTO>(environment.apiHost + "ride/favorites/passenger/ride", {params: queryParams});
  }

  createFavorite(createFavoriteDTO: CreateFavoriteDTO): Observable<FavoriteFullDTO> {
    return this.http.post<FavoriteFullDTO>(environment.apiHost + "ride/favorites", createFavoriteDTO);
  }

  deleteFavorite(id: number): Observable<Response> {
    return this.http.delete<Response>(environment.apiHost + "ride/favorites/" + id);
  }
}
