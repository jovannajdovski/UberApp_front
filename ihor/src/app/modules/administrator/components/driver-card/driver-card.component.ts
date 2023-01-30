import {Component, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDriverDialogComponent } from '../edit-driver-dialog/edit-driver-dialog.component';
import {Router} from "@angular/router";
import {Driver} from "../../model/Driver";

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.css']
})
export class DriverCardComponent implements OnInit{
  @Input() driver!: Driver;
  @Input() driverEdited!: () => void;
  driverImage!: string;

  constructor(
    private router: Router,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    if (this.driver.profilePicture == null)
      this.driverImage = "assets/images/user_missing.png";
    else
      this.driverImage = this.driver.profilePicture;
  }

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
