import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-current-ride-details',
  templateUrl: './current-ride-details.component.html',
  styleUrls: ['./current-ride-details.component.css']
})
export class CurrentRideDetailsComponent {
  @Input() departure = '';
  @Input() destination = '';
  @Input() arrivalTime = '';
}
