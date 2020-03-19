import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ClientService } from 'src/app/services/client.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  clientForm: FormGroup;

  constructor(
    private client: ClientService,
    private city: CityService,
    private dialogRef: MatDialogRef<ClientFormComponent>,
    private notification: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.clientForm = new FormGroup({
      id: new FormControl(this.data._id),
      name: new FormControl(this.data.name, Validators.required),
      email: new FormControl(this.data.email, Validators.email),
      mobile: new FormControl(this.data.mobile, [Validators.required, Validators.pattern(('[5-7]\\d{8}'))]),
      city: new FormControl(this.data.city),
      gender: new FormControl(this.data.gender),
      hireDate: new FormControl(this.data.hireDate, Validators.required),
      isPermanent: new FormControl(false),
    });
  }

  // onClear() {
  //   this.clientForm.reset();
  // }

  onClose() {
    this.dialogRef.close();
    this.client.filter('Register click');
  }

  onSaveClient() {
    if (this.clientForm.valid) {
      this.client.updateClient(this.clientForm.value.id, this.clientForm.value).subscribe(
        (data) => {
          this.notification.success('Client update');
          this.onClose();
        },
        () => {
          this.notification.warn('Failed to update Client...');
        }
      );
    }
  }

}
