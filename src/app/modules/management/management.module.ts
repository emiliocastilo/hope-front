import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementComponent } from './components/management/management.component';
import { CoreModule, createTranslateLoader } from 'src/app/core/core.module';
import { ManagementRoutingModule } from './management-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { RoleManagementComponent } from './components/role-management/role-management.component';
import { MedicListComponent } from './medic/medic-list/medic-list.component';
import { PatientsListComponent } from './patients/patients-list/patients-list.component';

@NgModule({
  declarations: [
    ManagementComponent,
    RoleManagementComponent,
    MedicListComponent,
    PatientsListComponent,
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
  ],
})
export class ManagementModule {}
