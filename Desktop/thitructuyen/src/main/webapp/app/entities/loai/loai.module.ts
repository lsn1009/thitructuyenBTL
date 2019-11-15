import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThitructuyenSharedModule } from 'app/shared/shared.module';
import { LoaiComponent } from './loai.component';
import { LoaiDetailComponent } from './loai-detail.component';
import { LoaiUpdateComponent } from './loai-update.component';
import { LoaiDeletePopupComponent, LoaiDeleteDialogComponent } from './loai-delete-dialog.component';
import { loaiRoute, loaiPopupRoute } from './loai.route';

const ENTITY_STATES = [...loaiRoute, ...loaiPopupRoute];

@NgModule({
  imports: [ThitructuyenSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [LoaiComponent, LoaiDetailComponent, LoaiUpdateComponent, LoaiDeleteDialogComponent, LoaiDeletePopupComponent],
  entryComponents: [LoaiComponent, LoaiUpdateComponent, LoaiDeleteDialogComponent, LoaiDeletePopupComponent]
})
export class ThitructuyenLoaiModule {}
