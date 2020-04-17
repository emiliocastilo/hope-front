import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/services/guard/auth.guard';
import { HomeComponent } from './core/components/home/home.component';
import { SideBarResolverService } from './core/services/side-bar/side-bar-resolver.service';
import { HomeDashboardResolverService } from './core/services/home-dashboard/home-dashboard-resolver.service';
import { ResetPasswordComponent } from './core/components/reset-password/reset-password.component';
import { SelectRoleComponent } from './core/components/select-role/select-role.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      menu: SideBarResolverService,
      homeDashboard: HomeDashboardResolverService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'select-role',
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
