import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThitructuyenSharedModule } from 'app/shared/shared.module';
import { DokhoComponent } from './dokho.component';
import { DokhoDetailComponent } from './dokho-detail.component';
import { DokhoUpdateComponent } from './dokho-update.component';
import { DokhoDeletePopupComponent, DokhoDeleteDialogComponent } from './dokho-delete-dialog.component';
import { dokhoRoute, dokhoPopupRoute } from './dokho.route';

const ENTITY_STATES = [...dokhoRoute, ...dokhoPopupRoute];

@NgModule({
  imports: [ThitructuyenSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [DokhoComponent, DokhoDetailComponent, DokhoUpdateComponent, DokhoDeleteDialogComponent, DokhoDeletePopupComponent],
  entryComponents: [DokhoComponent, DokhoUpdateComponent, DokhoDeleteDialogComponent, DokhoDeletePopupComponent]
})
export class ThitructuyenDokhoModule {}
