import { Component, OnInit } from '@angular/core';
import {CauhoiComponent} from "app/entities/cauhoi/cauhoi.component";
import {filter, map} from "rxjs/operators";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {ICauhoi} from "app/shared/model/cauhoi.model";

@Component({
  selector: 'jhi-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent extends CauhoiComponent {
  loadAll() {
    this.cauhoiService
      .queryRandom()
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
  subMit(){
    var scope = 0;

  }
}
