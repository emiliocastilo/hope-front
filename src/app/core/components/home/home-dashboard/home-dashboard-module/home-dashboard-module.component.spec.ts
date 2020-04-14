import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDashboardModuleComponent } from './home-dashboard-module.component';

describe('HomeDashboardModuleComponent', () => {
  let component: HomeDashboardModuleComponent;
  let fixture: ComponentFixture<HomeDashboardModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDashboardModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDashboardModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
