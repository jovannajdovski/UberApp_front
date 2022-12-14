import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { PopupService } from './popup.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MapComponent } from 'src/app/components/map/map/map.component';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  vehicles: string = '/assets/data/vehicles.json';

  constructor(private http: HttpClient,
    private popupService: PopupService) { }

  getVehicleCoord(): Observable<string> {
    return this.http.get(environment.apiHost + 'driver/vehicle', {
      responseType: 'text',
    });
  }

  makeVehicleMarkers(map: L.Map, redIcon: L.Icon): void { 
    this.getVehicleCoord().subscribe({
      next: (result) => {
        for (const v of JSON.parse(result).vehicles) {
          const lon = v.currentLocation.longitude;
          const lat = v.currentLocation.latitude;
          const marker = L.marker([lat, lon], {icon: redIcon});
          marker.bindPopup(this.popupService.makeVehiclePopup(v));
          marker.addTo(map);
        }
      },
      error: (error) => {},
    });

    // mokap
    this.http.get(this.vehicles).subscribe((res: any) => {
      for (const v of res.vehicles) {
        const lon = v.currentLocation.longitude;
        const lat = v.currentLocation.latitude;
        const marker = L.marker([lat, lon],{icon: redIcon});
        marker.bindPopup(this.popupService.makeVehiclePopup(v));
        marker.addTo(map);
      }
    });
  }

  static scaledRadius(val: number, maxVal: number): number {
    return 20 * (val / maxVal);
  }

  makeCapitalCircleMarkers(map: L.Map): void {
    this.http.get(this.vehicles).subscribe((res: any) => {

      const maxPop = Math.max(...res.features.map( (x:any) => x.properties.population), 0);

      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];

        const circle = L.circleMarker([lat, lon], {
          radius: MarkerService.scaledRadius(c.properties.population, maxPop)
        });

        circle.bindPopup(this.popupService.makeCapitalPopup(c.properties));
        
        circle.addTo(map)
      }
    });
  }
}
