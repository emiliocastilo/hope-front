import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule, createTranslateLoader } from 'src/app/core/core.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { DashboardRoutingModule } from 'src/app/modules/dashboard/dashboard-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientsIndicationComponent } from './modules/derma/components/diagnosis/patients-indication/patients-indication.component';
import { PatientsTreatmentComponent } from './modules/derma/components/diagnosis/patients-treatment/patients-treatment.component';
import { PatientsCombinedTreatmentsComponent } from './modules/derma/components/diagnosis/patients-combined-treatments/patients-combined-treatments.component';
import { NumberChangesBiologicalTreatmentComponent } from './modules/derma/components/diagnosis/number-changes-biological-treatment/number-changes-biological-treatment.component';
import { BiologicalTreatmentFrequencyComponent } from './modules/derma/components/biological-treatment-frequency/biological-treatment-frequency.component';
import { CieComponent } from './modules/derma/components/diagnosis/cie/cie.component';
import { ConsumptionBiologicalTreatmentComponent } from './components/pharmacoeconomic/consumption-biological-treatment/consumption-biological-treatment.component';
import { TotalExpensesBiologicalTreatmentComponent } from './components/pharmacoeconomic/total-expenses-biological-treatment/total-expenses-biological-treatment.component';
import { HeatlhOutcomesComponent } from './modules/derma/components/health-outcomes/health-outcomes.component';
import { TreatmentsAgentsComponent } from './modules/derma/components/treatment/treatments-agents/treatments-agents.component';
import { TreatmentsPatientsComponent } from './components/treatments/treatments-patients/treatments-patients.component';
import { DiagnosisReasonsComponent } from './modules/derma/components/diagnosis/reasons/diagnosis-reasons.component';
import { PatientTreatmentsVihChangeComponent } from './modules/vih/components/clinic/patient-treatments-vih-change/patient-treatments-vih-change.component';
import { PatientsVihLevelsComponent } from './modules/vih/components/clinic/patients-vih-levels/patients-vih-levels.component';
import { GuidelinesExpensesVihComponent } from './modules/vih/components/pharmaeconomic/guidelines-expenses-vih/guidelines-expenses-vih.component';
import { PatientExpensesVihComponent } from './modules/vih/components/pharmaeconomic/patient-expenses-vih/patient-expenses-vih.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreatmentInfoVihComponent } from './components/vih/treatment-info-vih/treatment-info-vih.component';

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
        TreatmentInfoVihComponent,
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
