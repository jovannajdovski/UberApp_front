import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() {
  }

  makeVehiclePopup(data: {
    vehicle: {
      vehicleType: string,
      model: string,
      licenseNumber: string
    },
    location: {
      address: string,
      latitude: number,
      longitude: number
    },
    free: boolean
  }): string {
    return `` +
      `<div>Model: ${data.vehicle.model}</div>` +
      `<div>Type: ${data.vehicle.vehicleType}</div>` +
      `<div>Address: ${data.location.address}</div>`
  }
}
