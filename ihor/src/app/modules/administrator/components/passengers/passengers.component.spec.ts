import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';

import { PassengersComponent } from './passengers.component';

describe('PassengersComponent', () => {
  let component: PassengersComponent;
  let fixture: ComponentFixture<PassengersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengersComponent ],
      imports: [HttpClientModule, MatFormFieldModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
