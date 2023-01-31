import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverWorktimeComponent } from './driver-worktime.component';

describe('DriverWorktimeComponent', () => {
  let component: DriverWorktimeComponent;
  let fixture: ComponentFixture<DriverWorktimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverWorktimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverWorktimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
