import {PassengerBasicInfo} from "./PassengerBasicInfo";
import {Path} from "./Path";

export interface FavoriteRoute {
  id: number,
  favoriteName: string,
  locations: Array<Path>,
  passengers: Array<PassengerBasicInfo>
  vehicleType: string,
  babyTransport: boolean,
  petTransport: boolean
}
