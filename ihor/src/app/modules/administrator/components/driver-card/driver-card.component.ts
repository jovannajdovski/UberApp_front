import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Driver } from '../../model/Driver';
import { EditDriverDialogComponent } from '../edit-driver-dialog/edit-driver-dialog.component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.css']
})
export class DriverCardComponent {
  @Input() driver!: Driver;
  @Input() driverEdited!: () => void;

  constructor(
    private router: Router,
    private dialog: MatDialog
    ) {}

  openEditDriverDialog() {
    const dialogRef = this.dialog.open(EditDriverDialogComponent, {
      data: this.driver,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.driverEdited();
      }
    });
  }

  showStatistics() {
    this.router.navigate(["administrator/statistics/driver/" + this.driver.id.toString()]);
  }
}
