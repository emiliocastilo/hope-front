import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { HospitalResolverService } from 'src/app/core/services/hospital/hospital-resolver.service';
import { PatientsResolverService } from 'src/app/modules/management/services/patients/patients-resolver.service';
import { DashboardPatientsComponent } from './components/dashboard-patients/dashboard-patients.component';
import { ComorbiditiesComponent } from './components/diagnosis/comorbidities/comorbidities.component';
import { DiagnosisComponent } from './components/diagnosis/diagnosis.component';
import { DynamicFormComponentComponent } from './components/dynamic-form-component/dynamic-form-component.component';
import { EavPaseComponent } from './components/eav-pase/eav-pase.component';
import { DlqiComponent } from './components/evolution-clinical-indices/dlqi/dlqi.component';
import { EvolutionClinicalIndicesComponent } from './components/evolution-clinical-indices/evolution-clinical-indices.component';
import { NapsiComponent } from './components/evolution-clinical-indices/napsi/napsi.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PasiBsaPgaComponent } from './components/pasi-bsa-pga/pasi-bsa-pga.component';
import { PatientsComponent } from './components/patients/patients.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { PhototherapyComponent } from './components/phototherapy/phototherapy.component';
import { PrincipalTreatmentComponent } from './components/principal-treatment/principal-treatment.component';

const routes: Routes = [
    {
        path: 'patients',
        component: PatientsComponent,
        resolve: {
            hospitals: HospitalResolverService,
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'personal-information',
        component: PersonalInformationComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'dashboard',
        component: DashboardPatientsComponent,
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
        path: 'family-history',
        component: DynamicFormComponentComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'sociodemographic-data',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'physical-condition',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'consumption-habits',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
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
        path: 'diagnosis/principal-diagnosis',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'diagnosis/principal-diagnosis-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'diagnosis/secundary-diagnosis',
        component: DynamicFormComponentComponent,
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
        path: 'diagnosis/comorbidities',
        component: ComorbiditiesComponent,
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
        path: 'evolution-clinical-indices/pasi-bsa-pga',
        component: PasiBsaPgaComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'tracing',
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
        path: 'complementary-imaging-scans',
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
        path: 'adherence-to-treatment-morisky',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'adherence-to-treatment-haynes',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'consent',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'blood-count',
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
        path: 'work-groups',
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
        path: 'adherence-to-treatment-SMAQ',
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
        path: 'cardiovascular-risk',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'risk-factors',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'gynecology',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'metabolic-profile',
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
        path: 'kidney-liver-biochemistry',
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
        path: 'serology',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'leukocyte-antibody-antigen',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'biological-drug-monitoring',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'shared-patients',
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
    {
        path: 'phototherapy',
        component: PhototherapyComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'principal-treatment',
        component: PrincipalTreatmentComponent,
        canActivate: [AuthGuard],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DermatologyRoutingModule {}