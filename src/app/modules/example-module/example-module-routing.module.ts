import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExampleLocalComponentComponent } from './components/example-local-component/example-local-component.component';


const routes: Routes = [
  {
    path: '',
    component: ExampleLocalComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExampleModuleRoutingModule { }
