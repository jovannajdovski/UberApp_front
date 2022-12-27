import { Component, Input } from '@angular/core';
import { Driver } from '../../model/driver';

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.css']
})
export class DriverCardComponent {
  @Input() driver!: Driver;

  constructor() {}
}
