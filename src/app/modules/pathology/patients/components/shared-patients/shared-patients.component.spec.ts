import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPatientsComponent } from './shared-patients.component';

describe('SharedPatientsComponent', () => {
  let component: SharedPatientsComponent;
  let fixture: ComponentFixture<SharedPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SharedPatientsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
