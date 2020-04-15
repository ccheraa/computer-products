import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

import { HomeRoutes } from '../components/home/home.route';
import { SignupRoutes } from '../components/auth/signup/signup.router';
import { SigninRoutes } from '../components/auth/signin/signin.router';
import { ClientListingRoutes } from '../components/client-listing/client-listing.router';
import { InvoiceListingRoutes } from '../components/invoice-listing/invoice-listing.router';
import { InvoiceFormRoutes } from '../components/invoice-form/invoice-form.router';
import { ProductListingRoutes } from '../components/product-listing/product-listing.router';
import { AdminUserRoutes } from '../components/admin-user/admin-user.router';


const routes: Routes = [
  ...HomeRoutes,
  ...SignupRoutes,
  ...SigninRoutes,
  ...ClientListingRoutes,
  ...InvoiceListingRoutes,
  ...InvoiceFormRoutes,
  ...ProductListingRoutes,
  ...AdminUserRoutes,
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
