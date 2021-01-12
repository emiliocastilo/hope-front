import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardPatientsComponent } from './patients/components/dashboard-patients/dashboard-patients.component';
import { PatientsComponent } from './patients/components/patients/patients.component';
import { CoreModule, createTranslateLoader } from 'src/app/core/core.module';
import { PathologyRoutingModule } from './pathology-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { GalleryComponent } from './patients/components/gallery/gallery.component';
import { EavPaseComponent } from './patients/components/eav-pase/eav-pase.component';
import { DiagnosisComponent } from './patients/components/diagnosis/diagnosis.component';
import { PersonalInformationComponent } from './patients/components/personal-information/personal-information.component';
import { ComorbiditiesComponent } from './patients/components/diagnosis/comorbidities/comorbidities.component';
import { NapsiComponent } from './patients/components/evolution-clinical-indices/napsi/napsi.component';
import { EvolutionClinicalIndicesComponent } from './patients/components/evolution-clinical-indices/evolution-clinical-indices.component';
import { PasiBsaPgaComponent } from './patients/components/pasi-bsa-pga/pasi-bsa-pga.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { PhototherapyComponent } from './patients/components/phototherapy/phototherapy.component';
import { PrincipalTreatmentComponent } from './patients/components/principal-treatment/principal-treatment.component';
import { DlqiComponent } from './patients/components/evolution-clinical-indices/dlqi/dlqi.component';
import { DynamicFormComponentComponent } from './patients/components/dynamic-form-component/dynamic-form-component.component';
import { VihDashboardPatientsComponent } from './vih/vih-dashboard-patients/vih-dashboard-patients.component';
import { DermathologyDashboardPatientsComponent } from './patients/components/dashboard-patients/dermathology-dashboard-patients/dermathology-dashboard-patients.component';

@NgModule({
    declarations: [
        DashboardPatientsComponent,
        PatientsComponent,
        GalleryComponent,
        DiagnosisComponent,
        EavPaseComponent,
        EvolutionClinicalIndicesComponent,
        NapsiComponent,
        DlqiComponent,
        PersonalInformationComponent,
        ComorbiditiesComponent,
        PhototherapyComponent,
        PrincipalTreatmentComponent,
        PasiBsaPgaComponent,
        DynamicFormComponentComponent,
        VihDashboardPatientsComponent,
        DermathologyDashboardPatientsComponent,
    ],
    imports: [
        CommonModule,
        CoreModule,
        ReactiveFormsModule,
        FormsModule,
        PathologyRoutingModule,
        GoogleChartsModule,
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
