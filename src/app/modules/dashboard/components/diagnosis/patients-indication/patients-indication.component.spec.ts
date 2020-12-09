import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsIndicationComponent } from './patients-indication.component';

describe('PatientsIndicationComponent', () => {
    let component: PatientsIndicationComponent;
    let fixture: ComponentFixture<PatientsIndicationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PatientsIndicationComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientsIndicationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
