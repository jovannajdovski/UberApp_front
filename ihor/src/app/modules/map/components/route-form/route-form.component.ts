import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MapService } from 'src/app/modules/map/services/map/map.service';
import { RouteService } from '../../services/route/route.service';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.css']
})
export class RouteFormComponent {
  routeForm = new FormGroup({
    start: new FormControl('',[Validators.required]),
    final: new FormControl('',[Validators.required]),
  });
  finished=false;
  public startString="";
  public endString="";
  constructor(private routeService: RouteService,
     private mapService: MapService,private router: Router) {
    this.finished=false;
    this.getTextFromMap();
  }

  getTextFromMap(){
    this.routeService.selectedStartPoint$.subscribe((value) => {
      this.mapService.reverseSearch(value.lat,value.lon).subscribe({
        next: (result) => {
          this.startString = result.address.road+" "+result.address.house_number+", "+result.address.city_district;
          console.log(this.startString);
          this.routeForm.get("start")?.setValue(this.startString);
        }
      });

    });

    this.routeService.selectedFinalPoint$.subscribe((value) => {
      this.mapService.reverseSearch(value.lat,value.lon).subscribe({
        next: (result) => {
          this.endString = result.address.road+" "+result.address.house_number+", "+result.address.city_district;
          console.log(this.endString);
          this.routeForm.get("final")?.setValue(this.endString);
        }
      });

    });
  }


  back(): void {
  }
  estimate() {
    if (this.routeForm.valid) {
      this.finished=true;
      const start= this.routeForm.value.start;
      const final= this.routeForm.value.final;
      this.routeService.setRoute(start || '', final||'');
    }
  }
  getErrorMessage() {
    return 'You must enter a value';
  }
}
