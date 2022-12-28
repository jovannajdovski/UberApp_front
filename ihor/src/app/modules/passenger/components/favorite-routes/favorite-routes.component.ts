import { Component } from '@angular/core';

@Component({
  selector: 'app-favorite-routes',
  templateUrl: './favorite-routes.component.html',
  styleUrls: ['./favorite-routes.component.css']
})
export class FavoriteRoutesComponent {

  public favoriteRoutes: { startPoint: string, endPoint: string }[]

  public demofavoriteRoutes: { startPoint: string, endPoint: string }[] =
   [
    {startPoint: "Bulevar Oslobodjenja 32", endPoint:"Gogoljeva 23"},
    {startPoint: "Bulevar Oslobodjenja 32", endPoint:"Gogoljeva 23"},
    {startPoint: "Bulevar Oslobodjenja 32", endPoint:"Gogoljeva 23"},
    {startPoint: "Bulevar Oslobodjenja 32", endPoint:"Gogoljeva 23"},
  ];

  constructor() {
    this.favoriteRoutes = [];

    // this.favoriteRouteService.selectedFavoriteRoutes$.subscribe((value) => {
    //   value.forEach((element: any) => {
    //     console.log(element);
    //     this.favoriteRoutes.push({
    //       startPoint:element.start,
    //       endPoint:element.end           
    //     })
    //   });
    // });

  }

  selectRoute(i:number){
    console.log(i);
  //  this.routeService.setRouteSelect(i);
  }

}
