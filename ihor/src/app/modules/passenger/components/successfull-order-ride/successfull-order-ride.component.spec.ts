import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfullOrderRideComponent } from './successfull-order-ride.component';

describe('SuccessfullOrderRideComponent', () => {
  let component: SuccessfullOrderRideComponent;
  let fixture: ComponentFixture<SuccessfullOrderRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfullOrderRideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessfullOrderRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
