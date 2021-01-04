import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TreeModule } from 'angular-tree-component';
import { ContextMenuModule } from 'ngx-contextmenu';
import { CoreModule, createTranslateLoader } from 'src/app/core/core.module';
import { DispensationsComponent } from './components/dispensations/dispensations.component';
import { ManagementComponent } from './components/management/management.component';
import { SectionsComponent } from './components/sections/sections.component';
import { ManagementRoutingModule } from './management-routing.module';
import { UsersComponent } from './components/users/users.component';
import { RoleManagementComponent } from './components/role-management/role-management.component';
import { PatientsComponent } from './components/patients/patients.component';
import { MedicinesComponent } from './components/medicines/medicines.component';
import { PharmacyComponent } from './components/pharmacy/pharmacy.component';
@NgModule({
    declarations: [
        ManagementComponent, 
        RoleManagementComponent, 
        UsersComponent, 
        PatientsComponent, 
        DispensationsComponent, 
        SectionsComponent, 
        MedicinesComponent,
        PharmacyComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        ManagementRoutingModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),
        TreeModule.forRoot(),
        ContextMenuModule.forRoot({
            autoFocus: true,
        }),
    ],
})
export class ManagementModule {}
