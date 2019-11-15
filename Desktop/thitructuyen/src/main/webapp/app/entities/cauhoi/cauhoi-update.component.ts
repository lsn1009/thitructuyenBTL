import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICauhoi, Cauhoi } from 'app/shared/model/cauhoi.model';
import { CauhoiService } from './cauhoi.service';
import { IDokho } from 'app/shared/model/dokho.model';
import { DokhoService } from 'app/entities/dokho/dokho.service';
import { ILoai } from 'app/shared/model/loai.model';
import { LoaiService } from 'app/entities/loai/loai.service';

@Component({
  selector: 'jhi-cauhoi-update',
  templateUrl: './cauhoi-update.component.html'
})
export class CauhoiUpdateComponent implements OnInit {
  isSaving: boolean;

  dokhos: IDokho[];

  loais: ILoai[];

  editForm = this.fb.group({
    id: [],
    noidung: [null, [Validators.required]],
    ketqua: [null, [Validators.required]],
    dapan1: [],
    dapan2: [],
    dapan3: [],
    dapan4: [],
    dokho: [],
    loai: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected cauhoiService: CauhoiService,
    protected dokhoService: DokhoService,
    protected loaiService: LoaiService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cauhoi }) => {
      this.updateForm(cauhoi);
    });
    this.dokhoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDokho[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDokho[]>) => response.body)
      )
      .subscribe((res: IDokho[]) => (this.dokhos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.loaiService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ILoai[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILoai[]>) => response.body)
      )
      .subscribe((res: ILoai[]) => (this.loais = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(cauhoi: ICauhoi) {
    this.editForm.patchValue({
      id: cauhoi.id,
      noidung: cauhoi.noidung,
      ketqua: cauhoi.ketqua,
      dapan1: cauhoi.dapan1,
      dapan2: cauhoi.dapan2,
      dapan3: cauhoi.dapan3,
      dapan4: cauhoi.dapan4,
      dokho: cauhoi.dokho,
      loai: cauhoi.loai
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cauhoi = this.createFromForm();
    if (cauhoi.id !== undefined) {
      this.subscribeToSaveResponse(this.cauhoiService.update(cauhoi));
    } else {
      this.subscribeToSaveResponse(this.cauhoiService.create(cauhoi));
    }
  }

  private createFromForm(): ICauhoi {
    return {
      ...new Cauhoi(),
      id: this.editForm.get(['id']).value,
      noidung: this.editForm.get(['noidung']).value,
      ketqua: this.editForm.get(['ketqua']).value,
      dapan1: this.editForm.get(['dapan1']).value,
      dapan2: this.editForm.get(['dapan2']).value,
      dapan3: this.editForm.get(['dapan3']).value,
      dapan4: this.editForm.get(['dapan4']).value,
      dokho: this.editForm.get(['dokho']).value,
      loai: this.editForm.get(['loai']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICauhoi>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackDokhoById(index: number, item: IDokho) {
    return item.id;
  }

  trackLoaiById(index: number, item: ILoai) {
    return item.id;
  }
}
