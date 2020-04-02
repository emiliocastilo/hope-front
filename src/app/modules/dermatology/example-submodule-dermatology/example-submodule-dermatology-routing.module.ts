import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExampleComponentDermatologyComponent } from './components/example-component-dermatology/example-component-dermatology.component';


const routes: Routes = [
  {
    path: '',
    component: ExampleComponentDermatologyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExampleSubmoduleDermatologyRoutingModule { }
