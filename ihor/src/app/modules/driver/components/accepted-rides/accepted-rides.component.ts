import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { RideNoStatusDTO, RidePageListDTO } from 'src/app/modules/history/model/RidePageListDTO';
import { RideHistoryService } from 'src/app/modules/history/services/ride-history/ride-history.service';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { AcceptedRidesService } from '../../services/accepted-rides/accepted-rides.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ReasonDTO } from '../../model/ride';

@Component({
  selector: 'app-accepted-rides',
  templateUrl: './accepted-rides.component.html',
  styleUrls: ['./accepted-rides.component.scss']
})
export class AcceptedRidesComponent implements OnInit{
  public rideList: RidePageListDTO | undefined;
  public idRides: number[] = [];
  public reason = '';
  hasError: boolean;

  constructor(private router: Router,
    private rideHistoryService: RideHistoryService,
    private acceptedRidesService: AcceptedRidesService,
    private authService: AuthService,
    private sharedService: SharedService,
    public dialog: MatDialog) {
    this.hasError = false;
  }

  ngOnInit(): void {
    
    const driverId = this.authService.getId();

    this.acceptedRidesService.getAcceptedRidesForDriver(driverId).subscribe({
      next: (result) => {
        this.rideList = result;
        if (result.totalCount != 0) {
          for (const ride of result.results) {
            this.idRides.push(ride.id);
          }
        }
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.hasError = true;
        }
      },
    });
  }

  toStart(ride: RideNoStatusDTO, i: number){
    this.acceptedRidesService.startRide(ride.id).subscribe({
      next: () => {
        this.sharedService.openSnack('You started your ride, check in current rides');
        this.rideList?.results.splice(i,1);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.hasError = true;
          this.sharedService.openSnack('You cant start this ride now');
        }
      },
    });
  }

  toReject(ride: RideNoStatusDTO, i: number){
    const dialogRef = this.dialog.open(DialogReasonComponent, {
      height: '400px',
      width: '500px',
      data: {reason: this.reason},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reason = result;
      if(this.reason){
        const reasonDTO : ReasonDTO = {
          reason: this.reason
        }
        this.acceptedRidesService.rejectdRide(ride.id, reasonDTO).subscribe({
          next: () => {
            this.sharedService.openSnack('Your ride is successfully cnceled');
            this.rideList?.results.splice(i,1);
          },
          error: (error) => {
            if (error instanceof HttpErrorResponse) {
              this.hasError = true;
              this.sharedService.openSnack('You cant cancel this ride now');
            }
          },
        });
      }
    });
  }


  getStartDate(ride: RideNoStatusDTO): string {
    const startDateTime = ride.startTime.split("T");
    const datePoints = startDateTime[0].split("-");
    const startDate = datePoints[2] + "." + datePoints[1] + "." + datePoints[0] + ".";

    return startDate;
    
  }

  getStartTime(ride: RideNoStatusDTO): string {
    const startDateTime = ride.startTime.split("T");
    const timePoints = startDateTime[1].split(":");
    const startTime = timePoints[0] + ":" + timePoints[1];

    return startTime;
  }

  getStartPlace(ride: RideNoStatusDTO): string {
    const path = ride.locations[0];
    const startPlace = path.departure.address;
    return startPlace;
  }

  getEndPlace(ride: RideNoStatusDTO): string {
    const path = ride.locations[0];
    const endPlace = path.destination.address;
    return endPlace;
  }

  getCost(ride: RideNoStatusDTO): string {
    return ride.totalCost+" RSD";
  }
}

@Component({
  selector: 'app-dialog-reason',
  templateUrl: './app-dialog-reason.component.html',
  styleUrls: ['./app-dialog-reason.component.scss']
})
export class DialogReasonComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogReasonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  reason: string;
}