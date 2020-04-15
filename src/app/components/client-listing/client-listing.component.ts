import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialogConfig, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { FormGroup } from '@angular/forms';

import { Client } from 'src/app/classes/client.classe';

import { ClientService } from 'src/app/services/client.service';
import { CityService } from 'src/app/services/city.service';
import { NotificationService } from 'src/app/services/notification.service';

import { ClientFormCreateComponent } from '../client-form-create/client-form-create.component';
import { ClientFormUpdateComponent } from '../client-form-update/client-form-update.component';

const ELEMENT_DATA: Client[] = [];

@Component({
  selector: 'app-client-listing',
  templateUrl: './client-listing.component.html',
  styleUrls: ['./client-listing.component.scss']
})
export class ClientListingComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  displayedColumns: string[] = [
    'clientCode',
    'name',
    'email',
    'mobile',
    'gender',
    'city',
    'action'
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  filterKey: string;
  loadingData = true;
  noData = false;

  constructor(
    private dialog: MatDialog,
    private client: ClientService,
    private city: CityService,
    private notification: NotificationService
  ) {
    this.client.listen().subscribe(
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
    this.client.getClients().subscribe(
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
        console.error('Failed to fetch Customer: ', err);
        this.loadingData = false;
        this.noData = true;
      }
    );
  }

  onFilterClear() {
    this.filterKey = '';
    this.applyFilter(null);
  }

  applyFilter(name) {
    this.client.searchClients({name}).subscribe(
      (data) => {
        if (name) {
          this.dataSource.data = data;
        } else {
          this.initForm();
        }
      }
    );
  }

  onCreateClient() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    this.dialog.open(ClientFormCreateComponent, dialogConfig);
  }

  onEdit(row) {
    // this.client.clientForm = row;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.panelClass = 'panelClass';
    dialogConfig.data = this.client.clientForm = row;
    this.dialog.open(ClientFormUpdateComponent, dialogConfig);
  }

  onDelete(_ID: string) {
    this.client.deleteClient(_ID).subscribe(
      (data) => {
        this.dataSource.data = this.dataSource.data.filter(client => client._id !== _ID);
        this.notification.success('Customer delete.');
      },
      () => this.notification.warn('Failed to delete Customer !')
    );
  }

}
