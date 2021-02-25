import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';

const routes: Routes = [
    {
        path: 'derma',
        loadChildren: () => import('./modules/derma/derma-dashboard.module').then((m) => m.DermaDashboardModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'vih',
        loadChildren: () => import('./modules/vih/vih-dashboard.module').then((m) => m.VIHDashboardModule),
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
