import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { ManagementComponent } from './components/management/management.component';
import { RoleManagementComponent } from './components/role-management/role-management.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'medic',
    loadChildren: () =>
      import('./medic/medic.module').then((m) => m.MedicModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./patients/patients.module').then((m) => m.PatientsModule),
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
