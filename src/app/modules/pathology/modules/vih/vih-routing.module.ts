import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicFormComponent } from 'src/app/core/components/dynamic/dynamic-form/dynamic-form.component';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { PatientsResolverService } from '../../../management/services/patients/patients-resolver.service';
import { DynamicFormComponentComponent } from '../dermatology/components/dynamic-form-component/dynamic-form-component.component';
import { VIHTreatmentsComponent } from './components/treatments/vih-treatments.component';
import { VihDashboardPatientsComponent } from './components/vih-dashboard-patients/vih-dashboard-patients.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: VihDashboardPatientsComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'treatments/current',
        component: VIHTreatmentsComponent,
        canActivate: [AuthGuard],
    },
    // ! PLANTILLAS ! //
    {
        path: 'diagnosis/principal-diagnosis-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'personal-information',
        component: DynamicFormComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'diagnosis/secundary-diagnosis-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'diagnosis/sexually-transmitted-diseases-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'tracing-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'complementary-imaging-scans-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'blood-count-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patient-situation-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'work-groups-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'sociodemographic-data-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'physical-condition-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'basic-urinalysis-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'other-analysis-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'serology-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'metabolic-profile-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'kidney-liver-biochemistry-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'shared-patients-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'comorbidities-coinfections-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'genotyping-resistances-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'viral-tropism-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VIHRoutingModule { }
