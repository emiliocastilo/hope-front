import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/services/guard/auth.guard';
import { ResetPasswordComponent } from './core/components/reset-password/reset-password.component';
import { SelectRoleComponent } from './core/components/select-role/select-role.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'app-select-role',
    component: SelectRoleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dermatology',
    loadChildren: () => import('./modules/dermatology/dermatology.module')
      .then(m => m.DermatologyModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
