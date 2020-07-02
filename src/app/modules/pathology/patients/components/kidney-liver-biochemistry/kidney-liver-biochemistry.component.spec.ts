import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KidneyLiverBiochemistryComponent } from './kidney-liver-biochemistry.component';

describe('KidneyLiverBiochemistryComponent', () => {
  let component: KidneyLiverBiochemistryComponent;
  let fixture: ComponentFixture<KidneyLiverBiochemistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KidneyLiverBiochemistryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KidneyLiverBiochemistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
