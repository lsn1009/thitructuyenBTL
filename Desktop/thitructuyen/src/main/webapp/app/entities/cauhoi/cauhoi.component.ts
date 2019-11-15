import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICauhoi } from 'app/shared/model/cauhoi.model';
import { AccountService } from 'app/core/auth/account.service';
import { CauhoiService } from './cauhoi.service';

@Component({
  selector: 'jhi-cauhoi',
  templateUrl: './cauhoi.component.html'
})
export class CauhoiComponent implements OnInit, OnDestroy {
  cauhois: ICauhoi[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected cauhoiService: CauhoiService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.cauhoiService
      .query()
      .pipe(
        filter((res: HttpResponse<ICauhoi[]>) => res.ok),
        map((res: HttpResponse<ICauhoi[]>) => res.body)
      )
      .subscribe(
        (res: ICauhoi[]) => {
          this.cauhois = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCauhois();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICauhoi) {
    return item.id;
  }

  registerChangeInCauhois() {
    this.eventSubscriber = this.eventManager.subscribe('cauhoiListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
