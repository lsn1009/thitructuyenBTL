import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'loai',
        loadChildren: () => import('./loai/loai.module').then(m => m.ThitructuyenLoaiModule)
      },
      {
        path: 'dokho',
        loadChildren: () => import('./dokho/dokho.module').then(m => m.ThitructuyenDokhoModule)
      },
      {
        path: 'cauhoi',
        loadChildren: () => import('./cauhoi/cauhoi.module').then(m => m.ThitructuyenCauhoiModule)
      },
      {
        path: 'ketqua',
        loadChildren: () => import('./ketqua/ketqua.module').then(m => m.ThitructuyenKetquaModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: []
})
export class ThitructuyenEntityModule {}
