import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorModalFooterComponent } from './editor-modal-footer.component';

describe('EditorModalFooterComponent', () => {
  let component: EditorModalFooterComponent;
  let fixture: ComponentFixture<EditorModalFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorModalFooterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorModalFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
