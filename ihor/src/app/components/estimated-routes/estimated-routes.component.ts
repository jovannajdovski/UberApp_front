import { Component } from '@angular/core';

@Component({
  selector: 'app-estimated-routes',
  templateUrl: './estimated-routes.component.html',
  styleUrls: ['./estimated-routes.component.css']
})

export class EstimatedRoutesComponent {
   
    routes= [
      {
        start: 'adresa 1',
        final: 'adresa 2',
        time: '5 min',
        distance: '2 km'
      },
      {
        start: 'adresa 1',
        final: 'adresa 2',
        time: '5 min',
        distance: '2 km'
      },
      {
        start: 'adresa 1',
        final: 'adresa 2',
        time: '5 min',
        distance: '2 km'
      },
    ];

}
