import { NgModule } from '@angular/core';

import { MedicListComponent } from './medic-list/medic-list.component';
import { MedicRoutingModule } from './medic-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MedicListComponent],
  imports: [
    MedicRoutingModule,
    CoreModule,
    TranslateModule
  ]
})
export class MedicModule { }
