import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementComponent } from './components/management/management.component';
import { CoreModule, createTranslateLoader } from 'src/app/core/core.module';
import { MedicRoutingModule } from './medic/medic-routing.module';
import { ManagementRoutingModule } from './management-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { RoleManagementComponent } from './components/role-management/role-management.component';

@NgModule({
  declarations: [ManagementComponent, RoleManagementComponent],
  imports: [
    CommonModule,
    MedicRoutingModule,
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
