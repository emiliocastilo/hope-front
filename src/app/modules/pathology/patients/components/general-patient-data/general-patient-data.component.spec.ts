import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralPatientDataComponent } from './general-patient-data.component';

describe('GeneralPatientDataComponent', () => {
  let component: GeneralPatientDataComponent;
  let fixture: ComponentFixture<GeneralPatientDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralPatientDataComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralPatientDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
