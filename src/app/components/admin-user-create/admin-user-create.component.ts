import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { AdministratorService } from 'src/app/services/administrator.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-admin-user-create',
  templateUrl: './admin-user-create.component.html',
  styleUrls: ['./admin-user-create.component.scss']
})
export class AdminUserCreateComponent implements OnInit {

  title = 'User authorized';
  userCreateForm: FormGroup;
  userAuthorizedForm: FormGroup;
  tiles: Tile[] = [
    {cols: 4, rows: 2, color: '#e2dddd'},
  ];

  constructor(
    private dialogRef: MatDialogRef<AdminUserCreateComponent>,
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private user: UserService,
    private admin: AdministratorService
  ) { }

  ngOnInit() {
    this.initForm();
    this.initFormAuthorized();
  }

  initForm() {
    this.userCreateForm = this.formBuilder.group({
      user_create: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  initFormAuthorized() {
    this.userAuthorizedForm = this.formBuilder.group({
      user_authorized: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onClose() {
    this.dialogRef.close();
    this.user.statusOn = 'block';
    this.user.statusOff = 'none';
    this.user.filter('Register click');
  }

  onAuthorizedUser() {
    if (this.userAuthorizedForm.valid) {
      if (this.userAuthorizedForm.value.user_authorized === 'q') {
        this.user.statusOn = 'none';
        this.user.statusOff = 'block';
        this.title = 'Create user';
      } else {
        this.notification.warn('Unauthorized user!');
      }
    }
  }

  onCreateUser() {
    if (this.userCreateForm.valid) {
      this.admin.createAdministrateur(this.userCreateForm.value).subscribe(
        () => {
          this.userCreateForm.reset();
          this.notification.success('User created');
          this.onClose();
        },
        () => {
          this.notification.warn('Failed to create user ');
        }
      );
    }
  }

}
