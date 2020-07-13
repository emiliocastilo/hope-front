import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdherenceToTreatmentHaynesComponent } from './adherence-to-treatment-haynes.component';

describe('AdherenceToTreatmentHaynesComponent', () => {
  let component: AdherenceToTreatmentHaynesComponent;
  let fixture: ComponentFixture<AdherenceToTreatmentHaynesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdherenceToTreatmentHaynesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdherenceToTreatmentHaynesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
