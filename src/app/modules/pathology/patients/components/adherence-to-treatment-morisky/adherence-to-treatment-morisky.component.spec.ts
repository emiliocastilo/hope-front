import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdherenceToTreatmentMoriskyComponent } from './adherence-to-treatment-morisky.component';

describe('AdherenceToTreatmentMoriskyComponent', () => {
  let component: AdherenceToTreatmentMoriskyComponent;
  let fixture: ComponentFixture<AdherenceToTreatmentMoriskyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdherenceToTreatmentMoriskyComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdherenceToTreatmentMoriskyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
