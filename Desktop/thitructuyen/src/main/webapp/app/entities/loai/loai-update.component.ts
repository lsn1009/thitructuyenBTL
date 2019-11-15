import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ILoai, Loai } from 'app/shared/model/loai.model';
import { LoaiService } from './loai.service';

@Component({
  selector: 'jhi-loai-update',
  templateUrl: './loai-update.component.html'
})
export class LoaiUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    tenloai: [null, [Validators.required]]
  });

  constructor(protected loaiService: LoaiService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ loai }) => {
      this.updateForm(loai);
    });
  }

  updateForm(loai: ILoai) {
    this.editForm.patchValue({
      id: loai.id,
      tenloai: loai.tenloai
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const loai = this.createFromForm();
    if (loai.id !== undefined) {
      this.subscribeToSaveResponse(this.loaiService.update(loai));
    } else {
      this.subscribeToSaveResponse(this.loaiService.create(loai));
    }
  }

  private createFromForm(): ILoai {
    return {
      ...new Loai(),
      id: this.editForm.get(['id']).value,
      tenloai: this.editForm.get(['tenloai']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILoai>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
