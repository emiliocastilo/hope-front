import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacyComponent } from './components/pharmacy/pharmacy.component';
import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
    imports: [CommonModule, CoreModule, PharmacyRoutingModule],
    declarations: [PharmacyComponent],
})
export class PharmacyModule {}
