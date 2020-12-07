import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhototherapyComponent } from './phototherapy.component';

describe('PhototherapyComponent', () => {
    let component: PhototherapyComponent;
    let fixture: ComponentFixture<PhototherapyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PhototherapyComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PhototherapyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
