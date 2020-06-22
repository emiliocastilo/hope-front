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
import { DiagnosisComponent } from './patients/components/diagnosis/diagnosis.component';
import { ComplementaryImagingScansComponent } from './patients/components/complementary-imaging-scans/complementary-imaging-scans.component';
import { AdherenceToTreatmentComponent } from './patients/components/adherence-to-treatment/adherence-to-treatment.component';
import { ConsentComponent } from './patients/components/consent/consent.component';
import { FamilyHistoryComponent } from './patients/components/family-history/family-history.component';

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
    path: 'patients/general-patient-data',
    component: GeneralPatientDataComponent,
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
    path: 'patients/tracing',
    component: TracingComponent,
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
    path: 'patients/adherence-to-treatment',
    component: AdherenceToTreatmentComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PathologyRoutingModule {}
