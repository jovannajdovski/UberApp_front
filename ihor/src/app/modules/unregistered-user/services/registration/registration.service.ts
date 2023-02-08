import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {Registration} from '../../components/signup-form/signup-form.component';
import {Vehicle} from "../../../administrator/model/Vehicle";
import {Driver} from "../../../administrator/model/Driver";
import {Message} from '../../model/Message';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private hasError=new BehaviorSubject<boolean>(false);
  hasErrorObs=this.hasError.asObservable();
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  constructor(private http: HttpClient, private router:Router) {
  }
  registerPassengerObs(registration:Registration):any{
    this.registerPassenger(registration).subscribe({
      next: (result) => {
        this.router.navigate(['/verify-account']);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.hasError.next(true);
        }
      },
    });
  }
  registerPassenger(registration: Registration): Observable<Registration> {
    return this.http.post<Registration>(environment.apiHost + "passenger",
      {
        name: registration.name,
        surname: registration.surname,
        telephoneNumber: registration.telephoneNumber,
        email: registration.email,
        address: registration.address,
        password: registration.password
      }, {"headers": this.headers})
  }

  activatePassenger(activationId: number): Observable<Message> {
    return this.http.get<Message>(environment.apiHost + "passenger/activate/" + activationId,
      {"headers": this.headers})
  }

  registerDriver(registration: Registration): Observable<Driver> {
    return this.http.post<Driver>(environment.apiHost + "driver",
      {
        name: registration.name,
        surname: registration.surname,
        telephoneNumber: registration.telephoneNumber,
        email: registration.email,
        address: registration.address,
        password: registration.password
      })
  }

  addVehicleToDriver(id: number, vehicle: Vehicle): Observable<string> {
    return this.http.post(environment.apiHost + "driver/" + id.toString() + "/vehicle",
      {
        vehicleType: vehicle.vehicleType,
        model: vehicle.model,
        licenseNumber: vehicle.licenseNumber,
        currentLocation: vehicle.currentLocation,
        passengerSeats: vehicle.passengerSeats,
        babyTransport: vehicle.babyTransport,
        petTransport: vehicle.petTransport
      },
      {
        responseType: "text"
      }
    )
  }
}
