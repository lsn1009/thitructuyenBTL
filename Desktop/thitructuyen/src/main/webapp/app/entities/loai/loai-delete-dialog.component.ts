import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILoai } from 'app/shared/model/loai.model';
import { LoaiService } from './loai.service';

@Component({
  selector: 'jhi-loai-delete-dialog',
  templateUrl: './loai-delete-dialog.component.html'
})
export class LoaiDeleteDialogComponent {
  loai: ILoai;

  constructor(protected loaiService: LoaiService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.loaiService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'loaiListModification',
        content: 'Deleted an loai'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-loai-delete-popup',
  template: ''
})
export class LoaiDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ loai }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LoaiDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.loai = loai;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/loai', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/loai', { outlets: { popup: null } }]);
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
