import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThitructuyenSharedModule } from 'app/shared/shared.module';
import { CauhoiComponent } from './cauhoi.component';
import { CauhoiDetailComponent } from './cauhoi-detail.component';
import { CauhoiUpdateComponent } from './cauhoi-update.component';
import { CauhoiDeletePopupComponent, CauhoiDeleteDialogComponent } from './cauhoi-delete-dialog.component';
import { cauhoiRoute, cauhoiPopupRoute } from './cauhoi.route';

const ENTITY_STATES = [...cauhoiRoute, ...cauhoiPopupRoute];

@NgModule({
  imports: [ThitructuyenSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [CauhoiComponent, CauhoiDetailComponent, CauhoiUpdateComponent, CauhoiDeleteDialogComponent, CauhoiDeletePopupComponent],
  entryComponents: [CauhoiComponent, CauhoiUpdateComponent, CauhoiDeleteDialogComponent, CauhoiDeletePopupComponent]
})
export class ThitructuyenCauhoiModule {}
