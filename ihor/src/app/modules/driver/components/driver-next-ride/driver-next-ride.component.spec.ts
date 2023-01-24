import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverNextRideComponent } from './driver-next-ride.component';

describe('DriverNextRideComponent', () => {
  let component: DriverNextRideComponent;
  let fixture: ComponentFixture<DriverNextRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverNextRideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverNextRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
