import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { RideHistoryService } from 'src/app/modules/history/services/ride-history/ride-history.service';
import { Location } from 'src/app/modules/passenger/model/ride';
import { CurrentRideService } from '../../services/current-ride/current-ride.service';

const yellowPin = L.icon({
  iconUrl: '/assets/images/yellowpin.png',
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

L.Marker.prototype.options.icon = yellowPin;
@Component({
  selector: 'app-current-ride-map',
  templateUrl: './current-ride-map.component.html',
  styleUrls: ['./current-ride-map.component.css']
})
export class CurrentRideMapComponent implements OnInit, AfterViewInit{
  
  constructor(private currentRideService: CurrentRideService) 
    {
      
      
    }

    ngOnInit(){
      this.currentRideService.currentRideGot$.subscribe((value)=>
      {
        this.long1 = value.locations[0].departure.longitude;
        this.long2 = value.locations[0].destination.longitude;
        this.lat1 = value.locations[0].departure.latitude;
        this.lat2 = value.locations[0].destination.latitude;
        this.currentLocation={"address":"","latitude":this.lat1,"longitude":this.long1};
        
      }
      );
      this.currentRideService.currentLocationChanged$.subscribe((value)=>
      {
        if(this.marker)
          this.removeMarker();
        this.currentLocation=value;
        this.addMarker();
      })
    }
  
    private map!: L.Map;
  
    private long1 = 0;
    private long2 = 0;
    private lat1 = 0;
    private lat2 = 0;
    private currentLocation!:Location;
    private waypointsNoDrag!: L.LatLng[];
    private marker!: L.Marker;
  
    ngAfterViewInit(){
      this.initMap();
      this.drawRoute();
    }
  
    private initMap(): void {
      this.map = L.map('map', {
        center: [this.lat1, this.long1],
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
  
    drawRoute(): void {
  
      this.waypointsNoDrag = [
        L.latLng(this.lat1, this.long1),
        L.latLng(this.lat2, this.long2)
      ];    
  
      const route = L.Routing.control({
        router: L.Routing.osrmv1({
          serviceUrl: `http://router.project-osrm.org/route/v1/`
        }),
        showAlternatives: false,
        lineOptions: {
          styles: [{ color: '#fff821', weight: 7 }],
          extendToWaypoints: false,
          missingRouteTolerance: 0,
          addWaypoints: false,
        },
        fitSelectedRoutes: true,
        show: false,
        routeWhileDragging: false,
        waypoints: this.waypointsNoDrag,
        plan: L.Routing.plan(this.waypointsNoDrag, {
          createMarker: function (i, wp) {
            return L.marker(wp.latLng, {
              draggable: false
            });
          }
        }),
  
      }).addTo(this.map);
  
  
  
      route.on('routeselected', (e) => {
        console.log("route selected");
        const r = e.route;
        const line = L.Routing.line(r);
        const bounds = line.getBounds();
        this.map.fitBounds(bounds);
      });
  
      // route.on('routesfound', (e) => {
      //   const r = e.route;
      //   const line = L.Routing.line(r);
      //   const bounds = line.getBounds();
      //   this.map.fitBounds(bounds);
      // });
  
    }
    private addMarker()
    {
      const lon = this.currentLocation.longitude;
      const lat = this.currentLocation.latitude;
      this.marker = L.marker([lat, lon], {icon: redIcon});
      //marker.bindPopup(this.popupService.makeVehiclePopup(v));
      this.marker.addTo(this.map);
    }
    private removeMarker()
    {
      this.map.removeLayer(this.marker);
    }
}
