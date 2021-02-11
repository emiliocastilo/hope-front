import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';
import { CoreModule, createTranslateLoader } from 'src/app/core/core.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { DermathologyDashboardPatientsComponent } from './components/dashboard-patients/dermathology-dashboard-patients/dermathology-dashboard-patients.component';
import { ComorbiditiesComponent } from './components/diagnosis/comorbidities/comorbidities.component';
import { DiagnosisComponent } from './components/diagnosis/diagnosis.component';
import { EavPaseComponent } from './components/eav-pase/eav-pase.component';
import { DlqiComponent } from './components/evolution-clinical-indices/dlqi/dlqi.component';
import { EvolutionClinicalIndicesComponent } from './components/evolution-clinical-indices/evolution-clinical-indices.component';
import { NapsiComponent } from './components/evolution-clinical-indices/napsi/napsi.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PasiBsaPgaComponent } from './components/pasi-bsa-pga/pasi-bsa-pga.component';
import { PhototherapyComponent } from './components/phototherapy/phototherapy.component';
import { PrincipalTreatmentComponent } from './components/principal-treatment/principal-treatment.component';
import { DermatologyRoutingModule } from './dermatology-routing.module';
import { PhototherapyModalComponent } from './components/phototherapy-modal/phototherapy-modal.component';
import { PrincipalTreatmentModalComponent } from './components/principal-treatment-modal/principal-treatment-modal.component';

@NgModule({
    declarations: [
        GalleryComponent,
        DiagnosisComponent,
        EavPaseComponent,
        EvolutionClinicalIndicesComponent,
        NapsiComponent,
        DlqiComponent,
        ComorbiditiesComponent,
        PhototherapyComponent,
        PrincipalTreatmentComponent,
        PasiBsaPgaComponent,
        DermathologyDashboardPatientsComponent,
        PhototherapyModalComponent,
        PrincipalTreatmentModalComponent
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
    ], exports: [
        DermathologyDashboardPatientsComponent
    ]
})
export class DermatologyModule { }
