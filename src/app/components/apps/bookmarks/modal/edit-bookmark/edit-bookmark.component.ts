import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss']
})
export class EditBookmarkComponent implements OnInit, OnDestroy {

  @ViewChild("editBookmark", { static: false }) EditBookmark: TemplateRef<any>;

  public closeResult: string;
  public modalOpen: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openModal() {
    if (isPlatformBrowser(this.platformId)) { // For SSR 
      this.modalService.open(this.EditBookmark, { 
        size: 'lg',
        ariaLabelledBy: 'modal-bookmark',
        centered: true,
        windowClass: 'modal-bookmark'
      }).result.then((result) => {
        this.modalOpen = true;
        `Result ${result}`
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnDestroy() {
    if(this.modalOpen){
      this.modalService.dismissAll();
    }
  }

}
