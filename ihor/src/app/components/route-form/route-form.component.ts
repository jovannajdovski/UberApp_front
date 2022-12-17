import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteService } from 'src/app/services/route/route.service';

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
  constructor(private routeService: RouteService, private router: Router) {
    this.finished=false;
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
