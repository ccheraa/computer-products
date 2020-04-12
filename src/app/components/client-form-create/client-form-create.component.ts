import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ClientService } from 'src/app/services/client.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-client-form-create',
  templateUrl: './client-form-create.component.html',
  styleUrls: ['./client-form-create.component.scss']
})
export class ClientFormCreateComponent implements OnInit {

  clientCreateForm: FormGroup;

  constructor(
    private client: ClientService,
    private city: CityService,
    private dialogRef: MatDialogRef<ClientFormCreateComponent>,
    private notification: NotificationService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.clientCreateForm = new FormGroup({
      clientCode: new FormControl('', [Validators.required, Validators.maxLength(4)]),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      mobile: new FormControl('', [Validators.required, Validators.pattern(('[5-7]\\d{8}'))]),
      city: new FormControl('', Validators.required),
      gender: new FormControl('Male'),
    });
  }

  onClear() {
    this.clientCreateForm.reset();
  }

  onClose() {
    this.dialogRef.close();
    this.client.filter('Register click');
  }

  onCreateClient() {
    if (this.clientCreateForm.valid) {
      this.client.createClient(this.clientCreateForm.value).subscribe(
        (data) => {
          this.clientCreateForm.reset();
          this.notification.success('Client created...');
          this.onClose();
        },
        () => {
          this.notification.warn('Failed to create Client !');
        }
      );
    }
  }

}
