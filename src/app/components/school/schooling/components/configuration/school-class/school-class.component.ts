import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {SchoolClass} from '../../../interface/configuration/schoolClass';
import {SchoolClassService} from '../../../services/configuration/school-class.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-school-class',
  templateUrl: './school-class.component.html',
  styleUrls: ['./school-class.component.scss']
})
export class SchoolClassComponent implements OnInit {

  public schoolClasses!: SchoolClass[];
  temp = [];
  selected = [];
  public closeResult: string;
  public getDismissReason: string;
  public isButtonVisible = false;

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  // rows = [{ name: 'select' }, { name: 'Name', prop: 'name', width: 400 }, { name: 'Actions', width: 200 }];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(public schoolClassService: SchoolClassService, config: NgbModalConfig,
              private toastr: ToastrService, private modalService: NgbModal,
              private router: Router,
              private changeDetectorRef: ChangeDetectorRef) {
    this.getSchoolClasslist();
    config.backdrop = 'static';
    config.keyboard = false;
  }

  getSchoolClasslist(): any
  {
    this.schoolClassService.getClassCollection().subscribe({
      next: (res: any) => {
        console.log(res);
        this.schoolClasses = res['hydra:member'];

        console.log(this.schoolClasses);

        // cache our list
        // this.temp = [...res['hydra:member']];
        this.temp = [...res['hydra:member']];

        this.rows = this.schoolClasses;

        this.loadingIndicator = false;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        console.log('Error while fetching the records');
        this.loadingIndicator = false;
      }
    });
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  // tslint:disable-next-line:typedef
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    // tslint:disable-next-line:only-arrow-functions typedef
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    console.log(this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

    this.isButtonVisible = this.selected.length > 0;

    // this.isButtonVisible ? this.isButtonVisible = false  : this.isButtonVisible = true;
  }


  onActivate(event) {
    console.log('Activate Event', event);
  }

  add() {
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    this.selected = [this.rows[1], this.rows[3]];
  }

  remove() {
    this.selected = [];
  }

  displayCheck(row) {
    return row.name !== 'Ethel Price';
  }

 openForm(data: any){
    this.schoolClassService.changeSchoolClass(data);
    this.router.navigateByUrl('/school/schooling/add-edit-school-class');
 }

 openFormAdd(){
   this.router.navigateByUrl('/school/schooling/add-edit-school-class');
 }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }
  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
  deleteSchoolClass(id: number): any{
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingIndicator = true;
        this.schoolClassService.delete(id).subscribe({
          next: (res) => {
            this.toastr.success('Training Type successful deleted', 'Success');
            this.getSchoolClasslist();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });

  }

  deleteSelectedSchoolClassRows() {
    Swal.fire({
      title: 'Are you sure you want to delete ' + this.selected.length + ' line(s) ?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingIndicator = true;

        const obj = this.selected;
        const vals = Object.values(obj);
        const ids = vals.map(a => (a.id));
        this.schoolClassService.deleteMultiple(ids).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('School class deleted !', 'Success');
            this.getSchoolClasslist();
            this.remove();
          },
          error: (err: any) => {
            console.log(err);
          }
        });

      }
    });

  }

}
