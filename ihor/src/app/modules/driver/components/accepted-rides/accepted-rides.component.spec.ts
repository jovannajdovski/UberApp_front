import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedRidesComponent } from './accepted-rides.component';

describe('AcceptedRidesComponent', () => {
  let component: AcceptedRidesComponent;
  let fixture: ComponentFixture<AcceptedRidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedRidesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptedRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
