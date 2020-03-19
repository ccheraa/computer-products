import { Injectable, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackBar: MatSnackBar,
  ) {}

  config: MatSnackBarConfig = {
    duration: 6000,
  };

  success(msg) {
    this.config.panelClass = ['notification', 'success'];
    this.snackBar.open(msg, 'Success', this.config);
  }

  warn(msg) {
    this.config.panelClass = ['notification', 'warn'];
    this.snackBar.open(msg, 'Error', this.config);
  }
}
