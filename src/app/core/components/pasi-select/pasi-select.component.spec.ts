import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasiSelectComponent } from './pasi-select.component';

describe('PasiSelectComponent', () => {
  let component: PasiSelectComponent;
  let fixture: ComponentFixture<PasiSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PasiSelectComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
