import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientsIndicationComponent } from './modules/derma/components/diagnosis/patients-indication/patients-indication.component';
import { PatientsIndicationResolverService } from '../management/services/patients-indication/patients-indication-resolver.service';
import { CieComponent } from './modules/derma/components/diagnosis/cie/cie.component';
import { PatientsTreatmentComponent } from './modules/derma/components/diagnosis/patients-treatment/patients-treatment.component';
import { PatientsCombinedTreatmentsComponent } from './modules/derma/components/diagnosis/patients-combined-treatments/patients-combined-treatments.component';
import { NumberChangesBiologicalTreatmentComponent } from './modules/derma/components/diagnosis/number-changes-biological-treatment/number-changes-biological-treatment.component';
import { BiologicalTreatmentFrequencyComponent } from './modules/derma/components/biological-treatment-frequency/biological-treatment-frequency.component';
import { ConsumptionBiologicalTreatmentComponent } from './components/pharmacoeconomic/consumption-biological-treatment/consumption-biological-treatment.component';
import { TotalExpensesBiologicalTreatmentComponent } from './components/pharmacoeconomic/total-expenses-biological-treatment/total-expenses-biological-treatment.component';
import { HeatlhOutcomesComponent } from './modules/derma/components/health-outcomes/health-outcomes.component';
import { TreatmentsPatientsComponent } from './components/treatments/treatments-patients/treatments-patients.component';
import { TreatmentsAgentsComponent } from './modules/derma/components/treatment/treatments-agents/treatments-agents.component';
import { DiagnosisReasonsComponent } from './modules/derma/components/diagnosis/reasons/diagnosis-reasons.component';
import { PatientsVihLevelsComponent } from './modules/vih/components/clinic/patients-vih-levels/patients-vih-levels.component';
import { PatientTreatmentsVihChangeComponent } from './modules/vih/components/clinic/patient-treatments-vih-change/patient-treatments-vih-change.component';
import { PatientExpensesVihComponent } from './modules/vih/components/pharmaeconomic/patient-expenses-vih/patient-expenses-vih.component';
import { GuidelinesExpensesVihComponent } from './modules/vih/components/pharmaeconomic/guidelines-expenses-vih/guidelines-expenses-vih.component';
import { TreatmentInfoVihComponent } from './components/vih/treatment-info-vih/treatment-info-vih.component';

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
    {
        path: 'treatments-vih',
        component: TreatmentInfoVihComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
