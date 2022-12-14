import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  makeCapitalPopup(data: any): string {
    return `` +
      `<div>Capital: ${ data.name }</div>` +
      `<div>State: ${ data.state }</div>` +
      `<div>Population: ${ data.population }</div>`
  }

  makeVehiclePopup(data: any): string {
    return `` +
      `<div>Model: ${ data.model }</div>` +
      `<div>Type: ${ data.vehicleType }</div>` +
      `<div>Address: ${ data.currentLocation.address }</div>`
  }
}
