import { CommonModule } from '@angular/common';
import { CoreModule, createTranslateLoader } from 'src/app/core/core.module';
import { DashboardRoutingModule } from 'src/app/modules/dashboard/dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { BiologicalTreatmentFrequencyComponent } from './components/biological-treatment-frequency/biological-treatment-frequency.component';
import { CieComponent } from './components/diagnosis/cie/cie.component';
import { ConsumptionBiologicalTreatmentComponent } from './components/pharmaeconomic/consumption-biological-treatment/consumption-biological-treatment.component';
import { DermaDashboardRoutingModule } from './derma-dashboard-routing.module';
import { DiagnosisReasonsComponent } from './components/diagnosis/reasons/diagnosis-reasons.component';
import { HeatlhOutcomesComponent } from './components/health-outcomes/health-outcomes.component';
import { NumberChangesBiologicalTreatmentComponent } from './components/diagnosis/number-changes-biological-treatment/number-changes-biological-treatment.component';
import { PatientsCombinedTreatmentsComponent } from './components/diagnosis/patients-combined-treatments/patients-combined-treatments.component';
import { PatientsIndicationComponent } from './components/diagnosis/patients-indication/patients-indication.component';
import { PatientsTreatmentComponent } from './components/diagnosis/patients-treatment/patients-treatment.component';
import { TotalExpensesBiologicalTreatmentComponent } from './components/pharmaeconomic/total-expenses-biological-treatment/total-expenses-biological-treatment.component';
import { TreatmentsAgentsComponent } from './components/treatment/treatments-agents/treatments-agents.component';
import { TreatmentsPatientsComponent } from './components/treatment/treatments-patients/treatments-patients.component';

@NgModule({
    declarations: [
        BiologicalTreatmentFrequencyComponent,
        CieComponent,
        ConsumptionBiologicalTreatmentComponent,
        DiagnosisReasonsComponent,
        HeatlhOutcomesComponent,
        NumberChangesBiologicalTreatmentComponent,
        PatientsCombinedTreatmentsComponent,
        PatientsIndicationComponent,
        PatientsTreatmentComponent,
        TotalExpensesBiologicalTreatmentComponent,
        TreatmentsAgentsComponent,
        TreatmentsPatientsComponent,
    ],
    imports: [
        CommonModule,
        CoreModule,
        DermaDashboardRoutingModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),
    ],
})
export class DermaDashboardModule { }
