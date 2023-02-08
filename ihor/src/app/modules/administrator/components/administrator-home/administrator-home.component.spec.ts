import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { AdministratorHomeComponent } from './administrator-home.component';

describe('AdministratorHomeComponent', () => {
  let component: AdministratorHomeComponent;
  let fixture: ComponentFixture<AdministratorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministratorHomeComponent ]
      ,imports: [RouterModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministratorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
