import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { SideBarResolverService } from 'src/app/core/services/side-bar/side-bar-resolver.service';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';

const routes: Routes = [
  {
    path: 'patients',
    component: PatientsListComponent,
    resolve: {
      menu: SideBarResolverService,
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
