import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Ketqua } from 'app/shared/model/ketqua.model';
import { KetquaService } from './ketqua.service';
import { KetquaComponent } from './ketqua.component';
import { KetquaDetailComponent } from './ketqua-detail.component';
import { KetquaUpdateComponent } from './ketqua-update.component';
import { KetquaDeletePopupComponent } from './ketqua-delete-dialog.component';
import { IKetqua } from 'app/shared/model/ketqua.model';
import {KetquaUserComponent} from "app/entities/ketqua/ketqua-user/ketqua-user.component";

@Injectable({ providedIn: 'root' })
export class KetquaResolve implements Resolve<IKetqua> {
  constructor(private service: KetquaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IKetqua> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Ketqua>) => response.ok),
        map((ketqua: HttpResponse<Ketqua>) => ketqua.body)
      );
    }
    return of(new Ketqua());
  }
}

export const ketquaRoute: Routes = [
  {
    path: '',
    component: KetquaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Ketquas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: KetquaDetailComponent,
    resolve: {
      ketqua: KetquaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Ketquas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: KetquaUpdateComponent,
    resolve: {
      ketqua: KetquaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Ketquas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: KetquaUpdateComponent,
    resolve: {
      ketqua: KetquaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Ketquas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'user',
    component: KetquaUserComponent,
    resolve: {
      ketqua: KetquaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Lịch sử thi'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const ketquaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: KetquaDeletePopupComponent,
    resolve: {
      ketqua: KetquaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Ketquas'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
