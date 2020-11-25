import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsPerPageComponent } from './results-per-page.component';

describe('ResultsPerPageComponent', () => {
  let component: ResultsPerPageComponent;
  let fixture: ComponentFixture<ResultsPerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsPerPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsPerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
