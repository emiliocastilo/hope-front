import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleSubmoduleDermatologyRoutingModule } from './example-submodule-dermatology-routing.module';
import { ExampleComponentDermatologyComponent } from './components/example-component-dermatology/example-component-dermatology.component';


@NgModule({
  declarations: [ExampleComponentDermatologyComponent],
  imports: [
    CommonModule,
    ExampleSubmoduleDermatologyRoutingModule
  ]
})
export class ExampleSubmoduleDermatologyModule { }
