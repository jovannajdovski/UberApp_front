export interface FavoriteRouteForPassengerDTO {
    isFavorite: boolean;
    favoriteId: number;
}

export interface CreateFavoriteDTO {
    favoriteName: string;
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
    passengers: [
        {
            id: number,
            email: string
        }
    ],
    vehicleType: string,
    babyTransport: boolean,
    petTransport: boolean
}

export interface FavoriteFullDTO {
    id: number,
    favoriteName: string;
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
    passengers: [
        {
            id: number,
            email: string
        }
    ],
    vehicleType: string,
    babyTransport: boolean,
    petTransport: boolean
}

