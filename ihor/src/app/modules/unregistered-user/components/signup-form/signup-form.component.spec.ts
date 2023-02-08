import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFormComponent} from './signup-form.component';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "../../../../../infrastructure/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RegistrationService} from "../../services/registration/registration.service";


describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let registrationService: RegistrationService;
  let registrationServiceSpy: jasmine.Spy;
  const response  = {
    name: "Tupatupatu",
    surname: "Spasojevic",
    telephoneNumber: "1234567890",
    streetAddress: "Bulevar Stevana Gostojica 4.4",
    email: "gostoja@gmail.com",
    password: "nekaSifra123"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, MaterialModule, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [ SignupFormComponent ],
      // providers: [{provide:RegistrationService, useValue: registrationServiceSpy}]
      providers:[SignupFormComponent,RegistrationService]
    })
    .compileComponents();

    registrationService=TestBed.inject(RegistrationService);
    registrationServiceSpy = spyOn(registrationService, 'registerPassengerObs').and.returnValue(response);

    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should set submitted to true`, () => {
    component.signup();
    expect(component.submitted).toBeTruthy();
  });

  it(`should not call the signup method when button disabled`,() => {
    spyOn(component, 'signup');
    el = fixture.debugElement.query(By.css('#loginbtn')).nativeElement;
    el.click();
    expect(component.signup).toHaveBeenCalledTimes(0);
  });

  it(`form should be invalid for confirm password`, () => {
    component.signupForm.controls['name'].setValue('Tupa');
    component.signupForm.controls['surname'].setValue('Tupancic');
    component.signupForm.controls['phoneNumber'].setValue('3454353244');
    component.signupForm.controls['streetAddress'].setValue('DanilaKisa 32');
    component.signupForm.controls['email'].setValue('perrra@gmail.com');
    component.signupForm.controls['password'].setValue('NekaSifra123');
    component.signupForm.controls['confirmPassword'].setValue('SifraNeka123');
    expect(component.signupForm.valid).toBeFalsy();
  });

  it(`form should be invalid for wrong mail format`, () => {
    component.signupForm.controls['name'].setValue('Tupa');
    component.signupForm.controls['surname'].setValue('Tupancic');
    component.signupForm.controls['phoneNumber'].setValue('3454353244');
    component.signupForm.controls['streetAddress'].setValue('DanilaKisa 32');
    component.signupForm.controls['email'].setValue('grmljavina.com');
    component.signupForm.controls['password'].setValue('NekaSifra123');
    component.signupForm.controls['confirmPassword'].setValue('NekaSifra123');
    expect(component.signupForm.valid).toBeFalsy();
  });

  it(`form should be invalid for one empty field`, () => {
    component.signupForm.controls['name'].setValue('Tupa');
    component.signupForm.controls['surname'].setValue('Tupancic');
    component.signupForm.controls['phoneNumber'].setValue('3454353244');
    component.signupForm.controls['streetAddress'].setValue('');
    component.signupForm.controls['email'].setValue('grmljavina@gmail.com');
    component.signupForm.controls['password'].setValue('NekaSifra123');
    component.signupForm.controls['confirmPassword'].setValue('NekaSifra123');
    expect(component.signupForm.valid).toBeFalsy();
  });

  it(`form should be invalid for invalid phone number`, () => {
    component.signupForm.controls['name'].setValue('Tupa');
    component.signupForm.controls['surname'].setValue('Tupancic');
    component.signupForm.controls['phoneNumber'].setValue('miki milane sto mi nedas mira');
    component.signupForm.controls['streetAddress'].setValue('DanilaKisa 434');
    component.signupForm.controls['email'].setValue('pera@gmail.com');
    component.signupForm.controls['password'].setValue('NekaSifra123');
    component.signupForm.controls['confirmPassword'].setValue('NekaSifra123');
    expect(component.signupForm.valid).toBeFalsy();
  });

  it(`form should be valid`, () => {
    component.signupForm.controls['name'].setValue('Tupa');
    component.signupForm.controls['surname'].setValue('Tupancic');
    component.signupForm.controls['phoneNumber'].setValue('3454353244');
    component.signupForm.controls['streetAddress'].setValue('Danila Kisa 32');
    component.signupForm.controls['email'].setValue('grmljavina@gmail.com');
    component.signupForm.controls['password'].setValue('NekaSifra123');
    component.signupForm.controls['confirmPassword'].setValue('NekaSifra123');
    expect(component.signupForm.valid).toBeTruthy();
  });

  it(`form should be valid and request is sent`, () => {
    component.signupForm.controls['name'].setValue('Tupatupatu');
    component.signupForm.controls['surname'].setValue('Spasojevic');
    component.signupForm.controls['phoneNumber'].setValue('1234567890');
    component.signupForm.controls['streetAddress'].setValue('Bulevar Stevana Gostojica 4.4');
    component.signupForm.controls['email'].setValue('gostoja@gmail.com');
    component.signupForm.controls['password'].setValue('nekaSifra123');
    component.signupForm.controls['confirmPassword'].setValue('nekaSifra123');
    component.signup();
    // expect(component.signupForm.valid).toBeTruthy();
    expect(registrationServiceSpy).toHaveBeenCalled();

    const value = registrationServiceSpy.calls.mostRecent().returnValue;
    expect(value.email).toBe("gostoja@gmail.com");
  });

});
