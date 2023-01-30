import {DailyRideCount} from "./DailyRideCount";

export interface RideCountStatistics {
  countPerDay: Array<DailyRideCount>,
  totalCount: number,
  averageCount: number
}
