import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { PharmacyComponent } from './components/pharmacy/pharmacy.component';

const routes: Routes = [
    {
        path: '',
        component: PharmacyComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PharmacyRoutingModule {}
