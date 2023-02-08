import {Injectable} from '@angular/core';
import {Registration} from "../components/signup-form/signup-form.component";


@Injectable()
export class RegistrationServiceMock {
  constructor() { }

  registerPassengerObs(registration: Registration) {
    return {
      name: "Tupatupatu",
      surname: "Spasojevic",
      telephoneNumber: "1234567890",
      streetAddress: "Bulevar Stevana Gostojica 4.4",
      email: "gostoja@gmail.com",
      password: "nekaSifra123"
    };

  }
}
