import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICauhoi } from 'app/shared/model/cauhoi.model';

@Component({
  selector: 'jhi-cauhoi-detail',
  templateUrl: './cauhoi-detail.component.html'
})
export class CauhoiDetailComponent implements OnInit {
  cauhoi: ICauhoi;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cauhoi }) => {
      this.cauhoi = cauhoi;
    });
  }

  previousState() {
    window.history.back();
  }
}
