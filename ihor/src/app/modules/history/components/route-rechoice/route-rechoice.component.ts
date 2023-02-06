import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {RouteService} from 'src/app/modules/map/services/route/route.service';

@Component({
  selector: 'app-route-rechoice',
  templateUrl: './route-rechoice.component.html',
  styleUrls: ['./route-rechoice.component.scss']
})
export class RouteRechoiceComponent {

  constructor(private router: Router, private routeService: RouteService) {
  }

  toOffer() {
    this.routeService.setOffers(true);
    this.router.navigate(['/passenger']);
  }

  toFavorites() {
    this.router.navigate(['/passenger/profile']);
  }
}
