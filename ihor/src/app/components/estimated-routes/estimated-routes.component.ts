import { Component, Input } from '@angular/core';
import { RouteService } from 'src/app/services/route/route.service';
@Component({
  selector: 'app-estimated-routes',
  templateUrl: './estimated-routes.component.html',
  styleUrls: ['./estimated-routes.component.css']
})

export class EstimatedRoutesComponent {
    private adresa1="";
    private adresa2="";
    public routes: { start: string, final : string, time: string, distance : string }[]

    constructor(private routeService:RouteService){
      this.routeService.selectedStart$.subscribe((value) => {
        this.adresa1=value
      });
      this.routeService.selectedFinal$.subscribe((value) => {
        this.adresa2=value;
      });
      this.routes= [
        {
          start: this.adresa1,
          final: this.adresa2,
          time: '5 min',
          distance: '2 km'
        },
        {
          start: this.adresa1,
          final: this.adresa2,
          time: '5 min',
          distance: '2 km'
        },
        {
          start: this.adresa1,
          final: this.adresa2,
          time: '5 min',
          distance: '2 km'
        },
      ];
    }
    

}
