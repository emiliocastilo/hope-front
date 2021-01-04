import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacyComponent } from './components/pharmacy/pharmacy.component';
import { PharmacyRoutingModule } from './pharmacy-routing.module';

@NgModule({
    imports: [
        CommonModule,
        PharmacyRoutingModule,
    ],
    declarations: [
        PharmacyComponent
    ]
})
export class PharmacyModule { }
