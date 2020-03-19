import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { InvoiceFormComponent } from './invoice-form.component';

export const InvoiceFormRoutes: Routes = [
  {
    path: 'dashboard/invoice/new',
    component: InvoiceFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/invoice/:id',
    component: InvoiceFormComponent,
    canActivate: [AuthGuard],
  },
];
