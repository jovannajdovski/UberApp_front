import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../../../environments/environment";

describe('AuthService', () => {
  let service: AuthService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule, HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    localStorage.removeItem('user');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // isLoggedIn()
  it("should return user is logged in", () => {
    localStorage.setItem('user',"user");
    const logged=service.isLoggedIn();
    expect(logged).toEqual(true);
  });
  it("should return user is not logged in", () => {
    const logged=service.isLoggedIn();
    expect(logged).toEqual(false);
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
