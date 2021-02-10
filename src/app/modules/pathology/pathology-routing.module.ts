import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { HospitalResolverService } from 'src/app/core/services/hospital/hospital-resolver.service';
import { PatientsResolverService } from '../management/services/patients/patients-resolver.service';
import { PatientsComponent } from './components/patients/patients.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';

const routes: Routes = [
    {
        path: 'patients',
        component: PatientsComponent,
        resolve: {
            hospitals: HospitalResolverService,
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'personal-information',
        component: PersonalInformationComponent,
        resolve: {
            patients: PatientsResolverService,
        },
        canActivate: [AuthGuard],
    },
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
export class PathologyRoutingModule { }
