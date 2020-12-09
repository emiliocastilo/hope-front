import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientsIndicationComponent } from './components/diagnosis/patients-indication/patients-indication.component';
import { PatientsIndicationResolverService } from '../management/services/patients-indication/patients-indication-resolver.service';
import { CieComponent } from './components/diagnosis/cie/cie.component';
import { PatientsTreatmentComponent } from './components/diagnosis/patients-treatment/patients-treatment.component';
import { PatientsTreatmentsResolverService } from '../management/services/patients-treatments/patients-treatments-resolver.service';
import { BiologicalAgentsComponent } from './components/treatments/treatments-agents/biological-agents/biological-agents.component';
import { ChemicalAgentsComponent } from './components/treatments/treatments-agents/chemical-agents/chemical-agents.component';
import { PsoriasisPlacasComponent } from './components/treatments/treatments-patients/psoriasis-placas/psoriasis-placas.component';
import { PsoriasisPalmoPlantarComponent } from './components/treatments/treatments-patients/psoriasis-palmo-plantar/psoriasis-palmo-plantar.component';
import { EritrodermiaComponent } from './components/treatments/treatments-patients/eritrodermia/eritrodermia.component';
import { PsoriasisPustulosaComponent } from './components/treatments/treatments-patients/psoriasis-pustulosa/psoriasis-pustulosa.component';
import { PatientsByPasiComponent } from './components/health-outcomes/patients-by-pasi/patients-by-pasi.component';
import { PatientsByBsaComponent } from './components/health-outcomes/patients-by-bsa/patients-by-bsa.component';
import { PatientsByPgaComponent } from './components/health-outcomes/patients-by-pga/patients-by-pga.component';
import { PatientsByDlqiComponent } from './components/health-outcomes/patients-by-dlqi/patients-by-dlqi.component';
import { PatientsCombinedTreatmentsComponent } from './components/diagnosis/patients-combined-treatments/patients-combined-treatments.component';
import { ReasonLastChangeBiologicalTreatmentComponent } from './components/diagnosis/reasons/reason-last-change-biological-treatment/reason-last-change-biological-treatment.component';
import { ReasonStopBiologicalTreatmentComponent } from './components/diagnosis/reasons/reason-stop-biological-treatment/reason-stop-biological-treatment.component';
import { NumberChangesBiologicalTreatmentComponent } from './components/diagnosis/number-changes-biological-treatment/number-changes-biological-treatment.component';
import { ReasonChangeBiologicalTreatmentFiveYearsComponent } from './components/diagnosis/reasons/reason-change-biological-treatment-five-years/reason-change-biological-treatment-five-years.component';
import { ReasonStopBiologicalTreatmentFiveYearsrsComponent } from './components/diagnosis/reasons/reason-stop-biological-treatment-five-yearsrs/reason-stop-biological-treatment-five-yearsrs.component';
import { BiologicalTreatmentFrequencyComponent } from './components/patient-dose/biological-treatment-frequency/biological-treatment-frequency.component';
import { MonthlyConsuptionEurosComponent } from './components/pharmacoeconomic/consumption-biological-treatment/monthly-consuption-euros/monthly-consuption-euros.component';
import { AccumulatedAverageMonthlyConsuptionEurosComponent } from './components/pharmacoeconomic/consumption-biological-treatment/accumulated-average-monthly-consuption-euros/accumulated-average-monthly-consuption-euros.component';
import { AverageMonthlyConsuptionEurosComponent } from './components/pharmacoeconomic/consumption-biological-treatment/average-monthly-consuption-euros/average-monthly-consuption-euros.component';
import { AccumulatedMonthlyConsuptionEurosComponent } from './components/pharmacoeconomic/consumption-biological-treatment/accumulated-monthly-consuption-euros/accumulated-monthly-consuption-euros.component';
import { TotalExpensesComponent } from './components/pharmacoeconomic/total-expenses-biological-treatment/total-expenses/total-expenses.component';
import { AvgExpensesComponent } from './components/pharmacoeconomic/total-expenses-biological-treatment/avg-expenses/avg-expenses.component';
import { AvgAccumulatedExpensesComponent } from './components/pharmacoeconomic/total-expenses-biological-treatment/avg-accumulated-expenses/avg-accumulated-expenses.component';
import { AccumulatedExpensesComponent } from './components/pharmacoeconomic/total-expenses-biological-treatment/accumulated-expenses/accumulated-expenses.component';
import { ConsumptionBiologicalTreatmentComponent } from './components/pharmacoeconomic/consumption-biological-treatment/consumption-biological-treatment.component';
import { TotalExpensesBiologicalTreatmentComponent } from './components/pharmacoeconomic/total-expenses-biological-treatment/total-expenses-biological-treatment.component';
import { HeatlhOutcomesComponent } from './components/health-outcomes/health-outcomes.component';
import { TreatmentsPatientsComponent } from './components/treatments/treatments-patients/treatments-patients.component';
import { TreatmentsAgentsComponent } from './components/treatments/treatments-agents/treatments-agents.component';
import { DiagnosisReasonsComponent } from './components/diagnosis/reasons/diagnosis-reasons.component';
import { PatientsVihLevelsComponent } from './components/vih/clinical-information/patients-vih/patients-vih-levels/patients-vih-levels.component';
import { PatientTreatmentsVihChangeComponent } from './components/vih/clinical-information/patient-treatments-vih/patient-treatments-vih-change/patient-treatments-vih-change.component';
import { PatientExpensesVihComponent } from './components/vih/pharmaeconomic-vih/patient-expenses-vih/patient-expenses-vih.component';

