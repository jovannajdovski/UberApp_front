import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { PassengerCardComponent } from './passenger-card.component';

describe('PassengerCardComponent', () => {
  let component: PassengerCardComponent;
  let fixture: ComponentFixture<PassengerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerCardComponent ],
      imports: [MatDialogModule]

    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
