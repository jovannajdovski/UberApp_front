import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as L from 'leaflet';
import {PopupService} from './popup.service';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  vehicles = '/assets/data/vehicles.json';

  private markers: Array<L.Marker>;

  constructor(private http: HttpClient,
              private popupService: PopupService) {
    this.markers = new Array<L.Marker>;
  }

  getVehicleCoord(): Observable<string> {
    return this.http.get(environment.apiHost + 'driver/vehicle', {
      responseType: 'text',
    });
  }

  getActiveDrivers(): Observable<ActiverDriversListDTO> {
    return this.http.get<ActiverDriversListDTO>(environment.apiHost + 'driver/active-drivers', {"headers": this.headers});
  }

  makeVehicleMarkers(map: L.Map, redIcon: L.Icon, greenIcon: L.Icon): void {
    this.getActiveDrivers().subscribe({
      next: (result) => {
        for (const v of result.results) {
          const lon = v.location.longitude;
          const lat = v.location.latitude;
          let marker;
          if (v.free) {
            marker = L.marker([lat, lon], {icon: greenIcon});
          } else {
            marker = L.marker([lat, lon], {icon: redIcon});
          }
          marker.bindPopup(this.popupService.makeVehiclePopup(v));
          marker.addTo(map);
          this.markers.push(marker);
        }
      },
      error: (error) => {
      },
    });

    // mokap
    // this.http.get(this.vehicles).subscribe((res: any) => {
    //   for (const v of res.vehicles) {
    //     const lon = v.currentLocation.longitude;
    //     const lat = v.currentLocation.latitude;
    //     const marker = L.marker([lat, lon],{icon: redIcon});
    //     marker.bindPopup(this.popupService.makeVehiclePopup(v));
    //     marker.addTo(map);
    //     this.markers.push(marker);
    //   }
    // });
  }

  removeMarkers(map: L.Map) {
    this.markers.forEach(function (marker) {
      map.removeLayer(marker);
    });
  }

  static scaledRadius(val: number, maxVal: number): number {
    return 20 * (val / maxVal);
  }
}

export interface ActiverDriversListDTO {
  totalCount: number,
  results: {
    vehicle: {
      vehicleType: string,
      model: string,
      licenseNumber: string
    },
    location: {
      address: string,
      latitude: number,
      longitude: number
    },
    free: boolean
  }[]
}
