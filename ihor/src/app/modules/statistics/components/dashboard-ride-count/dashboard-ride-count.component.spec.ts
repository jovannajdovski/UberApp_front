import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRideCountComponent } from './dashboard-ride-count.component';

describe('DashboardRideCountComponent', () => {
  let component: DashboardRideCountComponent;
  let fixture: ComponentFixture<DashboardRideCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardRideCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRideCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
