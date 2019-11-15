import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IKetqua } from 'app/shared/model/ketqua.model';
import { AccountService } from 'app/core/auth/account.service';
import { KetquaService } from './ketqua.service';

@Component({
  selector: 'jhi-ketqua',
  templateUrl: './ketqua.component.html'
})
export class KetquaComponent implements OnInit, OnDestroy {
  ketquas: IKetqua[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected ketquaService: KetquaService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.ketquaService
      .query()
      .pipe(
        filter((res: HttpResponse<IKetqua[]>) => res.ok),
        map((res: HttpResponse<IKetqua[]>) => res.body)
      )
      .subscribe(
        (res: IKetqua[]) => {
          this.ketquas = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInKetquas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IKetqua) {
    return item.id;
  }

  registerChangeInKetquas() {
    this.eventSubscriber = this.eventManager.subscribe('ketquaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
