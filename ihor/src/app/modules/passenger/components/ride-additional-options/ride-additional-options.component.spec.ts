import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideAdditionalOptionsComponent } from './ride-additional-options.component';

describe('RideAdditionalOptionsComponent', () => {
  let component: RideAdditionalOptionsComponent;
  let fixture: ComponentFixture<RideAdditionalOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideAdditionalOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideAdditionalOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
