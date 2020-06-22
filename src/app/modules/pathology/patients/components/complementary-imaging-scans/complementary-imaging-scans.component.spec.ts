import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComplementaryImagingScansComponent } from './complementary-imaging-scans.component';

describe('ComplementaryImagingScansComponent', () => {
  let component: ComplementaryImagingScansComponent;
  let fixture: ComponentFixture<ComplementaryImagingScansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComplementaryImagingScansComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplementaryImagingScansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
