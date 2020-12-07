import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatesBarComponent } from './dates-bar.component';

describe('DatesBarComponent', () => {
    let component: DatesBarComponent;
    let fixture: ComponentFixture<DatesBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DatesBarComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatesBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
