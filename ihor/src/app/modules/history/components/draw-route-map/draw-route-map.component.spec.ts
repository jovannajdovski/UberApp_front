import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawRouteMapComponent } from './draw-route-map.component';

describe('DrawRouteMapComponent', () => {
  let component: DrawRouteMapComponent;
  let fixture: ComponentFixture<DrawRouteMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawRouteMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawRouteMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
