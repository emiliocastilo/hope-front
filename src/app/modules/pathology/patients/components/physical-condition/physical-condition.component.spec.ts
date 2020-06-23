import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PhysicalConditionComponent } from './physical-condition.component';

describe('PhysicalConditionComponent', () => {
  let component: PhysicalConditionComponent;
  let fixture: ComponentFixture<PhysicalConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhysicalConditionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
