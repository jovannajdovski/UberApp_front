import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteService } from '../../services/route/route.service';
import { MapService } from '../../services/map/map.service';
import { AuthService } from '../../../auth/services/auth.service';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.scss']
})
export class RouteFormComponent {

  routeForm = new FormGroup({
    start: new FormControl('', [Validators.required]),
    final: new FormControl('', [Validators.required]),
  });

  finished = false;
  unregisteredUser=true;
  public startString = "";
  public endString = "";

  constructor(private routeService: RouteService, private authService: AuthService,
    private mapService: MapService, private router: Router) {
    this.finished = false;
    this.getTextFromMap();
    this.authService.userState$.subscribe((value) => {
      console.log(value);
      if(value=="UNREGISTERED_USER")
        this.unregisteredUser = true;
      else
        this.unregisteredUser=false;
    })
  }

  options: string[] = [];
  optionsFinal: string[] = [];


  getTextFromMap() {
    this.routeService.selectedStartPoint$.subscribe((value) => {
      this.mapService.reverseSearch(value.lat, value.lon).subscribe({
        next: (result) => {
          console.log(result);
          if (result.address.road === undefined) {
            this.startString = result.address.city_district;
          } else if (result.address.house_number === undefined) {
            this.startString = result.address.road + ", " + result.address.city_district;
          } else {
            this.startString = result.address.road + " " + result.address.house_number + ", " + result.address.city_district;
          }
          console.log(this.startString);
          this.routeForm.get("start")?.setValue(this.startString);
        }
      });

    });

    this.routeService.selectedFinalPoint$.subscribe((value) => {
      this.mapService.reverseSearch(value.lat, value.lon).subscribe({
        next: (result) => {
          console.log(result);
          if (result.address.road === undefined) {
            this.endString = result.address.city_district;
          } else if (result.address.house_number === undefined) {
            this.endString = result.address.road + ", " + result.address.city_district;
          } else {
            this.endString = result.address.road + " " + result.address.house_number + ", " + result.address.city_district;
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
      this.finished = true;
      const start = this.routeForm.value.start;
      const final = this.routeForm.value.final;
      this.routeService.setRoute(start || '', final || '');
    }
  }
  getErrorMessage() {
    return 'You must enter a value';
  }

  onSearchChange(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    if (searchValue.length > 2) {
      this.mapService.autocomplete(searchValue).subscribe({
        next: (result) => {
          this.options = result.slice(0, 5).map((address: any) => address.display_name);
        }
      });
    }
  }

  onSearchChangeFinal(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    if (searchValue.length > 2) {
      this.mapService.autocomplete(searchValue).subscribe({
        next: (result) => {
          this.optionsFinal = result.slice(0, 5).map((address: any) => address.display_name);
        }
      });
    }
  }
}
