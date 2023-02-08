import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthService} from "./auth.service";
import {environment} from "../../../../environments/environment";

describe('LoginService', () => {
  let service: LoginService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule, HttpClientTestingModule]
    });
    service = TestBed.inject(LoginService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    localStorage.removeItem('user');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  //login(auth: Credentials): Observable<Token>
  it('should send a POST request to the server with the credentials', () => {
    const credentials = { email: 'driver@gmail.com', password: 'NekaSifra123' };

    service.login(credentials).subscribe();

    const req = httpTestingController.expectOne(environment.apiHost + 'user/login');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({
      email: credentials.email,
      password: credentials.password
    });
    req.flush({});
  });

  it('should return an Observable of type Token', () => {
    const credentials = { email: 'driver@gmail.com', password: 'NekaSifra123' };
    const token = { accessToken: 'dfghdfgdfgdfg',
      refreshToken: 'dfghdfgdfgdfg' };

    service.login(credentials).subscribe(res => {
      expect(res).toEqual(token);
    });

    const req = httpTestingController.expectOne(environment.apiHost + 'user/login');
    req.flush(token);
  });
});
