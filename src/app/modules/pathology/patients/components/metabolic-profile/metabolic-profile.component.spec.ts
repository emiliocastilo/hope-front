import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetabolicProfileComponent } from './metabolic-profile.component';

describe('MetabolicProfileComponent', () => {
  let component: MetabolicProfileComponent;
  let fixture: ComponentFixture<MetabolicProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MetabolicProfileComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetabolicProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
