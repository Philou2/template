import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';
import { ExamRoutingModule } from './exam-routing.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgSelectModule} from '@ng-select/ng-select';
import {DiplomaComponent} from './components/configuration/diploma/diploma.component';
import {DiplomaAddEditComponent} from './components/configuration/diploma/diploma-add-edit/diploma-add-edit.component';

@NgModule({
  declarations: [
      DiplomaComponent,
      DiplomaAddEditComponent,
  ],
  imports: [
    CommonModule,
    ExamRoutingModule,
    NgbModule,
    SharedModule,
    NgxDatatableModule,
    NgSelectModule,
  ]
})
export class ExamModule { }
