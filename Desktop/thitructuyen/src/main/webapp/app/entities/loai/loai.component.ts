import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILoai } from 'app/shared/model/loai.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoaiService } from './loai.service';

@Component({
  selector: 'jhi-loai',
  templateUrl: './loai.component.html'
})
export class LoaiComponent implements OnInit, OnDestroy {
  loais: ILoai[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected loaiService: LoaiService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.loaiService
      .query()
      .pipe(
        filter((res: HttpResponse<ILoai[]>) => res.ok),
        map((res: HttpResponse<ILoai[]>) => res.body)
      )
      .subscribe(
        (res: ILoai[]) => {
          this.loais = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInLoais();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ILoai) {
    return item.id;
  }

  registerChangeInLoais() {
    this.eventSubscriber = this.eventManager.subscribe('loaiListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
