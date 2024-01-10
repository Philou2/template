import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {PensionSchemeService} from '../../../services/configuration/pension-scheme.service';
import {PensionSchemeAddEditComponent} from './pension-scheme-add-edit/pension-scheme-add-edit.component';
import {PensionScheme} from '../../../interface/configuration/PensionScheme';

@Component({
  selector: 'app-pension-scheme',
  templateUrl: './pension-scheme.component.html',
  styleUrls: ['./pension-scheme.component.scss']
})
export class PensionSchemeComponent implements OnInit {

  public pensionSchemes!: PensionScheme[];
  temp = [];
  selected = [];
  public closeResult: string;
  public getDismissReason: string;
  public isButtonVisible = false;

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(public pensionSchemeService: PensionSchemeService, config: NgbModalConfig,
              private toastr: ToastrService, private modalService: NgbModal,
              private changeDetectorRef: ChangeDetectorRef) {
    this.getPensionSchemeList();
    config.backdrop = 'static';
    config.keyboard = false;
  }

  getPensionSchemeList(): any {
    this.pensionSchemeService.getCollection().subscribe({
      next: (res: any) => {
        this.pensionSchemes = res['hydra:member'];

        console.log(this.pensionSchemes);

        // cache our list
        this.temp = [...res['hydra:member']];

        this.rows = this.pensionSchemes;

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

  onSelect({selected}) {
    console.log('Select Event', selected, this.selected);
    console.log(this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

    this.isButtonVisible = this.selected.length > 0;

    // this.isButtonVisible ? this.isButtonVisible = false : this.isButtonVisible = true;
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

  addPensionScheme() {
    const modalRef = this.modalService.open(PensionSchemeAddEditComponent, {
      //  centered: true,
    });

    modalRef.result.then(() => {
      setTimeout(() => {
        this.loadingIndicator = true;
        this.changeDetectorRef.detectChanges();
        this.getPensionSchemeList();
      }, 5);
    });
  }

  editPensionScheme(data: any) {
    console.log(data);
    const modalRef = this.modalService.open(PensionSchemeAddEditComponent,
        {
          // centered: true,
          // backdrop: 'static'
        }
    );
    modalRef.componentInstance.data = data;

    modalRef.result.then(() => {
      this.loadingIndicator = true;
      setTimeout(() => {
        this.changeDetectorRef.detectChanges();
        this.getPensionSchemeList();
      }, 5);
    });
  }

  deletePensionScheme(id: number): any {
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
        this.pensionSchemeService.delete(id).subscribe({
          next: (res) => {
            this.toastr.success('Pension Scheme successful deleted', 'Success');
            this.getPensionSchemeList();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });

  }

  deleteSelectedPensionSchemeRows() {
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
        this.pensionSchemeService.deleteMultiple(ids).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success(`Pension Schemes deleted !`, 'Success');
            this.getPensionSchemeList();
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
