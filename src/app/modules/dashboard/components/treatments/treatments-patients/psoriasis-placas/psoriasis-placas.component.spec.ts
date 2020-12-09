import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsoriasisPlacasComponent } from './psoriasis-placas.component';

describe('PsoriasisPlacasComponent', () => {
    let component: PsoriasisPlacasComponent;
    let fixture: ComponentFixture<PsoriasisPlacasComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PsoriasisPlacasComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PsoriasisPlacasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
