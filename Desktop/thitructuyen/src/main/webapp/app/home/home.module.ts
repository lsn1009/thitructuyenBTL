import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThitructuyenSharedModule } from 'app/shared/shared.module';
import {HOME_ROUTE, START} from './home.route';
import { HomeComponent } from './home.component';
import { StartComponent } from './start/start.component';

@NgModule({
  imports: [ThitructuyenSharedModule, RouterModule.forChild([HOME_ROUTE]), RouterModule.forChild([START])],
  declarations: [HomeComponent, StartComponent]
})
export class ThitructuyenHomeModule {}
