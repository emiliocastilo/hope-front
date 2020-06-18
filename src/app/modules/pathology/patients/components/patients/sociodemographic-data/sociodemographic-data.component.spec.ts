import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SociodemographicDataComponent } from './sociodemographic-data.component';

describe('SociodemographicDataComponent', () => {
  let component: SociodemographicDataComponent;
  let fixture: ComponentFixture<SociodemographicDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SociodemographicDataComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SociodemographicDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
