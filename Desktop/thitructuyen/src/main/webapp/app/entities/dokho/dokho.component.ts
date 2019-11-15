import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDokho } from 'app/shared/model/dokho.model';
import { AccountService } from 'app/core/auth/account.service';
import { DokhoService } from './dokho.service';

@Component({
  selector: 'jhi-dokho',
  templateUrl: './dokho.component.html'
})
export class DokhoComponent implements OnInit, OnDestroy {
  dokhos: IDokho[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected dokhoService: DokhoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.dokhoService
      .query()
      .pipe(
        filter((res: HttpResponse<IDokho[]>) => res.ok),
        map((res: HttpResponse<IDokho[]>) => res.body)
      )
      .subscribe(
        (res: IDokho[]) => {
          this.dokhos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDokhos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDokho) {
    return item.id;
  }

  registerChangeInDokhos() {
    this.eventSubscriber = this.eventManager.subscribe('dokhoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
