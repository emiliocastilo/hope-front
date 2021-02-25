import { CommonModule } from '@angular/common';
import { CoreModule, createTranslateLoader } from 'src/app/core/core.module';
import { DashboardRoutingModule } from 'src/app/modules/dashboard/dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { GuidelinesExpensesVihComponent } from './components/pharmaeconomic/guidelines-expenses-vih/guidelines-expenses-vih.component';
import { PatientExpensesVihComponent } from './components/pharmaeconomic/patient-expenses-vih/patient-expenses-vih.component';
import { PatientsVihLevelsComponent } from './components/clinic/patients-vih-levels/patients-vih-levels.component';
import { PatientTreatmentsVihChangeComponent } from './components/clinic/patient-treatments-vih-change/patient-treatments-vih-change.component';
import { TreatmentInfoVihComponent } from './components/treatment-info-vih/treatment-info-vih.component';
import { VIHDashboardRoutingModule } from './vih-dashboard-routing.module';

@NgModule({
    declarations: [GuidelinesExpensesVihComponent, PatientExpensesVihComponent, PatientsVihLevelsComponent, PatientTreatmentsVihChangeComponent, TreatmentInfoVihComponent],
    imports: [
        CommonModule,
        CoreModule,
        VIHDashboardRoutingModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),
    ],
})
export class VIHDashboardModule {}
