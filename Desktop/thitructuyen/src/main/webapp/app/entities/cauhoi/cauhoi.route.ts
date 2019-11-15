import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Cauhoi } from 'app/shared/model/cauhoi.model';
import { CauhoiService } from './cauhoi.service';
import { CauhoiComponent } from './cauhoi.component';
import { CauhoiDetailComponent } from './cauhoi-detail.component';
import { CauhoiUpdateComponent } from './cauhoi-update.component';
import { CauhoiDeletePopupComponent } from './cauhoi-delete-dialog.component';
import { ICauhoi } from 'app/shared/model/cauhoi.model';

@Injectable({ providedIn: 'root' })
export class CauhoiResolve implements Resolve<ICauhoi> {
  constructor(private service: CauhoiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICauhoi> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Cauhoi>) => response.ok),
        map((cauhoi: HttpResponse<Cauhoi>) => cauhoi.body)
      );
    }
    return of(new Cauhoi());
  }
}

export const cauhoiRoute: Routes = [
  {
    path: '',
    component: CauhoiComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cauhois'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CauhoiDetailComponent,
    resolve: {
      cauhoi: CauhoiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cauhois'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CauhoiUpdateComponent,
    resolve: {
      cauhoi: CauhoiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cauhois'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CauhoiUpdateComponent,
    resolve: {
      cauhoi: CauhoiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cauhois'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const cauhoiPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CauhoiDeletePopupComponent,
    resolve: {
      cauhoi: CauhoiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cauhois'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
