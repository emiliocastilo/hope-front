import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientsIndicationComponent } from './components/diagnosis/patients-indication/patients-indication.component';
import { PatientsIndicationResolverService } from '../management/services/patients-indication/patients-indication-resolver.service';
import { Cie9Component } from './components/diagnosis/cie9/cie9.component';
import { PatientsTreatmentComponent } from './components/diagnosis/patients-treatment/patients-treatment.component';
import { PatientsCombinedTreatmentsComponent } from './components/diagnosis/patients-combined-treatments/patients-combined-treatments.component';

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
    path: 'diagnosis/patients-combined-treatments',
    component: PatientsCombinedTreatmentsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