const routes: Routes = [
    {
        path: 'pharmacoeconomic/consumption-biological-treatment',
        component: ConsumptionBiologicalTreatmentComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'accumulated-monthly-consuption-euros',
                component: AccumulatedMonthlyConsuptionEurosComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'monthly-consuption-euros',
                component: MonthlyConsuptionEurosComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'accumulated-avg-mon-con-eu',
                component: AccumulatedAverageMonthlyConsuptionEurosComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'avg-mon-con-eu',
                component: AverageMonthlyConsuptionEurosComponent,
                canActivate: [AuthGuard],
            },
        ],
    },
    {
        path: 'pharmacoeconomic/total-expenses-biological-treatment',
        component: TotalExpensesBiologicalTreatmentComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'total-expenses',
                component: TotalExpensesComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'accumulated-expenses',
                component: AccumulatedExpensesComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'avg-expenses',
                component: AvgExpensesComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'accumulated-avg-expenses',
                component: AvgAccumulatedExpensesComponent,
                canActivate: [AuthGuard],
            },
        ],
    },
    {
        path: 'health-outcomes',
        component: HeatlhOutcomesComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'patients-by-pasi',
                component: PatientsByPasiComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'patients-by-bsa',
                component: PatientsByBsaComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'patients-by-pga',
                component: PatientsByPgaComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'patients-by-dlqi',
                component: PatientsByDlqiComponent,
                canActivate: [AuthGuard],
            },
        ],
    },
    {
        path: 'treatments/treatments-agents',
        component: TreatmentsAgentsComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'biological-agents',
                component: BiologicalAgentsComponent,
                canActivate: [AuthGuard],
                data: {
                    type: 'BIOLOGICO',
                    indication: '',
                },
                resolve: {
                    patientsTreatments: PatientsTreatmentsResolverService,
                },
            },
            {
                path: 'chemical-agents',
                component: ChemicalAgentsComponent,
                canActivate: [AuthGuard],
                data: {
                    type: 'QUIMICO',
                    indication: '',
                },
                resolve: {
                    patientsTreatments: PatientsTreatmentsResolverService,
                },
            },
        ],
    },
    {
        path: 'treatments/treatments-patients',
        component: TreatmentsPatientsComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'psoriasis-placas',
                component: PsoriasisPlacasComponent,
                canActivate: [AuthGuard],
                data: {
                    type: 'BIOLOGICO',
                    indication: 'EN PLACAS',
                },
                resolve: {
                    patientsTreatments: PatientsTreatmentsResolverService,
                },
            },
            {
                path: 'psoriasis-palmo-plantar',
                component: PsoriasisPalmoPlantarComponent,
                canActivate: [AuthGuard],
                data: {
                    type: 'BIOLOGICO',
                    indication: 'PALMOPLANTAR',
                },
                resolve: {
                    patientsTreatments: PatientsTreatmentsResolverService,
                },
            },
            {
                path: 'eritrodermia',
                component: EritrodermiaComponent,
                canActivate: [AuthGuard],
                data: {
                    type: 'BIOLOGICO',
                    indication: 'ERITRODERMIA',
                },
                resolve: {
                    patientsTreatments: PatientsTreatmentsResolverService,
                },
            },
            {
                path: 'psoriasis-pustulosa',
                component: PsoriasisPustulosaComponent,
                canActivate: [AuthGuard],
                data: {
                    type: 'BIOLOGICO',
                    indication: 'PUSTULOSA',
                },
                resolve: {
                    patientsTreatments: PatientsTreatmentsResolverService,
                },
            },
        ],
    },
    {
        path: 'diagnosis/reasons',
        component: DiagnosisReasonsComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'reason-change-biological-treatment-five-years',
                component: ReasonChangeBiologicalTreatmentFiveYearsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'reason-stop-biological-treatment-five-years',
                component: ReasonStopBiologicalTreatmentFiveYearsrsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'reason-last-change-biological-treatment',
                component: ReasonLastChangeBiologicalTreatmentComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'reason-stop-bioligical-treatment',
                component: ReasonStopBiologicalTreatmentComponent,
                canActivate: [AuthGuard],
            },
        ],
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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
