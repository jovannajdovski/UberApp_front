import { Component, Input } from '@angular/core';
import { RouteService } from '../../services/route/route.service';
@Component({
  selector: 'app-estimated-routes',
  templateUrl: './estimated-routes.component.html',
  styleUrls: ['./estimated-routes.component.css']
})

export class EstimatedRoutesComponent {
    public addressStart="";
    public addressEnd="";

    public estimatedRoutes: { name: string, time: string, distance : string }[]

    constructor(private routeService:RouteService){
      this.estimatedRoutes= [];
      this.routeService.selectedStart$.subscribe((value) => {
        this.addressStart=value
      });
      this.routeService.selectedFinal$.subscribe((value) => {
        this.addressEnd=value;
      });

      this.routeService.selectedEstimatedRoutes$.subscribe((value) => {
        console.log(value.length);
        value.forEach((element: any) => {
          console.log(element);
          let distance = this.toKM(element.summary.totalDistance)
          let time = this.toMinutes(element.summary.totalDistance)
          this.estimatedRoutes.push({
            name:element.name,
            time:time,
            distance: distance
          })
        });
      });
      
    }
    
    toKM(disInMeters:number){
      let distance = Math.floor(disInMeters/100);
      return distance/10+" km";
    }

    toMinutes(timeInS:number){
      let time = Math.round(timeInS/600);
      if (time===0){
        time=1;
      }
      return time+" min";
    }

    selectRoute(i:number){
      this.routeService.setRouteSelect(i);
    }
}
