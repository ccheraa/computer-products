import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { INPUT_INVOICE_TOP, Invoice, INPUT_INVOICE_BOTTOM } from 'src/app/classes/invoice.classe';

import { InvoiceService } from 'src/app/services/invoice.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ClientService } from 'src/app/services/client.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  private _INVOICE: Invoice;
  invoiceForm: FormGroup;
  inputTop = INPUT_INVOICE_TOP;
  inputBottom = INPUT_INVOICE_BOTTOM;
  title: string;
  visibility: string;
  customerList;
  productList;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private invoice: InvoiceService,
    private notification: NotificationService,
    private client: ClientService,
    private product: ProductService
  ) { }

  ngOnInit() {
    this.initForm();
    this.setTitle();
    this.setInvoiceToForm();
    this.setCustomerList();
    this.setProductList();
  }

  initForm() {
    this.invoiceForm = new FormGroup({
      invoiceCode: new FormControl(null, Validators.required),
      clientCode: new FormControl(null, Validators.required),
      productCode: new FormControl(null, Validators.required),
      designation: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      unitPrice: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
    });
  }

  setTitle() {
    this.route.params.subscribe(
      (params) => {
        const _ID = params.id;
        if (_ID) {
          this.title = 'Update';
          this.visibility = 'hidden';
        } else {
          this.title = 'Create';
        }
      }
    );
  }

  setInvoiceToForm() {
    this.route.params.subscribe(
      params => {
        const id = params.id;
        if (!id) {
          return;
        }
        this.invoice.getInvoice(id).subscribe(
          (data) => {
            this._INVOICE = data;
            this.invoiceForm.patchValue(this._INVOICE);
          },
          () => {
            this.notification.warn('Failed to get Invoice...');
            this.router.navigateByUrl('/dashboard/invoice');
          }
        );
      }
    );
  }

  setCustomerList() {
    this.client.getClients().subscribe(
      (data) => {
        this.customerList = data;
      }
    );
  }

  setProductList() {
    this.product.getProducts().subscribe(
      (data) => {
        this.productList = data;
      }
    );
  }

  onSaveInvoice() {
    if (this.invoiceForm.valid) {
      if (this._INVOICE) {
        this.invoice.updateInvoice(this._INVOICE._id, this.invoiceForm.value).subscribe(
          (data) => {
            this.notification.success('Invoice update');
            this.router.navigate(['/dashboard', 'invoice']);
          },
          () => {
            this.notification.warn('Failed to update Invoice...');
          }
        );
      } else {
        this.invoice.createInvoice(this.invoiceForm.value).subscribe(
          (data) => {
            this.invoiceForm.reset();
            this.notification.success('Invoice created...');
            this.router.navigate(['/dashboard', 'invoice']);
          },
          () => {
            this.notification.warn('Failed to create Invoice !');
          }
        );
      }
    }
  }

}
