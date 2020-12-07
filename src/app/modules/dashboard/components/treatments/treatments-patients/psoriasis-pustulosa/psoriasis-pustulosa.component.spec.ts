import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsoriasisPustulosaComponent } from './psoriasis-pustulosa.component';

describe('PsoriasisPustulosaComponent', () => {
    let component: PsoriasisPustulosaComponent;
    let fixture: ComponentFixture<PsoriasisPustulosaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PsoriasisPustulosaComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PsoriasisPustulosaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
