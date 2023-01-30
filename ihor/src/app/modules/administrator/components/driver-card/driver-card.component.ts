import {Component, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDriverDialogComponent } from '../edit-driver-dialog/edit-driver-dialog.component';
import {Router} from "@angular/router";
import {Driver} from "../../model/Driver";
import {UserService} from "../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.css']
})
export class DriverCardComponent implements OnInit{
  @Input() driver!: Driver;
  @Input() toastCallback!: (message: string) => void;
  driverImage!: string;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService
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
        this.toastCallback("Driver updated successfully.");
      }
    });
  }

  showStatistics() {
    this.router.navigate(["administrator/statistics/driver/" + this.driver.id.toString()]);
  }

  blockDriver() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Block driver",
        message: "Are you sure you want to block selected driver?",
        warning: true
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.userService.block(this.driver.id).subscribe({
          next: () => {
            this.changeDriverStatus(true);
            this.toastCallback("Driver is successfully blocked");
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

  unblockDriver() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Unblock driver",
        message: "Are you sure you want to unblock selected driver?",
        warning: false
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.userService.unblock(this.driver.id).subscribe({
          next: () => {
            this.changeDriverStatus(false);
            this.toastCallback("Driver is successfully unblocked");
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

  changeDriverStatus(status: boolean) {
    this.driver.blocked = status;
  }
}
