import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IKetqua } from 'app/shared/model/ketqua.model';

@Component({
  selector: 'jhi-ketqua-detail',
  templateUrl: './ketqua-detail.component.html'
})
export class KetquaDetailComponent implements OnInit {
  ketqua: IKetqua;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ketqua }) => {
      this.ketqua = ketqua;
    });
  }

  previousState() {
    window.history.back();
  }
}
