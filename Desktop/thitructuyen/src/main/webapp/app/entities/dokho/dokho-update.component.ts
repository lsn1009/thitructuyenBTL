import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IDokho, Dokho } from 'app/shared/model/dokho.model';
import { DokhoService } from './dokho.service';

@Component({
  selector: 'jhi-dokho-update',
  templateUrl: './dokho-update.component.html'
})
export class DokhoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    dokho: [null, [Validators.required]]
  });

  constructor(protected dokhoService: DokhoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ dokho }) => {
      this.updateForm(dokho);
    });
  }

  updateForm(dokho: IDokho) {
    this.editForm.patchValue({
      id: dokho.id,
      dokho: dokho.dokho
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const dokho = this.createFromForm();
    if (dokho.id !== undefined) {
      this.subscribeToSaveResponse(this.dokhoService.update(dokho));
    } else {
      this.subscribeToSaveResponse(this.dokhoService.create(dokho));
    }
  }

  private createFromForm(): IDokho {
    return {
      ...new Dokho(),
      id: this.editForm.get(['id']).value,
      dokho: this.editForm.get(['dokho']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDokho>>) {
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
