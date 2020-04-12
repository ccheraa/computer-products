import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProductListingComponent } from './product-listing.component';

export const ProductListingRoutes: Routes = [
  {
    path: 'dashboard/product',
    component: ProductListingComponent,
    canActivate: [AuthGuard],
  },
];
