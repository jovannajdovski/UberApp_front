import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRideDetailsComponent } from './current-ride-details.component';

describe('CurrentRideDetailsComponent', () => {
  let component: CurrentRideDetailsComponent;
  let fixture: ComponentFixture<CurrentRideDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentRideDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentRideDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
