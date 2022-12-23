import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Registration } from '../../components/signup-form/signup-form.component';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

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
    })
  }
}