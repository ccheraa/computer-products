import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { Client } from 'src/app/classes/client.classe';

import { ClientService } from 'src/app/services/client.service';

const ELEMENT_DATA: Client[] = [];

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  displayedColumns: string[] = [
    'name',
    'email',
    'mobile'
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(
    private customer: ClientService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.customer.getClients().subscribe(
      (data) => {
        if (data.length > 0) {
          setTimeout(() => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }, 1500);
        }
      },
      (err) => {
        console.error('Failed to fetch Customer: ', err);
      }
    );
  }

}
