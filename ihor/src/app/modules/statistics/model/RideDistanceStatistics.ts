import {DailyRideDistance} from "./DailyRideDistance";

export interface RideDistanceStatistics {
  distancePerDay: Array<DailyRideDistance>,
  totalDistance: number,
  averageDistance: number
}
