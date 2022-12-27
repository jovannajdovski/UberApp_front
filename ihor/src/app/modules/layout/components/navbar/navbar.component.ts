import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from "src/app/modules/auth/services/auth.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
    role: any;

    constructor(private authService: AuthService) {}
  
    ngOnInit(): void {
      this.authService.userState$.subscribe((result) => {
        this.role = result;
      });
    }

    // constructor(private loginService: LoginService, private router: Router) {
    //       this.loginService.selectedUser$.subscribe((value) => {
    //         /*Object.entries(this.loggedUser)
    //             .forEach(([key, val]) => {this.loggedUser[key]=(key==value);});
    //       */
    //       if(value=='driver'){
    //             this.loggedUser.driver=true;
    //             this.loggedUser.unregisteredUser=false;
    //         }
    //         else{
    //             this.driver=false;
    //             this.unregisteredUser=true;
    //         }
    //       });
    //     }
    // showLogin=true;
    // showSignup=true;
    // driver=false;
    // unregisteredUser=true;
    // loggedUser={driver: false, unregisteredUser: true}
    // ngOnInit(): void {
    // }
    
    // driverHome=true;
    // toLogin() {
    //     this.showSignup=true;
    //     this.showLogin=true;
    //     this.router.navigate(['/login']);
        
    // }
    // toSignup() {
    //     this.showSignup=true;
    //     this.showLogin=true;
    //     this.router.navigate(['/signup']);
    
    // }
    // toInbox(){
    //     this.router.navigate(['/inbox']);
        
    // }
    // toHome(){
    //     this.router.navigate(['/driver']);
    // }
}