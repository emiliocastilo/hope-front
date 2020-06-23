import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPatientsComponent } from './patients/components/dashboard-patients/dashboard-patients.component';
import { PatientsComponent } from './patients/components/patients/patients.component';
import { CoreModule, createTranslateLoader } from 'src/app/core/core.module';
import { PathologyRoutingModule } from './pathology-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { GalleryComponent } from './patients/components/gallery/gallery.component';
import { SociodemographicDataComponent } from './patients/components/sociodemographic-data/sociodemographic-data.component';
import { GeneralPatientDataComponent } from './patients/components/general-patient-data/general-patient-data.component';
import { TracingComponent } from './patients/components/tracing/tracing.component';
import { DiagnosisComponent } from './patients/components/diagnosis/diagnosis.component';
import { ComplementaryImagingScansComponent } from './patients/components/complementary-imaging-scans/complementary-imaging-scans.component';
import { AdherenceToTreatmentComponent } from './patients/components/adherence-to-treatment/adherence-to-treatment.component';
import { ConsentComponent } from './patients/components/consent/consent.component';
import { FamilyHistoryComponent } from './patients/components/family-history/family-history.component';
import { PersonalInformationComponent } from './patients/components/personal-information/personal-information.component';
import { PhysicalConditionComponent } from './patients/components/physical-condition/physical-condition.component';
import { WorkGroupsComponent } from './patients/components/work-groups/work-groups.component';
import { ConsumptionHabitsComponent } from './patients/components/consumption-habits/consumption-habits.component';
import { PrincipalDiagnosisComponent } from './patients/components/diagnosis/principal-diagnosis/principal-diagnosis.component';
import { SecundaryDiagnosisComponent } from './patients/components/diagnosis/secundary-diagnosis/secundary-diagnosis.component';
import { ComorbiditiesComponent } from './patients/components/diagnosis/comorbidities/comorbidities.component';

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
    PhysicalConditionComponent,
    WorkGroupsComponent,
    ConsumptionHabitsComponent,
    PersonalInformationComponent,
    PrincipalDiagnosisComponent,
    SecundaryDiagnosisComponent,
    ComorbiditiesComponent,
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
