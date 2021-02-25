import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';

import { PatientTreatmentsVihChangeComponent } from './components/clinic/patient-treatments-vih-change/patient-treatments-vih-change.component';
import { PatientsVihLevelsComponent } from './components/clinic/patients-vih-levels/patients-vih-levels.component';
import { GuidelinesExpensesVihComponent } from './components/pharmaeconomic/guidelines-expenses-vih/guidelines-expenses-vih.component';
import { PatientExpensesVihComponent } from './components/pharmaeconomic/patient-expenses-vih/patient-expenses-vih.component';
import { TreatmentInfoVihComponent } from './components/treatment-info-vih/treatment-info-vih.component';

const routes: Routes = [
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
        path: 'treatments',
        component: TreatmentInfoVihComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VIHDashboardRoutingModule {}
