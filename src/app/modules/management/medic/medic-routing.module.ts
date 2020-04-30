import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { MedicListComponent } from './medic-list/medic-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideBarResolverService } from 'src/app/core/services/side-bar/side-bar-resolver.service';
import { ServiceResolverService } from 'src/app/core/services/service/service-resolver.service';
import { MedicResolverService } from 'src/app/core/services/medic/medic-resolver.service';
import { HospitalResolverService } from 'src/app/core/services/hospital/hospital-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: MedicListComponent,
    resolve: {
      hospitals: HospitalResolverService,
      medics: MedicResolverService,
      menu: SideBarResolverService,
      services: ServiceResolverService,
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    HospitalResolverService,
    MedicResolverService,
    ServiceResolverService,
  ],
})
export class MedicRoutingModule {}
