import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cie9Component } from './cie9.component';

describe('Cie9Component', () => {
  let component: Cie9Component;
  let fixture: ComponentFixture<Cie9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Cie9Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cie9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
