import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICauhoi } from 'app/shared/model/cauhoi.model';
import { CauhoiService } from './cauhoi.service';

@Component({
  selector: 'jhi-cauhoi-delete-dialog',
  templateUrl: './cauhoi-delete-dialog.component.html'
})
export class CauhoiDeleteDialogComponent {
  cauhoi: ICauhoi;

  constructor(protected cauhoiService: CauhoiService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.cauhoiService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'cauhoiListModification',
        content: 'Deleted an cauhoi'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-cauhoi-delete-popup',
  template: ''
})
export class CauhoiDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cauhoi }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CauhoiDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.cauhoi = cauhoi;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/cauhoi', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/cauhoi', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
