import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPatientsComponent } from './patients/components/dashboard-patients/dashboard-patients.component';
import { PatientsComponent } from './patients/components/patients/patients.component';
import { CoreModule, createTranslateLoader } from 'src/app/core/core.module';
import { PathologyRoutingModule } from './pathology-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { GalleryComponent } from './patients/components/gallery/gallery.component';
import { PersonalInformationComponent } from './patients/components/general-patient-data/personal-information/personal-information.component';

@NgModule({
  declarations: [
    DashboardPatientsComponent,
    PatientsComponent,
    GalleryComponent,
    PersonalInformationComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    PathologyRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
})
export class PathologyModule {}
