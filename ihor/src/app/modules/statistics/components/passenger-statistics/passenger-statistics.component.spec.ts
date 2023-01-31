import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerStatisticsComponent } from './passenger-statistics.component';

describe('PassengerStatisticsComponent', () => {
  let component: PassengerStatisticsComponent;
  let fixture: ComponentFixture<PassengerStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
