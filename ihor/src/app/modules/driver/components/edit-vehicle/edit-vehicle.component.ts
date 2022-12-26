import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss']
})
export class EditVehicleComponent {

  vehicleForm = new FormGroup({
    model: new FormControl('',[Validators.required]),
    type: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
    plate: new FormControl('',[Validators.required]),
    seat: new FormControl('',[Validators.required]),
  });

  edit(){

  }
}
