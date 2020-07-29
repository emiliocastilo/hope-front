import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { HospitalResolverService } from 'src/app/core/services/hospital/hospital-resolver.service';
import { GalleryComponent } from './patients/components/gallery/gallery.component';
import { PatientsResolverService } from '../management/services/patients/patients-resolver.service';
import { PatientsComponent } from './patients/components/patients/patients.component';
import { PersonalInformationComponent } from './patients/components/personal-information/personal-information.component';
import { DashboardPatientsComponent } from './patients/components/dashboard-patients/dashboard-patients.component';
import { SociodemographicDataComponent } from './patients/components/sociodemographic-data/sociodemographic-data.component';
import { GeneralPatientDataComponent } from './patients/components/general-patient-data/general-patient-data.component';
import { TracingComponent } from './patients/components/tracing/tracing.component';
import { EavPaseComponent } from './patients/components/eav-pase/eav-pase.component';
import { DiagnosisComponent } from './patients/components/diagnosis/diagnosis.component';
import { ComplementaryImagingScansComponent } from './patients/components/complementary-imaging-scans/complementary-imaging-scans.component';
import { AdherenceToTreatmentMoriskyComponent } from './patients/components/adherence-to-treatment-morisky/adherence-to-treatment-morisky.component';
import { AdherenceToTreatmentHaynesComponent } from './patients/components/adherence-to-treatment-haynes/adherence-to-treatment-haynes.component';
import { ConsentComponent } from './patients/components/consent/consent.component';
import { FamilyHistoryComponent } from './patients/components/family-history/family-history.component';
import { PhysicalConditionComponent } from './patients/components/physical-condition/physical-condition.component';
import { WorkGroupsComponent } from './patients/components/work-groups/work-groups.component';
import { ConsumptionHabitsComponent } from './patients/components/consumption-habits/consumption-habits.component';
import { PrincipalDiagnosisComponent } from './patients/components/diagnosis/principal-diagnosis/principal-diagnosis.component';
import { SecundaryDiagnosisComponent } from './patients/components/diagnosis/secundary-diagnosis/secundary-diagnosis.component';
import { ComorbiditiesComponent } from './patients/components/diagnosis/comorbidities/comorbidities.component';
import { BloodCountComponent } from './patients/components/blood-count/blood-count.component';
import { MetabolicProfileComponent } from './patients/components/metabolic-profile/metabolic-profile.component';
import { BiologicalDrugMonitoringComponent } from './patients/components/biological-drug-monitoring/biological-drug-monitoring.component';
import { LeukocyteAntibodyAntigenComponent } from './patients/components/leukocyte-antibody-antigen/leukocyte-antibody-antigen.component';
import { SerologyComponent } from './patients/components/serology/serology.component';
import { KidneyLiverBiochemistryComponent } from './patients/components/kidney-liver-biochemistry/kidney-liver-biochemistry.component';
import { SharedPatientsComponent } from './patients/components/shared-patients/shared-patients.component';
import { PasiBsaPgaComponent } from './patients/components/pasi-bsa-pga/pasi-bsa-pga.component';
import { DlqiComponent } from './patients/components/evolution-clinical-indices/dlqi/dlqi.component';

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
    component: FamilyHistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'patients/sociodemographic-data',
    component: SociodemographicDataComponent,
    resolve: {
      patients: PatientsResolverService,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'patients/physical-condition',
    component: PhysicalConditionComponent,
    resolve: {
      patients: PatientsResolverService,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'patients/consumption-habits',
    component: ConsumptionHabitsComponent,
    resolve: {
      patients: PatientsResolverService,
    },
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'patients/general-patient-data',
  //   component: GeneralPatientDataComponent,
  //   resolve: {
  //     patients: PatientsResolverService,
  //   },
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'patients/diagnosis',
    component: DiagnosisComponent,
    resolve: {
      patients: PatientsResolverService,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'patients/diagnosis/principal-diagnosis',
    component: PrincipalDiagnosisComponent,
    resolve: {
      patients: PatientsResolverService,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'patients/diagnosis/secundary-diagnosis',
    component: SecundaryDiagnosisComponent,
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
    path: 'patients/evolution-clinical-indices/pasi-bsa-pga',
    component: PasiBsaPgaComponent,
    resolve: {
      patients: PatientsResolverService,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'patients/tracing',
    component: TracingComponent,
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
    component: ComplementaryImagingScansComponent,
    resolve: {
      patients: PatientsResolverService,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'patients/morisky-green',
    component: AdherenceToTreatmentMoriskyComponent,
    resolve: {
      patients: PatientsResolverService,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'patients/haynes-sackett',
    component: AdherenceToTreatmentHaynesComponent,
    resolve: {
      patients: PatientsResolverService,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'patients/consent',
    component: ConsentComponent,
    resolve: {
      patients: PatientsResolverService,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'patients/blood-count',
    component: BloodCountComponent,
    resolve: {
      patients: PatientsResolverService,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'patients/work-groups',
    component: WorkGroupsComponent,
    resolve: {
      patients: PatientsResolverService,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'patients/metabolic-profile',
    component: MetabolicProfileComponent,
    resolve: {
      patients: PatientsResolverService,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'patients/kidney-liver-biochemistry',
    component: KidneyLiverBiochemistryComponent,
    resolve: {
      patients: PatientsResolverService,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'patients/serology',
    component: SerologyComponent,
    resolve: {
      patients: PatientsResolverService,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'patients/leukocyte-antibody-antigen',
    component: LeukocyteAntibodyAntigenComponent,
    resolve: {
      patients: PatientsResolverService,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'patients/biological-drug-monitoring',
    component: BiologicalDrugMonitoringComponent,
    resolve: {
      patients: PatientsResolverService,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'patients/shared-patients',
    component: SharedPatientsComponent,
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
export class PathologyRoutingModule {}
