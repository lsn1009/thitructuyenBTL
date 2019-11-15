import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IKetqua } from 'app/shared/model/ketqua.model';
import { KetquaService } from './ketqua.service';

@Component({
  selector: 'jhi-ketqua-delete-dialog',
  templateUrl: './ketqua-delete-dialog.component.html'
})
export class KetquaDeleteDialogComponent {
  ketqua: IKetqua;

  constructor(protected ketquaService: KetquaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.ketquaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'ketquaListModification',
        content: 'Deleted an ketqua'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-ketqua-delete-popup',
  template: ''
})
export class KetquaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ketqua }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(KetquaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.ketqua = ketqua;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/ketqua', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/ketqua', { outlets: { popup: null } }]);
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
