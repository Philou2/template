import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {TrainingTypeAddEditComponent} from './training-type-add-edit/training-type-add-edit.component';
import {TrainingTypeService} from '../../../services/configuration/training-type.service';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {TrainingType} from '../../../interface/configuration/TrainingType';

@Component({
  selector: 'app-training-type',
  templateUrl: './training-type.component.html',
  styleUrls: ['./training-type.component.scss']
})
export class TrainingTypeComponent implements OnInit {

  public trainingTypes!: TrainingType[];
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
  constructor(public trainingTypeService: TrainingTypeService, config: NgbModalConfig,
              private toastr: ToastrService, private modalService: NgbModal,
              private changeDetectorRef: ChangeDetectorRef) {
    this.getTrainingTypelist();
    config.backdrop = 'static';
    config.keyboard = false;
  }

  getTrainingTypelist(): any
  {
    this.trainingTypeService.getCollection().subscribe({
      next: (res: any) => {
        console.log(res);
        this.trainingTypes = res['hydra:member'];

        console.log(this.trainingTypes);

        // cache our list
        // this.temp = [...res['hydra:member']];
        this.temp = [...res['hydra:member']];

        this.rows = this.trainingTypes;

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

  edit(row: any) {
    // this.router.navigateByUrl('/details/' + row.id);
  }

  delete(row: any) {

  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  addTrainingType() {
    const modalRef = this.modalService.open(TrainingTypeAddEditComponent);
    modalRef.componentInstance.name = 'World';

    modalRef.result.then(() => {
      setTimeout(() => {
        this.loadingIndicator = true;
        this.changeDetectorRef.detectChanges();
        this.getTrainingTypelist();
      }, 5);
    });
  }

  editTrainingType(data: any) {
    console.log(data);
    const modalRef = this.modalService.open(TrainingTypeAddEditComponent,
    // modalRef.componentInstance.name = 'World'; 
    {
      // centered: true,
          // backdrop: 'static'
        }
        );

    modalRef.componentInstance.data = data;

    modalRef.result.then(() => {
      setTimeout(() => {
        this.loadingIndicator = true;
        this.changeDetectorRef.detectChanges();
        this.getTrainingTypelist();
      }, 5);
    });
  }
  deleteTrainingType(id: number): any{
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
        this.trainingTypeService.delete(id).subscribe({
          next: (res) => {
            this.toastr.success('Training Type successful deleted', 'Success');
            this.getTrainingTypelist();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });

  }

  deleteSelectedTrainingTypeRows() {
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
        this.trainingTypeService.deleteMultiple(ids).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('Training Types deleted !', 'Success');
            this.getTrainingTypelist();
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
