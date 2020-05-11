import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { PatientsListComponent } from '../management/patients/components/patients-list/patients-list.component';
import { HospitalResolverService } from 'src/app/core/services/hospital/hospital-resolver.service';
import { SideBarResolverService } from 'src/app/core/services/side-bar/side-bar-resolver.service';
import { PatientsResolverService } from '../management/services/patients/patients-resolver.service';

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
})
export class DermatologyRoutingModule {}
