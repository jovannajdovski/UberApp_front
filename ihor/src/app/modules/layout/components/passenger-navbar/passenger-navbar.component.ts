import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passenger-navbar',
  templateUrl: './passenger-navbar.component.html',
  styleUrls: ['./passenger-navbar.component.css']
})
export class PassengerNavbarComponent {
  public selectedPage:any;
  public enumSP=SelectedPage;
  constructor(private router:Router) {
    this.toSchedule();
  }  
  toSchedule(){
    this.selectedPage=SelectedPage.SCHEDULE;
    console.log("toschedule");
    this.router.navigate(['/passenger']);
  }
  toInbox(){console.log("inbox");
    this.selectedPage=SelectedPage.INBOX;
    this.router.navigate(['/inbox']);   
  }
  toHistory(){console.log("hist");
    this.selectedPage=SelectedPage.HISTORY;
    this.router.navigate(['/passenger/history']);
  }
  toProfile(){console.log("profile");
    this.selectedPage=SelectedPage.PROFILE;
    this.router.navigate(['/passenger/profile']); 
  }
  logout(){
    
  }
  toCurrentRide(){
    this.selectedPage=SelectedPage.CURRENT_RIDE;
    this.router.navigate(['/current-ride'])
  }
}
enum SelectedPage {
  CURRENT_RIDE,SCHEDULE, INBOX, HISTORY, PROFILE
}
