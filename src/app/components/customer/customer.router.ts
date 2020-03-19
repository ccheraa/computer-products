import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CustomerComponent } from './customer.component';

export const CustomerRoutes: Routes = [
  {
    path: 'dashboard/customer',
    component: CustomerComponent,
    canActivate: [AuthGuard],
  },
];
