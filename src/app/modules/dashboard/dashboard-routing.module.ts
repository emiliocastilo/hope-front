import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientsIndicationComponent } from './components/diagnosis/patients-indication/patients-indication.component';
import { PatientsIndicationResolverService } from '../management/services/patients-indication/patients-indication-resolver.service';
import { Cie9Component } from './components/diagnosis/cie9/cie9.component';
import { PatientsTreatmentComponent } from './components/diagnosis/patients-treatment/patients-treatment.component';
import { PatientsTreatmentsResolverService } from '../management/services/patients-treatments/patients-treatments-resolver.service';
import { BiologicalAgentsComponent } from './components/treatments/biological-agents/biological-agents.component';
import { ChemicalAgentsComponent } from './components/treatments/chemical-agents/chemical-agents.component';
import { PsoriasisPlacasComponent } from './components/treatments/psoriasis-placas/psoriasis-placas.component';
import { PsoriasisPalmoPlantarComponent } from './components/treatments/psoriasis-palmo-plantar/psoriasis-palmo-plantar.component';
import { EritrodermiaComponent } from './components/treatments/eritrodermia/eritrodermia.component';
import { PsoriasisPustulosaComponent } from './components/treatments/psoriasis-pustulosa/psoriasis-pustulosa.component';
import { PatientsByPasiComponent } from './components/healths-outcomes/patients-by-pasi/patients-by-pasi.component';
import { PatientsByBsaComponent } from './components/healths-outcomes/patients-by-bsa/patients-by-bsa.component';
import { PatientsByPgaComponent } from './components/healths-outcomes/patients-by-pga/patients-by-pga.component';
import { PatientsByDlqiComponent } from './components/healths-outcomes/patients-by-dlqi/patients-by-dlqi.component';
import { PatientsCombinedTreatmentsComponent } from './components/diagnosis/patients-combined-treatments/patients-combined-treatments.component';
import { ReasonLastChangeBiologicalTreatmentComponent } from './components/diagnosis/reason-last-change-biological-treatment/reason-last-change-biological-treatment.component';
import { ReasonStopBiologicalTreatmentComponent } from './components/diagnosis/reason-stop-biological-treatment/reason-stop-biological-treatment.component';
import { NumberChangesBiologicalTreatmentComponent } from './components/diagnosis/number-changes-biological-treatment/number-changes-biological-treatment.component';
import { ReasonChangeBiologicalTreatmentFiveYearsComponent } from './components/diagnosis/reason-change-biological-treatment-five-years/reason-change-biological-treatment-five-years.component';
import { ReasonStopBiologicalTreatmentFiveYearsrsComponent } from './components/diagnosis/reason-stop-biological-treatment-five-yearsrs/reason-stop-biological-treatment-five-yearsrs.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
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
    path: 'diagnosis/cie9',
    component: Cie9Component,
    canActivate: [AuthGuard],
  },
  {
    path: 'diagnosis/patients-treatment',
    component: PatientsTreatmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'treatments/biological-agents',
    component: BiologicalAgentsComponent,
    canActivate: [AuthGuard],
    data: {
      type: 'BIOLOGICO'
    },
    resolve: {
      patientsTreatments: PatientsTreatmentsResolverService,
    }
  },
  {
    path: 'treatments/chemical-agents',
    component: ChemicalAgentsComponent,
    canActivate: [AuthGuard],
    data: {
      type: 'QUIMICO'
    },
    resolve: {
      patientsTreatments: PatientsTreatmentsResolverService,
    },
  },
  {
    path: 'treatments/psoriasis-placas',
    component: PsoriasisPlacasComponent,
    canActivate: [AuthGuard],
    data: {
      type: 'EN PLACAS'
    },
    resolve: {
      patientsTreatments: PatientsTreatmentsResolverService,
    },
  },
  {
    path: 'treatments/psoriasis-palmo-plantar',
    component: PsoriasisPalmoPlantarComponent,
    canActivate: [AuthGuard],
    data: {
      type: 'PALMOPLANTAR'
    },
    resolve: {
      patientsTreatments: PatientsTreatmentsResolverService,
    },
  },
  {
    path: 'treatments/eritrodermia',
    component: EritrodermiaComponent,
    canActivate: [AuthGuard],
    data: {
      type: 'ERITRODERMIA'
    },
    resolve: {
      patientsTreatments: PatientsTreatmentsResolverService,
    },
  },
  {
    path: 'treatments/psoriasis-pustulosa',
    component: PsoriasisPustulosaComponent,
    canActivate: [AuthGuard],
    data: {
      type: 'PSORIASIS PULTULOSA'
    },
    resolve: {
      patientsTreatments: PatientsTreatmentsResolverService,
    },
  },
  {
    path: 'healths-outcomes/patients-by-pasi',
    component: PatientsByPasiComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'healths-outcomes/patients-by-bsa',
    component: PatientsByBsaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'healths-outcomes/patients-by-pga',
    component: PatientsByPgaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'healths-outcomes/patients-by-dlqi',
    component: PatientsByDlqiComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'diagnosis/patients-combined-treatments',
    component: PatientsCombinedTreatmentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'diagnosis/reason-last-change-biological-treatment',
    component: ReasonLastChangeBiologicalTreatmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'diagnosis/reason-stop-bioligical-treatment',
    component: ReasonStopBiologicalTreatmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'diagnosis/number-changes-biological-treatment',
    component: NumberChangesBiologicalTreatmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'diagnosis/reason-change-biological-treatment-five-years',
    component: ReasonChangeBiologicalTreatmentFiveYearsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'diagnosis/reason-stop-biological-treatment-five-years',
    component: ReasonStopBiologicalTreatmentFiveYearsrsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
