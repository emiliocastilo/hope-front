import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateFormComponent } from 'src/app/core/components/dynamic/template-form/template-form.component';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { PatientsResolverService } from 'src/app/modules/management/services/patients/patients-resolver.service';
import { DermathologyDashboardPatientsComponent } from './components/dashboard-patients/dermathology-dashboard-patients/dermathology-dashboard-patients.component';
import { ComorbiditiesComponent } from './components/diagnosis/comorbidities/comorbidities.component';
import { DiagnosisComponent } from './components/diagnosis/diagnosis.component';
import { EavPaseComponent } from './components/eav-pase/eav-pase.component';
import { DlqiComponent } from './components/evolution-clinical-indices/dlqi/dlqi.component';
import { EvolutionClinicalIndicesComponent } from './components/evolution-clinical-indices/evolution-clinical-indices.component';
import { NapsiComponent } from './components/evolution-clinical-indices/napsi/napsi.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PasiBsaPgaComponent } from './components/pasi-bsa-pga/pasi-bsa-pga.component';
import { PhototherapyComponent } from './components/phototherapy/phototherapy.component';
import { PrincipalTreatmentComponent } from './components/principal-treatment/principal-treatment.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: DermathologyDashboardPatientsComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'gallery',
        component: GalleryComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'diagnosis',
        component: DiagnosisComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'evolution-clinical-indices',
        component: EvolutionClinicalIndicesComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'evolution-clinical-indices/napsi',
        component: NapsiComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'diagnosis/comorbidities',
        component: ComorbiditiesComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'evolution-clinical-indices/pasi-bsa-pga',
        component: PasiBsaPgaComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'evolution-clinical-indices/eav-pase',
        component: EavPaseComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'evolution-clinical-indices/dlqi',
        component: DlqiComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'phototherapy',
        component: PhototherapyComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'principal-treatment',
        component: PrincipalTreatmentComponent,
        canActivate: [AuthGuard],
    },
    // ! PLANTILLAS ! //
    {
        path: 'personal-information',
        component: TemplateFormComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'family-history',
        component: TemplateFormComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'sociodemographic-data',
        component: TemplateFormComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'physical-condition',
        component: TemplateFormComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'consumption-habits',
        component: TemplateFormComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'diagnosis/principal-diagnosis',
        component: TemplateFormComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'diagnosis/secundary-diagnosis',
        component: TemplateFormComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'tracing',
        component: TemplateFormComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'complementary-imaging-scans',
        component: TemplateFormComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'adherence-to-treatment-morisky',
        component: TemplateFormComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'adherence-to-treatment-haynes',
        component: TemplateFormComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'consent',
        component: TemplateFormComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'blood-count',
        component: TemplateFormComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'work-groups',
        component: TemplateFormComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'adherence-to-treatment-SMAQ',
        component: TemplateFormComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'cardiovascular-risk',
        component: TemplateFormComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'risk-factors',
        component: TemplateFormComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'gynecology',
        component: TemplateFormComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'metabolic-profile',
        component: TemplateFormComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'kidney-liver-biochemistry',
        component: TemplateFormComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'serology',
        component: TemplateFormComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'leukocyte-antibody-antigen',
        component: TemplateFormComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'biological-drug-monitoring',
        component: TemplateFormComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'shared-patients',
        component: TemplateFormComponent,
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
export class DermatologyRoutingModule {}
