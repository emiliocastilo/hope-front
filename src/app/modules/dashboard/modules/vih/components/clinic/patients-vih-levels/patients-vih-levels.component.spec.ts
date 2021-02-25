import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsVihLevelsComponent } from './patients-vih-levels.component';

describe('PatientsVihLevelsComponent', () => {
    let component: PatientsVihLevelsComponent;
    let fixture: ComponentFixture<PatientsVihLevelsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PatientsVihLevelsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientsVihLevelsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
