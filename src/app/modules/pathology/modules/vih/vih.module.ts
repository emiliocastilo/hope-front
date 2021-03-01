import { PrincipalTreatmentModalCreateComponent } from './components/principal-treatment/principal-treatment-modal/principal-tratment-modal-create/principal-treatment-modal-create.component';
import { PrincipalTreatmentModalEditComponent } from './components/principal-treatment/principal-treatment-modal/principal-tratment-modal-edit/principal-treatment-modal-edit.component';
import { PrincipalTreatmentModalSuspendComponent } from './components/principal-treatment/principal-treatment-modal/principal-tratment-modal-suspend/principal-treatment-modal-suspend.component';
import { PrincipalTreatmentComponent } from './components/principal-treatment/principal-treatment.component';
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
import { VihDashboardPatientsComponent } from './components/vih-dashboard-patients/vih-dashboard-patients.component';

@NgModule({
    declarations: [
        VIHTreatmentsComponent,
        VIHTreatmentModalComponent,
        VIHTreatmentChangeModalComponent,
        VihDashboardPatientsComponent,
        PrincipalTreatmentComponent,
        PrincipalTreatmentModalSuspendComponent,
        PrincipalTreatmentModalEditComponent,
        PrincipalTreatmentModalCreateComponent,
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
    exports: [VihDashboardPatientsComponent],
})
export class VIHModule {}
