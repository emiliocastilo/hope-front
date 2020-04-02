import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./example-submodule-dermatology/example-submodule-dermatology.module')
      .then(m => m.ExampleSubmoduleDermatologyModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DermatologyRoutingModule { }
