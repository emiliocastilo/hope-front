import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { HospitalResolverService } from 'src/app/core/services/hospital/hospital-resolver.service';
import { PatientsResolverService } from '../../../management/services/patients/patients-resolver.service';
import { PatientsComponent } from '../../patients/components/patients/patients.component';
import { VIHTreatmentsComponent } from './components/treatments/vih-treatments.component';

const routes: Routes = [
    {
        path: '',
        component: PatientsComponent,
        resolve: {
            hospitals: HospitalResolverService,
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'treatments/current',
        component: VIHTreatmentsComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VIHRoutingModule {}
