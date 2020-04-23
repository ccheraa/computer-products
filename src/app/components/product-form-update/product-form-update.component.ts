import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { INPUT_ROW_TOP, INPUT_ROW_BOTTOM } from 'src/app/classes/product.classe';

import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form-update',
  templateUrl: './product-form-update.component.html',
  styleUrls: ['./product-form-update.component.scss']
})
export class ProductFormUpdateComponent implements OnInit {

  productUpdateForm: FormGroup;
  inputRowTop = INPUT_ROW_TOP;
  inputRowBottom = INPUT_ROW_BOTTOM;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductFormUpdateComponent>,
    private formBuilder: FormBuilder,
    private category: CategoryService,
    private product: ProductService,
    private notification: NotificationService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.productUpdateForm = this.formBuilder.group({
      id: [this.data._id],
      productCode : [this.data.productCode, Validators.required],
      definition : [this.data.definition],
      category : [this.data.category],
      quantity : [this.data.quantity],
      price : [this.data.price],
    });
  }

  onClose() {
    this.dialogRef.close();
    this.product.filter('Register click');
  }

  onUpdateProduct() {
    if (this.productUpdateForm.valid) {
      this.product.updateProduct(this.productUpdateForm.value.id, this.productUpdateForm.value).subscribe(
        (data) => {
          this.notification.success('Product update');
          this.onClose();
        },
        () => {
          this.notification.warn('Failed to update Product!');
        }
      );
    }
  }
}
