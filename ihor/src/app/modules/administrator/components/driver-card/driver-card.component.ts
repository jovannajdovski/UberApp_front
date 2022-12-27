import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Driver } from '../../model/driver';
import { EditDriverDialogComponent } from '../edit-driver-dialog/edit-driver-dialog.component';

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.css']
})
export class DriverCardComponent {
  @Input() driver!: Driver;
  @Input() driverEdited!: () => void;

  constructor(
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
}
