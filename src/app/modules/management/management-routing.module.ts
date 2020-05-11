import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { ManagementComponent } from './components/management/management.component';
import { RoleManagementComponent } from './components/role-management/role-management.component';
import { MedicsComponent } from './components/medic/medics.component';
import { HospitalResolverService } from 'src/app/core/services/hospital/hospital-resolver.service';
import { MedicResolverService } from './services/medic/medic-resolver.service';
import { SideBarResolverService } from 'src/app/core/services/side-bar/side-bar-resolver.service';
import { ServiceResolverService } from 'src/app/core/services/service/service-resolver.service';
import { PatientsComponent } from './components/patients/patients.component';
import { PatientsResolverService } from './services/patients/patients-resolver.service';

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
];

@NgModule({
  imports: [],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
