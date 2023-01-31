import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteRechoiceComponent } from './route-rechoice.component';

describe('RouteRechoiceComponent', () => {
  let component: RouteRechoiceComponent;
  let fixture: ComponentFixture<RouteRechoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteRechoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteRechoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
