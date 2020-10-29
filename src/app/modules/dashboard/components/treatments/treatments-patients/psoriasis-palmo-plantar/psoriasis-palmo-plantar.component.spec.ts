import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsoriasisPalmoPlantarComponent } from './psoriasis-palmo-plantar.component';

describe('PsoriasisPalmoPlantarComponent', () => {
  let component: PsoriasisPalmoPlantarComponent;
  let fixture: ComponentFixture<PsoriasisPalmoPlantarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PsoriasisPalmoPlantarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsoriasisPalmoPlantarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
