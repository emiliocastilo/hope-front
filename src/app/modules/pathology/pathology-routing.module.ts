import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { HospitalResolverService } from 'src/app/core/services/hospital/hospital-resolver.service';
import { SideBarResolverService } from 'src/app/core/services/side-bar/side-bar-resolver.service';
<<<<<<< HEAD:src/app/modules/pathology/pathology-routing.module.ts
import { PatientsResolverService } from '../management/services/patients/patients-resolver.service';
import { PatientsComponent } from './patients/components/patients/patients.component';
import { DashboardComponent } from 'src/app/core/components/dashboard/dashboard.component';
=======
import { PatientsResolverService } from './services/patients-resolver.service';
import { DashboardPatientsComponent } from './components/dashboard-patients/dashboard-patients.component';
>>>>>>> Cuadro de mandos y componente pacientes:src/app/modules/dermatology/patients/patients-routing.module.ts

const routes: Routes = [
  {
    path: 'patients',
    component: PatientsComponent,
    resolve: {
      hospitals: HospitalResolverService,
      menu: SideBarResolverService,
      patients: PatientsResolverService,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'patients/dashboard',
<<<<<<< HEAD:src/app/modules/pathology/pathology-routing.module.ts
    component: DashboardComponent,
=======
    component: DashboardPatientsComponent,
    resolve: {
      menu: SideBarResolverService,
      patients: PatientsResolverService,
    },
>>>>>>> Cuadro de mandos y componente pacientes:src/app/modules/dermatology/patients/patients-routing.module.ts
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DermatologyRoutingModule {}
