import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicListComponent } from './medic-list/medic-list.component';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: MedicListComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicRoutingModule { }
