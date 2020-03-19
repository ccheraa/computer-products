import { Routes } from '@angular/router';
import { SigninComponent } from './signin.component';

export const SigninRoutes: Routes = [
  {
    path: 'api/signin',
    component: SigninComponent,
    canActivate: [SigninComponent]
  },
];
