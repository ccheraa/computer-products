import { Routes } from '@angular/router';
import { SignupComponent } from './signup.component';

export const SignupRoutes: Routes = [
  {
    path: 'api/signup',
    component: SignupComponent,
    canActivate: [SignupComponent]
  },
];
