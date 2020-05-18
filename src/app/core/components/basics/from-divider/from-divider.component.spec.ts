import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FromDividerComponent } from './from-divider.component';

describe('FromDividerComponent', () => {
  let component: FromDividerComponent;
  let fixture: ComponentFixture<FromDividerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FromDividerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FromDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
