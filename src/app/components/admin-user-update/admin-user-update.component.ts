import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AdministratorService } from 'src/app/services/administrator.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-admin-user-update',
  templateUrl: './admin-user-update.component.html',
  styleUrls: ['./admin-user-update.component.scss']
})
export class AdminUserUpdateComponent implements OnInit {

  userUpdateForm: FormGroup;
  userAuthorizedForm: FormGroup;
  tiles: Tile[] = [
    {cols: 4, rows: 2, color: '#e2dddd'},
  ];
  title = 'User authorized';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AdminUserUpdateComponent>,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private user: UserService,
    private notification: NotificationService,
    private admin: AdministratorService
  ) { }

  ngOnInit() {
    this.initForm();
    this.initFormUserAuthorized();
  }

  initForm() {
    this.userUpdateForm = this.formBuilder.group({
      id: [this.data._id],
      username: [this.data.username],
      email: [this.data.email],
      permission: [this.data.permission],
    });
  }

  initFormUserAuthorized() {
    this.userAuthorizedForm = this.formBuilder.group({
      user_create: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  getColor() {
    if (this.userUpdateForm.value.permission === 'authorized') {
      return 'green';
    } else if (this.userUpdateForm.value.permission === 'unauthorized') {
      return 'red';
    }
  }

  onClose() {
    this.dialogRef.close();
    this.user.statusOn = 'block';
    this.user.statusOff = 'none';
    this.user.filter('Register click');
  }

  onAuthorizedUser() {
    if (this.userAuthorizedForm.valid) {
      this.admin.userAuthorized(this.userAuthorizedForm.value).subscribe(
        () => {
          this.user.statusOn = 'none';
          this.user.statusOff = 'block';
          this.title = 'Updat user';
          this.notification.success('Authorized user');
        },
        () => {
          this.notification.warn('User is not found!');
        }
      );
    }
  }

  onUpdateUser() {
    if (this.userUpdateForm.valid) {
      this.user.updateUser(this.userUpdateForm.value.id, this.userUpdateForm.value).subscribe(
        (data) => {
          this.notification.success('User update');
          this.user.statusOn = 'block';
          this.user.statusOff = 'none';
          this.onClose();
        },
        () => {
          this.notification.warn('Failed to update User !');
        }
      );
    }
  }
}
