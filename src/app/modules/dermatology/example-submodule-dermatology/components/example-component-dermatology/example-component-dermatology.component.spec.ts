import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleComponentDermatologyComponent } from './example-component-dermatology.component';

describe('ExampleComponentDermatologyComponent', () => {
  let component: ExampleComponentDermatologyComponent;
  let fixture: ComponentFixture<ExampleComponentDermatologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleComponentDermatologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleComponentDermatologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
