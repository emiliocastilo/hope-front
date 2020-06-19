import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CoreModule, createTranslateLoader } from 'src/app/core/core.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { DashboardRoutingModule } from 'src/app/modules/dashboard/dashboard-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Cie9Component } from './components/diagnosis/cie9/cie9.component';
import { PatientsIndicationComponent } from './components/diagnosis/patients-indication/patients-indication.component';
import { PatientsTreatmentComponent } from './components/diagnosis/patients-treatment/patients-treatment.component';
import { PatientsByPasiComponent } from './components/healths-outcomes/patients-by-pasi/patients-by-pasi.component';
import { PatientsByBsaComponent } from './components/healths-outcomes/patients-by-bsa/patients-by-bsa.component';
import { PatientsByPgaComponent } from './components/healths-outcomes/patients-by-pga/patients-by-pga.component';
import { PatientsByDlqiComponent } from './components/healths-outcomes/patients-by-dlqi/patients-by-dlqi.component';
import { BiologicalAgentsComponent } from './components/treatments/biological-agents/biological-agents.component';
import { ChemicalAgentsComponent } from './components/treatments/chemical-agents/chemical-agents.component';
import { PatientsCombinedTreatmentsComponent } from './components/diagnosis/patients-combined-treatments/patients-combined-treatments.component';
import { ReasonLastChangeBiologicalTreatmentComponent } from './components/diagnosis/reason-last-change-biological-treatment/reason-last-change-biological-treatment.component';
import { ReasonStopBiologicalTreatmentComponent } from './components/diagnosis/reason-stop-biological-treatment/reason-stop-biological-treatment.component';
import { NumberChangesBiologicalTreatmentComponent } from './components/diagnosis/number-changes-biological-treatment/number-changes-biological-treatment.component';
import { ReasonChangeBiologicalTreatmentFiveYearsComponent } from './components/diagnosis/reason-change-biological-treatment-five-years/reason-change-biological-treatment-five-years.component';
import { ReasonStopBiologicalTreatmentFiveYearsrsComponent } from './components/diagnosis/reason-stop-biological-treatment-five-yearsrs/reason-stop-biological-treatment-five-yearsrs.component';
import { Cie10Component } from './components/diagnosis/cie10/cie10.component';
import { BiologicalTreatmentFrequencyComponent } from './components/patient-dose/biological-treatment-frequency/biological-treatment-frequency.component';
import { MonthlyConsuptionEurosComponent } from './components/pharmacoeconomic/anual-consumption-biological/monthly-consuption-euros/monthly-consuption-euros.component';
import { AccumulatedAverageMonthlyConsuptionEurosComponent } from './components/pharmacoeconomic/average-consuption-biological-treatment/accumulated-average-monthly-consuption-euros/accumulated-average-monthly-consuption-euros.component';
import { AverageMonthlyConsuptionEurosComponent } from './components/pharmacoeconomic/average-consuption-biological-treatment/average-monthly-consuption-euros/average-monthly-consuption-euros.component';
import { AccumulatedMonthlyConsuptionEurosComponent } from './components/pharmacoeconomic/anual-consumption-biological/accumulated-monthly-consuption-euros/accumulated-monthly-consuption-euros.component';
import { TotalExpensesComponent } from './components/pharmacoeconomic/total-expenses-biological-treatment/total-expenses/total-expenses.component';
import { AvgExpensesComponent } from './components/pharmacoeconomic/total-expenses-biological-treatment/avg-expenses/avg-expenses.component';

@NgModule({
  declarations: [
    DashboardComponent,
    Cie9Component,
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
    Cie10Component,
    BiologicalTreatmentFrequencyComponent,
    MonthlyConsuptionEurosComponent,
    AccumulatedAverageMonthlyConsuptionEurosComponent,
    AverageMonthlyConsuptionEurosComponent,
    AccumulatedMonthlyConsuptionEurosComponent,
    TotalExpensesComponent,
    AvgExpensesComponent,
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
