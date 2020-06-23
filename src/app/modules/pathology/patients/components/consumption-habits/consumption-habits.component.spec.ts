import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsumptionHabitsComponent } from './consumption-habits.component';

describe('ConsumptionHabitsComponent', () => {
  let component: ConsumptionHabitsComponent;
  let fixture: ComponentFixture<ConsumptionHabitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumptionHabitsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumptionHabitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
