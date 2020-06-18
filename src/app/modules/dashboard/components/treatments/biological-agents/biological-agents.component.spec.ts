import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiologicalAgentsComponent } from './biological-agents.component';

describe('BiologicalAgentsComponent', () => {
  let component: BiologicalAgentsComponent;
  let fixture: ComponentFixture<BiologicalAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BiologicalAgentsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiologicalAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
