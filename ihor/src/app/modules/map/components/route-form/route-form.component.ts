import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteService } from '../../services/route/route.service';
import { MapService } from '../../services/map/map.service';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.scss']
})
export class RouteFormComponent{

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

  options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<string[]> | undefined;

  // ngOnInit() {
  //   this.filteredOptions = this.routeForm.get('start')?.valueChanges.pipe(
  //     startWith(''),
  //     map(value => this._filter(value || '')),
  //   );
  // }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }


  getTextFromMap(){
    this.routeService.selectedStartPoint$.subscribe((value) => {
      this.mapService.reverseSearch(value.lat,value.lon).subscribe({
        next: (result) => {
          console.log(result);
          if(result.address.road === undefined){
            this.startString = result.address.city_district;
          } else if(result.address.house_number === undefined){
            this.startString = result.address.road+", "+result.address.city_district;
          } else {
            this.startString = result.address.road+" "+result.address.house_number+", "+result.address.city_district;
          }
          console.log(this.startString);
          this.routeForm.get("start")?.setValue(this.startString);
        }
      });

    });

    this.routeService.selectedFinalPoint$.subscribe((value) => {
      this.mapService.reverseSearch(value.lat,value.lon).subscribe({
        next: (result) => {
          console.log(result);
          if(result.address.road === undefined){
            this.endString = result.address.city_district;
          } else if(result.address.house_number === undefined){
            this.endString = result.address.road+", "+result.address.city_district;
          } else {
            this.endString = result.address.road+" "+result.address.house_number+", "+result.address.city_district;
          }
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
