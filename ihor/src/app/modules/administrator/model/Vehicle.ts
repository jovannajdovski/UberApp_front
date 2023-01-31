import {Location} from "./Location";

export interface Vehicle {
  vehicleType: string,
  model: string,
  licenseNumber: string,
  currentLocation: Location,
  passengerSeats: string,
  babyTransport: boolean,
  petTransport: boolean
}
