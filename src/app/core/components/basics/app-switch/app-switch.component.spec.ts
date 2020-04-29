import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSwitchComponent } from './app-switch.component';

describe('AppSwitchComponent', () => {
  let component: AppSwitchComponent;
  let fixture: ComponentFixture<AppSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
