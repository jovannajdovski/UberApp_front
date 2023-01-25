import { Component, OnInit } from '@angular/core';
import { RideHistoryService } from '../../services/ride-history/ride-history.service';

@Component({
  selector: 'app-ride-detail',
  templateUrl: './ride-detail.component.html',
  styleUrls: ['./ride-detail.component.scss']
})
export class RideDetailComponent implements OnInit{

  constructor(private rideHistoryService: RideHistoryService) {
    this.rideHistoryService.selectedDriver$.subscribe((value: number) => {
      this.selectedDriver = value;
      this.rideHistoryService.setIsDriver(value);
    });
  }
  
  selectedDriver=0;
  ngOnInit(): void {}
}
