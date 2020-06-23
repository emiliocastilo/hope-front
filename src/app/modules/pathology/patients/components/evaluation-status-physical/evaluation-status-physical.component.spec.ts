import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EvaluationStatusPhysicalComponent } from './evaluation-status-physical.component';

describe('EvaluationStatusPhysicalComponent', () => {
  let component: EvaluationStatusPhysicalComponent;
  let fixture: ComponentFixture<EvaluationStatusPhysicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationStatusPhysicalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationStatusPhysicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
