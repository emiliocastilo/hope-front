import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { HospitalResolverService } from 'src/app/core/services/hospital/hospital-resolver.service';
import { GalleryComponent } from './patients/components/gallery/gallery.component';
import { PatientsResolverService } from '../management/services/patients/patients-resolver.service';
import { PatientsComponent } from './patients/components/patients/patients.component';
import { DashboardPatientsComponent } from './patients/components/dashboard-patients/dashboard-patients.component';
import { SociodemographicDataComponent } from './patients/components/patients/sociodemographic-data/sociodemographic-data.component';

const routes: Routes = [
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
    path: 'patients/dashboard',
    component: DashboardPatientsComponent,
    resolve: {
      patients: PatientsResolverService,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'patients/gallery',
    component: GalleryComponent,

    canActivate: [AuthGuard],
  },
  {
    path: 'patients/sociodemographic-data',
    component: SociodemographicDataComponent,
    resolve: {
      patients: PatientsResolverService,
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PathologyRoutingModule {}
