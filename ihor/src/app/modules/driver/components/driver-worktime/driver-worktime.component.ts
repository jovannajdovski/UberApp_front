import { Component } from '@angular/core';
import { WorkTimeService } from '../../services/work-time/work-time.service';

@Component({
  selector: 'app-driver-worktime',
  templateUrl: './driver-worktime.component.html',
  styleUrls: ['./driver-worktime.component.css']
})
export class DriverWorktimeComponent {
  constructor(private workTimeService: WorkTimeService)
  {
    this.workTimeService.getRemainedWorktime();
    this.workTimeService.remainedWorktimeGot$.subscribe((value)=>{
        this.remainedTime=(value/60).toString().padStart(2, "0")+":"+(value%60).toString().padStart(2, "0");
    })

  }
  remainedTime="00:00";
}
