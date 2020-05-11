import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { ManagementComponent } from './components/management/management.component';
import { RoleManagementComponent } from './components/role-management/role-management.component';
import { MedicListComponent } from './medic/medic-list/medic-list.component';
import { HospitalResolverService } from 'src/app/core/services/hospital/hospital-resolver.service';
import { MedicResolverService } from './services/medic/medic-resolver.service';
import { SideBarResolverService } from 'src/app/core/services/side-bar/side-bar-resolver.service';
import { ServiceResolverService } from 'src/app/core/services/service/service-resolver.service';
import { PatientsListComponent } from './patients/patients-list/patients-list.component';
import { PatientsResolverService } from './services/patients/patients-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'medics',
    component: MedicListComponent,
    resolve: {
      hospitals: HospitalResolverService,
      medics: MedicResolverService,
      menu: SideBarResolverService,
      services: ServiceResolverService,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'patients',
    component: PatientsListComponent,
    resolve: {
      hospitals: HospitalResolverService,
      menu: SideBarResolverService,
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
