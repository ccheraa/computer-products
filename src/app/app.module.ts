import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppMaterialModule } from './modules/app-material.module';

import { AuthService } from './services/core/auth.service';
import { NotificationService } from './services/notification.service';
import { TokenInterceptorService } from './services/core/token-interceptor.service';
import { ClientService } from './services/client.service';

import { AppComponent } from './components/app/app.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { ClientListingComponent } from './components/client-listing/client-listing.component';
import { ClientFormCreateComponent } from './components/client-form-create/client-form-create.component';
import { ClientFormUpdateComponent } from './components/client-form-update/client-form-update.component';
import { InvoiceListingComponent } from './components/invoice-listing/invoice-listing.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { ProductFormCreateComponent } from './components/product-form-create/product-form-create.component';
import { ProductFormUpdateComponent } from './components/product-form-update/product-form-update.component';

@NgModule({
  declarations: [
    // main
    AppComponent,
    SideNavComponent,
    ToolbarComponent,
    HeaderComponent,
    // pages
    HomeComponent,
    PageNotFoundComponent,
    SignupComponent,
    SigninComponent,
    ClientListingComponent,
    InvoiceListingComponent,
    InvoiceFormComponent,
    ProductListingComponent,
    // dialog
    ClientFormCreateComponent,
    ClientFormUpdateComponent,
    ProductFormCreateComponent,
    ProductFormUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Material modules
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    NotificationService,
    ClientService,
    SignupComponent,
    SigninComponent,
    InvoiceListingComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ClientFormCreateComponent,
    ClientFormUpdateComponent,
    ProductFormCreateComponent,
    ProductFormUpdateComponent,
  ]
})
export class AppModule { }
