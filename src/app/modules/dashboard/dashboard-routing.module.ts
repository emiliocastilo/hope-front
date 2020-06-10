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
import { PatientsByPasiComponent } from './components/healths-outcomes/patients-by-pasi/patients-by-pasi.component';
import { PatientsByBsaComponent } from './components/healths-outcomes/patients-by-bsa/patients-by-bsa.component';
import { PatientsByPgaComponent } from './components/healths-outcomes/patients-by-pga/patients-by-pga.component';
import { PatientsByDlqiComponent } from './components/healths-outcomes/patients-by-dlqi/patients-by-dlqi.component';

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
      type: 'biologico'
    },
    // resolve: {
    //   patientsTreatments: PatientsTreatmentsResolverService,
    // }
  },
  {
    path: 'treatments/chemical-agents',
    component: ChemicalAgentsComponent,
    canActivate: [AuthGuard],
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
