export interface Ride {
    id: number,
    startTime: string,
    endTime: string,
    totalCost: number,
    driver: {
        id:number,
        email:string
    },
    passengers: [
        {
            id:number,
            email:string
        }
    ],
    estimatedTimeInMinutes: number,
    vehicleType: string,
    babyTransport: boolean,
    petTransport: boolean,
    rejection: {
        reason: string,
        timeOfRejection: string
    },
    locations: [
        {
            departure: {
                address: string,
                latitude: number,
                longitude: number
            },
            destination: {
                address: string,
                latitude: number,
                longitude: number
            }
        }
    ],
    status: string,
    scheduledTime: string
  }

  export interface ReasonDTO {
    reason:string
  }