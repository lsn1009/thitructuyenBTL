import { Route } from '@angular/router';

import { HomeComponent } from './home.component';
import {StartComponent} from "app/home/start/start.component";

export const HOME_ROUTE: Route =
  {
  path: '',
  component: HomeComponent,
  data: {
    authorities: [],
    pageTitle: 'Welcome!'
  }
}
export const START: Route =
  {
    path: 'start',
    component: StartComponent,
    data: {
      authorities: [],
      pageTitle: 'Start!'
    }
  }
