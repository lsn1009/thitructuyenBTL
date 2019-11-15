import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDokho } from 'app/shared/model/dokho.model';
import { DokhoService } from './dokho.service';

@Component({
  selector: 'jhi-dokho-delete-dialog',
  templateUrl: './dokho-delete-dialog.component.html'
})
export class DokhoDeleteDialogComponent {
  dokho: IDokho;

  constructor(protected dokhoService: DokhoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.dokhoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'dokhoListModification',
        content: 'Deleted an dokho'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-dokho-delete-popup',
  template: ''
})
export class DokhoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dokho }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DokhoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.dokho = dokho;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/dokho', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/dokho', { outlets: { popup: null } }]);
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
