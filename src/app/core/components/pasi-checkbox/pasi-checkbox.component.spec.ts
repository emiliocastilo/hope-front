import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasiCheckboxComponent } from './pasi-checkbox.component';

describe('PasiCheckboxComponent', () => {
  let component: PasiCheckboxComponent;
  let fixture: ComponentFixture<PasiCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PasiCheckboxComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasiCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
