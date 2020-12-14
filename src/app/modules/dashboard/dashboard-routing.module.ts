import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientsIndicationComponent } from './components/diagnosis/patients-indication/patients-indication.component';
import { PatientsIndicationResolverService } from '../management/services/patients-indication/patients-indication-resolver.service';
import { CieComponent } from './components/diagnosis/cie/cie.component';
import { PatientsTreatmentComponent } from './components/diagnosis/patients-treatment/patients-treatment.component';
import { PatientsCombinedTreatmentsComponent } from './components/diagnosis/patients-combined-treatments/patients-combined-treatments.component';
import { NumberChangesBiologicalTreatmentComponent } from './components/diagnosis/number-changes-biological-treatment/number-changes-biological-treatment.component';
import { BiologicalTreatmentFrequencyComponent } from './components/patient-dose/biological-treatment-frequency/biological-treatment-frequency.component';
import { ConsumptionBiologicalTreatmentComponent } from './components/pharmacoeconomic/consumption-biological-treatment/consumption-biological-treatment.component';
import { TotalExpensesBiologicalTreatmentComponent } from './components/pharmacoeconomic/total-expenses-biological-treatment/total-expenses-biological-treatment.component';
import { HeatlhOutcomesComponent } from './components/health-outcomes/health-outcomes.component';
import { TreatmentsPatientsComponent } from './components/treatments/treatments-patients/treatments-patients.component';
import { TreatmentsAgentsComponent } from './components/treatments/treatments-agents/treatments-agents.component';
import { DiagnosisReasonsComponent } from './components/diagnosis/reasons/diagnosis-reasons.component';
import { PatientsVihLevelsComponent } from './components/vih/clinical-information/patients-vih/patients-vih-levels/patients-vih-levels.component';
import { PatientTreatmentsVihChangeComponent } from './components/vih/clinical-information/patient-treatments-vih/patient-treatments-vih-change/patient-treatments-vih-change.component';
import { PatientExpensesVihComponent } from './components/vih/pharmaeconomic-vih/patient-expenses-vih/patient-expenses-vih.component';
import { GuidelinesExpensesVihComponent } from './components/vih/pharmaeconomic-vih/guidelines-expenses-vih/guidelines-expenses-vih.component';

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
    {
        path: 'clinic-info/patients',
        component: PatientsVihLevelsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'clinic-info/patient-treatments',
        component: PatientTreatmentsVihChangeComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'pharmaeconomic/patient-expenses',
        component: PatientExpensesVihComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'pharmaeconomic/guidelines-expenses',
        component: GuidelinesExpensesVihComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
