import { Component} from '@angular/core';
import {KetquaComponent} from "app/entities/ketqua/ketqua.component";
import {filter, map} from "rxjs/operators";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {IKetqua} from "app/shared/model/ketqua.model";

@Component({
  selector: 'jhi-ketqua-user',
  templateUrl: './ketqua-user.component.html',
  styleUrls: ['./ketqua-user.component.scss']
})
export class KetquaUserComponent extends KetquaComponent {
  loadAll() {
    this.ketquaService
      .queryUser()
      .pipe(
        filter((res: HttpResponse<IKetqua[]>) => res.ok),
        map((res: HttpResponse<IKetqua[]>) => res.body)
      )
      .subscribe(
        (res: IKetqua[]) => {
          this.ketquas = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }
}


