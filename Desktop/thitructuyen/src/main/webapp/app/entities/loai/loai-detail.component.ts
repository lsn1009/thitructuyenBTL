import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILoai } from 'app/shared/model/loai.model';

@Component({
  selector: 'jhi-loai-detail',
  templateUrl: './loai-detail.component.html'
})
export class LoaiDetailComponent implements OnInit {
  loai: ILoai;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ loai }) => {
      this.loai = loai;
    });
  }

  previousState() {
    window.history.back();
  }
}
