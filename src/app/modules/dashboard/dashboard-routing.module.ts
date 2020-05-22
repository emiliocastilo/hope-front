import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Cie9Component } from './components/diagnosis/cie9/cie9.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'diagnosis/cie9',
    component: Cie9Component,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
