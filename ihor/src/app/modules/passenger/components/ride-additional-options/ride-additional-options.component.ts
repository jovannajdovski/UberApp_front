import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {OrderRideService} from '../../services/order-ride/order-ride.service';


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

  constructor(private orderRideService: OrderRideService) {
    this.selectedTime = new Date();
  }

  finished = false;
  vehicleTypes = [
    {value: 1, viewValue: 'STANDARD'},
    {value: 2, viewValue: 'LUXURY'},
    {value: 3, viewValue: 'VAN'},
  ];
  selectedType = null;
  babiesAllowed = false;
  petsAllowed = false;
  selectedTime;

  onChangeTime(event: string) {
    const minutes = event.substring(3, 5);
    const hours = event.substring(0, 2);
    this.selectedTime.setHours(Number(hours));
    this.selectedTime.setMinutes(Number(minutes));

  }

  toggleBabies(event: MatCheckboxChange) {
    this.babiesAllowed = event.checked;
  }

  togglePets(event: MatCheckboxChange) {
    this.petsAllowed = event.checked;
  }

  nextStep() {

    this.finished = true;
    const vehicleType = (Number(this.selectedType) + 3) % 4;
    this.orderRideService.setAdditionals(Number(vehicleType), this.babiesAllowed, this.petsAllowed, this.selectedTime);
  }
}
