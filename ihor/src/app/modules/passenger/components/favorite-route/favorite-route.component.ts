import {Component, Input} from '@angular/core';
import {FavoriteRoute} from "../../model/FavoriteRoute";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {HttpErrorResponse} from "@angular/common/http";
import {FavoriteRouteService} from "../../services/favorite-route.service";
import {SharedService} from "../../../shared/services/shared.service";

@Component({
  selector: 'app-favorite-route',
  templateUrl: './favorite-route.component.html',
  styleUrls: ['./favorite-route.component.css']
})
export class FavoriteRouteComponent {
  @Input() favoriteRoute!: FavoriteRoute;
  @Input() toastCallback!: (message: string) => void;

  constructor(
    private dialog: MatDialog,
    private favoriteRouteService: FavoriteRouteService,
    private sharedService: SharedService,
  ) {
  }

  removeRoute() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Remove favorite route",
        message: "Are you sure you want to remove selected favorite route?",
        warning: true
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.favoriteRouteService.deleteFavoriteRoute(this.favoriteRoute.id).subscribe({
          next: (result: string) => {
            this.toastCallback("Favorite route deleted successfully.");
          },
          error: (error) => {
            if (error instanceof HttpErrorResponse) {
              this.toastCallback("An error occurred.");
            }
          },
        });
      }
    });
  }
}
