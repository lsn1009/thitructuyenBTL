import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThitructuyenSharedModule } from 'app/shared/shared.module';
import { KetquaComponent } from './ketqua.component';
import { KetquaDetailComponent } from './ketqua-detail.component';
import { KetquaUpdateComponent } from './ketqua-update.component';
import { KetquaDeletePopupComponent, KetquaDeleteDialogComponent } from './ketqua-delete-dialog.component';
import { ketquaRoute, ketquaPopupRoute } from './ketqua.route';
import { KetquaUserComponent } from './ketqua-user/ketqua-user.component';

const ENTITY_STATES = [...ketquaRoute, ...ketquaPopupRoute];

@NgModule({
  imports: [ThitructuyenSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [KetquaComponent, KetquaDetailComponent, KetquaUpdateComponent, KetquaDeleteDialogComponent, KetquaDeletePopupComponent, KetquaUserComponent],
  entryComponents: [KetquaComponent, KetquaUpdateComponent, KetquaDeleteDialogComponent, KetquaDeletePopupComponent]
})
export class ThitructuyenKetquaModule {}
