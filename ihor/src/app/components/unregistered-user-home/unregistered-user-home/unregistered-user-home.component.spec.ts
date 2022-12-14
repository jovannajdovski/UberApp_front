import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisteredUserHomeComponent } from './unregistered-user-home.component';

describe('UnregisteredUserHomeComponent', () => {
  let component: UnregisteredUserHomeComponent;
  let fixture: ComponentFixture<UnregisteredUserHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnregisteredUserHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnregisteredUserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
