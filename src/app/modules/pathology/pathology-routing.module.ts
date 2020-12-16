import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { HospitalResolverService } from 'src/app/core/services/hospital/hospital-resolver.service';
import { GalleryComponent } from './patients/components/gallery/gallery.component';
import { PatientsResolverService } from '../management/services/patients/patients-resolver.service';
import { PatientsComponent } from './patients/components/patients/patients.component';
import { PersonalInformationComponent } from './patients/components/personal-information/personal-information.component';
import { DashboardPatientsComponent } from './patients/components/dashboard-patients/dashboard-patients.component';
import { EavPaseComponent } from './patients/components/eav-pase/eav-pase.component';
import { DiagnosisComponent } from './patients/components/diagnosis/diagnosis.component';
import { ComorbiditiesComponent } from './patients/components/diagnosis/comorbidities/comorbidities.component';
import { EvolutionClinicalIndicesComponent } from './patients/components/evolution-clinical-indices/evolution-clinical-indices.component';
import { NapsiComponent } from './patients/components/evolution-clinical-indices/napsi/napsi.component';
import { PhototherapyComponent } from './patients/components/phototherapy/phototherapy.component';
import { PrincipalTreatmentComponent } from './patients/components/principal-treatment/principal-treatment.component';
import { PasiBsaPgaComponent } from './patients/components/pasi-bsa-pga/pasi-bsa-pga.component';
import { DlqiComponent } from './patients/components/evolution-clinical-indices/dlqi/dlqi.component';
import { DynamicFormComponentComponent } from './patients/components/dynamic-form-component/dynamic-form-component.component';
import { VihDashboardPatientsComponent } from './vih/vih-dashboard-patients/vih-dashboard-patients.component';

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
        path: 'patients/personal-information',
        component: PersonalInformationComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/dashboard',
        component: DashboardPatientsComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/gallery',
        component: GalleryComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/family-history',
        component: DynamicFormComponentComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/sociodemographic-data',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/physical-condition',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/consumption-habits',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/diagnosis',
        component: DiagnosisComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/evolution-clinical-indices',
        component: EvolutionClinicalIndicesComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/evolution-clinical-indices/napsi',
        component: NapsiComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/diagnosis/principal-diagnosis',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/diagnosis/principal-diagnosis-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/diagnosis/secundary-diagnosis',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/diagnosis/secundary-diagnosis-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/diagnosis/comorbidities',
        component: ComorbiditiesComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/diagnosis/sexually-transmitted-diseases-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/evolution-clinical-indices/pasi-bsa-pga',
        component: PasiBsaPgaComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/tracing',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/tracing-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/evolution-clinical-indices/eav-pase',
        component: EavPaseComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/evolution-clinical-indices/dlqi',
        component: DlqiComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/complementary-imaging-scans',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/complementary-imaging-scans-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/adherence-to-treatment-morisky',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/adherence-to-treatment-haynes',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/consent',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/blood-count',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/blood-count-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/work-groups',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/patient-situation-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/work-groups-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/sociodemographic-data-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/physical-condition-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/basic-urinalysis-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/other-analysis-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/adherence-to-treatment-SMAQ',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/serology-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/cardiovascular-risk',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/risk-factors',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/gynecology',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/metabolic-profile',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/metabolic-profile-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/kidney-liver-biochemistry',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/kidney-liver-biochemistry-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/serology',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/leukocyte-antibody-antigen',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/biological-drug-monitoring',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/shared-patients',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/shared-patients-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/comorbidities-coinfections-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/genotyping-resistances-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/viral-tropism-vih',
        component: DynamicFormComponentComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/phototherapy',
        component: PhototherapyComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/principal-treatment',
        component: PrincipalTreatmentComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'patients/dashboard-patient-vih',
        component: VihDashboardPatientsComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PathologyRoutingModule {}
