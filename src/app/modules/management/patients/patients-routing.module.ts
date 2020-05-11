import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HospitalResolverService } from 'src/app/core/services/hospital/hospital-resolver.service';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { SideBarResolverService } from 'src/app/core/services/side-bar/side-bar-resolver.service';
import { PatientsResolverService } from '../services/patients/patients-resolver.service';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [HospitalResolverService, PatientsResolverService],
})
export class PatientsRoutingModule {}
