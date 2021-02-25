import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsIndicationResolverService } from 'src/app/modules/management/services/patients-indication/patients-indication-resolver.service';
import { BiologicalTreatmentFrequencyComponent } from './components/biological-treatment-frequency/biological-treatment-frequency.component';
import { CieComponent } from './components/diagnosis/cie/cie.component';
import { NumberChangesBiologicalTreatmentComponent } from './components/diagnosis/number-changes-biological-treatment/number-changes-biological-treatment.component';
import { PatientsCombinedTreatmentsComponent } from './components/diagnosis/patients-combined-treatments/patients-combined-treatments.component';
import { PatientsIndicationComponent } from './components/diagnosis/patients-indication/patients-indication.component';
import { PatientsTreatmentComponent } from './components/diagnosis/patients-treatment/patients-treatment.component';
import { DiagnosisReasonsComponent } from './components/diagnosis/reasons/diagnosis-reasons.component';
import { HeatlhOutcomesComponent } from './components/health-outcomes/health-outcomes.component';
import { ConsumptionBiologicalTreatmentComponent } from './components/pharmaeconomic/consumption-biological-treatment/consumption-biological-treatment.component';
import { TotalExpensesBiologicalTreatmentComponent } from './components/pharmaeconomic/total-expenses-biological-treatment/total-expenses-biological-treatment.component';
import { TreatmentsAgentsComponent } from './components/treatment/treatments-agents/treatments-agents.component';
import { TreatmentsPatientsComponent } from './components/treatment/treatments-patients/treatments-patients.component';

const routes: Routes = [
    {
        path: 'pharmacoeconomic/consumption-biological-treatment',
        component: ConsumptionBiologicalTreatmentComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'pharmacoeconomic/total-expenses-biological-treatment',
        component: TotalExpensesBiologicalTreatmentComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'health-outcomes',
        component: HeatlhOutcomesComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'treatments/treatments-agents',
        component: TreatmentsAgentsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'treatments/treatments-patients',
        component: TreatmentsPatientsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'diagnosis/reasons',
        component: DiagnosisReasonsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'diagnosis/patients-indication',
        component: PatientsIndicationComponent,
        resolve: {
            patientsIndications: PatientsIndicationResolverService,
        },
    },
    {
        path: 'diagnosis/cie',
        component: CieComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'diagnosis/patients-treatment',
        component: PatientsTreatmentComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'diagnosis/patients-combined-treatments',
        component: PatientsCombinedTreatmentsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'diagnosis/number-changes-biological-treatment',
        component: NumberChangesBiologicalTreatmentComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'patient-dose/biological-treatment-frequency',
        component: BiologicalTreatmentFrequencyComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DermaDashboardRoutingModule {}
