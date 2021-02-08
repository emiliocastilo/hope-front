import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';
import { CoreModule, createTranslateLoader } from 'src/app/core/core.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { VihDashboardPatientsComponent } from '../vih/components/vih-dashboard-patients/vih-dashboard-patients.component';
import { DashboardPatientsComponent } from './components/dashboard-patients/dashboard-patients.component';
import { DermathologyDashboardPatientsComponent } from './components/dashboard-patients/dermathology-dashboard-patients/dermathology-dashboard-patients.component';
import { ComorbiditiesComponent } from './components/diagnosis/comorbidities/comorbidities.component';
import { DiagnosisComponent } from './components/diagnosis/diagnosis.component';
import { DynamicFormComponentComponent } from './components/dynamic-form-component/dynamic-form-component.component';
import { EavPaseComponent } from './components/eav-pase/eav-pase.component';
import { DlqiComponent } from './components/evolution-clinical-indices/dlqi/dlqi.component';
import { EvolutionClinicalIndicesComponent } from './components/evolution-clinical-indices/evolution-clinical-indices.component';
import { NapsiComponent } from './components/evolution-clinical-indices/napsi/napsi.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PasiBsaPgaComponent } from './components/pasi-bsa-pga/pasi-bsa-pga.component';
import { PatientsComponent } from './components/patients/patients.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { PhototherapyComponent } from './components/phototherapy/phototherapy.component';
import { PrincipalTreatmentComponent } from './components/principal-treatment/principal-treatment.component';
import { DermatologyRoutingModule } from './dermatology-routing.module';

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
        DermatologyRoutingModule,
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
export class DermatologyModule {}
