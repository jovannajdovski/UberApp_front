import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFormComponent } from './signup-form.component';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "../../../../../infrastructure/material.module";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MapModule} from "../../../map/map.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, MaterialModule, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [ SignupFormComponent ]
    })
    .compileComponents();

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
});
