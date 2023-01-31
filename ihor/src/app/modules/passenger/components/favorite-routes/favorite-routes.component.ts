import {Component, Input, OnInit} from '@angular/core';
import {FavoriteRoute} from "../../model/FavoriteRoute";
import {FavoriteRouteService} from "../../services/favorite-route.service";
import {SharedService} from "../../../shared/services/shared.service";

@Component({
  selector: 'app-favorite-routes',
  templateUrl: './favorite-routes.component.html',
  styleUrls: ['./favorite-routes.component.css']
})
export class FavoriteRoutesComponent implements OnInit {

  @Input() id!: number;
  favoriteRoutes!: FavoriteRoute[];

  constructor(
    private favoriteRouteService: FavoriteRouteService,
    private sharedService: SharedService
  ) {
  }

  toastCallback = (message: string) => {
    this.openSnackBar(message);
    this.fetchFavoriteRoutes();
  }

  openSnackBar = (message: string) => {
    this.sharedService.openSnack(message);
  }

  fetchFavoriteRoutes() {
    this.favoriteRouteService.getFavoriteRoutes(this.id).subscribe({
      next: (response) => {
        this.favoriteRoutes = response;
        console.log(response)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    this.fetchFavoriteRoutes();
  }

}
