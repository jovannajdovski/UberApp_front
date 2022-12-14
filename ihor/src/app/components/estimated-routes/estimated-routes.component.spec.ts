import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatedRoutesComponent } from './estimated-routes.component';

describe('EstimatedRoutesComponent', () => {
  let component: EstimatedRoutesComponent;
  let fixture: ComponentFixture<EstimatedRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimatedRoutesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstimatedRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
