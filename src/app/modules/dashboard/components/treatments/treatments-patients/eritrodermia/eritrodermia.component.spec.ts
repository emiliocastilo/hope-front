import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EritrodermiaComponent } from './eritrodermia.component';

describe('EritrodermiaComponent', () => {
    let component: EritrodermiaComponent;
    let fixture: ComponentFixture<EritrodermiaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EritrodermiaComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EritrodermiaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
