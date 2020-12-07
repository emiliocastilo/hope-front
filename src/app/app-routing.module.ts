import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/services/guard/auth.guard';
import { HomeComponent } from './core/components/home/home.component';
import { ResetPasswordComponent } from './core/components/reset-password/reset-password.component';
import { SelectRoleComponent } from './core/components/select-role/select-role.component';
import { FormsComponent } from './core/components/forms/forms.component';
import { MyAccountComponent } from './core/components/my-account/my-account.component';
import { ContactComponent } from './core/components/contact/contact.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent,
    },
    {
        path: 'select-role',
        component: SelectRoleComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'forms',
        component: FormsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'my-account',
        component: MyAccountComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'contact',
        component: ContactComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'pathology',
        loadChildren: () => import('./modules/pathology/pathology.module').then((m) => m.PathologyModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'management',
        loadChildren: () => import('./modules/management/management.module').then((m) => m.ManagementModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthGuard],
    },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
