import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodCountComponent } from './blood-count.component';

describe('BloodCountComponent', () => {
  let component: BloodCountComponent;
  let fixture: ComponentFixture<BloodCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BloodCountComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
