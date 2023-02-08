import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { AddDriverDialogComponent } from './add-driver-dialog.component';

describe('AddDriverDialogComponent', () => {
  let component: AddDriverDialogComponent;
  let fixture: ComponentFixture<AddDriverDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDriverDialogComponent ],
      imports: [MatDialogModule],
      providers: [{provide: MatDialogRef}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDriverDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
