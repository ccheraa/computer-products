import { Component, OnInit, ViewChild } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { Invoice } from 'src/app/classes/invoice.classe';

import { AuthService } from 'src/app/services/core/auth.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { NotificationService } from 'src/app/services/notification.service';

const ELEMENT_DATA: Invoice[] = [];

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit, CanActivate {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = [
    'username',
    'description',
    'date',
    'duration',
    'action'
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  filterKey: string;
  loadingData = true;
  noData = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private invoice: InvoiceService,
    private notification: NotificationService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.invoice.getInvoices().subscribe(
      (data) => {
        if (data.length > 0) {
          setTimeout(() => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.loadingData = false;
          }, 1500);
        } else {
          this.loadingData = false;
          this.noData = true;
        }
      },
      (err) => {
        console.error('Failed to fetch Invoice: ', err);
        this.loadingData = false;
        this.noData = true;
      }
    );
  }

  applyFilter(username) {
    this.invoice.searchInvoices({username}).subscribe(
      data => {
        if (username) {
          this.dataSource.data = data;
        } else {
          this.initForm();
        }
      }
    );
  }

  onFilterClear() {
    this.filterKey = '';
    this.applyFilter(null);
  }

  onCreateInvoice() {
    this.router.navigate(['/dashboard', 'invoice', 'new']);
  }

  onEditInvoice(id) {
    this.router.navigate(['/dashboard', 'invoice', id]);
  }

  onDeleteInvoice(id) {
    this.invoice.deleteInvoice(id).subscribe(
      data => {
        this.dataSource.data = this.dataSource.data.filter(invoice => invoice._id !== id);
        this.notification.success('Invoice delete...');
      },
      err => this.notification.warn('Failed to delete Invoice...')
    );
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/api', 'signin']);
      return false;
    }
  }

}
