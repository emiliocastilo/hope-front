import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule, createTranslateLoader } from 'src/app/core/core.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { DashboardRoutingModule } from 'src/app/modules/dashboard/dashboard-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientsIndicationComponent } from './components/diagnosis/patients-indication/patients-indication.component';
import { PatientsTreatmentComponent } from './components/diagnosis/patients-treatment/patients-treatment.component';
import { PatientsCombinedTreatmentsComponent } from './components/diagnosis/patients-combined-treatments/patients-combined-treatments.component';
import { NumberChangesBiologicalTreatmentComponent } from './components/diagnosis/number-changes-biological-treatment/number-changes-biological-treatment.component';
import { BiologicalTreatmentFrequencyComponent } from './components/patient-dose/biological-treatment-frequency/biological-treatment-frequency.component';
import { CieComponent } from './components/diagnosis/cie/cie.component';
import { ConsumptionBiologicalTreatmentComponent } from './components/pharmacoeconomic/consumption-biological-treatment/consumption-biological-treatment.component';
import { TotalExpensesBiologicalTreatmentComponent } from './components/pharmacoeconomic/total-expenses-biological-treatment/total-expenses-biological-treatment.component';
import { HeatlhOutcomesComponent } from './components/health-outcomes/health-outcomes.component';
import { TreatmentsAgentsComponent } from './components/treatments/treatments-agents/treatments-agents.component';
import { TreatmentsPatientsComponent } from './components/treatments/treatments-patients/treatments-patients.component';
import { DiagnosisReasonsComponent } from './components/diagnosis/reasons/diagnosis-reasons.component';
import { PatientsVihLevelsComponent } from './components/vih/clinical-information/patients-vih/patients-vih-levels/patients-vih-levels.component';
import { PatientTreatmentsVihChangeComponent } from './components/vih/clinical-information/patient-treatments-vih/patient-treatments-vih-change/patient-treatments-vih-change.component';
import { PatientExpensesVihComponent } from './components/vih/pharmaeconomic-vih/patient-expenses-vih/patient-expenses-vih.component';
import { GuidelinesExpensesVihComponent } from './components/vih/pharmaeconomic-vih/guidelines-expenses-vih/guidelines-expenses-vih.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ConsumptionBiologicalTreatmentComponent,
        TotalExpensesBiologicalTreatmentComponent,
        HeatlhOutcomesComponent,
        TreatmentsAgentsComponent,
        TreatmentsPatientsComponent,
        DiagnosisReasonsComponent,
        CieComponent,
        PatientsIndicationComponent,
        PatientsTreatmentComponent,
        PatientsCombinedTreatmentsComponent,
        NumberChangesBiologicalTreatmentComponent,
        BiologicalTreatmentFrequencyComponent,   
        PatientsVihLevelsComponent,
        PatientTreatmentsVihChangeComponent,
        PatientExpensesVihComponent,
        GuidelinesExpensesVihComponent,
    ],
    imports: [
        NgbModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        DashboardRoutingModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),
    ],
})
export class DashboardModule {}
