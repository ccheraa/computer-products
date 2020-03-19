import { Routes } from '@angular/router';
import { InvoiceListingComponent } from './invoice-listing.component';

export const InvoiceListingRoutes: Routes = [
  {
    path: 'dashboard/invoice',
    component: InvoiceListingComponent,
    canActivate: [InvoiceListingComponent],
  },
];
