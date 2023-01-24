import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { WorkTimeService } from '../../services/work-time/work-time.service';

@Component({
  selector: 'app-driver-worktime',
  templateUrl: './driver-worktime.component.html',
  styleUrls: ['./driver-worktime.component.css']
})
export class DriverWorktimeComponent {
  constructor(private workTimeService: WorkTimeService, private authService:AuthService)
  {
    this.workTimeService.getRemainedWorktime();
    this.workTimeService.remainedWorktimeGot$.subscribe((value)=>{
      if(value>0)
        this.remainedTime=(Math.floor(value/60)).toString().padStart(2, "0")+":"+(value%60).toString().padStart(2, "0");
      else{
        this.remainedTime="00:00";
        this.checked=false;
        // this.workTimeService.endShift();
      }
    })
    this.workTimeService.shiftStarted$.subscribe((value)=>{
      this.checked=value;
    })

  }
  checked=true;
  remainedTime="00:00";
  toggle(event: MatSlideToggleChange){
    if(event.checked)
      this.workTimeService.startShift();
    else
      this.workTimeService.endShift();
  }
}
