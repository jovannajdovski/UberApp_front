import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { RouteService } from "src/app/services/route/route.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
    constructor(private routeService: RouteService, private router: Router) {}
    showLogin=true;
    showSignup=true;
    driver=false;
    unregisteredUser=true;
    ngOnInit(): void {
        this.driver=this.routeService.driverNavbar;
        this.unregisteredUser=this.routeService.unregisteredUserNavbar;
    }
    
    driverHome=true;
    toLogin() {
        this.showSignup=true;
        this.showLogin=true;
        this.router.navigate(['/login']);
        
    }
    toSignup() {
        this.showSignup=true;
        this.showLogin=true;
        this.router.navigate(['/signup']);
    
    }
}