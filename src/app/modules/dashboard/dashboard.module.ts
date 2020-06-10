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
