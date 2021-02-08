import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';

const routes: Routes = [
    {
        path: 'derma',
        loadChildren: () => import('./modules/dermatology/dermatology.module').then((m) => m.DermatologyModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'vih',
        loadChildren: () => import('./modules/vih/vih.module').then((m) => m.VIHModule),
        canActivate: [AuthGuard],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PathologyRoutingModule {}
