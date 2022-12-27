import { Component } from '@angular/core';
import { RouteService } from 'src/app/modules/map/services/route/route.service';

@Component({
  selector: 'app-passenger-home',
  templateUrl: './passenger-home.component.html',
  styleUrls: ['./passenger-home.component.css']
})
export class PassengerHomeComponent {
  selectedRoute=false;
}
