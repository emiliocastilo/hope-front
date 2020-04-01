import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleLocalComponentComponent } from './example-local-component.component';

describe('ExampleLocalComponentComponent', () => {
  let component: ExampleLocalComponentComponent;
  let fixture: ComponentFixture<ExampleLocalComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleLocalComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleLocalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
