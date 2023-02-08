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




});
