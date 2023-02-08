import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {DebugElement} from "@angular/core";
import {RegistrationService} from "../../../unregistered-user/services/registration/registration.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "../../../../../infrastructure/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SignupFormComponent} from "../../../unregistered-user/components/signup-form/signup-form.component";
import {AuthService} from "../../services/auth.service";
import {By} from "@angular/platform-browser";
import {JwtHelperService} from "@auth0/angular-jwt";
import {LoginService} from "../../services/login.service";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let loginService: LoginService;
  let authServiceSpy: jasmine.Spy;
  const response  = {
    accessToken: "abcdefghi",
    refreshToken: "abcdefghi"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, MaterialModule, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [ LoginComponent ],
      // providers: [{provide:RegistrationService, useValue: registrationServiceSpy}]
      providers:[LoginComponent,AuthService]
    })
    .compileComponents();

    loginService=TestBed.inject(LoginService);
    authServiceSpy = spyOn(loginService, 'loginUserObs').and.returnValue(response);


    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`should set submitted to true`, () => {
    component.login();
    expect(component.submitted).toBeTruthy();
  });

  it(`should not call the login method when button disabled`,() => {
    spyOn(component, 'login');
    el = fixture.debugElement.query(By.css('#loginbtn')).nativeElement;
    el.click();
    expect(component.login).toHaveBeenCalledTimes(0);
  });

  it(`form should be invalid for short password`, () => {
    component.loginForm.controls['email'].setValue('perrra@gmail.com');
    component.loginForm.controls['password'].setValue('asd');
    expect(component.loginForm.valid).toBeFalsy();
  });
  it(`form should be invalid for empty mail`, () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('NekaSifra123');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it(`form should be invalid for wrong mail format`, () => {
    component.loginForm.controls['email'].setValue('grmljavina.com');
    component.loginForm.controls['password'].setValue('NekaSifra123');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it(`form should be valid`, () => {
    component.loginForm.controls['email'].setValue('perrra@gmail.com');
    component.loginForm.controls['password'].setValue('asdasdasd');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it(`form should be valid and request is sent`, () => {
    component.loginForm.controls['email'].setValue('perrra@gmail.com');
    component.loginForm.controls['password'].setValue('asdasdasd');
    expect(component.loginForm.valid).toBeTruthy();
    expect(authServiceSpy).toHaveBeenCalled();

    component.login();
    const value = authServiceSpy.calls.mostRecent().returnValue;
    expect(value.accessToken).toBe(response.accessToken);
  });
});
