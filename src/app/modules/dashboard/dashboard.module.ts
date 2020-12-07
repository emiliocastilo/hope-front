import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule, createTranslateLoader } from 'src/app/core/core.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { DashboardRoutingModule } from 'src/app/modules/dashboard/dashboard-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientsIndicationComponent } from './components/diagnosis/patients-indication/patients-indication.component';
import { PatientsTreatmentComponent } from './components/diagnosis/patients-treatment/patients-treatment.component';
import { PatientsByPasiComponent } from './components/health-outcomes/patients-by-pasi/patients-by-pasi.component';
import { PatientsByBsaComponent } from './components/health-outcomes/patients-by-bsa/patients-by-bsa.component';
import { PatientsByPgaComponent } from './components/health-outcomes/patients-by-pga/patients-by-pga.component';
import { PatientsByDlqiComponent } from './components/health-outcomes/patients-by-dlqi/patients-by-dlqi.component';
import { BiologicalAgentsComponent } from './components/treatments/treatments-agents/biological-agents/biological-agents.component';
import { ChemicalAgentsComponent } from './components/treatments/treatments-agents/chemical-agents/chemical-agents.component';
import { PatientsCombinedTreatmentsComponent } from './components/diagnosis/patients-combined-treatments/patients-combined-treatments.component';
import { ReasonLastChangeBiologicalTreatmentComponent } from './components/diagnosis/reasons/reason-last-change-biological-treatment/reason-last-change-biological-treatment.component';
import { ReasonStopBiologicalTreatmentComponent } from './components/diagnosis/reasons/reason-stop-biological-treatment/reason-stop-biological-treatment.component';
import { NumberChangesBiologicalTreatmentComponent } from './components/diagnosis/number-changes-biological-treatment/number-changes-biological-treatment.component';
import { ReasonChangeBiologicalTreatmentFiveYearsComponent } from './components/diagnosis/reasons/reason-change-biological-treatment-five-years/reason-change-biological-treatment-five-years.component';
import { ReasonStopBiologicalTreatmentFiveYearsrsComponent } from './components/diagnosis/reasons/reason-stop-biological-treatment-five-yearsrs/reason-stop-biological-treatment-five-yearsrs.component';
import { BiologicalTreatmentFrequencyComponent } from './components/patient-dose/biological-treatment-frequency/biological-treatment-frequency.component';
import { MonthlyConsuptionEurosComponent } from './components/pharmacoeconomic/consumption-biological-treatment/monthly-consuption-euros/monthly-consuption-euros.component';
import { AccumulatedAverageMonthlyConsuptionEurosComponent } from './components/pharmacoeconomic/consumption-biological-treatment/accumulated-average-monthly-consuption-euros/accumulated-average-monthly-consuption-euros.component';
import { AverageMonthlyConsuptionEurosComponent } from './components/pharmacoeconomic/consumption-biological-treatment/average-monthly-consuption-euros/average-monthly-consuption-euros.component';
import { AccumulatedMonthlyConsuptionEurosComponent } from './components/pharmacoeconomic/consumption-biological-treatment/accumulated-monthly-consuption-euros/accumulated-monthly-consuption-euros.component';
import { TotalExpensesComponent } from './components/pharmacoeconomic/total-expenses-biological-treatment/total-expenses/total-expenses.component';
import { AvgExpensesComponent } from './components/pharmacoeconomic/total-expenses-biological-treatment/avg-expenses/avg-expenses.component';
import { AvgAccumulatedExpensesComponent } from './components/pharmacoeconomic/total-expenses-biological-treatment/avg-accumulated-expenses/avg-accumulated-expenses.component';
import { AccumulatedExpensesComponent } from './components/pharmacoeconomic/total-expenses-biological-treatment/accumulated-expenses/accumulated-expenses.component';
import { PsoriasisPlacasComponent } from './components/treatments/treatments-patients/psoriasis-placas/psoriasis-placas.component';
import { PsoriasisPalmoPlantarComponent } from './components/treatments/treatments-patients/psoriasis-palmo-plantar/psoriasis-palmo-plantar.component';
import { EritrodermiaComponent } from './components/treatments/treatments-patients/eritrodermia/eritrodermia.component';
import { PsoriasisPustulosaComponent } from './components/treatments/treatments-patients/psoriasis-pustulosa/psoriasis-pustulosa.component';
import { CieComponent } from './components/diagnosis/cie/cie.component';
import { ConsumptionBiologicalTreatmentComponent } from './components/pharmacoeconomic/consumption-biological-treatment/consumption-biological-treatment.component';
import { TotalExpensesBiologicalTreatmentComponent } from './components/pharmacoeconomic/total-expenses-biological-treatment/total-expenses-biological-treatment.component';
import { HeatlhOutcomesComponent } from './components/health-outcomes/health-outcomes.component';
import { TreatmentsAgentsComponent } from './components/treatments/treatments-agents/treatments-agents.component';
import { TreatmentsPatientsComponent } from './components/treatments/treatments-patients/treatments-patients.component';
import { DiagnosisReasonsComponent } from './components/diagnosis/reasons/diagnosis-reasons.component';
import { PatientsVihLevelsComponent } from './components/vih/clinical-information/patients-vih/patients-vih-levels/patients-vih-levels.component';
import { PatientTreatmentsVihChangeComponent } from './components/vih/clinical-information/patient-treatments-vih/patient-treatments-vih-change/patient-treatments-vih-change.component';
import { PatientExpensesVihComponent } from './components/vih/pharmaeconomic-vih/patient-expenses-vih/patient-expenses-vih.component';

@NgModule({
  declarations: [
    ConsumptionBiologicalTreatmentComponent,
    TotalExpensesBiologicalTreatmentComponent,
    HeatlhOutcomesComponent,
    TreatmentsAgentsComponent,
    TreatmentsPatientsComponent,
    DiagnosisReasonsComponent,
    CieComponent,
    PatientsIndicationComponent,
    PatientsTreatmentComponent,
    PatientsByPasiComponent,
    PatientsByBsaComponent,
    PatientsByPgaComponent,
    PatientsByDlqiComponent,
    BiologicalAgentsComponent,
    ChemicalAgentsComponent,
    PatientsCombinedTreatmentsComponent,
    ReasonLastChangeBiologicalTreatmentComponent,
    ReasonStopBiologicalTreatmentComponent,
    NumberChangesBiologicalTreatmentComponent,
    ReasonChangeBiologicalTreatmentFiveYearsComponent,
    ReasonStopBiologicalTreatmentFiveYearsrsComponent,
    BiologicalTreatmentFrequencyComponent,
    MonthlyConsuptionEurosComponent,
    AccumulatedAverageMonthlyConsuptionEurosComponent,
    AverageMonthlyConsuptionEurosComponent,
    AccumulatedMonthlyConsuptionEurosComponent,
    TotalExpensesComponent,
    AvgExpensesComponent,
    AvgAccumulatedExpensesComponent,
    AccumulatedExpensesComponent,
    PsoriasisPlacasComponent,
    PsoriasisPalmoPlantarComponent,
    EritrodermiaComponent,
    PsoriasisPustulosaComponent,
    PatientsVihLevelsComponent,
    PatientTreatmentsVihChangeComponent,
    PatientExpensesVihComponent,
  ],
  imports: [
    NgbModule,
    CommonModule,
    CoreModule,
    DashboardRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
})
export class DashboardModule {}
