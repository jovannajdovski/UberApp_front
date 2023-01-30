import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverStatisticsComponent } from './driver-statistics.component';

describe('DriverStatisticsComponent', () => {
  let component: DriverStatisticsComponent;
  let fixture: ComponentFixture<DriverStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
