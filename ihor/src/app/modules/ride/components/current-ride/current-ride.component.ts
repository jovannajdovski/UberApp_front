import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Ride } from 'src/app/modules/passenger/model/ride';
import { CurrentRideService } from '../../services/current-ride/current-ride.service';
import { PanicService } from '../../services/panic/panic.service';
import { PanicReasonDialogComponent } from '../panic-reason-dialog/panic-reason-dialog.component';

@Component({
  selector: 'app-current-ride',
  templateUrl: './current-ride.component.html',
  styleUrls: ['./current-ride.component.css']
})
export class CurrentRideComponent {
  constructor(private currentRideService:CurrentRideService, private authService:AuthService,
     private router:Router, private dialog:MatDialog, private panicService:PanicService)
  {
    this.currentRideService.getCurrentRide();
    this.currentRideService.currentRideGot$.subscribe((value)=>{
      if(value!=null)
      {
        this.rideFound=1;
        this.ride=value;
        this.departure=value.locations[0].departure.address;
        this.destination=value.locations[0].destination.address;
        const arrivalDateTime=new Date((new Date(value.startTime).getTime()+value.estimatedTimeInMinutes*60000))
        this.arrivalTime=arrivalDateTime.getHours().toString().padStart(2, "0")+":"+arrivalDateTime.getMinutes().toString().padStart(2, "0");
      }
      else
        this.rideFound=2;
    })
    this.role=authService.getRole();

    this.panicService.panicGot$.subscribe((value)=>{
      this.dialogRef.close("success");
      if(value!="")
        this.sendPanic(value);
    });
  }
  ride!:Ride;
  role="";
  rideFound=0;
  departure="?"
  destination="?"
  arrivalTime="??:??"
  dialogRef!: MatDialogRef<PanicReasonDialogComponent>
  openPanicDialog()
  {
    this.dialogRef = this.dialog.open(PanicReasonDialogComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        // this.driverEdited();
      }
    });
    
  }
  sendPanic(reason:string)
  { 
    this.panicService.activatePanicBack(this.ride.id,reason).subscribe({
      next: (result) => {
        alert("Successful");
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {alert("Not possible"); }
      },
    });
    
  }
  finishRide(){
    this.currentRideService.finishRideBack(this.ride.id).subscribe({
      next: (result) => {
        this.router.navigate(['/driver']);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {alert("Not possible"); }
      },
    });
  }
}
