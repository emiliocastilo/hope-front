import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { MedicListComponent } from './medic-list/medic-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideBarResolverService } from 'src/app/core/services/side-bar/side-bar-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: MedicListComponent,
    resolve: {
      menu: SideBarResolverService,
    },
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicRoutingModule { }
