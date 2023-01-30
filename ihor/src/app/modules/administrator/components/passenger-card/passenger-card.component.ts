import {Component, Input, OnInit} from '@angular/core';
import {Passenger} from "../../model/Passenger";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {ConfirmationDialogComponent} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-passenger-card',
  templateUrl: './passenger-card.component.html',
  styleUrls: ['./passenger-card.component.css']
})
export class PassengerCardComponent implements OnInit{
  @Input() passenger!: Passenger;
  @Input() toastCallback!: (message: string) => void;
  passengerImage!: string;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.passenger.profilePicture == null)
      this.passengerImage = "assets/images/user_missing.png";
    else
      this.passengerImage = this.passenger.profilePicture;
  }

  showStatistics() {
    this.router.navigate(["administrator/statistics/passenger/" + this.passenger.id.toString()]);
  }

  blockPassenger() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Block passenger",
        message: "Are you sure you want to block selected driver?",
        warning: true
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.userService.block(this.passenger.id).subscribe({
          next: () => {
            this.changePassengerStatus(true);
            this.toastCallback("Passenger is successfully blocked");
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

  unblockPassenger() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Unblock passenger",
        message: "Are you sure you want to unblock selected passenger?",
        warning: false
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.userService.unblock(this.passenger.id).subscribe({
          next: () => {
            this.changePassengerStatus(false);
            this.toastCallback("Passenger is successfully unblocked");
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

  changePassengerStatus(status: boolean) {
    this.passenger.blocked = status;
  }
}
