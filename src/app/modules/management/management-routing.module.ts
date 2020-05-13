import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { ManagementComponent } from './components/management/management.component';
import { RoleManagementComponent } from './components/role-management/role-management.component';
import { MedicsComponent } from './components/medics/medics.component';
import { HospitalResolverService } from 'src/app/core/services/hospital/hospital-resolver.service';
import { MedicResolverService } from './services/medic/medic-resolver.service';
import { ServiceResolverService } from 'src/app/core/services/service/service-resolver.service';
import { PatientsComponent } from './components/patients/patients.component';
import { PatientsResolverService } from './services/patients/patients-resolver.service';
import { DispensationsComponent } from './components/dispensations/dispensations.component';
import { DispensationResolverService } from './services/dispensation/dispensation-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'medics',
    component: MedicsComponent,
    resolve: {
      hospitals: HospitalResolverService,
      medics: MedicResolverService,
      services: ServiceResolverService,
    },
    canActivate: [AuthGuard],
  },
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
    path: 'role',
    component: RoleManagementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dispensations',
    component: DispensationsComponent,
    resolve: {
      dispensations: DispensationResolverService,
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
