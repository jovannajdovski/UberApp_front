import { RideNoStatusDTO } from "../../history/model/RidePageListDTO";

export interface UserPanic{
    name:string;
    surname:string;
    profilePicture:string;
    telephoneNumber:string;
    email:string;
    address:string;
}
export interface Panic{
    id:number;
    user:UserPanic;
    ride:RideNoStatusDTO;
    time:string;
    reason:string;
}