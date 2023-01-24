import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRideDetailComponent } from './driver-ride-detail.component';

describe('DriverRideDetailComponent', () => {
  let component: DriverRideDetailComponent;
  let fixture: ComponentFixture<DriverRideDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverRideDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverRideDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
