import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidelinesExpensesVihComponent } from './guidelines-expenses-vih.component';

describe('GuidelinesExpensesVihComponent', () => {
    let component: GuidelinesExpensesVihComponent;
    let fixture: ComponentFixture<GuidelinesExpensesVihComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GuidelinesExpensesVihComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GuidelinesExpensesVihComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
