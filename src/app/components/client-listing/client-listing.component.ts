import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialogConfig, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { FormGroup } from '@angular/forms';

import { Client } from 'src/app/classes/client.classe';

import { ClientService } from 'src/app/services/client.service';
import { NotificationService } from 'src/app/services/notification.service';

import { ClientFormComponent } from '../client-form/client-form.component';
import { ClientFormCreateComponent } from '../client-form/client-form-create/client-form-create.component';
import { CityService } from 'src/app/services/city.service';

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
    'name',
    'email',
    'mobile',
    'gender',
    'city',
    'creation',
    'action'
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  filterKey: string;
  loadingData = true;
  noData = false;
  reactiveForm: FormGroup;

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
          this.loadingData = false;
          this.noData = true;
        }
      },
      (err) => {
        console.error('Failed to fetch Client: ', err);
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
    console.log('Row Client: ', row.city);
    // this.client.clientForm = row;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.panelClass = 'panelClass';
    dialogConfig.data = this.client.clientForm = row;
    this.dialog.open(ClientFormComponent, dialogConfig);
  }

  onDelete(_ID) {
    this.client.deleteClient(_ID).subscribe(
      (data) => {
        this.dataSource.data = this.dataSource.data.filter(client => client._id !== _ID);
        this.notification.success('Client delete...');
      },
      () => this.notification.warn('Failed to delete Client...')
    );
  }

}
