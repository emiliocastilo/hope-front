import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { CoreModule, createTranslateLoader } from 'src/app/core/core.module';
import { VIHTreatmentModalComponent } from './components/treatments/vih-treatment-modal/vih-treatment-modal.component';
import { VIHTreatmentChangeModalComponent } from './components/treatments/vih-treatment-change-modal/vih-treatment-change-modal.component';
import { VIHTreatmentsComponent } from './components/treatments/vih-treatments.component';
import { VIHRoutingModule } from './vih-routing.module';

@NgModule({
    declarations: [
        // DashboardPatientsComponent,
        // PatientsComponent,
        VIHTreatmentsComponent,
        VIHTreatmentModalComponent,
        VIHTreatmentChangeModalComponent,
    ],
    imports: [
        CommonModule,
        CoreModule,
        ReactiveFormsModule,
        FormsModule,
        VIHRoutingModule,
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
export class VIHModule { }
