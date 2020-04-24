import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { PatientsRoutingModule } from './patients-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { PatientDetailComponent } from './components/patient-detail/patient-detail/patient-detail.component';
import { PatientHeaderComponent } from './components/patient-detail/patient-header/patient-header/patient-header.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    PatientsListComponent,
    PatientDetailComponent,
    PatientHeaderComponent,
  ],
  imports: [
    PatientsRoutingModule,
    CoreModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
})
export class PatientsModule {}
