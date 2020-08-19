import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryMenuSelectComponent } from './entry-menu-select.component';

describe('EntryMenuSelectComponent', () => {
  let component: EntryMenuSelectComponent;
  let fixture: ComponentFixture<EntryMenuSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntryMenuSelectComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryMenuSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
