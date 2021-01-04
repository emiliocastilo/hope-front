import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/guard/auth.guard';
import { HospitalResolverService } from 'src/app/core/services/hospital/hospital-resolver.service';
import { ServiceResolverService } from 'src/app/core/services/service/service-resolver.service';
import { DispensationsComponent } from './components/dispensations/dispensations.component';
import { ManagementComponent } from './components/management/management.component';
import { SectionsComponent } from './components/sections/sections.component';
import { DispensationResolverService } from './services/dispensation/dispensation-resolver.service';
import { UsersResolverService } from './services/medic/users-resolver.service';
import { PatientsResolverService } from './services/patients/patients-resolver.service';
import { RoleManagementResolverService } from './services/roles/role-management-resolver.service';
import { UsersComponent } from './components/users/users.component';
import { PatientsComponent } from './components/patients/patients.component';
import { RoleManagementComponent } from './components/role-management/role-management.component';
import { MedicinesComponent } from './components/medicines/medicines.component';
import { PharmacyComponent } from '../pharmacy/components/pharmacy/pharmacy.component';

const routes: Routes = [
    {
        path: '',
        component: ManagementComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'users',
        component: UsersComponent,
        resolve: {
            hospitals: HospitalResolverService,
            users: UsersResolverService,
            services: ServiceResolverService,
        },
        canActivate: [AuthGuard],
    },
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
        path: 'roles',
        component: RoleManagementComponent,
        resolve: {
            hospitals: HospitalResolverService,
            roles: RoleManagementResolverService,
            users: UsersResolverService,
            services: ServiceResolverService,
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'dispensations',
        component: DispensationsComponent,
        resolve: {
            dispensations: DispensationResolverService,
        },
    },
    {
        path: 'medicines',
        component: MedicinesComponent,
    },
    {
        path: 'pharmacy',
        component: PharmacyComponent,
    },
    {
        path: 'sections',
        component: SectionsComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManagementRoutingModule {}
