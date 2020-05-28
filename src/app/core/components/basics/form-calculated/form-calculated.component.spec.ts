import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCalculatedComponent } from './form-calculated.component';

describe('FormCalculatedComponent', () => {
  let component: FormCalculatedComponent;
  let fixture: ComponentFixture<FormCalculatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormCalculatedComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCalculatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
