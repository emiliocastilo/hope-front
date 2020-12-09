import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireAnalysisArtritisPsoriasicaComponent } from './questionnaire-analysis-artritis-psoriasica.component';

describe('TableComponent', () => {
    let component: QuestionnaireAnalysisArtritisPsoriasicaComponent;
    let fixture: ComponentFixture<QuestionnaireAnalysisArtritisPsoriasicaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuestionnaireAnalysisArtritisPsoriasicaComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuestionnaireAnalysisArtritisPsoriasicaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
