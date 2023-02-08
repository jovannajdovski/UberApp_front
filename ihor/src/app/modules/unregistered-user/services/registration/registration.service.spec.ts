import { TestBed } from '@angular/core/testing';

import { RegistrationService } from './registration.service';
import {environment} from "../../../../../environments/environment";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Registration} from "../../components/signup-form/signup-form.component";
import {Driver} from "../../../administrator/model/Driver";
import {Location} from "../../../administrator/model/Location";
import {Vehicle} from "../../../administrator/model/Vehicle";
import {Message} from "../../model/Message";

describe('RegistrationService', () => {
  let service: RegistrationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegistrationService]
    });
    service = TestBed.inject(RegistrationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //registerPassenger
  it('should send a POST request to the server with passenger registration data', () => {
    const registration: Registration = {
      name: 'Miki',
      surname: 'Mikic',
      telephoneNumber: '123456',
      email: 'miki@gmail.com',
      address: 'Bulevar Evrope 44',
      password: 'NekaSifra123'
    };

    service.registerPassenger(registration).subscribe();

    const req = httpMock.expectOne(environment.apiHost+"passenger");
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({
      name: registration.name,
      surname: registration.surname,
      telephoneNumber: registration.telephoneNumber,
      email: registration.email,
      address: registration.address,
      password: registration.password
    });
    req.flush({});
  });

  it('should register passenger', () => {
    const registration: Registration = {
      name: 'Miki',
      surname: 'Mikic',
      telephoneNumber: '123456',
      email: 'miki@gmail.com',
      address: 'Bulevar Evrope 44',
      password: 'NekaSifra123'
    };
    service.registerPassenger(registration).subscribe(data => {
      expect(data).toEqual(registration);
    });
    const req = httpMock.expectOne(environment.apiHost+"passenger");
    expect(req.request.method).toBe('POST');
    req.flush(registration);
  });

  //activatePassenger
  it('should send a GET request to the server with activationId', () => {
    const activationId = 123;

    service.activatePassenger(activationId).subscribe();

    const req = httpMock.expectOne(environment.apiHost+"passenger/activate/"+activationId);
    expect(req.request.method).toEqual('GET');
    req.flush({});
  });

  it('should activate passenger', () => {
    const activationId = 123;
    const message: Message = {
      message: 'Passenger activated successfully'
    };
    service.activatePassenger(activationId).subscribe(data => {
      expect(data).toEqual(message);
    });
    const req = httpMock.expectOne(environment.apiHost+"passenger/activate/"+activationId);
    expect(req.request.method).toBe('GET');
    req.flush(message);
  });

  //registerDriver
  it('should send a POST request to the server with driver data', () => {
    const registration: Registration = {
      name: 'Duki',
      surname: 'Colic',
      telephoneNumber: '+1234567890',
      email: 'driver@gmail.com',
      address: 'Maksima Gorkog 3',
      password: 'NekaSifra123'
    };

    service.registerDriver(registration).subscribe();

    const req = httpMock.expectOne(environment.apiHost+"driver");
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({
      name: registration.name,
      surname: registration.surname,
      telephoneNumber: registration.telephoneNumber,
      email: registration.email,
      address: registration.address,
      password: registration.password
    });
    req.flush({});
  });

  it('should register a driver', () => {
    const registration: Registration = {
      name: 'Duki',
      surname: 'Colic',
      telephoneNumber: '+1234567890',
      email: 'driver@gmail.com',
      address: 'Maksima Gorkog 3',
      password: 'NekaSifra123'
    };

    const driver: Driver = {
      id: 1,
      name: 'Duki',
      surname: 'Colic',
      telephoneNumber: '+1234567890',
      email: 'driver@gmail.com',
      address: 'Maksima Gorkog 3',
      password: "NekaSifra123",
      profilePicture: "",
      blocked: false,
      active: true
    };

    service.registerDriver(registration).subscribe(res => {
      expect(res).toEqual(driver);
    });

    const req = httpMock.expectOne(environment.apiHost+"driver");
    expect(req.request.method).toBe('POST');
    req.flush(driver);
  });

  //addVehicleToDriver
  it('should send a POST request to the server with vehicle data', () => {
    const id = 1;
    const location : Location = {
      address: "Gogoljeva 4",
      latitude: 54.32,
      longitude: 23.33
    }
    const vehicle: Vehicle = {
      vehicleType: 'STANDARD',
      model: 'Audi 7',
      licenseNumber: 'NS-123-NS',
      currentLocation: location,
      passengerSeats: '4',
      babyTransport: true,
      petTransport: true
    };

    service.addVehicleToDriver(id, vehicle).subscribe();

    const req = httpMock.expectOne(environment.apiHost+"driver/"+id+"/vehicle");
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({
      vehicleType: vehicle.vehicleType,
      model: vehicle.model,
      licenseNumber: vehicle.licenseNumber,
      currentLocation: vehicle.currentLocation,
      passengerSeats: vehicle.passengerSeats,
      babyTransport: vehicle.babyTransport,
      petTransport: vehicle.petTransport
    });
    req.flush({});
  });

  it('should add a vehicle to a driver', () => {
    const id = 1;
    const location : Location = {
      address: "Gogoljeva 4",
      latitude: 54.32,
      longitude: 23.33
    }
    const vehicle: Vehicle = {
      vehicleType: 'STANDARD',
      model: 'Audi 7',
      licenseNumber: 'NS-123-NS',
      currentLocation: location,
      passengerSeats: '4',
      babyTransport: true,
      petTransport: true
    };

    service.addVehicleToDriver(id, vehicle).subscribe(res => {
      expect(res).toEqual('Vehicle added successfully');
    });

    const req = httpMock.expectOne(environment.apiHost+"driver/"+id+"/vehicle");
    expect(req.request.method).toBe('POST');
    req.flush('Vehicle added successfully', { status: 200, statusText: 'OK' });
  });
});
