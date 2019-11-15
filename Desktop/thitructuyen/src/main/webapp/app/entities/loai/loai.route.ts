import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Loai } from 'app/shared/model/loai.model';
import { LoaiService } from './loai.service';
import { LoaiComponent } from './loai.component';
import { LoaiDetailComponent } from './loai-detail.component';
import { LoaiUpdateComponent } from './loai-update.component';
import { LoaiDeletePopupComponent } from './loai-delete-dialog.component';
import { ILoai } from 'app/shared/model/loai.model';

@Injectable({ providedIn: 'root' })
export class LoaiResolve implements Resolve<ILoai> {
  constructor(private service: LoaiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILoai> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Loai>) => response.ok),
        map((loai: HttpResponse<Loai>) => loai.body)
      );
    }
    return of(new Loai());
  }
}

export const loaiRoute: Routes = [
  {
    path: '',
    component: LoaiComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Loais'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LoaiDetailComponent,
    resolve: {
      loai: LoaiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Loais'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LoaiUpdateComponent,
    resolve: {
      loai: LoaiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Loais'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LoaiUpdateComponent,
    resolve: {
      loai: LoaiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Loais'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const loaiPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: LoaiDeletePopupComponent,
    resolve: {
      loai: LoaiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Loais'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
