import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EvolutionClinicalIndicesComponent } from './evolution-clinical-indices.component';

describe('EvolutionClinicalIndicesComponent', () => {
    let component: EvolutionClinicalIndicesComponent;
    let fixture: ComponentFixture<EvolutionClinicalIndicesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EvolutionClinicalIndicesComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EvolutionClinicalIndicesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
