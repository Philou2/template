import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DiplomaComponent} from './components/configuration/diploma/diploma.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'diploma',
        component: DiplomaComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }
