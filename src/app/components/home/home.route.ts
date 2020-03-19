import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RouteGuard } from 'src/app/guards/route.guard';

export const HomeRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [RouteGuard],
  },
];
