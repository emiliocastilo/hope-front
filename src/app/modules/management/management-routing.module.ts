import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { HospitalResolverService } from 'src/app/core/services/hospital/hospital-resolver.service';
import { ServiceResolverService } from 'src/app/core/services/service/service-resolver.service';
import { ManagementComponent } from './components/management/management.component';
import { MedicsComponent } from './components/medic/medics.component';
import { PatientsComponent } from './components/patients/patients.component';
import { RoleManagementComponent } from './components/role-management/role-management.component';
import { SectionsComponent } from './components/sections/sections.component';
import { MedicResolverService } from './services/medic/medic-resolver.service';
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
  {
    path: 'sections',
    component: SectionsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
