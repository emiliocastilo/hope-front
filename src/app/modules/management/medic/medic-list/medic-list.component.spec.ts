import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicListComponent } from './medic-list.component';

describe('MedicListComponent', () => {
  let component: MedicListComponent;
  let fixture: ComponentFixture<MedicListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
