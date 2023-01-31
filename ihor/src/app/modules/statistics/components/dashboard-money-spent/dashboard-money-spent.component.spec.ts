import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMoneySpentComponent } from './dashboard-money-spent.component';

describe('DashboardMoneySpentComponent', () => {
  let component: DashboardMoneySpentComponent;
  let fixture: ComponentFixture<DashboardMoneySpentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMoneySpentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMoneySpentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
