export interface RidePageListDTO {
    totalCount: number;
    results: [
        {
            id: number,
            startTime: string,
            endTime: string,
            totalCost: number,
            driver: {
                id: number,
                email: string
            },
            passengers: [
                {
                    id: number,
                    email: string
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
            scheduledTime: string
        }

    ]
}

export interface RideNoStatusDTO {
    id: number,
    startTime: string,
    endTime: string,
    totalCost: number,
    driver: {
        id: number,
        email: string
    },
    passengers: [
        {
            id: number,
            email: string
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
    scheduledTime: string
}




export interface ReviewsForRideDTO {
    rideId: number;
    reviews: [
        {
            vehicleReview: {
                id: number,
                rating: number,
                comment: string,
                passenger: {
                    id: number,
                    email: string
                }
            },
            driverReview: {
                id: number,
                rating: number,
                comment: string,
                passenger: {
                    id: number,
                    email: string
                }
            }
        }

    ]
}

export interface FullReviewDTO {
    vehicleReview: {
        id: number,
        rating: number,
        comment: string,
        passenger: {
            id: number,
            email: string
        }
    },
    driverReview: {
        id: number,
        rating: number,
        comment: string,
        passenger: {
            id: number,
            email: string
        }
    }
}

export interface ReviewRequestDTO {
    rating: number,
    comment: string
}

export interface ReviewDTO {
    id: number,
    rating: number,
    comment: string,
    passenger: {
        id: number,
        email: string
    }
}

