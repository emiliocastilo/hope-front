import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementComponent } from './components/management/management.component';
import { CoreModule, createTranslateLoader } from 'src/app/core/core.module';
import { ManagementRoutingModule } from './management-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { RoleManagementComponent } from './components/role-management/role-management.component';
import { MedicsComponent } from './components/medics/medics.component';
import { PatientsComponent } from './components/patients/patients.component';
import { DispensationsComponent } from './components/dispensations/dispensations.component';
import { SectionsComponent } from './components/sections/sections.component';
import { TreeModule } from 'angular-tree-component';
import { ContextMenuModule } from 'ngx-contextmenu';

@NgModule({
  declarations: [
    ManagementComponent,
    RoleManagementComponent,
    MedicsComponent,
    PatientsComponent,
    DispensationsComponent,
    SectionsComponent,
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
