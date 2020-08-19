import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemicalAgentsComponent } from './chemical-agents.component';

describe('ChemicalAgentsComponent', () => {
  let component: ChemicalAgentsComponent;
  let fixture: ComponentFixture<ChemicalAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChemicalAgentsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemicalAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
