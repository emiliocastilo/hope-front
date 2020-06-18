import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPatientsComponent } from './patients/components/dashboard-patients/dashboard-patients.component';
import { PatientsComponent } from './patients/components/patients/patients.component';
import { CoreModule, createTranslateLoader } from 'src/app/core/core.module';
import { PathologyRoutingModule } from './pathology-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { GalleryComponent } from './patients/components/gallery/gallery.component';
import { SociodemographicDataComponent } from './patients/components/patients/sociodemographic-data/sociodemographic-data.component';

@NgModule({
  declarations: [
    DashboardPatientsComponent,
    PatientsComponent,
    GalleryComponent,
    SociodemographicDataComponent,
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
