import { CommonModule } from '@angular/common';
import { CoreModule, createTranslateLoader } from 'src/app/core/core.module';
import { DashboardRoutingModule } from 'src/app/modules/dashboard/dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        CoreModule,
        DashboardRoutingModule,
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
export class DashboardModule { }
