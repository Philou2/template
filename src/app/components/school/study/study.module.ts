import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';
import { StudyRoutingModule } from './study-routing.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgSelectModule} from '@ng-select/ng-select';
import {SubjectTypeAddEditComponent} from './components/configuration/subject-type/subject-type-add-edit/subject-type-add-edit.component';
import {SubjectTypeComponent} from './components/configuration/subject-type/subject-type.component';
import {ModuleCategoryComponent} from './components/configuration/module-category/module-category.component';
import {
  ModuleCategoryAddEditComponent
} from './components/configuration/module-category/module-category-add-edit/module-category-add-edit.component';
import {ModuleComponent} from './components/configuration/module/module.component';
import {ModuleAddEditComponent} from './components/configuration/module/module-add-edit/module-add-edit.component';
import {SubjectComponent} from './components/configuration/subject/subject.component';
import {SubjectAddEditComponent} from './components/configuration/subject/subject-add-edit/subject-add-edit.component';
import {ClassProgramComponent} from './components/program/class-program/class-program.component';
import {TeacherAddComponent} from './components/teacher/teacher/teacher-add.component';
import {TeacherComponent} from './components/teacher/teacher/teacher.component';
import {TeacherYearComponent} from "./components/program/teacher-year/teacher-year.component";
import {
  TeacherYearAddEditComponent
} from "./components/program/teacher-year/teacher-year-add-edit/teacher-year-add-edit.component";
import {ClassYearComponent} from "./components/program/class-year/class-year.component";
import {
  ClassYearAddEditComponent
} from "./components/program/class-year/class-year-add-edit/class-year-add-edit.component";
import {CycleYearComponent} from "./components/program/cycle-year/cycle-year.component";
import {
  CycleYearAddEditComponent
} from "./components/program/cycle-year/cycle-year-add-edit/cycle-year-add-edit.component";
import {SpecialityYearComponent} from "./components/program/speciality-year/speciality-year.component";
import {
  SpecialityYearAddEditComponent
} from "./components/program/speciality-year/speciality-year-add-edit/speciality-year-add-edit.component";
import {TimeTablePeriodComponent} from "./components/time-table/time-table-period/time-table-period.component";
import {
  TimeTablePeriodAddEditComponent
} from "./components/time-table/time-table-period/time-table-period-add-edit/time-table-period-add-edit.component";
import {TimetableModelAddComponent} from "./components/time-table/timetable-model/timetable-model-add.component";
import {TimetableModelComponent} from "./components/time-table/timetable-model/timetable-model.component";
import {TimeTableModelDayComponent} from "./components/time-table/time-table-model-day/time-table-model-day.component";
import {
  TimeTableModelDayAddEditComponent
} from "./components/time-table/time-table-model-day/time-table-model-day-add-edit/time-table-model-day-add-edit.component";
import {
  TimeTableModelDayCellComponent
} from "./components/time-table/time-table-model-day-cell/time-table-model-day-cell.component";
import {
  TimeTableModelDayCellAddEditComponent
} from "./components/time-table/time-table-model-day-cell/time-table-model-day-cell-add-edit/time-table-model-day-cell-add-edit.component";
import {
  ChangeTeacherAddEditComponent
} from "./components/time-table/time-table-model-day-cell/change-teacher-add-edit/change-teacher-add-edit.component";
import {
  ChangeRoomAddEditComponent
} from "./components/time-table/time-table-model-day-cell/change-room-add-edit/change-room-add-edit.component";
import {
  SwapCellAddEditComponent
} from "./components/time-table/time-table-model-day-cell/swap-cell-add-edit/swap-cell-add-edit.component";
import {
  ChangeCourseAddEditComponent
} from "./components/time-table/time-table-model-day-cell/change-course-add-edit/change-course-add-edit.component";
import { DataService } from '../../security/services/data.service';
import { CalenderModule } from '../../apps/calender/calender.module';
import { CalenderRoutingModule } from '../../apps/calender/calender-routing.module';

import {GenerateTimetableAddComponent} from "./components/time-table/generate-timetable/generate-timetable-add.component";
import {GenerateTimetableComponent} from "./components/time-table/generate-timetable/generate-timetable.component";
import { ClassProgramAddEditComponent } from './components/program/class-program/class-program-add-edit/class-program-add-edit.component';
import {TeacherCourseRegistrationComponent} from './components/program/teacher-course-registration/teacher-course-registration.component';
import {
  TeacherCourseRegistrationAddEditComponent
} from './components/program/teacher-course-registration/teacher-course-registration-add-edit/teacher-course-registration-add-edit.component';
import {ListOfTeacherCoursePlanComponent} from './components/time-table/list-of-teacher-course-plan/list-of-teacher-course-plan.component';
import {
  ListOfTeacherCoursePlanAddEditComponent
} from './components/time-table/list-of-teacher-course-plan/list-of-teacher-course-plan-add-edit/list-of-teacher-course-plan-add-edit.component';
import {TeacherCourseComponent} from './components/program/teacher-course/teacher-course.component';
import {TeacherCourseAddEditComponent} from './components/program/teacher-course/teacher-course-add-edit/teacher-course-add-edit.component';
import {StudentCourseComponent} from './components/program/student-course/student-course.component';
import {StudentCourseAddEditComponent} from './components/program/student-course/student-course-add-edit/student-course-add-edit.component';

@NgModule({
  declarations: [
    SubjectTypeAddEditComponent,
    SubjectTypeComponent,
    ModuleCategoryComponent,
    ModuleCategoryAddEditComponent,
    ModuleComponent,
    ModuleAddEditComponent,
    SubjectComponent,
    SubjectAddEditComponent,
    ClassProgramComponent,
    ClassProgramAddEditComponent,
    TeacherComponent,
    TeacherAddComponent,
    TeacherYearComponent,
    TeacherYearAddEditComponent,
    ClassYearComponent,
    ClassYearAddEditComponent,
    CycleYearComponent,
    CycleYearAddEditComponent,
    SpecialityYearComponent,
    SpecialityYearAddEditComponent,
    TimeTablePeriodComponent,
    TimeTablePeriodAddEditComponent,
    TimetableModelAddComponent,
    TimetableModelComponent,
    TimeTableModelDayComponent,
    TimeTableModelDayAddEditComponent,
    TimeTableModelDayCellComponent,
    TimeTableModelDayCellAddEditComponent,
    ChangeTeacherAddEditComponent,
    ChangeRoomAddEditComponent,
    SwapCellAddEditComponent,
    ChangeCourseAddEditComponent,
    GenerateTimetableComponent,
    GenerateTimetableAddComponent,
    TeacherCourseComponent,
    TeacherCourseAddEditComponent,
    TeacherCourseRegistrationComponent,
    TeacherCourseRegistrationAddEditComponent,
    ListOfTeacherCoursePlanComponent,
    ListOfTeacherCoursePlanAddEditComponent,
    StudentCourseComponent,
    StudentCourseAddEditComponent


  ],
  imports: [
    CommonModule,
    StudyRoutingModule,
    NgbModule,
    SharedModule,
    NgxDatatableModule,
    NgSelectModule,
    CalenderModule,
    CalenderRoutingModule
  ],
  providers: [
      DatePipe,
      DataService
  ]
})
export class StudyModule { }
