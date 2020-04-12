import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';

import { Product } from 'src/app/classes/product.classe';

import { ProductService } from 'src/app/services/product.service';
import { NotificationService } from 'src/app/services/notification.service';

import { ProductFormCreateComponent } from '../product-form-create/product-form-create.component';
import { ProductFormUpdateComponent } from '../product-form-update/product-form-update.component';

const ELEMENT_DATA: Product[] = [];

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  displayedColumns: string[] = [
    'productCode',
    'definition',
    'category',
    'quantity',
    'price',
    'photo',
    'action'
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  searchProduct = '';
  loadingData = true;
  noData = false;

  constructor(
    private dialog: MatDialog,
    private product: ProductService,
    private notification: NotificationService
  ) {
    this.product.listen().subscribe(
      (m: any) => {
        console.log(m);
        this.initForm();
      }
    );
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.product.getProducts().subscribe(
      (data) => {
        if (data.length > 0) {
          setTimeout(
            () => {
              this.dataSource = new MatTableDataSource(data);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
              this.loadingData = false;
              this.noData = false;
            }, 1500
          );
        } else {
          setTimeout(
            () => {
              this.loadingData = false;
              this.noData = true;
            }, 1500
          );
        }
      },
      (err) => {
        console.error('Failed to fetch Product: ', err);
        this.loadingData = false;
        this.noData = true;
      }
    );
  }

  onFilterClear() {
    this.searchProduct = '';
    this.applyFilter(null);
  }

  applyFilter(productCode) {
    this.product.searchProducts({productCode}).subscribe(
      (data) => {
        if (productCode) {
          this.dataSource.data = data;
        } else {
          this.initForm();
        }
      }
    );
  }

  onCreateProduct() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    this.dialog.open(ProductFormCreateComponent, dialogConfig);
  }

  onEdit(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.panelClass = 'panelClass';
    dialogConfig.data = this.product.productForm = row;
    this.dialog.open(ProductFormUpdateComponent, dialogConfig);
  }

  onDelete(_ID: string) {
    this.product.deleteProduct(_ID).subscribe(
      (data) => {
        this.dataSource.data = this.dataSource.data.filter(product => product._id !== _ID);
        this.notification.success('Product delete...');
      },
      () => this.notification.warn('Failed to delete Product...')
    );
  }

}
