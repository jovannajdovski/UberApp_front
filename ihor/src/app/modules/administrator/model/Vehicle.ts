import {Location} from "./Location";

export interface Vehicle {
  vehicleType: string | null | undefined,
  model: string | null | undefined,
  licenseNumber: string | null | undefined,
  currentLocation: Location,
  passengerSeats: string | null | undefined,
  babyTransport: boolean,
  petTransport: boolean
}
