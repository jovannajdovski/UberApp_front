import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRideDetailComponent } from './admin-ride-detail.component';

describe('AdminRideDetailComponent', () => {
  let component: AdminRideDetailComponent;
  let fixture: ComponentFixture<AdminRideDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRideDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRideDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
