import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { INPUT_ROW_TOP, INPUT_ROW_BOTTOM } from 'src/app/classes/product.classe';

import { ProductService } from 'src/app/services/product.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-form-create',
  templateUrl: './product-form-create.component.html',
  styleUrls: ['./product-form-create.component.scss']
})
export class ProductFormCreateComponent implements OnInit {

  productCreateForm: FormGroup;
  inputRowTop = INPUT_ROW_TOP;
  inputRowBottom = INPUT_ROW_BOTTOM;
  upload: boolean;
  uploadOff: boolean;

  constructor(
    private dialogRef: MatDialogRef<ProductFormCreateComponent>,
    private formBuilder: FormBuilder,
    private product: ProductService,
    private category: CategoryService,
    private notification: NotificationService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.productCreateForm = this.formBuilder.group({
      productCode: ['', Validators.required],
      definition: [''],
      category: [''],
      quantity: [''],
      price: [''],
      imageUrl: [''],
    });
  }

  onClear() {
    this.productCreateForm.reset();
  }

  onClose() {
    this.dialogRef.close();
    this.product.filter('Register click');
  }

  onCreateProduct() {
    if (this.productCreateForm.valid) {
      this.product.createProduct(this.productCreateForm.value).subscribe(
        (data) => {
          this.productCreateForm.reset();
          this.notification.success('Product add');
          this.onClose();
        },
        () => {
          this.notification.warn('Failed to add Product!');
        }
      );
    }
  }

  uploadImage(event) {
    // this.product.uploadImage(event.target.files[0]).subscribe(
    //   (data: any) => {
    //     this.imageUrl = data.imageUrl;
    //     this.notification.success('File uploaded.');
    //   },
    //   () => {
    //     this.notification.warn('Please upload valid file !');
    //   }
    // );
    this.product.uploadPhoto(event.target.files[0]).subscribe(
      (data: any) => {
        this.productCreateForm.setValue({
          ...this.productCreateForm.value,
          imageUrl: data.imageUrl,
        });
        this.upload = true;
        this.uploadOff = false;
        // this.notification.success('File uploaded.');
      },
      () => {
        this.uploadOff = true;
        this.upload = false;
        // this.notification.warn('Please upload valid file !');
      }
    );
  }
}
