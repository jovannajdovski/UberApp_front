import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Registration } from '../../components/signup-form/signup-form.component';
import { Message } from '../../model/Message';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });
  
  constructor(private http: HttpClient) { }

  registerPassenger(registration: Registration): Observable<Registration> {
    return this.http.post<Registration>(environment.apiHost + "passenger", 
    {
      name: registration.name,
      surname: registration.surname,
      telephoneNumber : registration.telephoneNumber,
      email: registration.email,
      address: registration.address,
      password: registration.password
    },{"headers": this.headers})
  }

  activatePassenger(activationId: number): Observable<Message> {
    return this.http.get<Message>(environment.apiHost + "passenger/activate/"+ activationId, 
    {"headers": this.headers})
  }

  registerDriver(registration: Registration): Observable<Registration> {
    return this.http.post<Registration>(environment.apiHost + "driver", 
    {
      name: registration.name,
      surname: registration.surname,
      telephoneNumber : registration.telephoneNumber,
      email: registration.email,
      address: registration.address,
      password: registration.password
    })
  }
}