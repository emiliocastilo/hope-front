import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdherenceToTreatmentComponent } from './adherence-to-treatment.component';

describe('AdherenceToTreatmentComponent', () => {
  let component: AdherenceToTreatmentComponent;
  let fixture: ComponentFixture<AdherenceToTreatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdherenceToTreatmentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdherenceToTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
