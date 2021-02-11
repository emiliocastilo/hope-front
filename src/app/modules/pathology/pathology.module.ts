import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule, createTranslateLoader } from 'src/app/core/core.module';
import { PathologyRoutingModule } from './pathology-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { GoogleChartsModule } from 'angular-google-charts';
import { PatientsComponent } from './components/patients/patients.component';
import { DermatologyModule } from './modules/dermatology/dermatology.module';
import { VIHModule } from './modules/vih/vih.module';
@NgModule({
    declarations: [PatientsComponent],
    imports: [
        CommonModule,
        CoreModule,
        ReactiveFormsModule,
        FormsModule,
        DermatologyModule,
        VIHModule,
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
