import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Dokho } from 'app/shared/model/dokho.model';
import { DokhoService } from './dokho.service';
import { DokhoComponent } from './dokho.component';
import { DokhoDetailComponent } from './dokho-detail.component';
import { DokhoUpdateComponent } from './dokho-update.component';
import { DokhoDeletePopupComponent } from './dokho-delete-dialog.component';
import { IDokho } from 'app/shared/model/dokho.model';

@Injectable({ providedIn: 'root' })
export class DokhoResolve implements Resolve<IDokho> {
  constructor(private service: DokhoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDokho> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Dokho>) => response.ok),
        map((dokho: HttpResponse<Dokho>) => dokho.body)
      );
    }
    return of(new Dokho());
  }
}

export const dokhoRoute: Routes = [
  {
    path: '',
    component: DokhoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Dokhos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DokhoDetailComponent,
    resolve: {
      dokho: DokhoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Dokhos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DokhoUpdateComponent,
    resolve: {
      dokho: DokhoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Dokhos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DokhoUpdateComponent,
    resolve: {
      dokho: DokhoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Dokhos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const dokhoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DokhoDeletePopupComponent,
    resolve: {
      dokho: DokhoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Dokhos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
