import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) {
  }

  search(street: string): Observable<any> {
    return this.http.get(
      'https://nominatim.openstreetmap.org/search?format=json&q=' + street
    );
  }

  reverseSearch(lat: number, lon: number): Observable<any> {
    return this.http.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&<params>`
    );
  }


  autocomplete(address: string): Observable<any> {
    const urlBase = 'https://nominatim.openstreetmap.org/search?';
    const params = {
      q: address,
      format: 'json',
      countrycodes: 'rs'
    }

    const queryString = new URLSearchParams(params).toString();
    return this.http.get(`${urlBase}${queryString}`
    );
  }
}
