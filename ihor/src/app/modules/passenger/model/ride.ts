export interface CreateRide{
    "locations":Path[],
    "passengers": UserForRide[],
    "vehicleType": VehicleCategory,
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
    null, "STANDARD", "LUXURY", "VAN"
}