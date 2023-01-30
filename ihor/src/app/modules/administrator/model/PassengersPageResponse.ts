import {Passenger} from "./Passenger";

export interface PassengersPageResponse {
  totalCount: number,
  results: Passenger[]
}
