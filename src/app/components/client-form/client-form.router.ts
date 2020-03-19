import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ClientFormComponent } from './client-form.component';

export const ClientFormRoutes: Routes = [
  {
    path: 'dashboard/client/:id',
    component: ClientFormComponent,
    canActivate: [AuthGuard],
  },
];
