import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./patients/patients.module')
      .then(m => m.PatientsModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DermatologyRoutingModule { }
