import { Component, Input } from '@angular/core';
import {TeacherCourseRegistrationService} from '../../../../school/study/services/teacher-course-registration.service';
import {NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-courses-study',
  templateUrl: './courses-study.component.html',
  styleUrls: ['./courses-study.component.scss']
})
export class CoursesStudyComponent {
  constructor(public teacherCourseRegistrationService: TeacherCourseRegistrationService, config: NgbModalConfig){
    this.getTeacherCourseRegistrationList();

  }
  public teacherCourseCounted!: number;
  temp = [];
  selected = [];
  rows = [];
  loadingIndicator = true;
  reorderable = true;

  @Input() data: any;
  getTeacherCourseRegistrationList(): any {
    this.teacherCourseRegistrationService.getCollectioncount().subscribe({
      next: (res: any) => {
        this.teacherCourseCounted = res['hydra:member'];

        console.log(this.teacherCourseCounted);

        this.loadingIndicator = false;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        console.log('Error while fetching the records');
        this.loadingIndicator = false;
      }
    });
  }
}
