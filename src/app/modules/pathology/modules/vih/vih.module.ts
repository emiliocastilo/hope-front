import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { CoreModule, createTranslateLoader } from 'src/app/core/core.module';
import { VIHTreatmentAddModalComponent } from './components/treatments/vih-treatment-add-modal/vih-treatment-add-modal.component';
import { VIHTreatmentChangeModalComponent } from './components/treatments/vih-treatment-change-modal/vih-treatment-change-modal.component';
import { VIHTreatmentModificationModalComponent } from './components/treatments/vih-treatment-modification-modal/vih-treatment-modification-modal.component';
import { VIHTreatmentsComponent } from './components/treatments/vih-treatments.component';
import { VIHRoutingModule } from './vih-routing.module';

@NgModule({
    declarations: [
        // DashboardPatientsComponent,
        // PatientsComponent,
        VIHTreatmentsComponent,
        VIHTreatmentAddModalComponent,
        VIHTreatmentChangeModalComponent,
        VIHTreatmentModificationModalComponent,
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
