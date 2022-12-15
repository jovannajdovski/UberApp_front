import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisteredUserRoutesComponent } from './unregistered-user-routes.component';

describe('UnregisteredUserRoutesComponent', () => {
  let component: UnregisteredUserRoutesComponent;
  let fixture: ComponentFixture<UnregisteredUserRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnregisteredUserRoutesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnregisteredUserRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
