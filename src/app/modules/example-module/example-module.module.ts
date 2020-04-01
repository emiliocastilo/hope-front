import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleModuleRoutingModule } from './example-module-routing.module';
import { ExampleLocalComponentComponent } from './components/example-local-component/example-local-component.component';


@NgModule({
  declarations: [ExampleLocalComponentComponent],
  imports: [
    CommonModule,
    ExampleModuleRoutingModule
  ]
})
export class ExampleModuleModule { }
