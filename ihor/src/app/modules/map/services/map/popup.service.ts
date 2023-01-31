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
      `<div>Model: ${ data.vehicle.model }</div>` +
      `<div>Type: ${ data.vehicle.vehicleType }</div>` +
      `<div>Address: ${ data.location.address }</div>`
  }
}
