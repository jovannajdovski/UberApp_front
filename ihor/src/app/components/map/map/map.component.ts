import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine'
import { MarkerService } from 'src/app/services/map/marker.service';
import { ShapeService } from 'src/app/services/map/shape.service';
import { MapService } from 'src/app/services/map/map.service';
import { RouteService } from 'src/app/services/route/route.service';


let greenIcon = L.icon({
  iconUrl: '/assets/images/freecar.png',
  shadowUrl: 'assets/marker-shadow.png',

  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

let redIcon = L.icon({
  iconUrl: '/assets/images/car.png',
  shadowUrl: 'assets/marker-shadow.png',

  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;



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
    ) {}

  private map: any;
  private states:any;

  
  private long1=0;
  private long2=0;
  private lat1=0;
  private lat2=0;
  private res: any;

  ngOnInit(): void {
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 45.2396, 19.8227 ],
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

  // private highlightFeature(e:any) {
  //   const layer = e.target;
  
  //   layer.setStyle({
  //     weight: 10,
  //     opacity: 1.0,
  //     color: '#DFA612',
  //     fillOpacity: 1.0,
  //     fillColor: '#FAE042'
  //   });
  // }
  
  // private resetFeature(e:any) {
  //   const layer = e.target;
  
  //   layer.setStyle({
  //     weight: 3,
  //     opacity: 0.5,
  //     color: '#008f68',
  //     fillOpacity: 0.8,
  //     fillColor: '#6DB65B'
  //   });
  // }

  // private initStatesLayer() {
  //   const stateLayer = L.geoJSON(this.states, {
  //     style: (feature) => ({
  //       weight: 3,
  //       opacity: 0.5,
  //       color: '#008f68',
  //       fillOpacity: 0.8,
  //       fillColor: '#6DB65B'
  //     }),
  //     onEachFeature: (feature, layer) => (
  //       layer.on({
  //         mouseover: (e) => (this.highlightFeature(e)),
  //         mouseout: (e) => (this.resetFeature(e)),
  //       })
  //     )
  //   });

  //   this.map.addLayer(stateLayer);
  //   stateLayer.bringToBack();
  // }
  
  search(): void {
    this.mapService.search('Strazilovska 19').subscribe({
      next: (result) => {
        console.log(result);
        L.marker([result[0].lat, result[0].lon])
          .addTo(this.map)
          .bindPopup('Pozdrav iz Strazilovske 19.')
          .openPopup();
      },
      error: () => {},
    });
  }

  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      this.mapService.reverseSearch(lat, lng).subscribe((res) => {
        console.log(res.display_name);
      });
      const mp = new L.Marker([lat, lng]).addTo(this.map);
    });
  }

  ngAfterViewInit(): void {
    this.initMap(); 
    this.markerService.makeVehicleMarkers(this.map, redIcon);
    if(this.routeService.mapOpensCount>0)
    {
      this.routeService.selectedStart$.subscribe((value) => {
        this.res = this.mapService.search(value);
        this.long1=this.res[0].lon;
        this.lat1=this.res[0].lat;
      });
      this.routeService.selectedFinal$.subscribe((value) => {
        this.res = this.mapService.search(value);
        this.long2=this.res[0].lon;
        this.lat2=this.res[0].lat;
        this.route();
      });
    }
    else this.routeService.mapOpensCount=1;
    
  }

  route(): void {
    L.Routing.control({
      router: L.Routing.osrmv1({
          serviceUrl: `http://router.project-osrm.org/route/v1/`
      }),
      showAlternatives: true,
      lineOptions: {
        styles: [{color: '#242c81', weight: 7}],
        extendToWaypoints:false,
        missingRouteTolerance:0},
      fitSelectedRoutes: false,
      altLineOptions: {
        styles: [{color: '#ed6852', weight: 7}],
        extendToWaypoints:false,
        missingRouteTolerance:0},
      show: true,
      routeWhileDragging: false,
      waypoints: [
          L.latLng(this.lat1, this.long1),
          L.latLng(this.lat2, this.long2)
      ]
    }).addTo(this.map);
  }

  


}
