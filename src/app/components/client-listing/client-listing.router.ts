import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ClientListingComponent } from './client-listing.component';

export const ClientListingRoutes: Routes = [
  {
    path: 'dashboard/client',
    component: ClientListingComponent,
    canActivate: [AuthGuard],
  },
];
