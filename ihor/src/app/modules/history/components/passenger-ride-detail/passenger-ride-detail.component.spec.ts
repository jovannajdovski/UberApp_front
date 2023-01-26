import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerRideDetailComponent } from './passenger-ride-detail.component';

describe('PassengerRideDetailComponent', () => {
  let component: PassengerRideDetailComponent;
  let fixture: ComponentFixture<PassengerRideDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerRideDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerRideDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
