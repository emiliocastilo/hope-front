import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PrincipalDiagnosisComponent } from './secundary-diagnosis.component';

describe('PrincipalDiagnosisComponent', () => {
  let component: PrincipalDiagnosisComponent;
  let fixture: ComponentFixture<PrincipalDiagnosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrincipalDiagnosisComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
