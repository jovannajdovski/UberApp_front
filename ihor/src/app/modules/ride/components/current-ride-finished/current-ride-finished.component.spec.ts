import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRideFinishedComponent } from './current-ride-finished.component';

describe('CurrentRideFinishedComponent', () => {
  let component: CurrentRideFinishedComponent;
  let fixture: ComponentFixture<CurrentRideFinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentRideFinishedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentRideFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
