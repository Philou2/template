import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubjectTypeComponent} from './components/configuration/subject-type/subject-type.component';
import {ModuleCategoryComponent} from './components/configuration/module-category/module-category.component';
import {ModuleComponent} from './components/configuration/module/module.component';
import {SubjectComponent} from './components/configuration/subject/subject.component';
import {ClassProgramComponent} from './components/program/class-program/class-program.component';
import {TeacherAddComponent} from './components/teacher/teacher/teacher-add.component';
import {TeacherYearComponent} from "./components/program/teacher-year/teacher-year.component";
import {ClassYearComponent} from "./components/program/class-year/class-year.component";
import {CycleYearComponent} from "./components/program/cycle-year/cycle-year.component";
import {SpecialityYearComponent} from "./components/program/speciality-year/speciality-year.component";
import {TimeTablePeriodComponent} from "./components/time-table/time-table-period/time-table-period.component";
import {TimetableModelComponent} from "./components/time-table/timetable-model/timetable-model.component";
import {TimetableModelAddComponent} from "./components/time-table/timetable-model/timetable-model-add.component";
import {TimeTableModelDayComponent} from "./components/time-table/time-table-model-day/time-table-model-day.component";
import {
  TimeTableModelDayCellComponent
} from "./components/time-table/time-table-model-day-cell/time-table-model-day-cell.component";
import { CalenderComponent } from '../../apps/calender/calender.component';
import { GenerateTimetableAddComponent } from './components/time-table/generate-timetable/generate-timetable-add.component';
import { GenerateTimetableComponent } from './components/time-table/generate-timetable/generate-timetable.component';

import { TeacherComponent } from './components/teacher/teacher/teacher.component';
import { ClassProgramAddEditComponent } from './components/program/class-program/class-program-add-edit/class-program-add-edit.component';
import {TeacherCourseRegistrationComponent} from './components/program/teacher-course-registration/teacher-course-registration.component';
import {ListOfTeacherCoursePlanComponent} from './components/time-table/list-of-teacher-course-plan/list-of-teacher-course-plan.component';
import {TeacherCourseComponent} from './components/program/teacher-course/teacher-course.component';
import {StudentCourseComponent} from './components/program/student-course/student-course.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'subject-type',
        component: SubjectTypeComponent
      } ,
      {
        path: 'module-category',
        component: ModuleCategoryComponent
      },
      {
        path: 'module',
        component: ModuleComponent
      },
      {
        path: 'subject',
        component: SubjectComponent
      },
      {
        path: 'class-program',
        component: ClassProgramComponent
      },
      {
        path: 'add-edit-class-program',
        component: ClassProgramAddEditComponent
      },
      {
        path: 'teacher',
        component: TeacherComponent
      },
      {
        path: 'add-edit-teacher',
        component: TeacherAddComponent
      },
      {
        path: 'teacher-year',
        component: TeacherYearComponent
      },
      {
        path: 'class-year',
        component: ClassYearComponent
      },
      {
        path: 'cycle-year',
        component: CycleYearComponent
      },

      {
        path: 'teacher-course-registration',
        component: TeacherCourseRegistrationComponent
      },
      {
        path: 'list-of-teacher-course-plan',
        component: ListOfTeacherCoursePlanComponent
      },

      {
        path: 'teacher-course',
        component: TeacherCourseComponent
      },
      {
        path: 'student-course',
        component: StudentCourseComponent
      },
      {
        path: 'speciality-year',
        component: SpecialityYearComponent
      },
      {
        path: 'timetable-period',
        component: TimeTablePeriodComponent
      },
      {
        path: 'timetable-model',
        component: TimetableModelComponent
      },
      {
        path: 'timetable-model/calendar/:id',
        component: CalenderComponent
      },
      {
        path: 'timetable-model-day',
        component: TimeTableModelDayComponent
      },
      {
        path: 'timetable-model-day-cell',
        component: TimeTableModelDayCellComponent
      },
      {
        path: 'add-edit-timetable-model',
        component: TimetableModelAddComponent
      },
      {
        path: 'add-edit-generate-timetable',
        component: GenerateTimetableAddComponent
      },
      {
        path: 'generate-timetable',
        component: GenerateTimetableComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyRoutingModule { }
