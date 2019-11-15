import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDokho } from 'app/shared/model/dokho.model';

@Component({
  selector: 'jhi-dokho-detail',
  templateUrl: './dokho-detail.component.html'
})
export class DokhoDetailComponent implements OnInit {
  dokho: IDokho;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dokho }) => {
      this.dokho = dokho;
    });
  }

  previousState() {
    window.history.back();
  }
}
