import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderRideService } from '../../services/order-ride/order-ride.service';


@Component({
  selector: 'app-ride-additional-options',
  templateUrl: './ride-additional-options.component.html',
  styleUrls: ['./ride-additional-options.component.scss']
})
export class RideAdditionalOptionsComponent {
  additionalsForm = new FormGroup({
    vehicleType: new FormControl(''),
    babiesAllowed: new FormControl(''),
    petsAllowed: new FormControl('')
  });
  constructor(private orderRideService: OrderRideService){}
  finished=false;
  vehicleTypes= [
    {value: 1, viewValue: 'STANDARD'},
    {value: 2, viewValue: 'LUXURY'},
    {value: 3, viewValue: 'VAN'},
  ];
  selectedType = null;
  babiesAllowed=false;
  petsAllowed=false;
  nextStep() {
    
    this.finished = true;
    const vehicleType = this.selectedType;
    this.orderRideService.setAdditionals(Number(vehicleType),this.babiesAllowed,this.petsAllowed, new Date());
  }
}
