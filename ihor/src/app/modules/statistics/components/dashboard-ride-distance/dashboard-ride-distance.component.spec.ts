import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRideDistanceComponent } from './dashboard-ride-distance.component';

describe('DashboardRideDistanceComponent', () => {
  let component: DashboardRideDistanceComponent;
  let fixture: ComponentFixture<DashboardRideDistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardRideDistanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRideDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
