/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormAccordionComponent } from './form-accordion.component';

describe('FormAccordionComponent', () => {
    let component: FormAccordionComponent;
    let fixture: ComponentFixture<FormAccordionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormAccordionComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormAccordionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
