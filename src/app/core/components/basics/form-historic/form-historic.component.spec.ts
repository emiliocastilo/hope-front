import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHistoricComponent } from './form-historic.component';

describe('FormHistoricComponent', () => {
  let component: FormHistoricComponent;
  let fixture: ComponentFixture<FormHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormHistoricComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
