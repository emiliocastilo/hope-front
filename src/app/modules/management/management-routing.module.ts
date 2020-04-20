import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { ManagementComponent } from './components/management/management.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'medic',
    loadChildren: () => import('./medic/medic.module')
      .then(m => m.MedicModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
