import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSpaceComponent } from './form-space.component';

describe('FromTitleComponent', () => {
    let component: FormSpaceComponent;
    let fixture: ComponentFixture<FormSpaceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormSpaceComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormSpaceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
