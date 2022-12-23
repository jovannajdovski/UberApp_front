import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine'
import { MarkerService } from 'src/app/modules/map/services/map/marker.service';
import { ShapeService } from 'src/app/modules/map/services/map/shape.service';
import { MapService } from 'src/app/modules/map/services/map/map.service';
import { Observable } from 'rxjs';
import { RouteService } from '../../../services/route/route.service';


const greenIcon = L.icon({
  iconUrl: '/assets/images/freecar.png',
  shadowUrl: 'assets/marker-shadow.png',

  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const redIcon = L.icon({
  iconUrl: '/assets/images/car.png',
  shadowUrl: 'assets/marker-shadow.png',

  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const yellowPin = L.icon({
  iconUrl: '/assets/images/yellowpin.png',
  shadowUrl: 'assets/marker-shadow.png',

  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = yellowPin;

let startMarker = {};
let endMarker = {};

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  constructor(
    private routeService: RouteService,
    private mapService: MapService,
    private markerService: MarkerService,
    private shapeService: ShapeService
  ) { }

  private map: any;
  private states: any;


  private long1 = 0;
  private long2 = 0;
  private lat1 = 0;
  private lat2 = 0;
  private res: any;

  ngOnInit(): void {
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [45.2396, 19.8227],
      zoom: 13
    });

    //  'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
    // 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
    // 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

    L.tileLayer('https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      accessToken: 'ViWWufyTz3GypqR5Lg8rayDBjSp8dXJIjWFSOSAQbe700bvDrkOhJ0LgGpwAR3bs'
    }).addTo(this.map);


  }


  search(): void {
    this.mapService.search('Strazilovska 19').subscribe({
      next: (result) => {
        console.log(result);
        L.marker([result[0].lat, result[0].lon])
          .addTo(this.map)
          .bindPopup('Pozdrav iz Strazilovske 19.')
          .openPopup();
      },
      error: () => { },
    });
  }

  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      if (startMarker != undefined || endMarker != undefined) {
        this.markerService.removeMarkers(this.map);
        const coord = e.latlng;
        const lat = coord.lat;
        const lng = coord.lng;
        // this.mapService.reverseSearch(lat, lng).subscribe((res) => {
        //   console.log(res.display_name);
        // });
        
        if (Object.keys(startMarker).length === 0) {
          startMarker = L.marker([lat, lng],{draggable:true}).addTo(this.map);
          this.routeService.setStartPoint({lat:lat, lon:lng});
          return;
        }
        if (Object.keys(endMarker).length === 0) {
          endMarker = L.marker([lat, lng],{draggable:true}).addTo(this.map);
          this.routeService.setFinalPoint({lat:lat, lon:lng});
          return;
        }
      }

    });

  }



  removePointMarkers(){
    if (Object.keys(startMarker).length !== 0) {
      this.map.removeLayer(startMarker);
    }
    if (Object.keys(endMarker).length !== 0) {
      this.map.removeLayer(endMarker);
    }
    
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeVehicleMarkers(this.map, redIcon);

    this.registerOnClick();
    this.findRoute();
  }


  findRoute(): void {
    this.routeService.selectedStart$.subscribe((value) => {
      this.mapService.search(value).subscribe({
        next: (result) => {
          this.long1 = result[0].lon;
          this.lat1 = result[0].lat;
        }
      });

    });
    this.routeService.selectedFinal$.subscribe((value) => {
      this.mapService.search(value).subscribe({
        next: (result) => {
          this.long2 = result[0].lon;
          this.lat2 = result[0].lat;
          this.drawRoute();
        }
      })
    });
  }

  drawRoute(): void {
    this.markerService.removeMarkers(this.map);
    this.removePointMarkers();
    const route = L.Routing.control({
      router: L.Routing.osrmv1({
        serviceUrl: `http://router.project-osrm.org/route/v1/`
      }),
      showAlternatives: true,
      lineOptions: {
        styles: [{ color: '#fff821', weight: 7 }],
        extendToWaypoints: false,
        missingRouteTolerance: 0,
        addWaypoints:false
      },
      fitSelectedRoutes: false,
      altLineOptions: {
        styles: [{ color: '#949494', weight: 7 }],
        extendToWaypoints: false,
        missingRouteTolerance: 0
      },
      show: true,
      routeWhileDragging: false,
      waypoints: [
        L.latLng(this.lat1, this.long1),
        L.latLng(this.lat2, this.long2)
      ]
    }).addTo(this.map);

    route.on('routeselected', (e) => {
      const r = e.route;
      const line = L.Routing.line(r);
      const bounds = line.getBounds();
      this.map.fitBounds(bounds);
  });
  }




}
