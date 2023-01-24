import { RideRejectionResponse } from "../../driver/services/ride-rejection/ride-rejection.service"

export interface CreateRide{
    "locations":Path[],
    "passengers": UserForRide[],
    "vehicleType": VehicleCategory|null,
    "babyTransport":boolean,
    "petTransport":boolean,
    "scheduledTime": string
}
export interface Path{
    "departure": Location,
    "destination": Location
}
export interface Location{
    "address": string,
    "latitude": number,
    "longitude": number
}
export interface UserForRide{
    "id": number,
    "email": string
}
export enum VehicleCategory{
    "STANDARD", "LUXURY", "VAN", null
}
export interface Ride{
    "id":number,
    "startTime": string,
    "endTime": string,
    "totalCost": number,
    "driver": UserForRide,
    "passengers": UserForRide[],
    "estimatedTimeInMinutes": number,
    "vehicleType": VehicleCategory,
    "babyTransport":boolean,
    "petTransport":boolean,
    "rejection": RideRejection
    "locations":Path[],
    "status": string
    "scheduledTime": string
}
export interface RideRejection{
    "reason": string,
    "timeOfRejection":string
}
