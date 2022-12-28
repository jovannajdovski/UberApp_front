export interface Vehicle {
    model: string;
    vehicleType: string;
    pricePerKM: number;
    licenseNumber: string;
    passengerSeats: number;
    babyTransport: boolean;
    petTransport: boolean;
    currentLocation: {
      address: string,
      latitude: number,
      longitude: number
    },
  }