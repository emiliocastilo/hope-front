import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhototherapyModalComponent } from './phototherapy-modal.component';

describe('PhototherapyModalComponent', () => {
  let component: PhototherapyModalComponent;
  let fixture: ComponentFixture<PhototherapyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhototherapyModalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhototherapyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
