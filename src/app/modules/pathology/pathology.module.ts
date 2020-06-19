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
import { GeneralPatientDataComponent } from './patients/components/patients/general-patient-data/general-patient-data.component';
import { TracingComponent } from './patients/components/patients/tracing/tracing.component';
import { DiagnosisComponent } from './patients/components/patients/diagnosis/diagnosis.component';
import { ComplementaryImagingScansComponent } from './patients/components/patients/complementary-imaging-scans/complementary-imaging-scans.component';
import { AdherenceToTreatmentComponent } from './patients/components/patients/adherence-to-treatment/adherence-to-treatment.component';
import { ConsentComponent } from './patients/components/patients/consent/consent.component';
import { FamilyHistoryComponent } from './patients/components/family-history/family-history.component';

@NgModule({
  declarations: [
    DashboardPatientsComponent,
    PatientsComponent,
    GalleryComponent,
    SociodemographicDataComponent,
    GeneralPatientDataComponent,
    DiagnosisComponent,
    TracingComponent,
    ComplementaryImagingScansComponent,
    AdherenceToTreatmentComponent,
    ConsentComponent,
    FamilyHistoryComponent,
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
