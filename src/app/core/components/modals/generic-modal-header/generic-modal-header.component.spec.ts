import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericModalHeaderComponent } from './generic-modal-header.component';

describe('EditorModalHeaderComponent', () => {
    let component: GenericModalHeaderComponent;
    let fixture: ComponentFixture<GenericModalHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GenericModalHeaderComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GenericModalHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
