import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonNailsComponent } from './button-nails.component';

describe('buttonNailsComponentComponent', () => {
  let component: ButtonNailsComponent;
  let fixture: ComponentFixture<ButtonNailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonNailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonNailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
