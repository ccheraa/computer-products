import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';

import { User } from 'src/app/classes/user.classe';

import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AdministratorService } from 'src/app/services/administrator.service';

import { AdminAuthorizedUserComponent } from '../admin-authorized-user/admin-authorized-user.component';
import { AdminUserCreateComponent } from '../admin-user-create/admin-user-create.component';
import { AdminUserUpdateComponent } from '../admin-user-update/admin-user-update.component';

const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  displayedColumns: string[] = [
    'username',
    'email',
    'registration',
    'permission',
    'action'
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  filterKey: string;
  loadingData = true;
  noData = false;

  constructor(
    private dialog: MatDialog,
    private user: UserService,
    private notification: NotificationService,
    private administrator: AdministratorService
  ) {
    this.user.listen().subscribe(
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
    this.user.getUsers().subscribe(
      (data) => {
        if (data.length > 0) {
          setTimeout(() => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.loadingData = false;
            this.noData = false;
          }, 1500);
        } else {
          setTimeout(() => {
            this.loadingData = false;
            this.noData = true;
          }, 1500);
        }
      },
      (err) => {
        this.loadingData = false;
        this.noData = true;
      }
    );
  }

  onFilterClear() {
    this.filterKey = '';
    this.applyFilter(null);
  }

  applyFilter(username) {
    this.user.searchUsers({username}).subscribe(
      (data) => {
        if (username) {
          this.dataSource.data = data;
        } else {
          this.initForm();
        }
      }
    );
  }

  onAdministratorCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.panelClass = 'panelClass';
    this.dialog.open(AdminUserCreateComponent, dialogConfig);
  }

  onDelete(_ID) {
    // this.user.deleteUser(_ID).subscribe(
    //   (data) => {
    //     this.dataSource.data = this.dataSource.data.filter(user => user._id !== _ID);
    //     this.notification.success('User delete.');
    //   },
    //   () => this.notification.warn('Failed to delete User !')
    // );
  }

  onEdit(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.panelClass = 'panelClass';
    dialogConfig.data = this.user.userForm = row;
    this.dialog.open(AdminUserUpdateComponent, dialogConfig);
  }
}
