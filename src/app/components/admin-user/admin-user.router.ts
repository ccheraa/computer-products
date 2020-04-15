import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AdminUserComponent } from './admin-user.component';

export const AdminUserRoutes: Routes = [
  {
    path: 'dashboard/admin',
    component: AdminUserComponent,
    canActivate: [AuthGuard],
  },
];
