import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FromTitleComponent } from './from-title.component';

describe('FromTitleComponent', () => {
  let component: FromTitleComponent;
  let fixture: ComponentFixture<FromTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FromTitleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FromTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
